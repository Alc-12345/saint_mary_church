import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import donationCampaignRoutes from "./routes/donationCampaignRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import restorationRoutes from "./routes/restorationRoutes.js";
import siteSettingRoutes from "./routes/siteSettingRoutes.js";

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://saintmaryschurchajmer.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Church backend is ready.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/donation-campaigns", donationCampaignRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/restoration", restorationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", siteSettingRoutes);

export default app;
