import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import church from "../assets/church-home.avif";
import { buildFundingCampaigns } from "../data/donationCampaigns";
import { apiGet } from "../lib/api";
import useSiteSettings from "../hooks/useSiteSettings";
import Footer from "./Footer";
import Navbar from "./Navbar";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN").format(amount);
}

// Reusable animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", type: "spring", bounce: 0.2 },
  },
};

function FundingCard({ campaign, index }) {
  const progress = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
  );
  const remainingAmount = Math.max(
    0,
    campaign.targetAmount - campaign.raisedAmount
  );
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const directions = ["left", "up", "down", "right"];
  const direction = directions[index % 4];

  return (
    <motion.article
      custom={direction}
      variants={slideInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="flex h-full w-full flex-col rounded-[30px] border border-[rgba(183,150,79,0.16)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(250,242,231,0.92))] p-6 text-left text-[#533c20] shadow-[0_20px_60px_rgba(83,61,28,0.09)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#9a7b43]">
            {campaign.purpose}
          </p>
          <h3 className="mt-3 text-[1.5rem] md:text-[1.65rem] font-normal leading-tight text-[#3e2b16] break-words">
            {campaign.title}
          </h3>
        </div>

        <div className="relative h-24 w-24 shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="-rotate-90 h-full w-full drop-shadow-[0_10px_24px_rgba(83,61,28,0.12)]"
          >
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(83,60,32,0.12)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none" stroke={campaign.accentColor}
              strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: strokeDashoffset }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-[1.35rem] font-semibold leading-none text-[#3e2b16]">
                {progress}%
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[#8a6d3f]">
                funded
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 flex-grow text-[1rem] leading-[1.8] text-[#6b5a44]">
        {campaign.description}
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.16em] text-[#8a6d3f]">
          <span>Raised</span>
          <span>Rs. {formatAmount(campaign.raisedAmount)}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-[rgba(83,60,32,0.1)]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${campaign.accentColor}, #efd7a8)` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-[#6b5a44]">
          <span>Target: Rs. {formatAmount(campaign.targetAmount)}</span>
          <span>Remaining: Rs. {formatAmount(remainingAmount)}</span>
        </div>
      </div>
    </motion.article>
  );
}

function Hero() {
  const [campaigns, setCampaigns] = useState([]);
  const [featuredDonors, setFeaturedDonors] = useState([]);
  const siteSettings = useSiteSettings();

  useEffect(() => {
    loadFeaturedDonors();
  }, []);

  const loadFeaturedDonors = async () => {
    try {
      const res = await apiGet("/donations?visible=true");
      setFeaturedDonors(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([apiGet("/donation-campaigns"), apiGet("/donations")])
      .then(([campaignResponse, donationResponse]) => {
        setCampaigns(
          buildFundingCampaigns(campaignResponse.data || [], donationResponse.data || [])
        );
      })
      .catch((error) => console.error("Unable to load live funding progress:", error));
  }, []);

  const overallTarget = 40000000;
  const overallRaised = 7453134.25;
  const overallProgress = (overallRaised / overallTarget) * 100;
  const overallCircumference = 2 * Math.PI * 42;
  const overallStrokeDashoffset = overallCircumference - (overallProgress / 100) * overallCircumference;

  const heroItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-x-hidden overflow-y-hidden bg-[#f7f2e9] font-serif">
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${church})` }} />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(19,12,8,0.48),rgba(19,12,8,0.2)_35%,rgba(244,237,226,0.16)_62%,rgba(244,237,226,0.12)_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(236,210,156,0.12),transparent_34%)]" />

      <div className="relative z-10">
        <Navbar />
        
        {/* HERO TOP SECTION */}
        <div className="relative flex min-h-[76vh] w-full flex-col justify-center overflow-hidden px-4 pb-8 pt-[116px] sm:px-6 md:min-h-[82vh] md:px-10 md:pt-[148px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mx-auto w-full max-w-[1360px] overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(135deg,rgba(31,21,14,0.7),rgba(31,21,14,0.44))] shadow-[0_35px_120px_rgba(10,7,5,0.35)] backdrop-blur-[8px]"
          >
              <div className="grid min-h-[58vh] items-center gap-8 px-5 py-10 text-white sm:gap-10 sm:px-6 md:min-h-[64vh] md:px-12 md:py-14 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8 lg:px-14">
                
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <motion.p variants={heroItem} className="text-[0.75rem] uppercase tracking-[0.38em] text-[#ead7a3] md:text-[0.92rem]">
                    Welcome to
                  </motion.p>
                  <motion.h1 variants={heroItem} className="mt-4 text-[2.2rem] font-normal leading-[1.1] tracking-[-0.03em] sm:text-[3.2rem] md:mt-5 md:text-[4.6rem] lg:text-[4.8rem]">
                    {siteSettings.homeHeadline || "Saint Mary's Church CNI, Ajmer"}
                  </motion.h1>
                  <motion.div variants={heroItem} className="mt-6 h-px w-20 bg-[rgba(234,215,163,0.72)] md:mt-8 md:w-36" />
                  <motion.p variants={heroItem} className="mt-6 max-w-2xl text-[1rem] leading-[1.7] text-white/82 sm:text-lg md:mt-8 md:text-[1.2rem]">
                    A place of prayer, heritage, and hope for Ajmer&apos;s faithful community.
                  </motion.p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }}
                  className="rounded-[24px] border border-white/10 bg-[rgba(255,248,238,0.08)] p-6 text-center text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:rounded-[28px] md:p-8 lg:text-left"
                >
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#ead7a3] md:text-[0.8rem]">Our Calling</p>
                  <p className="mt-4 text-[1rem] font-light leading-[1.7] md:mt-5 md:text-[1.18rem] md:leading-[1.8]">
                    Standing together to preserve a cherished spiritual home and support its renewal with faith, compassion, and generosity.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8 md:gap-4 lg:flex-row">
                    <Link to="/donate" className="w-full rounded-full border border-[#d1b06d] bg-[#d1b06d] px-7 py-3.5 text-center text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#24170d] transition hover:bg-[#e2c98d] hover:shadow-[0_8px_25px_rgba(209,176,109,0.3)] sm:w-auto md:text-sm">
                      Donate
                    </Link>
                    <Link to="/gallery" className="w-full rounded-full border border-white/25 bg-[rgba(255,255,255,0.04)] px-7 py-3.5 text-center text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-white transition hover:border-[#ead7a3] hover:text-[#ead7a3] sm:w-auto md:text-sm">
                      View Gallery
                    </Link>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col items-center rounded-[24px] border border-[#d1b06d]/20 bg-[rgba(209,176,109,0.06)] p-6 text-center text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:rounded-[28px] md:p-8"
                >
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#ead7a3] md:text-[0.8rem]">Overall Progress</p>
                  <div className="relative mt-5 h-40 w-40 shrink-0 md:mt-4 md:h-48 md:w-48">
                    <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full drop-shadow-[0_12px_28px_rgba(209,176,109,0.25)]">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="8" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none" stroke="#d1b06d" strokeWidth="8" strokeLinecap="round" strokeDasharray={overallCircumference}
                        initial={{ strokeDashoffset: overallCircumference }}
                        whileInView={{ strokeDashoffset: overallStrokeDashoffset }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-[1.5rem] font-semibold leading-none text-[#ead7a3] md:text-[1.8rem]">{(overallProgress).toFixed(1)}%</p>
                      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/60 md:text-[0.65rem]">Funded</p>
                    </div>
                  </div>
                  <div className="mt-5 w-full space-y-2 rounded-[18px] border border-white/5 bg-[rgba(255,255,255,0.04)] p-4 md:mt-4 md:rounded-2xl md:space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[1.1rem] font-medium tracking-wide text-white/80 md:text-[1.4rem]">Goal</span>
                      <span className="text-[1rem] font-semibold text-white/95 md:text-[1.15rem]">₹4,00,00,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[1.1rem] font-medium tracking-wide text-white/80 md:text-[1.4rem]">Collected</span>
                      <span className="text-[1rem] font-bold text-[#ead7a3] md:text-[1.15rem]">₹74,53,134</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
        </div>

        {/* MIDDLE SECTION - Fire Incident Note */}
        <div className="mt-0 w-full px-4 pb-0 sm:px-6 md:px-10">
          {/* Changed max-w-[1320px] to max-w-[1360px] */}
          <motion.div 
            variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
            className="mx-auto w-full max-w-[1360px] rounded-[30px] border border-[rgba(183,150,79,0.14)] bg-[rgba(255,252,247,0.9)] px-6 py-14 text-center text-[#b7964f] shadow-[0_24px_70px_rgba(83,61,28,0.1)] backdrop-blur-[8px] sm:px-10 md:px-14 md:py-20"
          >
            <p className="mx-auto max-w-5xl text-2xl leading-[1.45] md:text-[2.1rem]">
              Saint Mary&apos;s Church recently had a fire accident, but we are committed to rising from the ashes with your support.
            </p>
            <p className="mx-auto mt-10 max-w-4xl text-lg italic leading-[1.8] text-[#66615c] md:text-[1.25rem]">
              Saint Mary&apos;s Church, Ajmer is a place of hope and faith, and we are grateful for your willingness to stand with us in this time of need. Your contributions will help us restore our church and continue our mission of serving the community.
            </p>
          </motion.div>
        </div>

        {/* FUNDING PROGRESS SECTION */}
        <div className="w-full px-4 pb-0 pt-8 sm:px-6 md:px-10 md:pt-10">
          {/* Changed max-w-[1320px] to max-w-[1360px] */}
          <div className="mx-auto w-full max-w-[1360px] overflow-hidden rounded-[32px] border border-[rgba(183,150,79,0.16)] bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(245,236,224,0.9))] px-6 py-14 shadow-[0_24px_70px_rgba(83,61,28,0.1)] backdrop-blur-[8px] sm:px-10 md:px-14 md:py-16">
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-[#a48340]">Live Funding Progress</p>
                <h2 className="mt-4 text-3xl font-normal leading-tight text-[#533c20] md:text-[3.3rem]">See how each cause is progressing</h2>
                <p className="mt-5 text-[1.05rem] leading-[1.9] text-[#6b5a44] md:text-[1.15rem]">
                  The donation purposes managed from the admin dashboard are shown here with live progress, so visitors can clearly see how much has been raised and how much support is still needed for each cause.
                </p>
              </div>
              <Link to="/donate/details" className="inline-flex self-center rounded-full border border-[#b7964f] bg-[#b7964f] px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-[#9f7d49] md:self-auto">
                Choose Purpose
              </Link>
            </motion.div>

            {/* Grid for Cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {campaigns.map((campaign, index) => (
                <FundingCard key={campaign.id} campaign={campaign} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* DONORS SECTION */}
        {/* <div className="w-full px-4 pb-0 pt-8 sm:px-6 md:px-10 md:pt-10">
          <motion.div 
            variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}
            className="mx-auto w-full max-w-[1360px] rounded-[32px] border border-[rgba(183,150,79,0.16)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(250,242,231,0.92))] px-6 py-14 shadow-[0_20px_60px_rgba(83,61,28,0.08)] sm:px-10 md:px-14 md:py-16"
          >
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.32em] text-[#a48340]">Blessed Contributors</p>
              <h2 className="mt-4 text-4xl md:text-5xl text-[#533c20]">Our Generous Donors</h2>
              <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-[#6b5a44]">
                We are deeply grateful to everyone who has contributed towards the restoration and mission of Saint Mary's Church. Every donation strengthens our community and preserves our heritage.
              </p>
            </div>

            <div className="mt-10 h-[380px] overflow-y-auto pr-3">
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredDonors.map((donor, index) => (
                  <motion.div
                    custom={index % 2 === 0 ? "left" : "right"}
                    variants={slideInVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    key={donor._id}
                    className="flex h-full w-full flex-col rounded-[22px] border border-[#d8c29a] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d1b06d] text-2xl font-bold text-[#24170d]">
                          {donor.donor.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-[#3d2a16]">{donor.donor}</h3>
                          <p className="mt-1 text-[#8a6d3f]">{donor.purpose}</p>
                        </div>
                      </div>
                      <div className="rounded-full bg-[#d1b06d]/15 border border-[#d1b06d]/30 px-5 py-3">
                        <p className="text-sm uppercase tracking-widest text-[#8a6d3f]">Donated</p>
                        <h4 className="mt-1 text-lg font-bold text-[#3d2a16]">
                          ₹{Number(donor.amount).toLocaleString("en-IN")}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-6 flex-grow border-t border-[#ead7a3] pt-5">
                      <p className="leading-8 text-[#6b5a44]">
                        Thank you, <span className="font-semibold text-[#3d2a16]">{donor.donor}</span>, for supporting our <span className="font-semibold text-[#3d2a16]">{donor.purpose}</span>.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div> */}

        {/* FOOTER CALL TO ACTION */}
        <div className="w-full px-4 pb-0 pt-8 sm:px-6 md:px-10 md:pt-10">
          {/* Changed max-w-[1320px] to max-w-[1360px] */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} className="mx-auto w-full max-w-[1360px] overflow-hidden rounded-[30px] border border-[rgba(183,150,79,0.14)] bg-[rgba(252,252,252,0.97)] shadow-[0_24px_70px_rgba(83,61,28,0.1)]">
            <div className="grid gap-8 px-6 py-16 text-center text-[#b7964f] sm:px-10 md:grid-cols-[1fr_0.9fr] md:items-center md:px-14 md:py-20 md:text-left">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#a48340]">Support the Restoration</p>
                <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-normal leading-tight md:mx-0 md:text-[3.9rem]">
                  Support Saint Mary&apos;s Church, Ajmer
                </h2>
              </div>
              <div>
                <p className="mx-auto max-w-4xl text-[1.45rem] font-normal italic leading-[1.75] tracking-[-0.01em] text-[#7b6342] md:mx-0 md:text-[1.9rem]">
                  Your generosity will make a difference in our efforts to rebuild and continue our ministry. Every donation, no matter the amount, is deeply appreciated and will help us in our journey to recovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pt-14 md:pt-18">
          <Footer />
        </div>
      </div>
    </section>
  );
}

export default Hero;