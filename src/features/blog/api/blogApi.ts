
import deskImg from "@/imports/________.jpg.jpeg";
import gavel from "@/imports/_______.jpg.jpeg";
import arch from "@/imports/_______.jpg";
import skyline from "@/imports/______.jpg";
import scales from "@/imports/_____.jpg";

export interface BlogPost {
  id: number;
  cat: { ar: string; en: string };
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  date: { ar: string; en: string };
  author: { ar: string; en: string };
  readTime: { ar: string; en: string };
  img: string;
}

const MOCK_POSTS: BlogPost[] = [
  { 
    id: 1, 
    cat: { ar: "نظام الشركات", en: "Companies Law" }, 
    title: { ar: "أبرز التعديلات على نظام الشركات السعودي لعام 2024", en: "Key Amendments to Saudi Companies Law 2024" }, 
    excerpt: { ar: "استعراض تفصيلي للتعديلات الجوهرية التي أُدخلت على نظام الشركات السعودي وأثرها على بيئة الأعمال في المملكة.", en: "A detailed review of the fundamental amendments introduced to Saudi companies law and their impact on the Kingdom's business environment." }, 
    date: { ar: "15 أغسطس 2024", en: "15 Aug 2024" }, 
    author: { ar: "أ. محمد الغامدي", en: "A. Mohammed Al-Ghamdi" }, 
    readTime: { ar: "8 دقائق", en: "8 min read" }, 
    img: skyline 
  },
  { 
    id: 2, 
    cat: { ar: "قانون العمل", en: "Labor Law" }, 
    title: { ar: "حقوق العمال في ضوء لائحة نظام العمل الجديدة", en: "Workers' Rights Under the New Labor Regulations" }, 
    excerpt: { ar: "دليل شامل لحقوق العمال وصاحب العمل في ظل التعديلات الأخيرة على نظام العمل السعودي ولوائحه التنفيذية.", en: "A comprehensive guide to workers' and employers' rights under the latest amendments to Saudi labor law and its executive regulations." }, 
    date: { ar: "2 أغسطس 2024", en: "2 Aug 2024" }, 
    author: { ar: "أ. عبدالعزيز القحطاني", en: "A. Abdulaziz Al-Qahtani" }, 
    readTime: { ar: "6 دقائق", en: "6 min read" }, 
    img: deskImg 
  },
  { 
    id: 3, 
    cat: { ar: "التحكيم التجاري", en: "Commercial Arbitration" }, 
    title: { ar: "التحكيم التجاري الدولي في المملكة: الفرص والمتطلبات", en: "International Commercial Arbitration in KSA: Opportunities & Requirements" }, 
    excerpt: { ar: "نظرة متعمقة في منظومة التحكيم التجاري الدولي في المملكة وكيف يمكن للشركات الاستفادة منها لحل نزاعاتها.", en: "An in-depth look at the international commercial arbitration framework in the Kingdom and how companies can benefit from it to resolve disputes." }, 
    date: { ar: "20 يوليو 2024", en: "20 Jul 2024" }, 
    author: { ar: "أ. خالد العتيبي", en: "A. Khalid Al-Otaibi" }, 
    readTime: { ar: "10 دقائق", en: "10 min read" }, 
    img: gavel 
  },
  { 
    id: 4, 
    cat: { ar: "العقود والمعاملات", en: "Contracts & Transactions" }, 
    title: { ar: "كيف تحمي عقودك التجارية في ظل رؤية 2030", en: "Protecting Your Commercial Contracts Under Vision 2030" }, 
    excerpt: { ar: "دليل عملي لصياغة العقود التجارية المحكمة التي تحمي حقوق الأطراف وتواكب متطلبات بيئة الأعمال الجديدة.", en: "A practical guide to drafting airtight commercial contracts that protect the rights of all parties in the new business environment." }, 
    date: { ar: "10 يوليو 2024", en: "10 Jul 2024" }, 
    author: { ar: "أ. سارة الشمري", en: "A. Sarah Al-Shammari" }, 
    readTime: { ar: "7 دقائق", en: "7 min read" }, 
    img: arch 
  },
  { 
    id: 5, 
    cat: { ar: "القضايا العقارية", en: "Real Estate Cases" }, 
    title: { ar: "النزاعات العقارية: كيف تتصرف عند وقوع الخلاف", en: "Real Estate Disputes: What to Do When a Conflict Arises" }, 
    excerpt: { ar: "خطوات عملية يجب اتباعها عند وقوع نزاع عقاري لضمان حماية حقوقك وتجنب الأخطاء التي تُضر بمصالحك.", en: "Practical steps to follow when a real estate dispute occurs to ensure your rights are protected and costly mistakes are avoided." }, 
    date: { ar: "1 يوليو 2024", en: "1 Jul 2024" }, 
    author: { ar: "أ. نورة المطيري", en: "A. Noura Al-Mutairi" }, 
    readTime: { ar: "5 دقائق", en: "5 min read" }, 
    img: scales 
  },
  { 
    id: 6, 
    cat: { ar: "الحوكمة والامتثال", en: "Governance & Compliance" }, 
    title: { ar: "حوكمة الشركات في المملكة: المتطلبات والأفضل الممارسات", en: "Corporate Governance in KSA: Requirements & Best Practices" }, 
    excerpt: { ar: "استعراض لمتطلبات حوكمة الشركات في المملكة وأفضل الممارسات التي تضمن الامتثال التنظيمي وتعزز الثقة.", en: "An overview of corporate governance requirements in the Kingdom and the best practices that ensure regulatory compliance and build trust." }, 
    date: { ar: "15 يونيو 2024", en: "15 Jun 2024" }, 
    author: { ar: "أ. محمد الغامدي", en: "A. Mohammed Al-Ghamdi" }, 
    readTime: { ar: "9 دقائق", en: "9 min read" }, 
    img: deskImg 
  },
];

export const getBlogPostsApi = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POSTS);
    }, 500);
  });
};