import type { Service } from "@/types/service";

/** The catch-all service; details go in the order notes. */
export const OTHER_SERVICE_ID = "other";

// Mock data. Initial list from the PRD; names and prices to be confirmed with the owner.
const services: Service[] = [
  {
    id: "trouser-hem",
    name: { nl: "Broek inkorten", tr: "Paça kısaltma", en: "Trouser hemming" },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "sleeve-shortening",
    name: { nl: "Mouwen inkorten", tr: "Kol kısaltma", en: "Sleeve shortening" },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "waist-adjustment",
    name: {
      nl: "Taille innemen of uitleggen",
      tr: "Bel daraltma / genişletme",
      en: "Waist adjustment",
    },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "zipper-replacement",
    name: { nl: "Rits vervangen", tr: "Fermuar değişimi", en: "Zipper replacement" },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "jacket-alteration",
    name: {
      nl: "Jas of colbert vermaken",
      tr: "Ceket / mont tadilatı",
      en: "Jacket alteration",
    },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "general-repair",
    name: {
      nl: "Reparaties (scheuren, knopen, naden)",
      tr: "Genel tamir (yırtık, düğme, dikiş)",
      en: "General repairs (tears, buttons, seams)",
    },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: OTHER_SERVICE_ID,
    name: { nl: "Overig", tr: "Diğer", en: "Other" },
    fromPriceCents: null,
    isActive: true,
    sortOrder: 99,
  },
];

// Async on purpose: a real database call will be async too,
// so pages don't need to change when this is replaced.
export async function getActiveServices(): Promise<Service[]> {
  return services
    .filter((service) => service.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
