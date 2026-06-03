import crypto from "crypto";
import Admin from "../models/Admin.js";

const DEFAULT_ADMIN_EMAIL = "saintmary@gmail.com";
// previous default used in older deployments — if found, update to new default
const LEGACY_ADMIN_EMAIL = "admin@saintmaryschurchajmer.com";
const DEFAULT_ADMIN_PASSWORD = "Admin@123";
const DEFAULT_ADMIN_NAME = "Church Admin";

const MAX_ADMIN_ACCOUNTS = Number(process.env.MAX_ADMIN_ACCOUNTS || 5);

function getDefaultAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
    name: (process.env.ADMIN_NAME || DEFAULT_ADMIN_NAME).trim(),
  };
}

function getAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET || "saint-marys-admin-secret";
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(encodedPayload) {
  return crypto
    .createHmac("sha256", getAuthSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const passwordHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { passwordHash, passwordSalt: salt };
}

function verifyPassword(password, passwordHash, passwordSalt) {
  const nextHash = crypto.scryptSync(password, passwordSalt, 64).toString("hex");
  return safeCompare(nextHash, passwordHash);
}

export async function ensureDefaultAdmin() {
  const credentials = getDefaultAdminCredentials();
  let existingAdmin = await Admin.findOne({ email: credentials.email });

  if (existingAdmin) {
    return existingAdmin;
  }

  // If a legacy admin exists with the old email, update it to the new default
  try {
    const legacy = await Admin.findOne({ email: LEGACY_ADMIN_EMAIL });
    if (legacy) {
      legacy.email = credentials.email;
      // reset password to the default credentials.password to simplify recovery
      try {
        const { passwordHash: newHash, passwordSalt: newSalt } = hashPassword(credentials.password);
        legacy.passwordHash = newHash;
        legacy.passwordSalt = newSalt;
      } catch (pwErr) {
        console.error("Unable to reset legacy admin password:", pwErr);
      }
      await legacy.save();
      return legacy;
    }
  } catch (err) {
    // ignore and continue to create a new admin
    console.error("Error while checking legacy admin:", err);
  }

  const { passwordHash, passwordSalt } = hashPassword(credentials.password);

  return Admin.create({
    name: credentials.name,
    email: credentials.email,
    passwordHash,
    passwordSalt,
  });
}

export async function authenticateAdmin(email, password) {
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return null;
  }

  await ensureDefaultAdmin();

  const admin = await Admin.findOne({ email: normalizedEmail });

  if (!admin) {
    return null;
  }

  return verifyPassword(password, admin.passwordHash, admin.passwordSalt)
    ? admin
    : null;
}

export function getAdminProfile(admin) {
  if (!admin) {
    return {
      email: "",
      name: DEFAULT_ADMIN_NAME,
      role: "admin",
    };
  }

  return {
    id: String(admin._id),
    email: admin.email,
    name: admin.name,
    role: "admin",
  };
}

export function createAdminToken(admin) {
  const profile = getAdminProfile(admin);
  const payload = {
    adminId: profile.id,
    sub: profile.email,
    name: profile.name,
    role: profile.role,
    exp: Date.now() + 1000 * 60 * 60 * 12,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function listAdmins() {
  await ensureDefaultAdmin();

  const admins = await Admin.find()
    .sort({ createdAt: 1 })
    .select("_id name email createdAt updatedAt");

  return admins.map((admin) => ({
    _id: String(admin._id),
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
    role: "admin",
  }));
}

export async function countAdmins() {
  await ensureDefaultAdmin();
  return Admin.countDocuments();
}

export async function createAdminAccount({ email, password, name }) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const trimmedName = (name || "").trim();

  if (!normalizedEmail || !password || !trimmedName) {
    throw new Error("Name, email, and password are required.");
  }

  const adminCount = await Admin.countDocuments();
  if (adminCount >= MAX_ADMIN_ACCOUNTS) {
    throw new Error(`Maximum admin accounts reached. Only ${MAX_ADMIN_ACCOUNTS} admin accounts are allowed.`);
  }

  const existingAdmin = await Admin.findOne({ email: normalizedEmail });

  if (existingAdmin) {
    throw new Error("An admin with this email already exists.");
  }

  const { passwordHash, passwordSalt } = hashPassword(password);

  const admin = await Admin.create({
    name: trimmedName,
    email: normalizedEmail,
    passwordHash,
    passwordSalt,
  });

  return {
    _id: String(admin._id),
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
    role: "admin",
  };
}

export async function deleteAdminAccount(adminId) {
  return Admin.findByIdAndDelete(adminId);
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createSignature(encodedPayload);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    if (!payload?.adminId || !payload?.sub || !payload?.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
