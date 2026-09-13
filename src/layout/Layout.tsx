import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLangStore } from '@/store/useLangStore';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
// ❌ تم إزالة استيراد AdminBar لأنه يخص Project B (الداشبورد)

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
}

function DynamicTitle() {
  const { pathname } = useLocation();
  const { isAr } = useLangStore();

  useEffect(() => {
    const baseTitle = isAr ? 'وثاق الحق للمحاماة والاستشارات القانونية' : 'Wethaq Al-Haq Law Firm';
    let pageTitle = '';

    if (pathname === '/') pageTitle = isAr ? 'الرئيسية' : 'Home';
    else if (pathname.startsWith('/about')) pageTitle = isAr ? 'من نحن' : 'About Us';
    else if (pathname.startsWith('/services')) pageTitle = isAr ? 'الخدمات' : 'Services';
    else if (pathname.startsWith('/team')) pageTitle = isAr ? 'فريق العمل' : 'Team';
    else if (pathname.startsWith('/blog')) pageTitle = isAr ? 'المدونة' : 'Blog';
    else if (pathname.startsWith('/locations')) pageTitle = isAr ? 'الفروع' : 'Locations';
    else if (pathname.startsWith('/contact')) pageTitle = isAr ? 'اتصل بنا' : 'Contact Us';
    else if (pathname.startsWith('/privacy')) pageTitle = isAr ? 'سياسة الخصوصية' : 'Privacy Policy';
    else if (pathname.startsWith('/terms')) pageTitle = isAr ? 'الشروط والأحكام' : 'Terms & Conditions';

    document.title = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
  }, [pathname, isAr]);
  
  return null;
}

export default function Layout() {
  const { dir, lang } = useLangStore();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  return (
    <>
      <ScrollToTop />
      <DynamicTitle />
      <Header />
      <main style={{ paddingTop: 80 }} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}