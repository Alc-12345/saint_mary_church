import {
  authenticateAdmin,
  createAdminToken,
  getAdminProfile,
} from "../utils/adminAuth.js";

export async function loginAdmin(req, res) {
  const email = req.body.email || "";
  const password = req.body.password || "";
  const admin = await authenticateAdmin(email, password);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin email or password.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Admin login successful.",
    data: {
      token: createAdminToken(admin),
      admin: getAdminProfile(admin),
    },
  });
}

export async function getCurrentAdmin(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      admin: req.admin,
    },
  });
}
