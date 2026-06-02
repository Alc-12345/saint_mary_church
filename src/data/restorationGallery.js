import churchView from "../assets/church-vedio.avif";
import resto1 from "../assets/restro1.avif";
import resto2 from "../assets/resto2.avif";
import resto3 from "../assets/resto3.avif";
import resto4 from "../assets/resto4.avif";
import resto5 from "../assets/resto5.avif";
import resto6 from "../assets/resto6.avif";
import resto7 from "../assets/resto7.avif";
import resto8 from "../assets/resto8.avif";
 import resto9 from "../assets/resto9.avif";
import resto10 from "../assets/resto10.avif";
import resto11 from "../assets/restro11.avif";
import resto12 from "../assets/restro12.avif";
import resto13 from "../assets/restro13.avif";
import resto14 from "../assets/restro14.avif";
import resto15 from "../assets/restro15.avif";


const staticRestorationSections = [
  {
    slug: "canopy",
    title: "Restoration Progress",
    description:
      "On June 2nd, thanks to your generous donations and prayers, we successfully installed a canopy over the burned church roof to prevent further damage and secure the site for the upcoming monsoon season. While this critical step ensures immediate protection, our efforts are ongoing, and we still need additional funds to continue the restoration. Your continued support is invaluable in helping us rebuild and restore our cherished church. Please consider contributing to our cause and standing with us during this journey of renewal and resilience. Together, we can preserve our community's spiritual home for future generations.",
    alt: "Saint Mary's Church restoration progress",
    images: [ churchView, resto1, resto2, resto3, resto4,resto5,resto6,resto7,resto8],
  },
  {
    slug: "gazebo",
    title: "Sanctuary of Resilience: The Youth Gazebo at St. Mary's Church",
    description:
      "A small gazebo-like structure has been constructed on the grounds of St. Mary's Church, thanks to the initiative of our dedicated youth who are ensuring worship can continue. This serene space is not just for worship but also reflects our determination and community solidarity. It symbolizes our unwavering commitment to preserving our faith and traditions, even during difficult times. This remarkable achievement has been made possible through your generous donations. We extend our deepest gratitude and kindly ask for your continued support to fully restore our church, allowing us to return to worship within its sacred walls.",
    alt: "Youth gazebo progress at Saint Mary's Church",
    images: [ resto9 ,resto10, resto11, resto12, resto13, resto14, resto15],
  },
];

function getRelevantTimestamp(item) {
  return new Date(
    item?.publishedAt || item?.updatedAt || item?.createdAt || 0,
  ).getTime();
}

function sortPublishedItems(items = []) {
  return [...items].sort((first, second) => {
    const firstStatus = first?.status === "Published" ? 1 : 0;
    const secondStatus = second?.status === "Published" ? 1 : 0;

    if (firstStatus !== secondStatus) {
      return secondStatus - firstStatus;
    }

    return getRelevantTimestamp(second) - getRelevantTimestamp(first);
  });
}

function buildDynamicRestorationSection(items = []) {
  return sortPublishedItems(items)
    .filter((item) => item?.status === "Published")
    .filter((item) => item?.imageUrls?.length || item?.imageUrl)
    .map((item, index) => ({
      slug: `restoration-update-${item._id || index + 1}`,
      title: item.title || `Restoration Update ${index + 1}`,
      description:
        item.description ||
        (item.status === "Published"
          ? "This restoration update was added from the admin panel and is now part of the public progress page."
          : "This restoration update was added from the admin panel and is waiting for full publication details."),
      alt: item.title || "Latest restoration update at Saint Mary's Church",
      images: item.imageUrls?.length ? item.imageUrls : [item.imageUrl],
    }));
}

export function buildRestorationSections(items = []) {
  return [...buildDynamicRestorationSection(items), ...staticRestorationSections];
}

export const restorationSections = buildRestorationSections();

export function getRestorationSection(sectionSlug, items = []) {
  return buildRestorationSections(items).find((section) => section.slug === sectionSlug);
}
