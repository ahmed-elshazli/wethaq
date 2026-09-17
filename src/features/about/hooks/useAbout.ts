import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import api from '@/utils/axios';

export const useAbout = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['about-page', lang],
    queryFn: async () => {
      // 1. جلب داتا About
      const aboutRes = await api.get('/api/v1/about-us', { headers: { 'Accept-Language': lang } }).catch(() => ({ data: null }));
      // 2. جلب داتا Why Us
      const whyRes = await api.get('/api/v1/why-us', { headers: { 'Accept-Language': lang } }).catch(() => ({ data: null }));
      // 3. 👈 جلب داتا الشركاء الحقيقية من الداشبورد
      const partnersRes = await api.get('/api/v1/partners', { headers: { 'Accept-Language': lang } }).catch(() => ({ data: null }));

      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      return {
        aboutData: {
          tag: wrap(aboutRes.data?.tag),
          heading: wrap(aboutRes.data?.heading),
          p1: wrap(aboutRes.data?.paragraph1),
          p2: wrap(aboutRes.data?.paragraph2),
          vision: wrap(aboutRes.data?.vision),
          mission: wrap(aboutRes.data?.mission),
          values: wrap(aboutRes.data?.values),
          image: aboutRes.data?.image
        },
        whyUsData: (whyRes.data?.data || whyRes.data)?.map((w: any) => ({
          id: w._id,
          title: wrap(w.title),
          desc: wrap(w.description)
        })) || [],
        
        // 👈 Mapping لبيانات الشركاء الحقيقية (الاسم والصورة)
        partnersData: (partnersRes.data?.data || []).map((p: any) => ({
          id: p._id,
          name: p.name,       // لاحظ إن الباك إند باعتها String مش {ar, en} حسب الـ JSON بتاعك
          logo: p.image       // سحبنا الصورة من Cloudinary 
        }))
      };
    },
    retry: 1
  });
};