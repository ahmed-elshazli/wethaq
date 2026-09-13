

export interface AboutData {
  tag: { ar: string; en: string };
  heading: { ar: string; en: string };
  p1: { ar: string; en: string };
  p2: { ar: string; en: string };
  vision: { ar: string; en: string };
  mission: { ar: string; en: string };
  values: { ar: string; en: string };
}

const MOCK_ABOUT_DATA: AboutData = {
  tag: { ar: "من نحن", en: "Who We Are" },
  heading: { ar: "شريكك القانوني الموثوق", en: "Your Trusted Legal Partner" },
  p1: { 
    ar: "وثاق الحق للمحاماة والاستشارات القانونية شركة مهنية تجمع بين الخبرة القانونية الراسخة والرؤية العملية المعاصرة. يضم فريقها نخبة من المحامين والمستشارين القانونيين ذوي الكفاءات والخبرات المتنوعة.", 
    en: "Wethaq Al-Haq Law Firm is a professional firm combining deep legal expertise with contemporary practical vision. Our team comprises an elite selection of highly capable lawyers and legal consultants." 
  },
  p2: { 
    ar: "نرتكز على الجودة والدقة والالتزام لنكون الشريك القانوني الذي يعتمد عليه الأفراد، وقطاع الأعمال، والجهات الحكومية.", 
    en: "We center on quality, precision, and commitment to be the trusted legal partner for individuals, businesses, and government entities." 
  },
  vision: { 
    ar: "أن نكون الخيار القانوني الأول في المملكة العربية السعودية، من خلال تقديم خدمات قانونية استثنائية تجمع بين الكفاءة العلمية والتميز العملي.", 
    en: "To be the first legal choice in Saudi Arabia, by providing exceptional legal services combining scientific competence and practical excellence." 
  },
  mission: { 
    ar: "تقديم خدمات قانونية متكاملة وعالية الجودة تلتزم بأعلى معايير الاحتراف والأخلاق المهنية، وبناء شراكات قائمة على الثقة والمصداقية.", 
    en: "To provide integrated, high-quality legal services adhering to the highest standards of professionalism and ethics, building trust-based partnerships with our clients." 
  },
  values: { 
    ar: "النزاهة: نلتزم بأعلى معايير الشرف والأمانة. الكفاءة: نسعى لتقديم أفضل الحلول. الالتزام: نضع مصالح عملائنا أولاً. الابتكار: نواكب المستجدات ونطور أساليبنا.", 
    en: "Integrity: We uphold the highest standards of honor and honesty. Competence: We strive to deliver the best solutions. Commitment: We put clients' interests first. Innovation: We keep pace with developments." 
  },
};

export const getAboutDataApi = async (): Promise<AboutData> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_ABOUT_DATA), 400));
};