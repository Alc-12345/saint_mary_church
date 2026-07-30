import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import churchHome from "../assets/church-home.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getRestorationSection } from "../data/restorationGallery";
import { apiGet } from "../lib/api";

function getWrappedIndex(length, index) {
  return ((index % length) + length) % length;
}

function ArrowButton({ direction, to }) {
  return (
    <Link
      to={to}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(27,19,14,0.58)] text-3xl text-white transition hover:bg-[rgba(27,19,14,0.82)]"
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
    >
      {direction === "prev" ? "‹" : "›"}
    </Link>
  );
}

function RestorationPhoto() {
  const { sectionSlug, photoIndex } = useParams();
  const navigate = useNavigate();
  const [restorationItems, setRestorationItems] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    apiGet("/restoration")
      .then((response) => {
        setRestorationItems(response.data || []);
      })
      .catch((error) => {
        console.error("Unable to load restoration photos:", error);
      })
      .finally(() => {
        setHasLoaded(true);
      });
  }, []);

  const section = getRestorationSection(sectionSlug, restorationItems);

  if (!section && !hasLoaded) {
    return null;
  }

  if (!section) {
    return <Navigate to="/restoration" replace />;
  }

  const parsedIndex = Number(photoIndex);
  const activeIndex = Number.isNaN(parsedIndex)
    ? 0
    : getWrappedIndex(section.images.length, parsedIndex);
  const activeImage = section.images[activeIndex];
  const previousIndex = getWrappedIndex(section.images.length, activeIndex - 1);
  const nextIndex = getWrappedIndex(section.images.length, activeIndex + 1);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#140f0c] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="absolute inset-0 bg-[rgba(23,17,13,0.76)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-28 md:px-10 md:pb-12 md:pt-36">
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                  return;
                }

                navigate("/restoration");
              }}
              className="mt-6 text-sm uppercase tracking-[0.28em] text-[#d8c6a0] transition hover:text-white "
            >
              Back to restoration
            </button>
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              {activeIndex + 1} / {section.images.length}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
                <ArrowButton
                  direction="prev"
                  to={`/restoration/${section.slug}/${previousIndex}`}
                />
                <h1 className="text-center text-xl leading-tight md:text-[2rem]">
                  {section.title}
                </h1>
                <ArrowButton
                  direction="next"
                  to={`/restoration/${section.slug}/${nextIndex}`}
                />
              </div>

              <div className="px-4 pb-4 md:px-8 md:pb-8">
                <img
                  src={activeImage}
                  alt={section.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-[46vh] w-full rounded-[24px] object-cover md:h-[72vh]"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d8c6a0]">
                All photos
              </p>
              <div className="grid max-h-[72vh] grid-cols-2 gap-4 overflow-y-auto pr-2">
                {section.images.map((image, index) => (
                  <Link
                    key={`${section.slug}-${index}`}
                    to={`/restoration/${section.slug}/${index}`}
                    className={`overflow-hidden rounded-[18px] border transition ${
                      index === activeIndex
                        ? "border-[#d8c6a0]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image}
                      alt={section.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-36 w-full object-cover"
                    />
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

export default RestorationPhoto;
