import { Link } from "react-router-dom";
import { useLangStore } from "@/store/useLangStore";
import { useSiteSettings } from "@/features/settings/hooks/useSiteSettings";
import { useServices } from "@/features/services/hooks/useServices"; // 👈 جلب الخدمات ديناميكياً من الباك إند
import Logo from "@/components/Logo";

// روابط سريعة ثابتة للمسارات الداخلية بالموقع
const quickLinks = [
  { label: { ar: "من نحن", en: "About Us" }, path: "/about" },
  { label: { ar: "فريق العمل", en: "Our Team" }, path: "/team" },
  { label: { ar: "المدونة", en: "Blog" }, path: "/blog" },
  { label: { ar: "موقعنا", en: "Locations" }, path: "/locations" },
];

export default function Footer() {
  const { isAr } = useLangStore();
  
  // 1. جلب إعدادات المكتب (العنوان، الهواتف، الوصف)
  const { data: settings } = useSiteSettings();
  
  // 2. جلب قائمة الخدمات الحقيقية من الداتابيز
  const { data: servicesList } = useServices();

  const l = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return isAr ? field.ar : field.en;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#111a11",
        borderTop: "1px solid rgba(184,150,46,0.2)",
        paddingTop: "4rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
          }}
        >
          {/* Brand & Description */}
          <div>
            <Logo size="md" withText={true} />
            <p
              style={{
                marginTop: "1.25rem",
                color: "rgba(232,216,184,0.65)",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              {settings?.tagline ? l(settings.tagline) : (isAr ? "شركة مهنية تجمع بين الخبرة القانونية والرؤية العملية، نقدم خدمات قانونية متكاملة." : "A professional firm combining legal expertise with practical vision.")}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {["tw", "li", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 34,
                    height: 34,
                    border: "1px solid rgba(184,150,46,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#b8962e",
                    transition: "all 0.2s",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  {s === "tw" ? "𝕏" : s === "li" ? "in" : "ig"}
                </a>
              ))}
            </div>
          </div>

          {/* Services (Dynamic from DB) */}
          <div>
            <h4
              style={{
                color: "#b8962e",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              {isAr ? "خدماتنا" : "Our Services"}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {servicesList && servicesList.length > 0 ? (
                servicesList.slice(0, 6).map((service: any) => (
                  <li key={service.slug || service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      style={{
                        color: "rgba(232,216,184,0.65)",
                        fontSize: "0.8rem",
                        textDecoration: "none",
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(232,216,184,0.65)")}
                    >
                      {l(service.title)}
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.8rem" }}>{isAr ? "جاري تحميل الخدمات..." : "Loading services..."}</li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#b8962e",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {quickLinks.map((lItem) => (
                <li key={lItem.path}>
                  <Link
                    to={lItem.path}
                    style={{
                      color: "rgba(232,216,184,0.65)",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(232,216,184,0.65)")}
                  >
                    {l(lItem.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Dynamic from Settings DB) */}
          <div>
            <h4
              style={{
                color: "#b8962e",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              {isAr ? "تواصل معنا" : "Contact Us"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { 
                  icon: "📍", 
                  text: settings?.riyadhAddress ? l(settings.riyadhAddress) : (isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, KSA")
                },
                { 
                  icon: "📞", 
                  text: settings?.phone || "+966 11 000 0000" 
                },
                { 
                  icon: "✉️", 
                  text: settings?.email || "info@wethaqalhaq.com" 
                },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.85rem", marginTop: "0.1rem" }}>{icon}</span>
                  <span
                    style={{
                      color: "rgba(232,216,184,0.65)",
                      fontSize: "0.78rem",
                      lineHeight: 1.6,
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      direction: icon === "📞" ? "ltr" : "inherit"
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${settings?.whatsapp || settings?.phone || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                marginTop: "1.25rem",
                display: "inline-flex",
                fontSize: "0.8rem",
                padding: "0.6rem 1.25rem",
                textDecoration: "none"
              }}
            >
              {isAr ? "واتساب" : "WhatsApp"}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(232,216,184,0.08)",
            padding: "1.25rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              color: "rgba(232,216,184,0.4)",
              fontSize: "0.75rem",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            }}
          >
            {isAr ? `© ${currentYear} ${settings ? l(settings.officeName) : "وثاق الحق"} للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.` : `© ${currentYear} ${settings ? l(settings.officeName) : "Wethaq Al-Haq"} Law Firm. All rights reserved.`}
          </p>
          <p
            style={{
              color: "rgba(184,150,46,0.5)",
              fontSize: "0.7rem",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            }}
          >
            {isAr ? "تصميم وتطوير: Media Glow" : "Designed by: Media Glow"}
          </p>
        </div>
      </div>
    </footer>
  );
}