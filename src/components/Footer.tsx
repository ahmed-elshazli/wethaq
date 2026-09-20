import { Link } from "react-router-dom";
import { useLangStore } from "@/store/useLangStore";
import { useSiteSettings } from "@/features/settings/hooks/useSiteSettings";
import { useServices } from "@/features/services/hooks/useServices";
import { useLocations } from "@/features/locations/hooks/useLocations"; 
import Logo from "@/components/Logo";
import { IconPhone, IconMail, IconBuilding } from "@/components/Icons";

const quickLinks = [
  { ar: "من نحن", en: "About Us", path: "/about" },
  { ar: "فريق العمل", en: "Our Team", path: "/team" },
  { ar: "المدونة", en: "Blog", path: "/blog" },
  { ar: "موقعنا", en: "Locations", path: "/locations" },
];

export default function Footer() {
  const { isAr } = useLangStore();
  
  // 1. الإعدادات (للهواتف، الإيميل، الواتساب)
  const { data: settingsRes } = useSiteSettings();
  const settings = settingsRes?.data || settingsRes || {};

  // 2. الفروع (للعنوان الرئيسي)
  const { data: locationsRes } = useLocations(); 
  const locations = (locationsRes as any)?.data || locationsRes || [];
  
  // تحديد الفرع الرئيسي بناءً على أقل رقم في الـ order
  const mainBranch = locations.length > 0 
    ? [...locations].sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999))[0]
    : {};

  const { data: servicesList } = useServices();

  const getText = (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      return String(isAr ? (field.ar || field.en || '') : (field.en || field.ar || ''));
    }
    return String(field);
  };

  const currentYear = new Date().getFullYear();
  const rawWhatsapp = typeof settings?.whatsapp === 'string' ? settings.whatsapp : '';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  const officeNameStr = getText(settings?.officeName) || (isAr ? "وثاق الحق" : "Wethaq Al-Haq");

  // استخراج البيانات المطلوبة
  const displayPhone = settings?.mainPhone || '';
  const displayPhone2 = settings?.extraPhone || '';
  const displayEmail = settings?.email || '';
  const displayAddress = mainBranch.address || '';
  const branchName = mainBranch.city || mainBranch.name || '';

  return (
    <footer style={{ background: "#111a11", borderTop: "1px solid rgba(184,150,46,0.2)", paddingTop: "4rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", paddingBottom: "3rem" }}>
          
          {/* قسم اللوجو */}
          <div>
            <Logo size="md" withText={true} />
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {["tw", "li", "ig"].map((s) => (
                <a key={s} href="#" style={{ width: 34, height: 34, border: "1px solid rgba(184,150,46,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8962e", transition: "all 0.2s", fontSize: "0.7rem", fontWeight: 600, textDecoration: "none" }}>
                  {s === "tw" ? "𝕏" : s === "li" ? "in" : "ig"}
                </a>
              ))}
            </div>
          </div>

          {/* الخدمات */}
          <div>
            <h4 style={{ color: "#b8962e", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1.25rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              {isAr ? "خدماتنا" : "Our Services"}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {servicesList && servicesList.length > 0 ? (
                servicesList.slice(0, 6).map((service: any) => (
                  <li key={service.slug || service._id || Math.random()}>
                    <Link to={`/services/${service.slug}`} style={{ color: "rgba(232,216,184,0.65)", fontSize: "0.8rem", textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif", transition: "color 0.2s" }}>
                      {getText(service.name || service.title)}
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.8rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{isAr ? "جاري التحميل..." : "Loading..."}</li>
              )}
            </ul>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 style={{ color: "#b8962e", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1.25rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {quickLinks.map((lItem) => (
                <li key={lItem.path}>
                  <Link to={lItem.path} style={{ color: "rgba(232,216,184,0.65)", fontSize: "0.8rem", textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif", transition: "color 0.2s" }}>
                    {isAr ? lItem.ar : lItem.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل معنا */}
          <div style={{ flex: "1.5" }}>
            <h4 style={{ color: "#b8962e", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1.25rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              {isAr ? "تواصل معنا" : "Contact Us"}
            </h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              {/* عرض العنوان من الفرع الرئيسي */}
              {displayAddress && (
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.85rem", marginTop: "0.1rem", color: "#b8962e" }}><IconBuilding size={16} /></span>
                  <span style={{ color: "#c9a84c", fontSize: "0.78rem", fontWeight: 600, fontFamily: "'IBM Plex Sans Arabic', sans-serif", whiteSpace: "nowrap" }}>
                    {branchName}:
                  </span>
                  <span style={{ color: "rgba(232,216,184,0.65)", fontSize: "0.78rem", lineHeight: 1.6, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                    {displayAddress}
                  </span>
                </div>
              )}

              <div style={{ height: "1px", background: "rgba(184,150,46,0.15)", margin: "0.5rem 0" }} />
              
              {/* عرض الهواتف والإيميل من الـ Settings */}
              {[
                { icon: <IconPhone size={16} />, text: displayPhone },
                { icon: <IconPhone size={16} />, text: displayPhone2 },
                { icon: <IconMail size={16} />, text: displayEmail },
              ].filter(item => item.text).map(({ icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ color: "#b8962e" }}>{icon}</span>
                  <span style={{ color: "rgba(232,216,184,0.65)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", direction: "ltr" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {cleanWhatsapp && (
              <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex", fontSize: "0.8rem", padding: "0.6rem 1.25rem", textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                {isAr ? "واتساب" : "WhatsApp"}
              </a>
            )}
          </div>
        </div>

        {/* الحقوق */}
        <div style={{ borderTop: "1px solid rgba(232,216,184,0.08)", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.75rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
            {isAr ? `© ${currentYear} ${officeNameStr} للمحاماة. جميع الحقوق محفوظة.` : `© ${currentYear} ${officeNameStr} Law Firm. All rights reserved.`}
          </p>
          <p style={{ color: "rgba(184,150,46,0.5)", fontSize: "0.7rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
            {isAr ? "تصميم وتطوير: Media Glow" : "Designed by: Media Glow"}
          </p>
        </div>
      </div>
    </footer>
  );
}