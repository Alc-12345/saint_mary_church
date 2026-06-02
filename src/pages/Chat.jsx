import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import churchHome from "../assets/church-home.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { donationCampaigns } from "../data/donationCampaigns";
import useSiteSettings from "../hooks/useSiteSettings";
import { apiGet, apiPost } from "../lib/api";
import { getWhatsAppNumber } from "../lib/siteSettings";
import {
  isValidEmailAddress,
  isValidPhoneNumber,
  sanitizePhoneInput,
} from "../lib/validation";

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M4.75 5.5A2.75 2.75 0 0 1 7.5 2.75h9A2.75 2.75 0 0 1 19.25 5.5v6A2.75 2.75 0 0 1 16.5 14.25H11l-3.79 3.21a.75.75 0 0 1-1.21-.57v-2.64A2.74 2.74 0 0 1 4.75 11.5v-6Zm4 1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.25 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.25 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M12.04 2.75A9.27 9.27 0 0 0 4.1 16.83L2.75 21.25l4.55-1.3a9.29 9.29 0 1 0 4.74-17.2Zm0 16.78a7.45 7.45 0 0 1-3.8-1.04l-.27-.16-2.7.77.8-2.63-.18-.27a7.45 7.45 0 1 1 6.15 3.33Zm4.09-5.56c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.12-.48.12-.15.22-.57.7-.7.84-.13.15-.25.17-.47.06-.22-.12-.92-.34-1.75-1.07-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.25.33-.38.11-.13.15-.22.23-.37.08-.15.04-.28-.02-.4-.06-.11-.48-1.17-.66-1.6-.17-.41-.35-.35-.48-.36h-.4c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.92 2.3.11.15 1.56 2.38 3.77 3.33 2.22.95 2.22.63 2.63.59.4-.04 1.3-.53 1.48-1.05.19-.52.19-.96.13-1.05-.05-.08-.2-.13-.41-.24Z" />
    </svg>
  );
}

