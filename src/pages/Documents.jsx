import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
import churchHome from "../assets/church-home.avif";
import reportCover from "../assets/image.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { buildPdfDocumentItems } from "../data/documentData";
import { apiGet } from "../lib/api";

const introParagraphs = [
  "A significant step forward in the restoration of Saint Mary's Church. This June 2024, INTACH Delhi provided a preliminary project report outlining the estimated costs and initial plans for this important project.",
  "To view the INTACH Delhi report and learn more about the restoration project, please click on the attached PDF viewer button.",
  "We are reaching out to all those who hold Saint Mary's Church dear. Your donations, of any amount, will be instrumental in bringing this beloved landmark back to its former glory. Please consider donating and sharing this message with your friends and family. Together, we can ensure the continued legacy of Saint Mary's Church.",
];

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

function PdfCard({ title, to, publishedAt, coverImage }) {
  return (
    <Link
      to={to}
      className="group mx-auto block max-w-[800px] overflow-hidden rounded-[28px] border border-white/10 bg-[#1e1712] shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
    >
      <div className="relative">
        <div className="pointer-events-none aspect-[4/3] w-full overflow-hidden bg-[#efe2c5]">
          <img
            src={coverImage || reportCover}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.12]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,12,8,0.04),rgba(17,12,8,0.14)_58%,rgba(17,12,8,0.62)_100%)]" />
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/10 bg-[rgba(17,12,8,0.7)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white">
          PDF
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-5 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-[#ead7a3]">
            PDF Preview
          </p>
          <p className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/75">
            Published {formatDocumentDate(publishedAt)}
          </p>
          <p className="mt-2 text-base italic leading-relaxed text-white md:text-[1.15rem]">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

function LetterPdfCard({ title, href }) {
  const previewHref =
    `${href}#toolbar=0&navpanes=0&scrollbar=0&pagemode=none` +
    `&page=1&view=FitH&zoom=page-fit`;

  return (
    <div className="mx-auto max-w-[760px] rounded-[30px] bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-5">
      <div className="overflow-hidden rounded-[24px] border border-[#eadfca] bg-[#f7f2e8]">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
          <iframe
            src={previewHref}
            title={`${title} letter preview`}
            scrolling="no"
            className="absolute inset-y-0 left-0 h-full w-[calc(100%+26px)] overflow-hidden border-0"
          />
        </div>
      </div>
    </div>
  );
}

function DocumentDescription({ description, publishedAt }) {
  if (!description && !publishedAt) return null;

  return (
    <div className="mx-auto mt-6 max-w-[980px] rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-6 py-8 text-center text-[1.05rem] leading-[1.85] text-white/88 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:px-10 md:text-[1.24rem]">
      <p className="mb-3 text-[0.78rem] uppercase tracking-[0.26em] text-[#ead7a3]">
        Published {formatDocumentDate(publishedAt)}
      </p>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function LetterCard({ title, content }) {
  const paragraphs = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-[760px] rounded-[30px] bg-white px-8 py-10 text-[#171717] shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:px-14 md:py-14">
      <div className="border-b-4 border-[#dfa935] pb-5 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#b78b29] md:text-[0.86rem]">
          Church Document
        </p>
        <h2 className="mt-2 text-[2rem] font-normal uppercase leading-none text-[#9f2f2d] md:text-[3rem]">
          {title}
        </h2>
      </div>

      <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.75] md:text-[1.08rem]">
        {paragraphs.map((paragraph, index) => (
          <p key={`${title}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [showDocumentContent, setShowDocumentContent] = useState(false);
  const pdfDocuments = buildPdfDocumentItems(documents);
  const letterDocuments = documents.filter(
    (item) => item.type === "Letter" && (item.content || item.fileUrl),
  );

  useEffect(() => {
    apiGet("/documents")
      .then((response) => {
        setDocuments(response.data || []);
      })
      .catch((error) => {
        console.error("Unable to load public documents:", error);
      });

    const timer = setTimeout(() => {
      setShowDocumentContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-dvh overflow-x-hidden bg-[#1d1712] font-serif text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(23,16,11,0.28),rgba(23,16,11,0.56)_28%,rgba(23,16,11,0.7)_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(226,201,141,0.08),transparent_28%)]" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <Navbar />

        <div className="mx-auto w-full max-w-[1380px] flex-1 px-4 pb-12 pt-28 sm:px-6 md:px-8 md:pb-16 md:pt-36">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.8),rgba(18,14,12,0.58))] px-6 py-10 text-center shadow-[0_32px_100px_rgba(0,0,0,0.26)] backdrop-blur-[12px] md:px-10 md:py-12"
          >
            <p className="text-[0.8rem] uppercase tracking-[0.36em] text-[#ead7a3]">
              Reports & Appeals
            </p>
            <h1 className="mt-4 text-[2.6rem] font-normal leading-none tracking-[-0.03em] md:text-[4rem]">
              Documents & Reports
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.85] text-white/82 md:text-[1.15rem]">
              Explore official reports, restoration documents, and appeals
              connected to the recovery of Saint Mary&apos;s Church, Ajmer.
            </p>
          </motion.div>

          <div className="mt-8 rounded-[34px] border border-white/10 bg-[rgba(18,14,12,0.6)] px-4 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-[10px] md:px-8 md:py-8">
            <div className="mx-auto max-w-[1120px]">
              <motion.div 
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
              >
                <PdfCard
                  to="/documents/0"
                  publishedAt={pdfDocuments[0]?.publishedAt}
                  coverImage={pdfDocuments[0]?.coverImage}
                  title="Preliminary Project Report_Saint Mary&apos;s Church by INTACH Delhi"
                />
              </motion.div>

              {pdfDocuments.slice(1).map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="mt-8"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                >
                  <PdfCard
                    to={`/documents/${index + 1}`}
                    publishedAt={item.publishedAt}
                    coverImage={item.coverImage}
                    title={item.title}
                  />
                  <DocumentDescription
                    description={item.description}
                    publishedAt={item.publishedAt}
                  />
                </motion.div>
              ))}

              <div
                className={`mx-auto mt-10 max-w-[980px] space-y-8 rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-6 py-8 text-center text-[1.08rem] leading-[1.85] text-white/88 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-700 md:mt-14 md:px-10 md:text-[1.28rem] ${
                  showDocumentContent
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div
                id="document-viewer"
                className="mx-auto mt-14 max-w-[760px] md:mt-16"
              >
                <div className="rounded-[30px] bg-white px-8 py-10 text-[#171717] shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:px-14 md:py-14">
                  <div className="border-b-4 border-[#dfa935] pb-5 text-center">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#b78b29] md:text-[0.86rem]">
                      Diocese of Rajasthan
                    </p>
                    <h2 className="mt-2 text-[2rem] font-normal uppercase leading-none text-[#9f2f2d] md:text-[3rem]">
                      Church of North India
                    </h2>
                    <p className="mt-3 text-sm leading-[1.7] md:text-[1rem]">
                      2/X, CNI Social Centre, Opp. Bus Stand, Jaipur Road, Ajmer
                      305001 (RAJ.) INDIA
                    </p>
                    <p className="mt-2 text-sm md:text-[1rem]">
                      Ref DB/BO/176/2024
                      <span className="mx-3 inline-block">|</span>
                      Date: 10th May 2024
                    </p>
                  </div>

                  <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.75] md:text-[1.08rem]">
                    <p>All the Presbyters, Diocese of Rajasthan, Church of North India.</p>
                    <p className="font-semibold underline">
                      Sub:- Regarding financial help to reconstruct the St Mary&apos;s
                      Church, Ajmer.
                    </p>
                    <p>Dear Co-workers in Christ Vineyard,</p>
                    <p>
                      Greetings from the Diocese of Rajasthan, Church of North
                      India.
                    </p>
                    <p>
                      As we all know, an accident happened in St Mary&apos;s Church,
                      Ajmer on 13th April &apos;24, and the roof of the church and
                      furniture of the church got burnt. The congregation of St
                      Mary&apos;s Church Ajmer has requested financial help to
                      reconstruct the roof and the other required furniture.
                    </p>
                    <p>
                      In this difficult time it is our responsibility to extend a
                      helping hand to reconstruct the church building. We long to
                      see all our churches as communities in which all its members
                      experience our love and support.
                    </p>
                    <p>
                      It is my earnest request to you all to take up the
                      responsibility to reconstruct the church building and send
                      the financial help for the same.
                    </p>
                    <div className="pt-2">
                      <p className="font-semibold">The Account details as follows:-</p>
                      <p>Account name: St Mary&apos;s Church</p>
                      <p>A/C No: 50200095943511</p>
                      <p>IFSC: HDFC0000205</p>
                      <p>Bank: HDFC Bank Suchana Kendra Branch, Ajmer</p>
                    </div>
                    <div className="pt-4">
                      <p>Yours in Christ</p>
                      <p className="mt-6 font-semibold">(Raimson Victor)</p>
                      <p className="font-semibold">Bishop</p>
                      <p className="font-semibold">Diocese of Rajasthan</p>
                      <p className="font-semibold">Church of North India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-14 max-w-[980px] rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-6 py-8 text-center text-[1.05rem] leading-[1.85] text-white/88 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:px-10 md:text-[1.24rem]">
                <p>
                  The above document is an official appeal from the Diocese of
                  Rajasthan, Church of North India, signed by Bishop Raimson
                  Victor himself. It highlights the urgent need for financial
                  assistance to reconstruct St Mary&apos;s Church in Ajmer, which
                  suffered significant damage due to an accident on April 13th,
                  2024. The heartfelt letter calls upon all members and
                  well-wishers to contribute towards rebuilding the church and
                  restoring its vital role in the community. Your generous
                  donations will directly support these efforts and help bring
                  hope and comfort back to the congregation of St Mary&apos;s Church.
                </p>
              </div>

              {letterDocuments.map((item) => (
                <motion.div 
                  key={item._id} 
                  className="mt-14"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                >
                  {item.fileUrl ? (
                    <LetterPdfCard href={item.fileUrl} title={item.title} />
                  ) : (
                    <LetterCard title={item.title} content={item.content} />
                  )}
                  <DocumentDescription
                    description={item.description}
                    publishedAt={item.publishedAt || item.updatedAt || item.createdAt}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-14 md:pt-18">
          <Footer className="bg-[rgba(17,12,8,0.35)]" />
        </div>
      </div>
    </section>
  );
}

export default Documents;
