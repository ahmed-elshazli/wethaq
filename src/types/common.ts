export interface LocalizedString {
  ar: string;
  en: string;
}

export interface SiteSettings {
  _id?: string;
  officeName: string;
  tagline: string;
  mainPhone?: string;
  extraPhone?: string;
  email?: string;
  whatsapp?: string;
  riyadhAddress?: string;
  jeddahAddress?: string;
  dammamAddress?: string;
  address?: string; // لو بتستخدمه في صفحة Contact
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}