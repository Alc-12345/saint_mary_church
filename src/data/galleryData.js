import churchHero from "../assets/church-home.avif";
import beforeFireVideo from "../assets/Gallery_3.mp4";
import afterFireVideo from "../assets/Gallery_2.mp4";


const beforeFireModules = import.meta.glob("../assets/gallary-*.avif", {
  eager: true,
  import: "default",
});

const afterFireModules = import.meta.glob("../assets/gallary-fire-*.avif", {
  eager: true,
  import: "default",
});

function getNumericOrder(path, pattern) {
  const match = path.match(pattern);
  return match ? Number(match[1]) : 0;
}

function buildImageItems(modules, pattern, sectionSlug, label) {
  return Object.entries(modules)
    .filter(([path]) => pattern.test(path))
    .sort((a, b) => getNumericOrder(a[0], pattern) - getNumericOrder(b[0], pattern))
    .map(([path, src], index) => ({
      id: `${sectionSlug}-${index + 1}`,
      type: "image",
      src,
      alt: `${label} ${index + 1}`,
    }));
}

const beforeFirePhotos = buildImageItems(
  beforeFireModules,
  /gallary-(\d+)\.avif$/,
  "before-fire",
  "Saint Mary's Church before the fire photo"
);

const afterFirePhotos = buildImageItems(
  afterFireModules,
  /gallary-fire-(\d+)\.avif$/,
  "after-fire",
  "Saint Mary's Church after the fire photo"
);

const staticGallerySections = [
  {
    slug: "before-fire",
    title: "Before the fire",
    subtitle: "Photos of Church before 13 April, 2024",
    layout: "featured",
    previewItems: [
      {
        id: "before-video",
        type: "video",
        src: beforeFireVideo,
        poster: churchHero,
      },
      ...beforeFirePhotos,
    ],
    media: [
      {
        id: "before-video",
        type: "video",
        src: beforeFireVideo,
        poster: churchHero,
      },
      ...beforeFirePhotos,
    ],
  },
  {
    slug: "after-fire",
    title: "After the fire",
    subtitle: "Photos of Church after 13 April, 2024",
    layout: "grid",
    previewItems: [
      {
        id: "after-video",
        type: "video",
        src: afterFireVideo,
        poster: churchHero,
      },
      ...afterFirePhotos,
    ],
    media: [
      {
        id: "after-video",
        type: "video",
        src: afterFireVideo,
        poster: churchHero,
      },
      ...afterFirePhotos,
    ],
  },
];

function mapGallerySectionSlug(section) {
  if (section === "After Fire") return "after-fire";
  return "before-fire";
}

function buildDynamicGalleryMedia(items = []) {
  return items
    .filter((item) => item?.imageUrl)
    .map((item, index) => ({
      id: item._id || `gallery-dynamic-${index + 1}`,
      type: item.type === "Video" ? "video" : "image",
      src: item.imageUrl,
      poster: item.type === "Video" ? churchHero : undefined,
      alt: item.title || "Saint Mary's Church gallery image",
      sectionSlug: mapGallerySectionSlug(item.section),
    }));
}

export function buildGallerySections(items = []) {
  const dynamicMedia = buildDynamicGalleryMedia(items);

  return staticGallerySections.map((section) => {
    const sectionMedia = dynamicMedia.filter(
      (item) => item.sectionSlug === section.slug,
    );

    return {
      ...section,
      previewItems: [...section.previewItems, ...sectionMedia],
      media: [...section.media, ...sectionMedia],
    };
  });
}

export const gallerySections = buildGallerySections();

export function getGallerySection(sectionSlug, items = []) {
  return buildGallerySections(items).find((section) => section.slug === sectionSlug);
}
