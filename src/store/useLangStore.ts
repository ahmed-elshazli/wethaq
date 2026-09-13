import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n';

type Lang = 'ar' | 'en';

interface LangState {
  lang: Lang;
  isAr: boolean;
  dir: 'rtl' | 'ltr';
  toggle: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: 'ar',
      isAr: true,
      dir: 'rtl',
      toggle: () => {
        const next = get().lang === 'ar' ? 'en' : 'ar';
        const isAr = next === 'ar';
        const dir = isAr ? 'rtl' : 'ltr';

        // تحديث الـ DOM مباشرة
        document.documentElement.dir = dir;
        document.documentElement.lang = next;

        // مزامنة اللغة مع i18next
        if (i18n.isInitialized) {
          i18n.changeLanguage(next);
        }

        set({ lang: next, isAr, dir });
      },
    }),
    {
      name: 'wethaq_lang',
      // تطبيق الاتجاه واللغة فور استرجاع البيانات من الـ LocalStorage عند تحميل الصفحة
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.dir = state.dir;
          document.documentElement.lang = state.lang;
          // مزامنة i18next مع اللغة المحفوظة
          if (i18n.isInitialized) {
            i18n.changeLanguage(state.lang);
          } else {
            i18n.on('initialized', () => i18n.changeLanguage(state.lang));
          }
        }
      },
    }
  )
);