function Chat() {
  const [activeTab, setActiveTab] = useState("message");
  const [campaigns, setCampaigns] = useState(donationCampaigns);
  const siteSettings = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    amount: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    apiGet("/donation-campaigns")
      .then((response) => {
        const nextCampaigns = response.data || donationCampaigns;
        setCampaigns(nextCampaigns);
      })
      .catch((error) => {
        console.error("Unable to load donation purposes:", error);
      });
  }, []);

  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedPhone = formData.phone.trim();
  const trimmedPurpose = formData.purpose.trim();
  const trimmedAmount = formData.amount.trim();
  const trimmedMessage = formData.message.trim();
  const whatsappNumber = getWhatsAppNumber(siteSettings.donationPhone);

  const whatsappMessage = `Hello, I want to connect with Saint Mary's Church.
${trimmedName ? `Name: ${trimmedName}\n` : ""}${
    trimmedEmail ? `Email: ${trimmedEmail}\n` : ""
  }${
    trimmedPhone ? `Phone: ${trimmedPhone}\n` : ""
  }${trimmedPurpose ? `Purpose: ${trimmedPurpose}\n` : ""}${
    trimmedAmount ? `Amount: Rs. ${trimmedAmount}\n` : ""
  }Message: ${
    trimmedMessage || "I have a question and would like your help."
  }`;

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const contactCards = [
    {
      title: "Message Support",
      detail: "Send us your name, email, and donation query.",
      action: siteSettings.churchEmail,
    },
    {
      title: "Donation Follow-up",
      detail: "Share your donation details so we can issue a receipt.",
      action: "stmaryschurch.62823377@hdfcbank",
    },
    {
      title: "Call the Church",
      detail: "Reach a church representative directly for urgent help.",
      action: siteSettings.donationPhone,
    },
  ];

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === "phone" ? sanitizePhoneInput(value) : value,
    }));
    setSubmitMessage("");
  }

  async function handleSubmitMessage() {
    if (!trimmedName || !trimmedMessage) return;
    if (trimmedEmail && !isValidEmailAddress(trimmedEmail)) {
      setSubmitMessage("Please enter a valid email address.");
      return;
    }
    if (trimmedPhone && !isValidPhoneNumber(trimmedPhone)) {
      setSubmitMessage("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await apiPost("/messages", {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        purpose: trimmedPurpose,
        amount: Number(trimmedAmount) || 0,
        topic: trimmedMessage.slice(0, 80),
        message: trimmedMessage,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        purpose: "",
        amount: "",
        message: "",
      });
      setSubmitMessage("Message sent successfully. The admin can now review it.");
    } catch (error) {
      setSubmitMessage("Unable to send message right now. Please try again.");
      console.error("Unable to send message:", error);
    }
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1b140f] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(18,12,8,0.62),rgba(18,12,8,0.44)_28%,rgba(18,12,8,0.78)_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_30%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1380px] px-4 pb-0 pt-28 sm:px-6 md:px-8 md:pt-36">
          <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-6 py-10 text-center shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] md:px-10 md:py-12">
            <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Stay Connected
            </p>
            <h1 className="mt-4 text-[2.6rem] font-normal leading-none tracking-[-0.03em] md:text-[4rem]">
              Restore &amp; Chat
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
              Reach out for donations, restoration questions, prayer requests,
              or updates. We will guide you with warmth and care.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("message")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                    activeTab === "message"
                      ? "bg-[#c7a95c] text-white"
                      : "border border-white/15 bg-[rgba(255,255,255,0.04)] text-white/80 hover:text-white"
                  }`}
                >
                  Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("whatsapp")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                    activeTab === "whatsapp"
                      ? "bg-[#c7a95c] text-white"
                      : "border border-white/15 bg-[rgba(255,255,255,0.04)] text-white/80 hover:text-white"
                  }`}
                >
                  WhatsApp
                </button>
              </div>

              <div className="mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.03)]">
                <div className="border-b border-white/10 bg-[rgba(255,255,255,0.05)] px-6 py-5">
                  <h2 className="font-sans text-[1.8rem] font-semibold text-white">
                    Let&apos;s Chat!
                  </h2>
                  <p className="mt-2 font-sans text-sm text-white/70">
                    We&apos;ll reply as soon as we can
                  </p>
                </div>

                <div className="bg-[linear-gradient(180deg,rgba(98,82,40,0.42),rgba(64,53,26,0.6))] px-6 py-8">
                  <div className="rounded-[24px] border border-white/10 bg-[rgba(18,14,12,0.34)] p-5">
                    <p className="text-sm uppercase tracking-[0.26em] text-[#ead7a3]">
                      {activeTab === "message" ? "Message box" : "WhatsApp help"}
                    </p>
                    <p className="mt-4 text-[1.02rem] leading-[1.8] text-white/88 md:text-[1.12rem]">
                      {activeTab === "message"
                        ? "Write your message, donation note, or prayer request. Please include your name, phone number, and email if you need a donation receipt."
                        : "Tap the WhatsApp action below to continue the conversation with the church support team and share your donation details quickly."}
                    </p>
                  </div>
                </div>

                <div className="bg-white px-5 py-5 text-[#222]">
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-[16px] border border-[#ece4d6] bg-[#fbf8f1] px-4 py-3 text-sm text-[#3f2e1d] outline-none placeholder:text-[#8a7d70]"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="Your email"
                      className="w-full rounded-[16px] border border-[#ece4d6] bg-[#fbf8f1] px-4 py-3 text-sm text-[#3f2e1d] outline-none placeholder:text-[#8a7d70]"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Your phone number"
                      className="w-full rounded-[16px] border border-[#ece4d6] bg-[#fbf8f1] px-4 py-3 text-sm text-[#3f2e1d] outline-none placeholder:text-[#8a7d70]"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full rounded-[16px] border border-[#ece4d6] bg-[#fbf8f1] px-4 py-3 text-sm text-[#3f2e1d] outline-none"
                      >
                        <option value="">Donation purpose</option>
                        {campaigns.map((campaign) => (
                          <option
                            key={campaign.id || campaign._id || campaign.purpose}
                            value={campaign.purpose}
                          >
                            {campaign.purpose}
                          </option>
                        ))}
                      </select>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8a7d70]">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="Donation amount"
                          className="w-full rounded-[16px] border border-[#ece4d6] bg-[#fbf8f1] py-3 pl-9 pr-4 text-sm text-[#3f2e1d] outline-none placeholder:text-[#8a7d70]"
                        />
                      </div>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      rows={5}
                      className="w-full resize-none rounded-[20px] border border-[#e7dfcf] bg-[#fbf8f1] px-4 py-4 text-sm text-[#3f2e1d] outline-none placeholder:text-[#8a7d70]"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleSubmitMessage}
                      className={`flex items-center justify-center rounded-[18px] border px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                        activeTab === "message"
                          ? "border-[#c7a95c] bg-[#fff8e7] text-[#a98742]"
                          : "border-[#e5e0d6] bg-[#f4f2ed] text-[#5d5d5d]"
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-current/10">
                        <ChatIcon />
                      </span>
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setActiveTab("whatsapp")}
                      className={`flex items-center justify-center rounded-[18px] border px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                        activeTab === "whatsapp"
                          ? "border-[#c7a95c] bg-[#fff8e7] text-[#a98742]"
                          : "border-[#e5e0d6] bg-[#f4f2ed] text-[#5d5d5d]"
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-current/10">
                        <WhatsAppIcon />
                      </span>
                    </a>
                  </div>

                  {submitMessage && (
                    <p className="mt-4 text-sm text-[#7a6e60]">{submitMessage}</p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#7a6e60]">
                    <span>Message goes directly to admin dashboard</span>
                    <Link
                      to="/visit"
                      className="font-semibold text-[#a98742] underline"
                    >
                      Contact details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8">
              <div className="rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8">
                <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  Contact Channels
                </p>
                <div className="mt-6 grid gap-4">
                  {contactCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-5"
                    >
                      <h3 className="text-[1.4rem] font-normal text-white">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-[1rem] leading-[1.75] text-white/78">
                        {card.detail}
                      </p>
                      <p className="mt-4 text-[0.95rem] font-semibold uppercase tracking-[0.2em] text-[#ead7a3]">
                        {card.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8">
                <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  Helpful Notes
                </p>
                <ul className="mt-6 space-y-4 text-[1rem] leading-[1.8] text-white/84">
                  <li>Please share your full name while contacting us.</li>
                  <li>For donation receipts, include your email and payment details.</li>
                  <li>For visits or urgent help, you can also call the church directly.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 md:pt-18">
          <Footer className="bg-[rgba(17,12,8,0.35)]" />
        </div>
      </div>
    </section>
  );
}

export default Chat;
