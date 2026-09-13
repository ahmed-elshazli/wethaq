

export interface LocationItem {
  city: { ar: string; en: string };
  label: { ar: string; en: string };
  address: { ar: string; en: string };
  phone: string;
  email: string;
  hours: { ar: string; en: string };
  mapLink: string;
  emoji: string;
}

const MOCK_LOCATIONS: LocationItem[] = [
  {
    city: { ar: "الرياض", en: "Riyadh" },
    label: { ar: "المقر الرئيسي", en: "Headquarters" },
    address: { ar: "طريق الملك فهد، برج الفيصلية، الدور 18، الرياض 12271", en: "King Fahd Road, Al Faisaliyah Tower, Floor 18, Riyadh 12271" },
    phone: "+966 11 XXX XXXX",
    email: "riyadh@wethaqalhaq.com",
    hours: { ar: "الأحد — الخميس: 8:00 صباحاً — 5:00 مساءً", en: "Sun — Thu: 8:00 AM — 5:00 PM" },
    mapLink: "https://maps.google.com",
    emoji: "🏙️",
  },
  {
    city: { ar: "جدة", en: "Jeddah" },
    label: { ar: "الفرع الغربي", en: "Western Branch" },
    address: { ar: "طريق الملك عبدالعزيز، برج العرب، الدور 10، جدة 23421", en: "King Abdulaziz Road, Arab Tower, Floor 10, Jeddah 23421" },
    phone: "+966 12 XXX XXXX",
    email: "jeddah@wethaqalhaq.com",
    hours: { ar: "الأحد — الخميس: 8:00 صباحاً — 5:00 مساءً", en: "Sun — Thu: 8:00 AM — 5:00 PM" },
    mapLink: "https://maps.google.com",
    emoji: "🕌",
  },
  {
    city: { ar: "الدمام", en: "Dammam" },
    label: { ar: "الفرع الشرقي", en: "Eastern Branch" },
    address: { ar: "طريق الملك سعود، برج الخليج، الدور 12، الدمام 31483", en: "King Saud Road, Gulf Tower, Floor 12, Dammam 31483" },
    phone: "+966 13 XXX XXXX",
    email: "dammam@wethaqalhaq.com",
    hours: { ar: "الأحد — الخميس: 8:00 صباحاً — 5:00 مساءً", en: "Sun — Thu: 8:00 AM — 5:00 PM" },
    mapLink: "https://maps.google.com",
    emoji: "⛽",
  },
];

export const getLocationsApi = async (): Promise<LocationItem[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_LOCATIONS), 400));
};