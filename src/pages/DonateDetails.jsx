import { useEffect, useMemo, useState } from "react";
import qrImage from "../assets/scanner.avif";
import churchHome from "../assets/church-home.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { apiGet, apiPost } from "../lib/api";
import {
  isValidEmailAddress,
  isValidPhoneNumber,
  sanitizePhoneInput,
} from "../lib/validation";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  amount: "",
  purpose: "",
};

function DonateDetails() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    apiGet("/donation-campaigns")
      .then((response) => {
        const nextCampaigns = response.data || [];
        setCampaigns(nextCampaigns);
        setFormData((current) => ({
          ...current,
          purpose: nextCampaigns[0]?.purpose || current.purpose,
        }));
      })
      .catch((error) => {
        console.error("Unable to load donation purposes:", error);
      });
  }, []);

  const canContinue = useMemo(() => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.amount.trim()
    );
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setSubmitError("");
    setFormData((current) => ({
      ...current,
      [name]: name === "phone" ? sanitizePhoneInput(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canContinue) return;
    if (!isValidEmailAddress(formData.email.trim())) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhoneNumber(formData.phone.trim())) {
      setSubmitError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      await apiPost("/donations", {
        donor: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        amount: Number(formData.amount),
        purpose: formData.purpose,
        mode: "QR Payment",
        status: "Pending Receipt",
      });

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save donation details. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1d1712] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(18,12,8,0.58),rgba(18,12,8,0.44)_28%,rgba(18,12,8,0.76)_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_30%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1280px] px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pb-0 md:pt-36">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-5 py-8 text-center shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
            <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Donation Form
            </p>
            <h1 className="mt-4 text-[2rem] font-normal leading-tight tracking-[-0.03em] sm:text-[2.4rem] md:text-[4rem] md:leading-none">
              Share your details to continue
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
              Fill your details first, then the QR code and payment step will
              appear below so you can complete your donation smoothly.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
            <div className="rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-8">
              <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                Donor Details
              </p>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/72">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/40"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/72">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/40"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/72">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/40"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/72">
                      Donation Amount
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-white/55">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] py-4 pl-9 pr-4 text-white outline-none placeholder:text-white/40"
                        placeholder="e.g. 1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/72">
                      Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-[0.98rem] text-white outline-none sm:text-base"
                    >
                      {campaigns.map((campaign) => (
                        <option
                          key={campaign.id || campaign._id || campaign.purpose}
                          className="text-black"
                          value={campaign.purpose}
                        >
                          {campaign.purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canContinue || isSubmitting}
                  className={`inline-flex rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                    canContinue && !isSubmitting
                      ? "border border-[#d1b06d] bg-[#d1b06d] text-[#24170d] hover:bg-[#e2c98d]"
                      : "cursor-not-allowed border border-white/10 bg-[rgba(255,255,255,0.05)] text-white/40"
                  }`}
                >
                  {isSubmitting ? "Saving Details..." : "Continue to Payment"}
                </button>
                {submitError && (
                  <p className="text-sm text-[#f0b7b7]">{submitError}</p>
                )}
              </form>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-8">
              <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                Payment Step
              </p>

              {!submitted ? (
                <div className="mt-6 rounded-[28px] border border-dashed border-white/15 bg-[rgba(255,255,255,0.03)] px-5 py-10 text-center">
                  <p className="text-[1.15rem] leading-[1.8] text-white/78">
                    First fill your donor details and click
                    ` Continue to Payment `. After that, the QR code and payment
                    instructions will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="rounded-[28px] border border-[#ead7a3]/30 bg-[rgba(234,215,163,0.08)] px-5 py-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-[#ead7a3]">
                      Donor Confirmed
                    </p>
                    <p className="mt-3 text-[1.02rem] leading-[1.8] text-white/86">
                      Thank you, {formData.fullName}. You can now scan the QR
                      code below and complete your donation of ₹{formData.amount}.
                    </p>
                    <p className="mt-3 text-sm leading-[1.8] text-white/72">
                      Your details are now saved in the admin donation records as a
                      pending donation. The funding graph updates after admin
                      verification.
                    </p>
                  </div>

                  <div className="mx-auto mt-8 max-w-[300px] rounded-[28px] bg-white p-5 text-[#1b1b1b] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                    <img
                      src={qrImage}
                      alt="Saint Mary's Church QR code"
                      className="h-auto w-full rounded-[16px]"
                    />
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-14 md:pt-18">
          <Footer className="bg-[rgba(17,12,8,0.42)]" />
        </div>
      </div>
    </section>
  );
}

export default DonateDetails;
