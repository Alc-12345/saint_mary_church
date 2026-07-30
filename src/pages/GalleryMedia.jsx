import { Link, Navigate, useParams } from "react-router-dom";
import churchHero from "../assets/church-home.avif";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getGallerySection } from "../data/galleryData";
import { apiGet } from "../lib/api";

function getWrappedIndex(length, index) {
  return ((index % length) + length) % length;
}

function ArrowButton({ direction, to }) {
  return (
    <Link
      to={to}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(27,19,14,0.58)] text-3xl text-white transition hover:bg-[rgba(27,19,14,0.82)]"
      aria-label={direction === "prev" ? "Previous media" : "Next media"}
    >
      {direction === "prev" ? "<" : ">"}
    </Link>
  );
}

function ActiveMedia({ item, title }) {
  if (item.type === "video") {
    return (
      <div className="relative h-[46vh] overflow-hidden rounded-[24px] bg-[#110d0a] md:h-[72vh]">
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="h-[46vh] w-full rounded-[24px] object-cover md:h-[72vh]"
    />
  );
}

function GalleryMedia() {
  const { sectionSlug, mediaIndex } = useParams();
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    apiGet("/gallery")
      .then((response) => {
        setGalleryItems(response.data || []);
      })
      .catch((error) => {
        console.error("Unable to load gallery media:", error);
      });
  }, []);

  const section = getGallerySection(sectionSlug, galleryItems);

  if (!section) {
    return <Navigate to="/gallery" replace />;
  }

  const parsedIndex = Number(mediaIndex);
  const activeIndex = Number.isNaN(parsedIndex)
    ? 0
    : getWrappedIndex(section.media.length, parsedIndex);
  const activeItem = section.media[activeIndex];
  const previousIndex = getWrappedIndex(section.media.length, activeIndex - 1);
  const nextIndex = getWrappedIndex(section.media.length, activeIndex + 1);
  const thumbnailGridClass =
    section.slug === "after-fire" ? "grid-cols-5" : "grid-cols-2";

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#140f0c] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${churchHero})` }}
      />
      <div className="absolute inset-0 bg-[rgba(23,17,13,0.76)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1440px] px-0 pb-8 pt-28 md:px-35 md:pb-12 md:pt-36">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              to="/gallery"
              className="mt-6 text-sm uppercase tracking-[0.28em] text-[#d8c6a0] transition hover:text-white"
            >
              Back to gallery
            </Link>
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              {activeIndex + 1} / {section.media.length}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
                <ArrowButton
                  direction="prev"
                  to={`/gallery/${section.slug}/${previousIndex}`}
                />
                <div className="text-center">
                  <h1 className="text-xl leading-tight md:text-[2rem]">
                    {section.title}
                  </h1>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#d8c6a0]">
                    {section.subtitle}
                  </p>
                </div>
                <ArrowButton
                  direction="next"
                  to={`/gallery/${section.slug}/${nextIndex}`}
                />
              </div>

              <div className="px-4 pb-4 md:px-8 md:pb-8">
                <ActiveMedia item={activeItem} title={section.title} />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d8c6a0]">
                All media
              </p>
              <div
                className={`grid max-h-[72vh] ${thumbnailGridClass} gap-4 overflow-y-auto pr-2`}
              >
                {section.media.map((item, index) => (
                  <Link
                    key={`${section.slug}-${item.id}`}
                    to={`/gallery/${section.slug}/${index}`}
                    className={`relative overflow-hidden rounded-[18px] border transition ${
                      index === activeIndex
                        ? "border-[#d8c6a0]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    {item.type === "video" ? (
                      <>
                        <img
                          src={item.poster}
                          alt="Gallery video preview"
                          loading="lazy"
                          decoding="async"
                          className="h-36 w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(17,12,8,0.35)] text-xs uppercase tracking-[0.24em] text-white">
                          Video
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-36 w-full object-cover"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer className="bg-[rgba(17,12,8,0.35)]" />
      </div>
    </section>
  );
}

export default GalleryMedia;
