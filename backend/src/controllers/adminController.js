import {
  countAdmins,
  createAdminAccount,
  deleteAdminAccount,
  listAdmins,
} from "../utils/adminAuth.js";

export async function getAdmins(req, res) {
  try {
    const admins = await listAdmins();
    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin accounts.",
      error: error.message,
    });
  }
}

export async function createAdmin(req, res) {
  const email = req.body.email || "";
  const password = req.body.password || "";
  const name = req.body.name || "";

  if (!email.trim() || !password.trim() || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }

  try {
    const admin = await createAdminAccount({ email, password, name });
    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to create admin account.",
    });
  }
}

export async function deleteAdmin(req, res) {
  try {
    const adminCount = await countAdmins();

    if (adminCount <= 1) {
      return res.status(400).json({
        success: false,
        message: "At least one admin account must remain.",
      });
    }

    if (req.params.id === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own logged-in admin account.",
      });
    }

    const deletedAdmin = await deleteAdminAccount(req.params.id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin account deleted successfully.",
      data: deletedAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Unable to delete admin account.",
    });
  }
}
