import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { clearAdminToken, getAdminToken } from "../lib/adminAuth";
import { apiGet } from "../lib/api";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      setStatus("unauthorized");
      return;
    }

    apiGet("/auth/me")
      .then(() => {
        setStatus("authorized");
      })
      .catch(() => {
        clearAdminToken();
        setStatus("unauthorized");
      });
  }, []);

  if (status === "checking") {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#120e0b] px-4 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,215,163,0.18),transparent_34%)]" />
        <div className="relative rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-8 py-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[10px]">
          <p className="text-[0.78rem] uppercase tracking-[0.32em] text-[#ead7a3]">
            Admin Access
          </p>
          <p className="mt-4 text-lg text-white/78">Checking your session...</p>
        </div>
      </section>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
