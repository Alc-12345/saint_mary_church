import reportPdf from "../assets/PDF.pdf";
import reportCover from "../assets/image.png";

export const staticPdfDocuments = [
  {
    id: "intach-report",
    title: "Preliminary Project Report_Saint Mary's Church by INTACH Delhi",
    fileUrl: reportPdf,
    coverImage: reportCover,
    publishedAt: "2024-05-01T00:00:00.000Z",
    description:
      "A preliminary restoration report prepared by INTACH Delhi for Saint Mary's Church, Ajmer.",
  },
];

export function buildPdfDocumentItems(items = []) {
  const dynamicPdfDocuments = items
    .filter((item) => item?.type === "PDF" && item?.fileUrl)
    .map((item, index) => ({
      id: item._id || `document-pdf-${index + 1}`,
      title: item.title || `Church document ${index + 1}`,
      fileUrl: item.fileUrl,
      description: item.description || "",
      coverImage: item.coverImage || reportCover,
      publishedAt: item.publishedAt || item.updatedAt || item.createdAt || "",
      createdAt: item.createdAt || "",
    }));

  return [...staticPdfDocuments, ...dynamicPdfDocuments];
}
