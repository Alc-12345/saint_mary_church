import { Link } from "react-router-dom";
import qrImage from "../assets/scanner.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const donateBg =
  "https://static.wixstatic.com/media/a94c8f_921a96c0bec846a7936d53b8bb8d07e0~mv2.jpg/v1/fill/w_980,h_651,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a94c8f_921a96c0bec846a7936d53b8bb8d07e0~mv2.jpg";

const donationUseCases = [
  {
    title: "Help Rebuild the Church",
    detail:
      "Your donation helps restore the church roof, damaged structure, and important parts of the building affected by the fire.",
  },
  {
    title: "Support Worship Spaces",
    detail:
      "Your support also helps bring back seating, fittings, and worship spaces so the congregation can continue gathering in faith.",
  },
  {
    title: "Provide Urgent Protection",
    detail:
      "Funds are also used for safety work, temporary protection, and urgent repairs needed while restoration is still in progress.",
  },
];

const donorGuidelines = [
  "Anyone who wishes to support Saint Mary's Church can donate using the options on this page.",
  "After donating, you can share your name, email, and payment details through the chat so the church can confirm your contribution.",
  "If you need help before donating, you can use the chat button or contact the church team directly for guidance.",
];

function Donate() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#2b2f34] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${donateBg})` }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(171,182,193,0.18),rgba(36,31,28,0.48)_18%,rgba(24,20,18,0.66)_48%,rgba(18,15,13,0.74)_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.1),transparent_28%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1380px] px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pb-0 md:pt-36">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-5 py-8 shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
            <p className="text-center text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Support The Restoration
            </p>
            <h1 className="mx-auto mt-4 max-w-5xl text-center text-[2rem] font-normal leading-[1.12] tracking-[-0.03em] sm:text-[2.4rem] md:text-[4rem]">
              Kindling Hope: Stand with Saint Mary&apos;s Church in the Wake of
              the Fire Tragedy
            </h1>

            <div className="mx-auto mt-8 max-w-5xl space-y-6 text-[0.98rem] leading-[1.8] text-white/88 sm:text-[1.05rem] md:mt-10 md:space-y-8 md:text-[1.22rem]">
              <p>
                In the wake of a tragic fire that engulfed Saint Mary&apos;s
                Church, our beloved sanctuary stands in ruins, its once vibrant
                halls now shrouded in ash and sorrow. Yet, amidst this
                devastation, our faith remains unshaken, and our resolve
                undiminished to bring back its former glory.
              </p>

              <p>
                Now, more than ever, we turn to you, seeking your generous
                support to help us rise from the ashes. Your contributions will
                not only aid in the physical reconstruction of our cherished
                church but will also enable us to continue our vital mission of
                serving those in need.
              </p>

              <p>
                With every donation, you become a beacon of hope, illuminating
                the path towards renewal and restoration. Your kindness will
                play an integral role in weaving the fabric of our collective
                story, as we come together to become stronger and more resilient
                than ever before.
              </p>

              <p>
                This is more than a call for donations; it&apos;s an invitation to
                become part of something greater, to leave an indelible mark on
                the history of Saint Mary&apos;s Church CNI. Together, let us turn
                tragedy into triumph, and sow the seeds of compassion and
                continuity that will endure for generations to come.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/donate/details"
                className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#24170d] transition hover:bg-[#e2c98d]"
              >
                Start Donation
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
            <p className="text-center text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Ways To Contribute
            </p>
            <h2 className="mt-4 text-center text-[2rem] font-semibold leading-tight sm:text-[2.4rem] md:text-[4rem] md:leading-none">
              Ways you can donate:
            </h2>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-2 md:gap-10">
              <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-6 md:rounded-[30px] md:py-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-[rgba(255,255,255,0.04)]">
                    <div className="h-10 w-10 rounded-full border border-white/80" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] text-[#ead7a3]">
                      01
                    </p>
                    <h3 className="mt-2 text-[1.9rem] font-normal sm:text-[2.2rem] md:text-[2.4rem]">
                      In Person
                    </h3>
                    <div className="mt-5 h-[3px] w-10 bg-[#ead7a3]" />
                  </div>
                </div>

                <p className="mt-6 text-[1rem] leading-[1.8] text-white/86 md:mt-8 md:text-[1.16rem]">
                  Your presence and support mean a lot to us. You can visit us
                  in person and make your contribution at our church office. We
                  would love to express our gratitude in person and show you the
                  impact of your donation.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-6 md:rounded-[30px] md:py-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-[rgba(255,255,255,0.04)]">
                    <div className="grid h-10 w-10 grid-cols-2 gap-1">
                      <span className="border border-white/80" />
                      <span className="border border-white/80" />
                      <span className="border border-white/80" />
                      <span className="border border-white/80" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] text-[#ead7a3]">
                      02
                    </p>
                    <h3 className="mt-2 text-[1.9rem] font-normal sm:text-[2.2rem] md:text-[2.4rem]">
                      Online
                    </h3>
                    <div className="mt-5 h-[3px] w-10 bg-[#ead7a3]" />
                  </div>
                </div>

                <p className="mt-6 text-[1rem] leading-[1.8] text-white/86 md:mt-8 md:text-[1.16rem]">
                  For your convenience, we have provided an online platform
                  where you can securely make your donations. Your online
                  donations will directly contribute to the restoration and
                  rebuilding of Saint Mary&apos;s Church CNI.
                </p>

                <Link
                  to="/donate/details"
                  className="mt-8 inline-flex rounded-full border border-white/15 bg-[rgba(255,255,255,0.08)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#ead7a3] transition hover:border-[#ead7a3] hover:text-white"
                >
                  Fill details & pay
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="rounded-[26px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-[10px] sm:px-5 md:rounded-[30px] md:px-6 md:py-8">
              <h3 className="text-center text-[1.9rem] font-normal sm:text-[2.1rem] md:text-[2.3rem]">
                Via UPI
              </h3>
              <p className="mt-8 max-w-full break-all rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-4 text-center text-[0.94rem] font-semibold leading-[1.7] underline decoration-white/50 underline-offset-4 sm:text-[1.02rem] md:mt-10 md:text-[1.12rem]">
                stmaryschurch.62823377@hdfcbank
              </p>
              <p className="mt-8 text-[0.98rem] leading-[1.9] text-white/86 sm:text-[1.04rem] md:mt-10 md:text-[1.12rem]">
                <span className="font-semibold text-white">Important Note:</span>{" "}
                We would appreciate it if you could click on the chat and notify
                us about your donation. This will allow us to tally it back to
                you with the receipt. Please mention your name and email, and
                feel free to include any queries you may have. Thank you.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-7 text-center shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-[10px] sm:px-5 md:rounded-[30px] md:px-6 md:py-8">
              <h3 className="text-[1.9rem] font-normal sm:text-[2.1rem] md:text-[2.3rem]">
                Via QR Code
              </h3>
              <div className="mx-auto mt-8 max-w-[220px] rounded-[24px] bg-white p-3 text-[#1b1b1b] shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:max-w-[240px] md:mt-10 md:max-w-[260px] md:p-4">
                <img
                  src={qrImage}
                  alt="Saint Mary's Church QR code"
                  className="h-auto w-full rounded-[12px]"
                />
              </div>
              <p className="mt-8 text-left text-[0.98rem] leading-[1.9] text-white/86 sm:text-[1.04rem] md:mt-10 md:text-[1.12rem]">
                <span className="font-semibold text-white">Important Note:</span>{" "}
                We would appreciate it if you could click on the chat and notify
                us about your donation. This will allow us to tally it back to
                you with the receipt. Please mention your name and email, and
                feel free to include any queries you may have. Thank you.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-[10px] sm:px-5 md:rounded-[30px] md:px-6 md:py-8">
              <h3 className="text-center text-[1.9rem] font-normal sm:text-[2.1rem] md:text-[2.3rem]">
                Via Bank Transfer
              </h3>
              <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-5 text-[0.98rem] leading-[1.75] text-white/88 sm:text-[1.04rem] md:mt-10 md:text-[1.12rem]">
                <p>
                  <span className="font-semibold text-white">Name:</span> ST
                  MARY S CHURCH
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Account Number:
                  </span>
                  50200095943511
                </p>
                <p>
                  <span className="font-semibold text-white">IFSC Code -</span>
                  HDFC0000205
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Account Type:
                  </span>
                  Current Account
                </p>
                <p>HDFC Bank Suchana Kendra, Ajmer</p>
              </div>

              <p className="mt-8 text-[0.98rem] leading-[1.9] text-white/86 sm:text-[1.04rem] md:mt-10 md:text-[1.12rem]">
                <span className="font-semibold text-white">Disclaimer:</span>
                International transactions outside of India are not allowed. If
                you wish to donate, please reach out to us with your query, and
                we will guide you. Alternatively, you can send your donation to
                your relatives residing in India, who can then forward it to us.
                We appreciate your support. Thank you.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
            <p className="text-center text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              For Every Donor
            </p>
            <h2 className="mt-4 text-center text-[2.4rem] font-semibold leading-none md:text-[3.4rem]">
              Your donation directly helps
            </h2>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
              {donationUseCases.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
                >
                  <h3 className="text-[1.5rem] font-normal text-white">
                    {item.title}
                  </h3>
                  <div className="mt-4 h-[3px] w-10 bg-[#ead7a3]" />
                  <p className="mt-5 text-[1.02rem] leading-[1.8] text-white/84 md:text-[1.08rem]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
            <div className="rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
              <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                Donor Information
              </p>
              <h2 className="mt-4 text-[2.1rem] font-semibold leading-tight md:text-[2.8rem]">
                Anyone can donate from here
              </h2>

              <div className="mt-8 space-y-5">
                {donorGuidelines.map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-5 text-[1.02rem] leading-[1.8] text-white/84 md:text-[1.08rem]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12">
              <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                Donation Support
              </p>
              <h2 className="mt-4 text-[2.1rem] font-semibold leading-tight md:text-[2.8rem]">
                Simple and clear giving
              </h2>

              <div className="mt-8 rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-6">
                <p className="text-[1.04rem] leading-[1.85] text-white/84 md:text-[1.1rem]">
                  Whether you are a church member, a friend, a well-wisher, or
                  a first-time visitor, you can contribute from this page using
                  UPI, QR code, bank transfer, or in-person support. Every
                  amount makes a meaningful difference.
                </p>
              </div>

              <div className="mt-6 rounded-[26px] border border-[#ead7a3]/30 bg-[rgba(234,215,163,0.08)] px-5 py-6">
                <p className="text-[1rem] leading-[1.8] text-white/88 md:text-[1.08rem]">
                  Need help before donating? Use the <span className="font-semibold text-white">Restore &amp; Chat</span> button to
                  contact the church team for guidance.
                </p>
              </div>
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

export default Donate;
