

// تحديث الـ interface ليدعم النصوص متعددة اللغات من الباك إند
export interface ServiceItem {
  id: string | number;
  label: string;
  slug: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  img: string;
}

const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 1,
    label: "01",
    slug: "consultations",
    title: { ar: "الاستشارات القانونية", en: "Legal Consultations" },
    desc: { 
      ar: "نقدم مشورة قانونية دقيقة ومتخصصة في مختلف المجالات لحماية حقوقك واتخاذ قراراتك بثقة واطمئنان. نغطي نظام الشركات والعقود والأنظمة العمالية والأحوال الشخصية والنزاعات العقارية.",
      en: "Precise and specialized legal advice across all fields to protect your rights and make confident decisions. Covering companies law, contracts, labor regulations, personal status, and real estate disputes."
    },
    img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: 2,
    label: "02",
    slug: "litigation",
    title: { ar: "الترافع والتمثيل القضائي", en: "Litigation & Representation" },
    desc: {
      ar: "نمثلك أمام المحاكم السعودية بكفاءة عالية ودراسة متأنية لكل قضية لضمان أفضل النتائج القانونية الممكنة. نتولى الاستئنافات وتنفيذ الأحكام بنفس الاحتراف.",
      en: "Representing you before Saudi courts with high efficiency and thorough case study. We handle appeals and judgment enforcement with the same level of professionalism."
    },
    img: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: 3,
    label: "03",
    slug: "contracts",
    title: { ar: "صياغة ومراجعة العقود", en: "Contract Drafting & Review" },
    desc: {
      ar: "نصيغ عقودك القانونية بدقة وشمولية لتحصين مصالحك وتجنب النزاعات المستقبلية. من عقود الشراكة والإيجار وتوريد الخدمات إلى العقود الحكومية والمناقصات.",
      en: "Drafting your legal contracts with precision and comprehensiveness to protect your interests and avoid future disputes. Partnership agreements, leases, service contracts, and government tenders."
    },
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: 4,
    label: "04",
    slug: "commercial",
    title: { ar: "القضايا التجارية", en: "Commercial Cases" },
    desc: {
      ar: "نتولى نزاعاتك التجارية بخبرة متعمقة في أنظمة التجارة السعودية والدولية. نزاعات بين الشركاء، قضايا الإفلاس، نزاعات العلامات التجارية والمنافسة غير المشروعة.",
      en: "Handling your commercial disputes with deep expertise in Saudi and international commercial regulations. Partner disputes, bankruptcy, trademark and unfair competition cases."
    },
    img: "https://images.unsplash.com/photo-1681505531034-8d67054e07f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: 5,
    label: "05",
    slug: "labor",
    title: { ar: "القضايا العمالية", en: "Labor Cases" },
    desc: {
      ar: "نحمي حقوقك في بيئة العمل ونقدم الحلول القانونية للنزاعات العمالية. نتولى قضايا الفصل التعسفي والمستحقات وإصابات العمل والتقاضي أمام محاكم العمل.",
      en: "Protecting your workplace rights and providing legal solutions for labor disputes efficiently. Wrongful termination, workers' entitlements, work injuries, and labor court litigation."
    },
    img: "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
  {
    id: 6,
    label: "06",
    slug: "corporate",
    title: { ar: "قضايا الشركات والتحكيم", en: "Corporate & Arbitration" },
    desc: {
      ar: "نقدم الدعم القانوني الكامل لتأسيس الشركات وإعادة هيكلتها ونزاعات المساهمين وعمليات الاندماج والاستحواذ. إلى جانب خدمات التحكيم التجاري المحلي والدولي.",
      en: "Full legal support for company formation, restructuring, shareholder disputes, and M&A transactions. Plus local and international commercial arbitration as an effective alternative for dispute resolution."
    },
    img: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  },
];

export const getServicesApi = async (): Promise<ServiceItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SERVICES);
      // بعد ربط الباك إند:
      // const response = await api.get('/api/v1/services');
      // return response.data;
    }, 600);
  });
};