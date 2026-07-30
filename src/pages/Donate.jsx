import { useState } from "react";
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
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

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

        <div className="mx-auto max-w-[1380px] px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pb-0 md:pt-44">
          <div className="mb-10 flex justify-center md:mb-14">
            <button
              
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-10 py-5 text-sm font-bold uppercase tracking-[0.24em] text-[#24170d] shadow-[0_10px_30px_rgba(209,176,109,0.3)] transition hover:bg-[#e2c98d] hover:shadow-[0_10px_40px_rgba(209,176,109,0.45)] sm:px-12 sm:text-base md:px-16 md:py-6 md:text-[1.1rem]"
            >
              Start Donation
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-5 py-8 shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12 flex flex-col justify-between">
              <div>
                <p className="text-center text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                  Support The Restoration
                </p>
                <h1 className="mx-auto mt-4 max-w-5xl text-center text-[2rem] font-normal leading-[1.12] tracking-[-0.03em] sm:text-[2.4rem] md:text-[3.2rem]">
                  Kindling Hope: Stand with Saint Mary&apos;s Church in the Wake of
                  the Fire Tragedy
                </h1>

                <div className="mx-auto mt-8 max-w-5xl space-y-6 text-[0.98rem] leading-[1.8] text-white/88 sm:text-[1.05rem] md:mt-10 md:space-y-8 md:text-[1.12rem]">
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
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-5 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] sm:px-6 md:rounded-[34px] md:px-10 md:py-12 flex flex-col justify-between">
              <div>
                <p className="text-center text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                  Ways To Contribute
                </p>
                <h2 className="mt-4 text-center text-[2rem] font-semibold leading-tight sm:text-[2.4rem] md:text-[3.2rem] md:leading-none">
                  Ways you can donate:
                </h2>

                <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:mt-14 md:gap-10">
                  <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-6 md:rounded-[30px] md:py-8">
                    <div className="flex items-start gap-5">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-[rgba(255,255,255,0.04)] shrink-0">
                        <div className="h-10 w-10 rounded-full border border-white/80" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-[0.2em] text-[#ead7a3]">
                          01
                        </p>
                        <h3 className="mt-2 text-[1.9rem] font-normal sm:text-[2.2rem]">
                          In Person
                        </h3>
                        <div className="mt-5 h-[3px] w-10 bg-[#ead7a3]" />
                      </div>
                    </div>

                    <p className="mt-6 text-[1rem] leading-[1.8] text-white/86 md:mt-8 md:text-[1.12rem]">
                      Your presence and support mean a lot to us. You can visit us
                      in person and make your contribution at our church office. We
                      would love to express our gratitude in person and show you the
                      impact of your donation.
                    </p>
                  </div>

                  <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-6 md:rounded-[30px] md:py-8">
                    <div className="flex items-start gap-5">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-[rgba(255,255,255,0.04)] shrink-0">
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
                        <h3 className="mt-2 text-[1.9rem] font-normal sm:text-[2.2rem]">
                          Online
                        </h3>
                        <div className="mt-5 h-[3px] w-10 bg-[#ead7a3]" />
                      </div>
                    </div>

                    <p className="mt-6 text-[1rem] leading-[1.8] text-white/86 md:mt-8 md:text-[1.12rem]">
                      For your convenience, we have provided an online platform
                      where you can securely make your donations. Your online
                      donations will directly contribute to the restoration and
                      rebuilding of Saint Mary&apos;s Church CNI.
                    </p>

                    <button
                      onClick={() => setShowPaymentPopup(true)}
                      className="mt-8 inline-flex rounded-full border border-white/15 bg-[rgba(255,255,255,0.08)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#ead7a3] transition hover:border-[#ead7a3] hover:text-white"
                    >
                      View Payment Methods
                    </button>
                  </div>
                </div>
              </div>
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

      {/* Payment Details Popup Modal - Compact Premium Design */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay with glassmorphism blur */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPaymentPopup(false)}
          />

          {/* Modal Content - Unique Compact Design */}
          <div className="relative z-10 w-full max-w-[1050px] rounded-[30px] border border-[#d4af37]/30 bg-[#120e0a] p-1 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden animate-[float-cloud_0.5s_ease-out]">
            <div className="relative rounded-[26px] bg-[rgba(24,20,17,0.95)] px-6 py-8 md:px-8 md:py-10 backdrop-blur-2xl">
              
              {/* Close Button */}
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-[#d4af37] hover:text-[#1b140f] md:right-6 md:top-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-wide text-white md:text-3xl">Choose Your Payment Method</h2>
                <p className="mt-2 text-[0.95rem] text-[#d4af37]">Your generous support helps us restore Saint Mary's Church.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                {/* UPI Card */}
                <div className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center transition-all hover:border-[#d4af37]/40 hover:bg-white/[0.06]">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Via UPI</h3>
                    <p className="mt-5 w-full break-all rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-[0.95rem] font-medium tracking-wide text-[#d4af37] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                      stmaryschurch.62823377@hdfcbank
                    </p>
                  </div>
                  <p className="mt-5 text-[0.85rem] leading-relaxed text-white/60">
                    <span className="font-semibold text-white/80">Note:</span> Please notify us in the chat with your name and email after donating.
                  </p>
                </div>

                {/* QR Code Card - Highlighted */}
                <div className="group relative flex flex-col items-center justify-between rounded-2xl border border-[#d4af37]/50 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-6 text-center shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Via QR Code</h3>
                    <div className="mx-auto mt-4 w-[150px] rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                      <img src={qrImage} alt="Church QR code" className="h-auto w-full rounded-xl" />
                    </div>
                  </div>
                  <p className="mt-5 text-[0.85rem] leading-relaxed text-white/60">
                    <span className="font-semibold text-[#d4af37]">Recommended:</span> Scan using any UPI app to securely complete your donation.
                  </p>
                </div>

                {/* Bank Transfer Card */}
                <div className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center transition-all hover:border-[#d4af37]/40 hover:bg-white/[0.06]">
                  <div className="w-full">
                    <h3 className="text-xl font-semibold text-white">Bank Transfer</h3>
                    <div className="mt-5 w-full space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-4 text-left text-[0.85rem] text-white/90 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                      <p><span className="font-semibold text-[#d4af37] w-12 inline-block">Name:</span> ST MARY S CHURCH</p>
                      <p><span className="font-semibold text-[#d4af37] w-12 inline-block">A/C:</span> 50200095943511</p>
                      <p><span className="font-semibold text-[#d4af37] w-12 inline-block">IFSC:</span> HDFC0000205</p>
                      <p className="pt-2 text-[0.75rem] text-white/50">HDFC Bank Suchana Kendra, Ajmer</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[0.8rem] leading-relaxed text-white/50">
                    * International transactions outside of India are not allowed.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Donate;
