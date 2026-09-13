

export interface SubServiceItem {
  iconName: string;
  title: { ar: string; en: string };
  items: { ar: string[]; en: string[] };
}

export interface ServiceDetailUnit {
  slug: string;
  tab: { ar: string; en: string };
  subs: SubServiceItem[];
}

const MOCK_SERVICE_DETAILS: ServiceDetailUnit[] = [
  {
    slug: "consultations",
    tab: { ar: "الاستشارات القانونية", en: "Legal Consultations" },
    subs: [
      {
        iconName: "IconScales",
        title: { ar: "المشورة القانونية الكتابية والشفهية", en: "Written & Verbal Legal Advice" },
        items: {
          ar: [
            "تقديم المشورة القانونية كتابياً وشفهياً في كافة المسائل التي يطلبها العميل.",
            "الإجابة على الاستشارات وتقديم الدراسات القانونية المتخصصة.",
            "إبداء الرأي في المنتجات القانونية والعقود والاتفاقيات المراد مراجعتها.",
            "تقديم المشورة بشأن المنازعات وآليات حلها المناسبة.",
            "عقد الاجتماعات مع العميل أو ممثليه للبحث في قضاياه.",
          ],
          en: [
            "Providing legal advice in writing and verbally on all matters requested by the client.",
            "Answering consultations and providing specialized legal studies.",
            "Expressing opinion on legal products, contracts, and agreements to be reviewed.",
            "Advising on disputes and appropriate resolution mechanisms.",
            "Holding meetings with the client or their representatives to discuss their matters.",
          ]
        },
      },
      {
        iconName: "IconDocument",
        title: { ar: "الدراسات والتقارير القانونية", en: "Legal Studies & Reports" },
        items: {
          ar: [
            "إعداد الدراسات القانونية المتعلقة بالأنظمة والتشريعات السعودية.",
            "تقديم تقارير مفصّلة حول الوضع القانوني لأي صفقة أو نشاط تجاري.",
            "مراجعة الوثائق والعقود وتقديم ملاحظات قانونية شاملة.",
            "تحليل المخاطر القانونية وتقديم توصيات للتخفيف منها.",
          ],
          en: [
            "Preparing legal studies on Saudi regulations and legislation.",
            "Providing detailed reports on the legal status of any transaction or business activity.",
            "Reviewing documents and contracts and providing comprehensive legal comments.",
            "Analyzing legal risks and providing mitigation recommendations.",
          ]
        },
      },
    ],
  },
  {
    slug: "litigation",
    tab: { ar: "الترافع والتمثيل القضائي", en: "Litigation & Representation" },
    subs: [
      {
        iconName: "IconGavel",
        title: { ar: "التمثيل القضائي", en: "Judicial Representation" },
        items: {
          ar: [
            "رفع وتقديم الدعاوى والبيّنات والطلبات والاعتراضات القضائية اللازمة (محاكم الدرجة الأولى والاستئناف والعليا).",
            "القيام بالمرافعات الحضورية والكتابية وتحرير المذكرات والخطابات القانونية أمام جميع الجهات القضائية.",
            "حضور الجلسات وتقديم البيّنات اللازمة في المواعيد النظامية.",
            "المفاوضات مع الخصم وإدارة ملف النزاع خارج نطاق المحاكم.",
          ],
          en: [
            "Filing lawsuits, submitting evidence, requests, and judicial objections before courts at all levels.",
            "Conducting oral and written pleadings and drafting legal memoranda and correspondence before all judicial authorities.",
            "Attending sessions and presenting evidence within statutory deadlines.",
            "Negotiating with opposing parties and managing dispute files outside of court.",
          ]
        },
      },
      {
        iconName: "IconShield",
        title: { ar: "الاستئناف والطعن بالنقض", en: "Appeals & Cassation" },
        items: {
          ar: [
            "الطعن بالاستئناف في الأحكام الابتدائية أمام محاكم الاستئناف المختصة.",
            "الطعن بالنقض أمام المحكمة العليا في القضايا التي يسمح بها النظام.",
            "تقديم المذكرات والردود في المواعيد النظامية ومتابعة الإجراءات.",
            "تقديم طلبات وقف تنفيذ الأحكام عند الاقتضاء.",
          ],
          en: [
            "Filing appeals against first-instance judgments before the competent Courts of Appeal.",
            "Filing cassation requests before the Supreme Court in cases permitted by law.",
            "Submitting memoranda and responses within statutory deadlines and following up on proceedings.",
            "Filing requests to stay execution of judgments when necessary.",
          ]
        },
      },
    ],
  },
  {
    slug: "contracts",
    tab: { ar: "صياغة العقود", en: "Contract Drafting" },
    subs: [
      {
        iconName: "IconDocument",
        title: { ar: "صياغة العقود وإعدادها", en: "Drafting & Preparing Contracts" },
        items: {
          ar: [
            "صياغة عقود الشراكة التجارية وإعداد النظام الأساسي للشركات.",
            "صياغة عقود الإيجار التجارية والسكنية وعقود البيع والشراء.",
            "إعداد عقود توريد الخدمات واتفاقيات مستوى الخدمة (SLA).",
            "صياغة عقود العمل والتوظيف والسياسات الداخلية.",
            "إعداد العقود الحكومية ووثائق المناقصات والمزايدات.",
          ],
          en: [
            "Drafting commercial partnership agreements and corporate articles of association.",
            "Drafting commercial and residential lease agreements and sale contracts.",
            "Preparing service supply contracts and service level agreements (SLA).",
            "Drafting employment contracts and internal HR policies.",
            "Preparing government contracts and tender documents.",
          ]
        },
      },
      {
        iconName: "IconScales",
        title: { ar: "مراجعة العقود وتقييمها", en: "Contract Review & Assessment" },
        items: {
          ar: [
            "مراجعة العقود المعروضة من أطراف خارجية وتقديم ملاحظات قانونية.",
            "تحديد المخاطر القانونية والثغرات في صياغة العقود.",
            "اقتراح التعديلات والبنود الإضافية لتعزيز حماية مصالح العميل.",
            "التفاوض على شروط العقد مع الأطراف الأخرى نيابةً عن العميل.",
          ],
          en: [
            "Reviewing contracts presented by external parties and providing legal comments.",
            "Identifying legal risks and gaps in contract drafting.",
            "Proposing amendments and additional clauses to enhance client interest protection.",
            "Negotiating contract terms with other parties on behalf of the client.",
          ]
        },
      },
    ],
  },
  {
    slug: "commercial",
    tab: { ar: "القضايا التجارية", en: "Commercial Cases" },
    subs: [
      {
        iconName: "IconBriefcase",
        title: { ar: "النزاعات التجارية", en: "Commercial Disputes" },
        items: {
          ar: [
            "تمثيل العملاء في النزاعات التجارية أمام محاكم التجارة بكافة درجاتها.",
            "قضايا الإخلال بالعقود التجارية والمطالبة بالتعويض.",
            "نزاعات الشراكة والمطالبة بالحصص والأرباح غير المؤداة.",
            "قضايا المنافسة غير المشروعة وانتهاك العلامات التجارية.",
          ],
          en: [
            "Representing clients in commercial disputes before Commercial Courts at all levels.",
            "Breach of commercial contracts and compensation claims.",
            "Partnership disputes and claims for unpaid shares and profits.",
            "Unfair competition and trademark infringement cases.",
          ]
        },
      },
      {
        iconName: "IconBuilding",
        title: { ar: "الإفلاس والإعسار التجاري", en: "Bankruptcy & Insolvency" },
        items: {
          ar: [
            "تقديم طلبات الإفلاس والإعسار وفق نظام الإفلاس السعودي.",
            "تمثيل الدائنين في إجراءات الإفلاس واسترداد الديون.",
            "إعادة الهيكلة المالية والتفاوض مع الدائنين للوصول إلى تسوية.",
            "متابعة إجراءات التصفية وتوزيع الأصول على الدائنين.",
          ],
          en: [
            "Filing bankruptcy and insolvency petitions under Saudi Bankruptcy Law.",
            "Representing creditors in bankruptcy proceedings and debt recovery.",
            "Financial restructuring and negotiating with creditors to reach settlement.",
            "Following up on liquidation proceedings and asset distribution to creditors.",
          ]
        },
      },
    ],
  },
  {
    slug: "labor",
    tab: { ar: "القضايا العمالية", en: "Labor Cases" },
    subs: [
      {
        iconName: "IconUsers",
        title: { ar: "نزاعات العمل والتوظيف", en: "Labor & Employment Disputes" },
        items: {
          ar: [
            "تمثيل العمال وأصحاب العمل أمام محاكم العمل بكافة درجاتها.",
            "قضايا إنهاء الخدمة والفصل التعسفي والمطالبة بالتعويض.",
            "المطالبة بالأجور المتأخرة والمستحقات العمالية والمكافآت.",
            "قضايا إصابات العمل والتعويض عنها.",
          ],
          en: [
            "Representing workers and employers before Labor Courts at all levels.",
            "Wrongful termination and dismissal cases and compensation claims.",
            "Claims for delayed wages, labor entitlements, and bonuses.",
            "Workplace injury cases and related compensation.",
          ]
        },
      },
      {
        iconName: "IconDocument",
        title: { ar: "الاستشارات العمالية والامتثال", en: "Labor Consulting & Compliance" },
        items: {
          ar: [
            "مراجعة عقود العمل وأنظمة الموارد البشرية وضمان توافقها مع نظام العمل.",
            "وضع السياسات والإجراءات الداخلية المتوافقة مع الأنظمة العمالية.",
            "تقديم المشورة بشأن متطلبات السعودة ونظام حماية الأجور (WPS).",
            "إعداد أنظمة الأداء والجزاءات التأديبية وفق النظام.",
          ],
          en: [
            "Reviewing employment contracts and HR policies for compliance with Labor Law.",
            "Developing internal policies and procedures aligned with labor regulations.",
            "Advising on Saudization requirements and the Wage Protection System (WPS).",
            "Preparing performance and disciplinary systems in accordance with the law.",
          ]
        },
      },
    ],
  },
  {
    slug: "corporate",
    tab: { ar: "الشركات والتحكيم", en: "Corporate & Arbitration" },
    subs: [
      {
        iconName: "IconHandshake",
        title: { ar: "قضايا الشركات والحوكمة", en: "Corporate Cases & Governance" },
        items: {
          ar: [
            "تأسيس الشركات وإعداد العقود التأسيسية والأنظمة الأساسية.",
            "إعادة هيكلة الشركات وتغيير هياكل الملكية والإدارة.",
            "نزاعات المساهمين والشركاء وقضايا الغش التجاري.",
            "عمليات الاندماج والاستحواذ وإجراءات الفحص القانوني الشامل.",
            "حوكمة الشركات والامتثال التنظيمي ومتطلبات هيئة السوق المالية.",
          ],
          en: [
            "Company formation and preparation of founding agreements and articles of association.",
            "Corporate restructuring and changes to ownership and management structures.",
            "Shareholder and partner disputes and commercial fraud cases.",
            "M&A transactions and comprehensive legal due diligence.",
            "Corporate governance, regulatory compliance, and CMA requirements.",
          ]
        },
      },
      {
        iconName: "IconScales",
        title: { ar: "التحكيم التجاري المحلي والدولي", en: "Local & International Arbitration" },
        items: {
          ar: [
            "تمثيل الأطراف أمام هيئات التحكيم التجاري المحلية والدولية.",
            "التحكيم في النزاعات الاستثمارية والتجارية ذات الطابع الدولي.",
            "إعداد شروط التحكيم في العقود والاتفاقيات لحماية مصالح العميل.",
            "تنفيذ أحكام التحكيم المحلية وفق نظام التحكيم السعودي.",
            "تنفيذ أحكام التحكيم الدولية وفق اتفاقية نيويورك.",
          ],
          en: [
            "Representing parties before local and international commercial arbitration tribunals.",
            "Arbitration in investment and international commercial disputes.",
            "Drafting arbitration clauses in contracts and agreements to protect client interests.",
            "Enforcing local arbitration awards under Saudi Arbitration Law.",
            "Enforcing international arbitration awards under the New York Convention.",
          ]
        },
      },
    ],
  },
];

export const getServiceDetailApi = async (slug: string): Promise<ServiceDetailUnit | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MOCK_SERVICE_DETAILS.find((s) => s.slug === slug);
      resolve(data);
    }, 600);
  });
};

export const getAllServiceSlugsApi = async (): Promise<{slug: string, tab: {ar: string, en: string}}[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tabs = MOCK_SERVICE_DETAILS.map(s => ({ slug: s.slug, tab: s.tab }));
      resolve(tabs);
    }, 400);
  });
};