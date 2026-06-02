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
        <div className="relative md:hidden">
          <div className="flex w-full max-w-[320px] items-center justify-between rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(19,12,8,0.72),rgba(19,12,8,0.45))] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-[10px]">
          <Link
            to="/"
            className="pr-4 transition opacity-100 hover:opacity-90"
            onClick={handleClose}
          >
            <img
              src={churchLogo}
              alt="Saint Mary's Church logo"
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.05)] text-white transition hover:border-[#ead7a3] hover:text-[#ead7a3]"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`pointer-events-none absolute left-0 top-[calc(100%+12px)] w-full max-w-[258px] overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(18,11,8,0.92),rgba(18,11,8,0.82))] px-3 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-[12px] transition-all duration-300 ${
            isOpen
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="grid gap-1.5 font-serif text-[0.98rem] italic text-white">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleClose}
                className="rounded-2xl border border-transparent px-4 py-2.5 text-left transition hover:border-white/10 hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ead7a3]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between md:gap-6 md:rounded-full md:border md:border-white/16 md:bg-[linear-gradient(135deg,rgba(18,11,8,0.9),rgba(18,11,8,0.72))] md:px-6 md:py-4 md:shadow-[0_28px_80px_rgba(0,0,0,0.26)] md:backdrop-blur-[14px]">
          <Link
            to="/"
            className="shrink-0 transition opacity-100 hover:opacity-90"
          >
            <img
              src={churchLogo}
              alt="Saint Mary's Church logo"
              className="h-14 w-auto object-contain lg:h-16"
            />
          </Link>

          <div className="flex items-center justify-end gap-1 lg:gap-2 font-serif text-white md:text-[1rem] lg:text-[1.08rem] xl:text-[1.16rem] italic">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-4 py-2 text-center leading-tight transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ead7a3] lg:px-5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
