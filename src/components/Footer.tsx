import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useSiteSettings } from "@/features/settings/hooks/useSiteSettings";
import Logo from "@/components/Logo";

// مصفوفات احتياطية في حالة عدم وجود الترجمة
const fallbackServices = [
  "الاستشارات القانونية",
  "الترافع والتمثيل القضائي",
  "صياغة العقود",
  "القضايا التجارية",
  "القضايا العمالية",
  "التحكيم",
];

const fallbackLinks = [
  { label: "من نحن", path: "/about" },
  { label: "فريق العمل", path: "/team" },
  { label: "المدونة", path: "/blog" },
  { label: "موقعنا", path: "/locations" },
  { label: "سياسة الخصوصية", path: "/privacy" },
  { label: "الشروط والأحكام", path: "/terms" },
];

export default function Footer() {
  const { t } = useTranslation('common');
  const { isAr } = useLangStore();
  const { data: settings } = useSiteSettings();

  // جلب العناصر من الترجمة، واستخدام الاحتياطي إذا فشل الجلب أو لم يكن مصفوفة
  const translatedServices = t('footer.servicesList', { returnObjects: true });
  const services = Array.isArray(translatedServices) ? translatedServices : fallbackServices;

  const translatedLinks = t('footer.quickLinks', { returnObjects: true });
  const links = Array.isArray(translatedLinks) ? translatedLinks : fallbackLinks;

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
          {/* Brand */}
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
              {t('footer.description', isAr ? "شركة مهنية تجمع بين الخبرة القانونية والرؤية العملية، نقدم خدمات قانونية متكاملة تلتزم بأعلى معايير الجودة والاحتراف." : "A professional firm combining legal expertise with practical vision...")}
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

          {/* Services */}
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
              {t('footer.ourServices', isAr ? "خدماتنا" : "Our Services")}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {services.map((s) => (
                <li key={typeof s === 'string' ? s : s.toString()}>
                  <Link
                    to="/services"
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
                    {typeof s === 'string' ? s : s.toString()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
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
              {t('footer.quickLinksTitle', isAr ? "روابط سريعة" : "Quick Links")}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
              {links.map((l: any) => (
                <li key={l.path}>
                  <Link
                    to={l.path || "#"}
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
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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
              {t('footer.contactUs', isAr ? "تواصل معنا" : "Contact Us")}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: "📍", text: settings ? (isAr ? settings.riyadhAddress.ar : settings.riyadhAddress.en) : "..." },
                { icon: "📞", text: settings?.phone || "..." },
                { icon: "✉️", text: settings?.email || "..." },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.85rem", marginTop: "0.1rem" }}>{icon}</span>
                  <span
                    style={{
                      color: "rgba(232,216,184,0.65)",
                      fontSize: "0.78rem",
                      lineHeight: 1.6,
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${settings?.whatsapp || ''}`}
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
              {t('footer.whatsapp', isAr ? "واتساب" : "WhatsApp")}
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
            {t('footer.copyright', { year: currentYear, defaultValue: isAr ? `© ${currentYear} وثاق الحق للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.` : `© ${currentYear} Wethaq Al-Haq Law Firm. All rights reserved.` })}
          </p>
          <p
            style={{
              color: "rgba(184,150,46,0.5)",
              fontSize: "0.7rem",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            }}
          >
            {t('footer.designedBy', isAr ? "تصميم وتطوير: Media Glow" : "Designed by: Media Glow")}
          </p>
        </div>
      </div>
    </footer>
  );
}