
import imgFeatured from "@/imports/BrandIdentityWebsiteSelection/29c36ba8558d30857633f79326b89b2e1f3bbac7.png";
import imgMember1 from "@/imports/BrandIdentityWebsiteSelection/d909281302811325e5373a04499013dd738895ea.png";
import imgMember2 from "@/imports/BrandIdentityWebsiteSelection/9c10fea859bdaf76eabc0cad23c90f01ac24890b.png";
import imgMember3 from "@/imports/BrandIdentityWebsiteSelection/9535336afc5dc2bd71b5b1782451f7f189569f69.png";

export interface TeamMember {
  id: string | number;
  img: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  bio: { ar: string; en: string };
  // حقول إضافية للعضو البارز
  label?: { ar: string; en: string };
  phone?: string;
  email?: string;
}

export interface TeamData {
  featured: TeamMember;
  members: TeamMember[];
}

const MOCK_TEAM_DATA: TeamData = {
  featured: {
    id: 'featured-1',
    img: imgFeatured,
    label: { ar: "الشريك المؤسس", en: "Founding Partner" },
    name: { ar: "عبدالعزيز بن سعد الحربي", en: "Abdulaziz Al-Harbi" },
    role: { ar: "الشريك المؤسس — رئيس قسم الترافع", en: "Founding Partner — Head of Litigation" },
    bio: { 
      ar: "محامٍ مرخّص بخبرة تتجاوز ٢٢ عامًا في الترافع أمام المحاكم التجارية ودوائر الاستئناف، وأشرف على أكثر من ٤٠٠ قضية تجارية كبرى.",
      en: "Licensed attorney with over 22 years of experience in commercial courts and appellate divisions, having overseen more than 400 major commercial cases."
    },
    phone: "+966 55 123 4567",
    email: "a.alharbi@wethaq-alhaq.sa"
  },
  members: [
    {
      id: 1,
      img: imgMember1,
      name: { ar: "محمد بن فهد القحطاني", en: "Mohammed Al-Qahtani" },
      role: { ar: "شريك — الشركات والاندماج والاستحواذ", en: "Partner — Corporations & M&A" },
      bio: { 
        ar: "يقود ممارسة الشركات والحوكمة، وله خبرة واسعة في صفقات الاستحواذ والفحص النافي للجهالة للمنشآت السعودية والخليجية.",
        en: "Leads corporate governance practice with extensive M&A and due diligence experience across Saudi and Gulf entities."
      },
    },
    {
      id: 2,
      img: imgMember2,
      name: { ar: "نوف بنت عبدالله العتيبي", en: "Nouf Al-Otaibi" },
      role: { ar: "مستشارة قانونية — العقود والتحكيم", en: "Legal Counsel — Contracts & Arbitration" },
      bio: { 
        ar: "متخصصة في صياغة العقود التجارية وتمثيل الأطراف أمام المركز السعودي للتحكيم التجاري، وحاصلة على الماجستير في القانون التجاري.",
        en: "Specializes in commercial contract drafting and representation before the Saudi Center for Commercial Arbitration."
      },
    },
    {
      id: 3,
      img: imgMember3,
      name: { ar: "سلمان بن ناصر الدوسري", en: "Salman Al-Dosari" },
      role: { ar: "محامٍ أول — القضايا العمالية والتنفيذ", en: "Senior Lawyer — Labor Cases & Enforcement" },
      bio: { 
        ar: "يتولّى ملفات الدعاوى العمالية وإجراءات التنفيذ، ويشرف على وحدة المتابعة الإجرائية ومنصة ناجز داخل الشركة.",
        en: "Manages labor cases and enforcement proceedings, overseeing the procedural follow-up unit and Najiz platform."
      },
    },
  ]
};

export const getTeamDataApi = async (): Promise<TeamData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TEAM_DATA);
      // بعد ربط الباك إند:
      // const response = await api.get('/api/v1/team');
      // return response.data;
    }, 600);
  });
};