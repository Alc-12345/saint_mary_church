import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
import churchHome from "../assets/church-home.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  buildRestorationSections,
  restorationSections,
} from "../data/restorationGallery";
import { apiGet } from "../lib/api";

function sortByCreatedAtDesc(items = []) {
  return [...items].sort((first, second) => {
    const firstTime = new Date(
      first?.publishedAt || first?.updatedAt || first?.createdAt || 0,
    ).getTime();
    const secondTime = new Date(
      second?.publishedAt || second?.updatedAt || second?.createdAt || 0,
    ).getTime();
    return secondTime - firstTime;
  });
}

function getWrappedIndex(length, index) {
  return ((index % length) + length) % length;
}

function ImageCarousel({
  section,
  imageHeightClass = "h-[280px] md:h-[410px]",
  variant = "carousel",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex = getWrappedIndex(section.images.length, activeIndex - 1);
  const nextIndex = getWrappedIndex(section.images.length, activeIndex + 1);

  if (variant === "split") {
    return (
      <div className="mx-auto max-w-[1220px] rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-[8px] md:p-4">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[24px]">
            <Link
              to={`/restoration/${section.slug}/${previousIndex}`}
              className="group relative block overflow-hidden"
            >
              <img
                src={section.images[previousIndex]}
                alt={section.alt}
                className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.03] md:h-[550px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(64,42,28,0.08),rgba(64,42,28,0.2)_100%)]" />
            </Link>

            <button
              type="button"
              onClick={() => setActiveIndex(previousIndex)}
              className="absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(70,45,28,0.44)] text-[3.1rem] leading-none text-white backdrop-blur-[4px]"
              aria-label={`Show previous ${section.title} photo`}
            >
              {"\u2039"}
            </button>
          </div>

          <div className="relative overflow-hidden rounded-[24px]">
            <Link to={`/restoration/${section.slug}/${activeIndex}`} className="block">
              <img
                src={section.images[activeIndex]}
                alt={section.alt}
                className="h-[280px] w-full object-cover transition duration-300 hover:scale-[1.03] md:h-[550px]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(70,45,28,0.44)] text-[3.1rem] leading-none text-white backdrop-blur-[4px]"
              aria-label={`Show next ${section.title} photo`}
            >
              {"\u203A"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] rounded-[28px] bg-[rgba(255,255,255,0.04)] p-3 md:p-4">
      <div className="grid items-center gap-3 md:grid-cols-[110px_minmax(0,1fr)_110px]">
        <button
          type="button"
          onClick={() => setActiveIndex(previousIndex)}
          className="group relative hidden overflow-hidden rounded-[24px] md:block"
          aria-label={`Show previous ${section.title} photo`}
        >
          <img
            src={section.images[previousIndex]}
            alt={section.alt}
            className={`w-full object-cover opacity-75 transition group-hover:opacity-100 ${imageHeightClass}`}
          />
          <span className="absolute inset-y-0 left-0 flex w-14 items-center justify-center bg-[linear-gradient(90deg,rgba(17,12,8,0.78),transparent)] text-5xl text-white">
            {"\u2039"}
          </span>
        </button>

        <div className="relative overflow-hidden rounded-[24px]">
          <Link to={`/restoration/${section.slug}/${activeIndex}`}>
            <img
              src={section.images[activeIndex]}
              alt={section.alt}
              className={`w-full object-cover transition hover:scale-[1.02] ${imageHeightClass}`}
            />
          </Link>

          <button
            type="button"
            onClick={() => setActiveIndex(previousIndex)}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[rgba(17,12,8,0.55)] text-4xl text-white md:hidden"
            aria-label={`Show previous ${section.title} photo`}
          >
            {"\u2039"}
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[rgba(17,12,8,0.55)] text-4xl text-white md:hidden"
            aria-label={`Show next ${section.title} photo`}
          >
            {"\u203A"}
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(180deg,transparent,rgba(17,12,8,0.82))] px-4 py-4 md:px-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[#e1c995]">
              Tap photo to open
            </p>
            <p className="text-sm uppercase tracking-[0.22em] text-white/75">
              {activeIndex + 1} / {section.images.length}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex(nextIndex)}
          className="group relative hidden overflow-hidden rounded-[24px] md:block"
          aria-label={`Show next ${section.title} photo`}
        >
          <img
            src={section.images[nextIndex]}
            alt={section.alt}
            className={`w-full object-cover opacity-75 transition group-hover:opacity-100 ${imageHeightClass}`}
          />
          <span className="absolute inset-y-0 right-0 flex w-14 items-center justify-center bg-[linear-gradient(270deg,rgba(17,12,8,0.78),transparent)] text-5xl text-white">
            {"\u203A"}
          </span>
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {section.images.map((image, index) => (
          <button
            key={`${section.slug}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 overflow-hidden rounded-[16px] transition ${
              index === activeIndex ? "opacity-100" : "opacity-85 hover:opacity-100"
            }`}
            aria-label={`Show photo ${index + 1} from ${section.title}`}
          >
            <img
              src={image}
              alt={section.alt}
              className="h-20 w-24 object-cover md:h-24 md:w-32"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Restoration() {
  const [sections, setSections] = useState(restorationSections);
  const canopySection = sections[0];
  const gazeboSection = sections[1];
  const extraSections = sections.slice(2);

  useEffect(() => {
    apiGet("/restoration")
      .then((response) => {
        setSections(buildRestorationSections(sortByCreatedAtDesc(response.data || [])));
      })
      .catch((error) => {
        console.error("Unable to load restoration updates:", error);
      });
  }, []);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1d1712] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,9,7,0.54),rgba(12,9,7,0.42)_30%,rgba(12,9,7,0.65)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_30%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1380px] px-4 pb-0 pt-28 sm:px-6 md:px-8 md:pt-36">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-6 py-10 text-center shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] md:px-10 md:py-12"
          >
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
                Renewal Journey
              </p>
              <h1 className="mt-4 text-[2.6rem] font-normal leading-none tracking-[-0.03em] md:text-[4rem]">
                Restoration Progress
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
                See how Saint Mary&apos;s Church is being protected, rebuilt, and
                sustained through faithful support and community resilience.
              </p>
            </div>
          </motion.div>

          <motion.div 
            custom="left"
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="mt-8 rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8"
          >
            <div className="pb-6 text-center md:pb-8">
              <div>
                <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  Featured Update
                </p>
                <h2 className="mt-4 text-[2.2rem] font-normal leading-tight md:text-[3.2rem]">
                  {canopySection.title}
                </h2>
              </div>
            </div>

            <ImageCarousel section={canopySection} variant="split" />

            <div className="mx-auto max-w-[1120px] px-2 pb-2 pt-8 text-center md:px-6">
              <div>
                <p className="text-[1.08rem] leading-[1.85] text-white/86 md:text-[1.24rem]">
                  {canopySection.description}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom="right"
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="mt-8 rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8"
          >
            <div className="pb-6 text-center md:pb-8">
              <div>
                <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  Community Initiative
                </p>
                <h2 className="mt-4 text-[2rem] font-normal leading-tight md:text-[3rem]">
                  {gazeboSection.title}
                </h2>
              </div>
            </div>

            <ImageCarousel
              section={gazeboSection}
              imageHeightClass="h-[270px] md:h-[390px]"
              variant="split"
            />

            <div className="mx-auto max-w-[1120px] px-2 pb-2 pt-8 text-center md:px-6">
              <div>
                <p className="text-[1.08rem] leading-[1.85] text-white/86 md:text-[1.24rem]">
                  {gazeboSection.description}
                </p>
              </div>
            </div>
          </motion.div>

          {extraSections.map((section, index) => (
            <motion.div
              key={section.slug}
              custom={index % 2 === 0 ? "left" : "right"}
              variants={slideInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="mt-8 rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8"
            >
              <div className="pb-6 text-center md:pb-8">
                <div>
                  <p className="text-[0.8rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                    Restoration Update
                  </p>
                  <h2 className="mt-4 text-[2rem] font-normal leading-tight md:text-[3rem]">
                    {section.title}
                  </h2>
                </div>
              </div>

              <ImageCarousel
                section={section}
                imageHeightClass="h-[270px] md:h-[390px]"
                variant="split"
              />

              <div className="mx-auto max-w-[1120px] px-2 pb-2 pt-8 text-center md:px-6">
                <p className="text-[1.08rem] leading-[1.85] text-white/86 md:text-[1.24rem]">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-14 md:pt-18">
          <Footer className="bg-[rgba(17,12,8,0.35)]" />
        </div>
      </div>
    </section>
  );
}

export default Restoration;
