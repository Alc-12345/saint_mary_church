import { useState } from "react";
import { useLocation } from "react-router-dom";
import useSiteSettings from "../hooks/useSiteSettings";
import { getWhatsAppNumber } from "../lib/siteSettings";

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

function FloatingChatButton() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const siteSettings = useSiteSettings();

  if (
    location.pathname === "/chat" ||
    location.pathname === "/admin" ||
    location.pathname === "/admin/login"
  ) {
    return null;
  }

  const whatsappNumber = getWhatsAppNumber(siteSettings.donationPhone);
  const whatsappMessage =
    "Hello, I want to connect with Saint Mary's Church.";

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-[88px] right-4 z-[9999] flex w-[calc(100vw-2rem)] max-w-[340px] flex-col overflow-hidden rounded-tl-[34px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[6px] border border-white/15 bg-[rgba(34,25,17,0.96)] shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-[10px] sm:right-6"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="flex items-start justify-between bg-white px-5 py-5 text-[#3a3a3a]">
            <div>
              <h2 className="font-sans text-[1.15rem] font-semibold">
                Let&apos;s Chat!
              </h2>
              <p className="mt-1 font-sans text-sm text-[#6a6a6a]">
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#46b83c]" />
                We&apos;ll reply as soon as we can
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="font-sans text-3xl leading-none text-[#565656] transition hover:text-[#111]"
              aria-label="Close chat"
            >
              x
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="bg-[linear-gradient(180deg,rgba(97,81,36,0.72),rgba(68,56,26,0.82))] px-5 py-8">
              <div className="rounded-[22px] border border-white/10 bg-[rgba(18,14,12,0.26)] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#ead7a3]">
                  WhatsApp support
                </p>
                <p className="mt-4 text-sm leading-[1.8] text-white/88">
                  Use WhatsApp to connect with the church team quickly for updates
                  and donation follow-up.
                </p>
              </div>
            </div>

            <div className="bg-white px-5 py-5 text-[#222]">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(97,81,36,0.92),rgba(68,56,26,0.96))] p-4">
                <div className="rounded-[24px] bg-white px-5 py-6 text-[#2c241d] shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
                  <p className="text-[1rem] leading-[1.75]">
                    We&apos;re available on WhatsApp every day from 09:00 to
                    22:00 IST. We&apos;d love to hear from you.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5aa497] px-6 py-3 text-base font-medium text-white transition hover:bg-[#4b9487]"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-3 rounded-tl-[20px] rounded-tr-[6px] rounded-br-[6px] rounded-bl-[6px] border border-[#d4ba7b] bg-[#c7a95c] px-5 py-4 font-sans text-lg font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition hover:-translate-y-0.5 hover:bg-[#d6ba73]"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 9999,
        }}
        aria-label={isOpen ? "Close chat widget" : "Open chat widget"}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/14">
          <WhatsAppIcon />
        </span>
        <span>Restore &amp; Chat!</span>
      </button>
    </>
  );
}

export default FloatingChatButton;
