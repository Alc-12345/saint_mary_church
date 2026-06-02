import { verifyAdminToken } from "../utils/adminAuth.js";

export default function requireAdminAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization || "";
  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Admin authorization is required.",
    });
  }

  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Your admin session is invalid or expired.",
    });
  }

  req.admin = {
    id: payload.adminId,
    email: payload.sub,
    name: payload.name,
    role: payload.role,
  };

  return next();
}
