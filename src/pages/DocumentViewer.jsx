import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import churchHero from "../assets/church-home.avif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { buildPdfDocumentItems } from "../data/documentData";
import { apiGet } from "../lib/api";

function getWrappedIndex(length, index) {
  return ((index % length) + length) % length;
}

function ArrowButton({ direction, to }) {
  return (
    <Link
      to={to}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(27,19,14,0.58)] text-3xl text-white transition hover:bg-[rgba(27,19,14,0.82)]"
      aria-label={direction === "prev" ? "Previous document" : "Next document"}
    >
      {direction === "prev" ? "<" : ">"}
    </Link>
  );
}

function formatDocumentDate(value) {
  if (!value) return "Publish date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Publish date unavailable";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function DocumentViewer() {
  const { documentIndex } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    apiGet("/documents")
      .then((response) => {
        setDocuments(response.data || []);
      })
      .catch((error) => {
        console.error("Unable to load public documents:", error);
      });
  }, []);

  const pdfDocuments = useMemo(
    () => buildPdfDocumentItems(documents),
    [documents],
  );

  if (!pdfDocuments.length) {
    return <Navigate to="/documents" replace />;
  }

  const parsedIndex = Number(documentIndex);
  const activeIndex = Number.isNaN(parsedIndex)
    ? 0
    : getWrappedIndex(pdfDocuments.length, parsedIndex);
  const activeItem = pdfDocuments[activeIndex];
  const previousIndex = getWrappedIndex(pdfDocuments.length, activeIndex - 1);
  const nextIndex = getWrappedIndex(pdfDocuments.length, activeIndex + 1);
  const previewHref = `${activeItem.fileUrl}#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH`;

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#140f0c] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${churchHero})` }}
      />
      <div className="absolute inset-0 bg-[rgba(23,17,13,0.76)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="relative z-[60] mx-auto max-w-[1440px] px-4 pb-8 pt-32 md:px-8 md:pb-12 md:pt-44">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              to="/documents"
              className="relative z-[70] inline-flex text-sm uppercase tracking-[0.28em] text-[#d8c6a0] transition hover:text-white"
            >
              Back to documents
            </Link>
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              {activeIndex + 1} / {pdfDocuments.length}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
                <ArrowButton
                  direction="prev"
                  to={`/documents/${previousIndex}`}
                />
                <div className="text-center">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d8c6a0]">
                    Church Documents
                  </p>
                  <h1 className="mt-2 text-xl leading-tight md:text-[2rem]">
                    {activeItem.title}
                  </h1>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">
                    Published {formatDocumentDate(activeItem.publishedAt)}
                  </p>
                </div>
                <ArrowButton
                  direction="next"
                  to={`/documents/${nextIndex}`}
                />
              </div>

              <div className="px-4 pb-4 md:px-8 md:pb-8">
                <div className="overflow-hidden rounded-[24px] bg-[#110d0a]">
                  <iframe
                    src={previewHref}
                    title={activeItem.title}
                    className="h-[56vh] w-full border-0 md:h-[74vh]"
                  />
                </div>

                {activeItem.description ? (
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-5 py-4 text-[0.98rem] leading-[1.8] text-white/85">
                    <p>{activeItem.description}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] p-4">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d8c6a0]">
                All documents
              </p>
              <div className="grid max-h-[74vh] gap-4 overflow-y-auto pr-2">
                {pdfDocuments.map((item, index) => (
                  <Link
                    key={item.id}
                    to={`/documents/${index}`}
                    className={`overflow-hidden rounded-[18px] border transition ${
                      index === activeIndex
                        ? "border-[#d8c6a0]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="h-36 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,12,8,0.1),rgba(17,12,8,0.65))]" />
                      <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-[rgba(17,12,8,0.75)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white">
                        PDF
                      </div>
                      <div className="absolute inset-x-0 bottom-0 px-4 py-3 text-white">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#ead7a3]">
                          Preview
                        </p>
                        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/70">
                          {formatDocumentDate(item.publishedAt)}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    </div>
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

export default DocumentViewer;
