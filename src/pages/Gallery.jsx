import { Link } from "react-router-dom";
import churchHero from "../assets/church-home.avif";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { buildGallerySections, gallerySections } from "../data/galleryData";
import { apiGet } from "../lib/api";

function getCardClasses(sectionLayout, index, totalItems) {
  if (sectionLayout === "featured") {
    if (index === 0) {
      return "md:col-span-2 min-h-[18rem] md:min-h-[34rem]";
    }

    if (index === 1) {
      return "md:col-span-2 min-h-[20rem] md:min-h-[32rem]";
    }

    if (index === totalItems - 1) {
      return "md:col-span-2 min-h-[14rem] md:min-h-[22rem]";
    }

    return "md:col-span-1 min-h-[16rem] md:min-h-[25rem]";
  }

  if (index === 0) {
    return "md:col-span-2 min-h-[16rem] md:min-h-[24rem]";
  }

  return "md:col-span-1 min-h-[15rem] md:min-h-[20rem]";
}

function GallerySectionHeader({ title, subtitle }) {
  return (
    <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(19,12,8,0.82),rgba(19,12,8,0.7))] px-5 py-10 text-center text-white md:px-8 md:py-12">
      <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#e2c98d] md:text-[0.86rem]">
        Saint Mary&apos;s Church
      </p>
      <h1 className="mt-4 text-[2.45rem] font-normal italic leading-none tracking-[-0.03em] md:text-[4rem]">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-3xl text-base italic text-white/82 md:text-[1.25rem]">
        {subtitle}
      </p>
    </div>
  );
}

function GalleryCard({ item, sectionSlug, sectionLayout, index, totalItems }) {
  const cardClasses = getCardClasses(sectionLayout, index, totalItems);

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1e1712] shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.3)] ${cardClasses}`}
    >
      {item.type === "video" ? (
        <>
          <video
            src={item.src}
            poster={item.poster}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,12,8,0.08),rgba(17,12,8,0.22)_60%,rgba(17,12,8,0.42)_100%)]" />
          <Link
            to={`/gallery/${sectionSlug}/${index}`}
            className="absolute inset-0"
            aria-label="Open gallery video"
          />
          <div className="pointer-events-none absolute right-4 top-0   rounded-full border border-white/10 bg-[rgba(17,12,8,0.7)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white">
            Video
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 py-5 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ead7a3]">
              Featured video
            </p>
          </div>
        </>
      ) : (
        <Link to={`/gallery/${sectionSlug}/${index}`} className="block h-full w-full">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,12,8,0.03),rgba(17,12,8,0.14)_58%,rgba(17,12,8,0.38)_100%)]" />
        </Link>
      )}
    </article>
  );
}

function GallerySection({ section }) {
  return (
    <div className="mb-12 rounded-[34px] border border-white/10 bg-[rgba(23,16,12,0.52)] shadow-[0_28px_90px_rgba(0,0,0,0.2)] backdrop-blur-[10px] md:mb-16">
      <GallerySectionHeader title={section.title} subtitle={section.subtitle} />
      <div className="grid grid-cols-1 gap-5 px-3 py-5 md:grid-cols-2 md:gap-6 md:px-5 md:py-6">
        {section.previewItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            sectionSlug={section.slug}
            sectionLayout={section.layout}
            index={index}
            totalItems={section.previewItems.length}
          />
        ))}
      </div>
    </div>
  );
}

function Gallery() {
  const [sections, setSections] = useState(gallerySections);

  useEffect(() => {
    apiGet("/gallery")
      .then((response) => {
        setSections(buildGallerySections(response.data || []));
      })
      .catch((error) => {
        console.error("Unable to load public gallery items:", error);
      });
  }, []);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#18110b] font-serif">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${churchHero})` }}
      />
      <div className="absolute inset-0 bg-[rgba(14,10,7,0.42)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_30%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1380px] px-4 pb-0 pt-28 md:px-6 md:pt-36">
          <div className="mb-10 rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(19,12,8,0.78),rgba(19,12,8,0.52))] px-6 py-10 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-[12px] md:mb-14 md:px-10 md:py-12">
            <p className="text-[0.78rem] uppercase tracking-[0.36em] text-[#ead7a3] md:text-[0.9rem]">
              Photo Archive
            </p>
            <h1 className="mt-4 text-[2.6rem] font-normal italic leading-none tracking-[-0.03em] md:text-[4.4rem]">
              Gallery
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
              A visual journey through Saint Mary&apos;s Church before and after
              the fire, preserving moments of beauty, loss, and resilience.
            </p>
          </div>

          {sections.map((section) => (
            <GallerySection key={section.slug} section={section} />
          ))}
        </div>

        <Footer
          className="bg-[rgba(17,12,8,0.58)]"
          dividerClassName="bg-[rgba(66,54,41,0.9)]"
        />
      </div>
    </section>
  );
}

export default Gallery;
