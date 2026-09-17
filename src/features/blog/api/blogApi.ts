import api from '@/utils/axios';

// تحديث הـ Type عشان يشمل الحقول المطلوبة للـ UI بتاعك
export interface BlogPost {
  id: string;
  title: { ar: string, en: string };
  cat: { ar: string, en: string };
  date: { ar: string, en: string };
  readTime: { ar: string, en: string };
  excerpt: { ar: string, en: string }; // مفيش excerpt في الباك، فناخده من البودي
  body: { ar: string, en: string }; // محتوى المقال
  author: { ar: string, en: string };
  img: string;
  slug: string;
}

export const getBlogListApi = async (lang: string) => {
  // بنبعت اللغة في ההـ Header لتفادي הـ 400 Bad Request
  const res = await api.get('/api/v1/blog', {
    headers: { 'Accept-Language': lang }
  });
  return res.data.data || res.data;
};