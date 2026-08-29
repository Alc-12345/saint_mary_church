import { motion } from "framer-motion";
import churchDonate from "../assets/visitus.avif";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
import Visitback from "../assets/visitbg.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSiteSettings from "../hooks/useSiteSettings";

function Visit() {
  const siteSettings = useSiteSettings();
  const contactPeople = [
    {
      name: "Dr. Pam Erickson",
      role: "{Secretary}",
      phone: siteSettings.donationPhone,
    },
    {
      name: "Captain A.M David",
      role: "{Treasurer}",
      phone: "+91 9413300075",
    },
  ];

  return (
    <section className="relative overflow-x-hidden bg-[#f5f1ea] font-serif text-[#4b453e]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${Visitback})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,189,128,0.1),transparent_28%)]" />

      <div className="relative z-10">
        <div
          className="relative overflow-hidden"
          style={{ backgroundImage: `url(${Visitback})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,15,8,0.48),rgba(26,15,8,0.2)_45%,rgba(245,241,234,0.08)_100%)]" />

          <Navbar />

          <div className="mx-auto max-w-[1320px] px-4 pb-8 pt-[112px] sm:px-6 md:px-8 md:pb-10 md:pt-[148px]">
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="rounded-[34px] border border-white/12 bg-[linear-gradient(135deg,rgba(19,12,8,0.76),rgba(19,12,8,0.5))] px-6 py-10 text-center text-white shadow-[0_32px_100px_rgba(0,0,0,0.24)] backdrop-blur-[10px] md:px-10 md:py-12"
            >
              <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                Connect With Us
              </p>
              <h1 className="mt-4 text-[2.6rem] font-normal italic leading-none tracking-[-0.03em] md:text-[4.4rem]">
                Visit Saint Mary&apos;s Church
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
                Find our location, connect with our church representatives, and
                stand with us in this journey of restoration and hope.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-4 pt-6 sm:px-6 md:px-8">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="relative overflow-hidden rounded-[34px] border border-[rgba(183,150,79,0.12)] shadow-[0_28px_90px_rgba(0,0,0,0.14)]"
          >
            <img
              src={churchDonate}
              alt="Saint Mary's Church interior"
              className="h-[240px] w-full object-cover object-[34%_0%] md:h-[620px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(43,24,11,0.1),rgba(43,24,11,0.06)_45%,rgba(43,24,11,0.24)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
              <div className="max-w-2xl rounded-[24px] border border-white/10 bg-[rgba(18,11,8,0.52)] px-5 py-5 backdrop-blur-[8px] md:px-7">
                <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  A Sacred Place
                </p>
                <p className="mt-3 text-lg italic leading-[1.7] text-white/88 md:text-[1.2rem]">
                  A welcoming place of prayer, heritage, and resilience in the
                  heart of Ajmer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-4 py-8 sm:px-6 md:px-8 md:py-10">
          <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-[1.08fr_0.92fr]">
            <motion.div 
              variants={slideRightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="rounded-[34px] border border-[rgba(183,150,79,0.14)] bg-[rgba(255,253,249,0.92)] px-6 py-10 shadow-[0_24px_80px_rgba(83,61,28,0.1)] backdrop-blur-[8px] md:px-10 md:py-12"
            >
              <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#b7964f]">
                Support Our Cause
              </p>
              <h2 className="mt-4 text-[2rem] font-normal leading-tight text-[#5f5a54] md:text-[2.6rem]">
                Support Our Cause:
              </h2>

              <p className="mt-10 max-w-[31rem] text-[1.02rem] italic leading-[1.8] text-[#6c6761] md:text-[1.08rem]">
                Welcome to the Donation and Fundraiser site for Saint Mary&apos;s
                Church CNI, which unfortunately suffered a fire accident. Your
                support and contributions will help us rebuild and continue
                serving our community.
              </p>

              <div className="mt-12 h-[3px] w-14 bg-[#b7964f]" />

              <p className="mt-12 max-w-[31rem] text-[1.02rem] italic leading-[1.8] text-[#6c6761] md:text-[1.08rem]">
                Every contribution counts and brings us closer to restoring our
                church to its former glory. We are grateful for your support.
                Join us in our efforts to rebuild and spread hope in the
                community.
              </p>
            </motion.div>

            <motion.div 
              variants={slideLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="grid gap-8"
            >
              <div className="rounded-[34px] border border-[rgba(183,150,79,0.14)] bg-[rgba(255,253,249,0.92)] px-6 py-10 text-center shadow-[0_24px_80px_rgba(83,61,28,0.1)] backdrop-blur-[8px] md:px-10 md:py-12">
                <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#b7964f]">
                  Contact Details
                </p>
                <h2 className="mt-4 text-[2.2rem] font-semibold leading-none text-[#b7964f] md:text-[2.6rem]">
                  Get in Touch
                </h2>
                <div className="mx-auto mt-8 h-[3px] w-10 bg-[#b7964f]" />

                <div className="mt-10 space-y-10 text-left md:px-7">
                  {contactPeople.map((person) => (
                    <div
                      key={person.name}
                      className="rounded-[24px] border border-[rgba(183,150,79,0.12)] bg-[rgba(249,244,235,0.88)] px-5 py-5 text-[1.05rem] italic leading-[1.6] text-[#2f2b28] md:text-[1.12rem]"
                    >
                      <p className="font-semibold">{person.name}</p>
                      <p className="font-semibold">{person.role}</p>
                      <p className="font-semibold">{person.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[34px] border border-[rgba(183,150,79,0.14)] bg-[rgba(255,253,249,0.92)] px-6 py-10 text-center shadow-[0_24px_80px_rgba(83,61,28,0.1)] backdrop-blur-[8px] md:px-10 md:py-12">
                <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#b7964f]">
                  Church Address
                </p>
                <h2 className="mt-4 text-[2.2rem] font-semibold leading-none text-[#b7964f] md:text-[2.6rem]">
                  Visit Us
                </h2>
                <div className="mx-auto mt-8 h-[3px] w-10 bg-[#b7964f]" />

                <div className="mt-10 rounded-[24px] border border-[rgba(183,150,79,0.12)] bg-[rgba(249,244,235,0.88)] px-5 py-5 text-left text-[1.05rem] italic leading-[1.7] text-[#6c6761] md:px-7 md:text-[1.12rem]">
                  <p className="font-semibold text-[#5f5a54]">
                    Saint Mary&apos;s Church CNI
                  </p>
                  <p className="font-semibold text-[#5f5a54]">
                    Pal Bichala, Ajmer, Rajasthan
                  </p>
                  <p className="mt-1 font-semibold text-[#5f5a54]">305001</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-4 pb-0 pt-2 sm:px-6 md:px-8">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="mx-auto overflow-hidden rounded-[34px] border border-[rgba(183,150,79,0.12)] bg-[#ece7dc] shadow-[0_24px_80px_rgba(83,61,28,0.1)] max-w-[1320px]"
          >
            <iframe
              title="Saint Mary's Church Ajmer map"
              src="https://www.google.com/maps?q=Saint%20Mary's%20Church%20CNI%20Ajmer&z=15&output=embed"
              className="h-[26rem] w-full border-0 md:h-[36rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        <div className="pt-14 md:pt-18">
          <Footer className="bg-[rgba(17,12,8,0.42)]" />
        </div>
      </div>
    </section>
  );
}

export default Visit;
