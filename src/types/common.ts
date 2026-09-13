export interface LocalizedString {
  ar: string;
  en: string;
}

export interface SiteSettings {
  officeName: LocalizedString;
  tagline: LocalizedString;
  phone: string;
  phone2: string;
  email: string;
  whatsapp: string;
  address: LocalizedString;
  riyadhAddress: LocalizedString;
  jeddahAddress: LocalizedString;
  dammamAddress: LocalizedString;
}

// يمكن استخدام هذه الأنواع المشتركة لاحقاً في الـ Feature Types