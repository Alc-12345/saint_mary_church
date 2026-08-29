import { useState } from "react";
import { Link } from "react-router-dom";
import churchLogo from "../assets/churchlogo-transparent.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/donate", label: "Donate" },
  { to: "/visit", label: "Visit Us" },
  { to: "/restoration", label: "Restoration Progress" },
  { to: "/documents", label: "Documents & Reports" },
  { to: "/history", label: "History & Chronicles" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(12,8,6,0.58),rgba(12,8,6,0.12)_72%,transparent)] px-4 py-5 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="relative w-full xl:hidden">
          <div className="flex w-full items-center justify-between rounded-[24px] border border-[#d4af37]/20 bg-[rgba(18,14,12,0.85)] px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <Link
              to="/"
              className="transition hover:opacity-80"
              onClick={handleClose}
            >
              <img
                src={churchLogo}
                alt="Saint Mary's Church logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] transition hover:bg-[#d4af37]/20"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`absolute left-0 top-[calc(100%+16px)] w-full overflow-hidden rounded-[24px] border border-[#d4af37]/20 bg-[rgba(18,14,12,0.95)] px-4 py-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 ${
              isOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 font-serif text-[1.05rem] text-white">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleClose}
                  className="rounded-xl border border-transparent px-5 py-3.5 text-left transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop Navbar */}
        <div className="hidden xl:flex xl:items-center xl:justify-center xl:gap-4 xl:rounded-full xl:border xl:border-white/16 xl:bg-[linear-gradient(135deg,rgba(18,11,8,0.9),rgba(18,11,8,0.72))] xl:px-8 xl:py-3 xl:shadow-[0_28px_80px_rgba(0,0,0,0.26)] xl:backdrop-blur-[14px]">
          <Link
            to="/"
            className="shrink-0 transition opacity-100 hover:opacity-90 flex items-center mr-8"
          >
            <img
              src={churchLogo}
              alt="Saint Mary's Church logo"
              className="h-14 w-auto object-contain lg:h-16"
            />
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-serif text-[1.08rem] text-white italic rounded-full px-4 py-2 text-center leading-tight transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ead7a3]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
