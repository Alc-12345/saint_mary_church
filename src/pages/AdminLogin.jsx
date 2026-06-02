import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import churchHome from "../assets/church-home.avif";
import { clearAdminToken, getAdminToken, setAdminToken } from "../lib/adminAuth";
import { apiGet, apiPost } from "../lib/api";
import { isValidEmailAddress } from "../lib/validation";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      setCheckingSession(false);
      return;
    }

    apiGet("/auth/me")
      .then(() => {
        navigate("/admin", { replace: true });
      })
      .catch(() => {
        clearAdminToken();
        setCheckingSession(false);
      });
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!isValidEmailAddress(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await apiPost("/auth/login", {
        email: form.email,
        password: form.password,
      });

      setAdminToken(response.data.token);
      navigate("/admin", { replace: true });
    } catch (submissionError) {
      setError(
        submissionError.message || "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#120e0b] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,10,7,0.92),rgba(37,25,17,0.76))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,215,163,0.18),transparent_32%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] items-center px-4 py-10 sm:px-6 md:px-8">
        <div className="grid w-full gap-8 overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(20,14,10,0.58)] shadow-[0_35px_120px_rgba(0,0,0,0.34)] backdrop-blur-[12px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-10 sm:px-8 md:px-10 lg:px-12 lg:py-14">
            <p className="text-[0.78rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Admin Portal
            </p>
            <h1 className="mt-6 font-serif text-[2.8rem] leading-[1.02] tracking-[-0.03em] text-white sm:text-[3.4rem] md:text-[4rem]">
              Welcome back to Saint Mary&apos;s dashboard
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.9] text-white/76">
              Manage donations, gallery updates, restoration records, documents,
              and visitor messages from one place.
            </p>

           
          </div>

          <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,248,238,0.98),rgba(244,235,223,0.95))] px-6 py-10 text-[#3f2b18] sm:px-8 md:px-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-md">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#9a7b43]">
                  Sign In
                </p>
                <h2 className="mt-3 font-serif text-[2.2rem] leading-none">
                  Admin login
                </h2>
              </div>

              {checkingSession ? (
                <div className="mt-10 rounded-[24px] border border-[rgba(83,60,32,0.1)] bg-white/70 px-5 py-5 text-sm text-[#6b5a44]">
                  Checking existing admin session...
                </div>
              ) : (
                <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="text-[0.78rem] uppercase tracking-[0.24em] text-[#8b6d3b]">
                      Admin Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="Enter admin email"
                      className="mt-3 w-full rounded-[20px] border border-[rgba(83,60,32,0.12)] bg-white/78 px-4 py-4 text-[#3f2b18] outline-none transition placeholder:text-[#8e7b65] focus:border-[#b7964f]"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.78rem] uppercase tracking-[0.24em] text-[#8b6d3b]">
                      Password
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="mt-3 w-full rounded-[20px] border border-[rgba(83,60,32,0.12)] bg-white/78 px-4 py-4 text-[#3f2b18] outline-none transition placeholder:text-[#8e7b65] focus:border-[#b7964f]"
                      required
                    />
                  </label>

                  {error && (
                    <div className="rounded-[18px] border border-[#c57b7b]/30 bg-[rgba(197,123,123,0.12)] px-4 py-3 text-sm text-[#9c4d4d]">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#b7964f] bg-[#b7964f] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#9f7d49] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Signing In..." : "Enter Dashboard"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
