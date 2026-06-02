import churchHome from "../assets/church-home.avif";

function Footer({ className = "", dividerClassName = "" }) {
  return (
    <>
      <div
        className={`h-[4px] w-full bg-[rgba(66,54,41,0.9)] shadow-[0_1px_0_rgba(255,255,255,0.22)] ${dividerClassName}`}
      />

      <footer
        className={`relative overflow-hidden bg-[rgba(14,10,8,0.84)] px-6 py-16 text-white sm:px-10 md:px-16 md:py-20 ${className}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-18"
          style={{ backgroundImage: `url(${churchHome})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,12,8,0.94),rgba(18,12,8,0.84))] backdrop-blur-[6px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_34%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-10 md:py-10">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-20">
          <div className="text-left">
            <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#ead7a3]">
              Saint Mary&apos;s Church
            </p>
            <p className="mt-4 max-w-xs text-[2rem] font-normal leading-[1.35] tracking-[-0.02em] text-white md:text-[2.35rem]">
              St. Mary&apos;s Church, Ajmer, Rajasthan
            </p>
            <p className="mt-8 text-base font-normal leading-none tracking-[-0.01em] text-white/95 md:text-[1.3rem]">
              &copy;2024 by Saint Mary&apos;s Church.
            </p>
          </div>

          <div className="text-left">
            <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#ead7a3]">
              Scripture
            </p>
            <p className="max-w-2xl text-base leading-[1.75] text-white/95 md:text-[1.1rem]">
              &quot;When you give to the needy, do not let your left hand know
              what your right hand is doing, so that your giving may be in
              secret. Then your Father, who sees what is done in secret, will
              reward you.&quot; - Matthew 6:3-4
            </p>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
