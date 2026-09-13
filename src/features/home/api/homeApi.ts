
// نفس استيراد الصور التي كانت موجودة في الكود الأصلي
import deskImg from "@/imports/________.jpg.jpeg";
import arch from "@/imports/_______.jpg";
import skyline from "@/imports/______.jpg";

export interface HomeData {
  hero: {
    tag: { ar: string; en: string };
    h1a: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    cta1: { ar: string; en: string };
    cta2: { ar: string; en: string };
  };
  about: {
    tag: { ar: string; en: string };
    heading: { ar: string; en: string };
    p1: { ar: string; en: string };
    p2: { ar: string; en: string };
  };
  services: { id: string | number; title: { ar: string; en: string }; desc: { ar: string; en: string } }[];
  stats: { n: string; label: { ar: string; en: string } }[];
  team: { id: string | number; name: { ar: string; en: string }; role: { ar: string; en: string }; spec: { ar: string; en: string }; exp: { ar: string; en: string }; image?: string }[];
  blog: { id: string | number; cat: { ar: string; en: string }; title: { ar: string; en: string }; date: { ar: string; en: string }; image?: string }[];
  cta: {
    heading: { ar: string; en: string };
    body: { ar: string; en: string };
    btn1: { ar: string; en: string };
    btn2: { ar: string; en: string };
  };
}

const MOCK_HOME_DATA: HomeData = {
  hero: {
    tag: { ar: "مكتب محاماة واستشارات قانونية", en: "Law Firm & Legal Consultations" },
    h1a: { ar: "حين يكون الحق هو الغاية", en: "When Justice Is the Goal" },
    subtitle: { ar: "نقدم خدمات قانونية متكاملة وفق أعلى معايير الجودة والاحتراف، لنكون شريكك القانوني الذي يعتمد عليه.", en: "We deliver integrated legal services at the highest standards of quality and professionalism — your trusted legal partner." },
    cta1: { ar: "استشارة مجانية", en: "Free Consultation" },
    cta2: { ar: "تعرف على خدماتنا", en: "Our Services" },
  },
  about: {
    tag: { ar: "من نحن", en: "Who We Are" },
    heading: { ar: "شريكك القانوني الموثوق", en: "Your Trusted Legal Partner" },
    p1: { ar: "وثاق الحق للمحاماة والاستشارات القانونية شركة مهنية تجمع بين الخبرة القانونية الراسخة والرؤية العملية المعاصرة.", en: "Wethaq Al-Haq Law Firm is a professional firm combining deep legal expertise with contemporary practical vision." },
    p2: { ar: "نرتكز على الجودة والدقة والالتزام لنكون الشريك القانوني الذي يعتمد عليه الأفراد، وقطاع الأعمال.", en: "We center on quality, precision, and commitment to be the trusted legal partner for individuals and businesses." },
  },
  services: [
    { id: 1, title: { ar: "الاستشارات القانونية", en: "Legal Consultations" }, desc: { ar: "مشورة قانونية دقيقة لحماية حقوقك.", en: "Precise legal advice to protect your rights." } },
    { id: 2, title: { ar: "الترافع والتمثيل", en: "Litigation" }, desc: { ar: "تمثيل قانوني بكفاءة عالية.", en: "High-efficiency legal representation." } },
    { id: 3, title: { ar: "صياغة العقود", en: "Contracts" }, desc: { ar: "صياغة العقود بدقة وشمولية.", en: "Drafting contracts with precision." } },
    { id: 4, title: { ar: "القضايا التجارية", en: "Commercial" }, desc: { ar: "إدارة نزاعاتك التجارية بخبرة.", en: "Handling commercial disputes." } },
    { id: 5, title: { ar: "القضايا العمالية", en: "Labor" }, desc: { ar: "حماية حقوقك في بيئة العمل.", en: "Protecting your workplace rights." } },
    { id: 6, title: { ar: "التحكيم", en: "Arbitration" }, desc: { ar: "خدمات التحكيم كبديل فعال لحل النزاعات.", en: "Arbitration as an alternative dispute resolution." } },
  ],
  stats: [
    { n: "15+", label: { ar: "سنة خبرة", en: "Years Experience" } },
    { n: "+500", label: { ar: "قضية ناجحة", en: "Successful Cases" } },
    { n: "98%", label: { ar: "نسبة النجاح", en: "Success Rate" } },
  ],
  team: [
    { id: 1, name: { ar: "أ. محمد الغامدي", en: "Mohammed Al-Ghamdi" }, role: { ar: "شريك رئيسي", en: "Managing Partner" }, spec: { ar: "التجارة والشركات", en: "Commercial & Corporate" }, exp: { ar: "+18 سنة", en: "18+ Yrs" }, image: "" },
    { id: 2, name: { ar: "أ. سارة الشمري", en: "Sarah Al-Shammari" }, role: { ar: "محامية", en: "Lawyer" }, spec: { ar: "العقود التجارية", en: "Commercial Contracts" }, exp: { ar: "+12 سنة", en: "12+ Yrs" }, image: "" },
    { id: 3, name: { ar: "أ. خالد العتيبي", en: "Khalid Al-Otaibi" }, role: { ar: "مستشار قانوني أول", en: "Senior Legal Consultant" }, spec: { ar: "القانون الدولي", en: "International Law" }, exp: { ar: "+15 سنة", en: "15+ Yrs" }, image: "" },
    { id: 4, name: { ar: "أ. فاطمة النجار", en: "Fatima Al-Najjar" }, role: { ar: "محامية", en: "Lawyer" }, spec: { ar: "الأحوال الشخصية", en: "Personal Status" }, exp: { ar: "+10 سنوات", en: "10+ Yrs" }, image: "" },
  ],
  blog: [
    { id: 1, cat: { ar: "نظام الشركات", en: "Companies Law" }, title: { ar: "أبرز التعديلات لعام 2024", en: "Key Amendments 2024" }, date: { ar: "15 أغسطس 2024", en: "15 Aug 2024" }, image: skyline },
    { id: 2, cat: { ar: "نظام العمل", en: "Labor Law" }, title: { ar: "حقوق العمال الجديدة", en: "New Workers Rights" }, date: { ar: "2 أغسطس 2024", en: "2 Aug 2024" }, image: arch },
    { id: 3, cat: { ar: "التحكيم", en: "Arbitration" }, title: { ar: "التحكيم التجاري الدولي", en: "International Arbitration" }, date: { ar: "20 يوليو 2024", en: "20 Jul 2024" }, image: deskImg },
  ],
  cta: {
    heading: { ar: "ابدأ باستشارتك القانونية اليوم", en: "Start Your Legal Consultation Today" },
    body: { ar: "فريقنا من المختصين القانونيين جاهز لمساعدتك.", en: "Our team of legal specialists is ready to assist." },
    btn1: { ar: "تواصل معنا الآن", en: "Contact Us Now" },
    btn2: { ar: "واتساب مباشر", en: "WhatsApp Direct" },
  }
};

export const getHomeDataApi = async (): Promise<HomeData> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_HOME_DATA), 600));
};