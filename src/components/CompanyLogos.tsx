export interface CompanyLogoItem {
  id: string;
  name: string;
  src: string;
  heightClass: string;
  lightHeightClass: string;
}

/**
 * User-supplied official company logos stored in `public/images/logos/`.
 * Rendered via CSS monochrome filters to match the dark and light editorial bars.
 */
export const COMPANY_LOGOS: CompanyLogoItem[] = [
  {
    id: "fifco",
    name: "FIFCO",
    src: "/images/logos/fifco.png",
    heightClass: "h-[24px] w-auto",
    lightHeightClass: "h-[21px] w-auto",
  },
  {
    id: "intel",
    name: "Intel",
    src: "/images/logos/intel.png",
    heightClass: "h-[22px] w-auto",
    lightHeightClass: "h-[19px] w-auto",
  },
  {
    id: "abb",
    name: "ABB",
    src: "/images/logos/abb.png",
    heightClass: "h-[21px] w-auto",
    lightHeightClass: "h-[18px] w-auto",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    src: "/images/logos/microsoft.png",
    heightClass: "h-[22px] w-auto",
    lightHeightClass: "h-[19px] w-auto",
  },
];
