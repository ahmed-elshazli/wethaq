import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getTeamApi } from '../api/teamApi';
import api from '@/utils/axios';

const getSettingsApi = async (lang: string) => {
  try {
    const res = await api.get('/api/v1/settings', { headers: { 'Accept-Language': lang } });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const useTeam = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['team-page', lang],
    queryFn: async () => {
      const [teamRes, settingsRes] = await Promise.all([
        getTeamApi(lang),
        getSettingsApi(lang)
      ]);
      
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      if (!teamRes || teamRes.length === 0) return null;

      // 🔴 التأكد من وجود قيم افتراضية قوية لو الـ settings مرجعتش
      const officeEmail = settingsRes?.email || "info@wethaq.com";
      const officePhone = settingsRes?.mainPhone || "+966 11 456 7890";
      const officeWhatsapp = settingsRes?.whatsapp || officePhone; 

      const formattedTeam = teamRes.map((m: any) => ({
        id: m._id,
        name: wrap(m.name),
        role: wrap(m.role),
        bio: wrap(m.speciality || m.experience), 
        label: wrap(m.experience),
        img: m.image,
        phone: officePhone, 
        email: officeEmail,
        whatsapp: officeWhatsapp
      }));

      const featured = formattedTeam[0];
      const members = formattedTeam.slice(1);

      return { 
        featured, 
        members, 
        // 🔴 تمرير الـ settings بشكل آمن جداً
        settings: { 
          email: officeEmail, 
          phone: officePhone, 
          whatsapp: officeWhatsapp 
        } 
      };
    },
    retry: 1
  });
};