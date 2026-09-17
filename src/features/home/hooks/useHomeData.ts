import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import {
  getHomeHeroApi, getHomeAboutApi, getHomeStatsApi,
  getHomeServicesApi, getHomeWhyUsApi, getHomeTeamApi,
  getHomeBlogApi, getHomeContactCtaApi
} from '../api/homeApi';

export const useHomeData = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['home-data', lang],
    queryFn: async () => {
      // بنعمل كل الطلبات بالتوازي لسرعة الأداء
      // استخدمنا Promise.allSettled عشان لو موديول واحد وقع (مثلاً الـ Hero لسه معملوش Setup ورجع 404) 
      // ميبوظش باقي الصفحة
      const results = await Promise.allSettled([
        getHomeHeroApi(lang),
        getHomeAboutApi(lang),
        getHomeStatsApi(lang),
        getHomeServicesApi(lang),
        getHomeWhyUsApi(lang),
        getHomeTeamApi(lang),
        getHomeBlogApi(lang),
        getHomeContactCtaApi(lang)
      ]);

      // الداتا اللي بترجع من الـ API بتكون مسطحة (String) عشان إحنا باعتين lang
      // بس الـ UI عندك في بعض الأماكن لسه بيستخدم دالة l() اللي بتستنى { ar, en }
      // عشان كده هنغلف الـ String اللي راجع في Object وهمي يرضي دالة l() في الـ UI بتاعك
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      const heroRes = results[0].status === 'fulfilled' ? results[0].value : null;
      const aboutRes = results[1].status === 'fulfilled' ? results[1].value : null;
      const statsRes = results[2].status === 'fulfilled' ? results[2].value : [];
      const servicesRes = results[3].status === 'fulfilled' ? results[3].value : [];
      const whyUsRes = results[4].status === 'fulfilled' ? results[4].value : [];
      const teamRes = results[5].status === 'fulfilled' ? results[5].value : [];
      const blogRes = results[6].status === 'fulfilled' ? results[6].value : [];
      const ctaRes = results[7].status === 'fulfilled' ? results[7].value : null;

      return {
        hero: {
          tag: wrap(heroRes?.tag),
          h1a: wrap(heroRes?.headingLine1),
          // h1bPre, h1bHighlight, h1bRest دول إنت حاططهم في الترجمة، مش من الـ API
          subtitle: wrap(heroRes?.subtitle),
          cta1: wrap(heroRes?.button1Text),
          cta2: wrap(heroRes?.button2Text),
        },
        about: {
          tag: wrap(aboutRes?.tag),
          heading: wrap(aboutRes?.heading),
          p1: wrap(aboutRes?.paragraph1),
          p2: wrap(aboutRes?.paragraph2),
        },
        
        services: servicesRes.map((s: any) => ({
          id: s._id,
          title: wrap(s.name), // الـ UI مسميها title، بس في الـ API اسمها name
          desc: wrap(s.description),
          slug: s.slug
        })),
        stats: statsRes.map((s: any) => ({
          id: s._id, // 👈 ضفنا الـ ID هنا
          n: s.value, 
          label: wrap(s.label)
        })),
        // ... (services زي ما هي)
        whyUs: whyUsRes.map((w: any) => ({
          id: w._id, // 👈 وضفنا الـ ID هنا
          title: w.title, 
          desc: w.description
        })),
        team: teamRes.map((t: any) => ({
          id: t._id,
          name: wrap(t.name),
          role: wrap(t.role),
          spec: wrap(t.speciality),
          exp: wrap(t.experience),
          image: t.image // 👈 ضفنا سطر الصورة هنا
        })),
        blog: blogRes.map((b: any) => ({
          id: b._id,
          title: wrap(b.title),
          cat: wrap(b.category),
          date: wrap(b.date),
          image: b.image,
          slug: b.slug
        })),
        cta: {
          heading: wrap(ctaRes?.heading),
          body: wrap(ctaRes?.body),
          btn1: wrap(ctaRes?.button1Text),
          btn2: wrap(ctaRes?.button2Text),
          whatsapp: ctaRes?.socialLinks?.whatsapp // أو من settings، حسب المطلوب
        }
      };
    },
    // مش بنعمل Retry للـ 404
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    }
  });
};