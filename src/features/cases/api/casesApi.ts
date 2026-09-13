

export type CaseCategorySlug = "commercial" | "labor" | "arbitration" | "corporate" | "contracts";

export interface CaseItem {
  id: number;
  catSlug: CaseCategorySlug;
  cat: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  court: { ar: string; en: string };
  status: { ar: string; en: string };
  outcome: { ar: string; en: string };
  year: string;
}

const MOCK_CASES: CaseItem[] = [
  { 
    id: 1, 
    catSlug: "commercial",
    cat: { ar: "تجارية", en: "Commercial" }, 
    title: { ar: "نزاع تجاري كبير بين شركتين سعوديتين", en: "Major Commercial Dispute Between Two Saudi Companies" }, 
    desc: { ar: "قضية نزاع تجاري بين شركتين سعوديتين كبيرتين حول تنفيذ عقد توريد بقيمة تتجاوز 50 مليون ريال.", en: "A commercial dispute case between two major Saudi companies over execution of a supply contract worth over SAR 50 million." }, 
    court: { ar: "محكمة التجارة بالرياض", en: "Riyadh Commercial Court" }, 
    status: { ar: "مُنجزة", en: "Concluded" }, 
    outcome: { ar: "حكم لصالح موكلنا بالمبلغ كاملاً مع التعويض", en: "Judgment in client's favor for full amount plus compensation" }, 
    year: "2024" 
  },
  { 
    id: 2, 
    catSlug: "labor",
    cat: { ar: "عمالية", en: "Labor" }, 
    title: { ar: "نزاع عمالي جماعي لأكثر من 80 موظفاً", en: "Collective Labor Dispute for 80+ Employees" }, 
    desc: { ar: "تمثيل مجموعة من الموظفين في نزاع عمالي جماعي ضد شركة كبرى للمطالبة بمستحقاتهم المالية.", en: "Representing a group of employees in a collective labor dispute against a major company to claim their financial entitlements." }, 
    court: { ar: "محكمة العمل بجدة", en: "Jeddah Labor Court" }, 
    status: { ar: "مُنجزة", en: "Concluded" }, 
    outcome: { ar: "تسوية ودية بنسبة 100% من المستحقات", en: "Amicable settlement achieving 100% of entitlements" }, 
    year: "2024" 
  },
  { 
    id: 3, 
    catSlug: "arbitration",
    cat: { ar: "تحكيم دولي", en: "International Arbitration" }, 
    title: { ar: "نزاع استثماري دولي في قطاع العقارات", en: "International Investment Dispute in Real Estate" }, 
    desc: { ar: "تمثيل شركة استثمارية سعودية في إجراءات تحكيم دولي ضد شريك أجنبي في نزاع عقاري كبير.", en: "Representing a Saudi investment company in international arbitration against a foreign partner in a major real estate dispute." }, 
    court: { ar: "مركز التحكيم التجاري الخليجي", en: "Gulf Commercial Arbitration Center" }, 
    status: { ar: "مُنجزة", en: "Concluded" }, 
    outcome: { ar: "حكم تحكيمي لصالح الموكل بالتعويض الكامل", en: "Arbitration award in client's favor for full compensation" }, 
    year: "2023" 
  },
  { 
    id: 4, 
    catSlug: "corporate",
    cat: { ar: "شركات", en: "Corporate" }, 
    title: { ar: "إعادة هيكلة قانونية لمجموعة شركات", en: "Legal Restructuring of a Group of Companies" }, 
    desc: { ar: "تقديم الدعم القانوني الكامل لإعادة هيكلة مجموعة من الشركات المترابطة وإعادة توزيع الملكية.", en: "Providing full legal support for restructuring a group of affiliated companies and redistributing ownership." }, 
    court: { ar: "وزارة التجارة", en: "Ministry of Commerce" }, 
    status: { ar: "مُنجزة", en: "Concluded" }, 
    outcome: { ar: "إتمام إعادة الهيكلة بنجاح في أقل من 6 أشهر", en: "Restructuring successfully completed in under 6 months" }, 
    year: "2023" 
  },
  { 
    id: 5, 
    catSlug: "contracts",
    cat: { ar: "عقود", en: "Contracts" }, 
    title: { ar: "نزاع عقاري حول صحة عقد بيع", en: "Real Estate Dispute on Validity of Sale Contract" }, 
    desc: { ar: "الدفاع عن موكلنا في قضية نزاع حول صحة عقد بيع عقار تجاري كبير في وسط الرياض.", en: "Defending our client in a dispute over the validity of a major commercial real estate sale contract in central Riyadh." }, 
    court: { ar: "المحكمة العامة بالرياض", en: "Riyadh General Court" }, 
    status: { ar: "جارية", en: "Ongoing" }, 
    outcome: { ar: "القضية لا تزال في مراحلها الأولى", en: "Case still in its early stages" }, 
    year: "2024" 
  },
  { 
    id: 6, 
    catSlug: "commercial",
    cat: { ar: "تجارية", en: "Commercial" }, 
    title: { ar: "قضية منافسة غير مشروعة بين منشأتين تجاريتين", en: "Unfair Competition Case Between Two Businesses" }, 
    desc: { ar: "تمثيل موكلنا في قضية منافسة غير مشروعة والمطالبة بالتعويض عن الأضرار التجارية اللاحقة.", en: "Representing our client in an unfair competition case and claiming compensation for resulting commercial damages." }, 
    court: { ar: "محكمة التجارة بالرياض", en: "Riyadh Commercial Court" }, 
    status: { ar: "مُنجزة", en: "Concluded" }, 
    outcome: { ar: "حكم بالتعويض لصالح موكلنا", en: "Judgment awarding compensation in client's favor" }, 
    year: "2023" 
  },
];

export const getCasesApi = async (): Promise<CaseItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CASES);
    }, 500);
  });
};