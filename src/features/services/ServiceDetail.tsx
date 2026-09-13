import { useParams, useNavigate, Link } from "react-router-dom"; // تم التعديل
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useServiceDetail, useServiceTabs } from "./hooks/useServiceDetail";
import deskImg from "@/imports/________.jpg.jpeg";

// Map string names from API to actual React components
import {
  IconScales, IconGavel, IconDocument, IconBriefcase,
  IconUsers, IconHandshake, IconShield, IconBuilding,
} from "@/components/Icons";

const IconMap: Record<string, React.ElementType> = {
  IconScales, IconGavel, IconDocument, IconBriefcase,
  IconUsers, IconHandshake, IconShield, IconBuilding,
};

const noto = "'Noto Kufi Arabic', sans-serif";
const ibm = "'IBM Plex Sans Arabic', sans-serif";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('services');
  const { isAr } = useLangStore();

  // جلب التفاصيل للـ slug الحالي
  const { data: activeUnit, isLoading: isUnitLoading } = useServiceDetail(slug || 'consultations');
  // جلب قائمة الـ Tabs (لشريط التنقل)
  const { data: tabs, isLoading: isTabsLoading } = useServiceTabs();

  // Helper functions لفك الترجمة من الـ API
  const l = (field: { ar: string, en: string } | undefined) => {
    if (!field) return '';
    return isAr ? field.ar : field.en;
  };

  const lArr = (field: { ar: string[], en: string[] } | undefined) => {
    if (!field) return [];
    return isAr ? field.ar : field.en;
  };

  if (isUnitLoading || isTabsLoading) {
     return <div style={{ minHeight: "100vh", background: "#111a11" }} />; 
  }

  // Fallback in case of invalid slug
  if (!activeUnit) {
    navigate('/services', { replace: true });
    return null;
  }

  return (
    <div>
      <style>{`
        .svc-tab { cursor: pointer; padding: 0 1.25rem; height: 56px; display: flex; align-items: center; border: none; background: transparent; white-space: nowrap; position: relative; transition: color 0.2s; font-family: ${ibm}; font-size: 0.85rem; flex-shrink: 0; }
        .svc-tab:hover { color: #f4efe5 !important; }
        .svc-tab.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #b8962e; }
        .svc-tab-bar { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; display: flex; }
        .svc-tab-bar::-webkit-scrollbar { display: none; }
        .svc-sub-row { display: grid; grid-template-columns: 260px 1fr; gap: 3rem; padding: 3.5rem 0; border-bottom: 1px solid #e9e5de; align-items: start; }
        @media (max-width: 768px) {
          .svc-sub-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 2rem 0 !important; }
          .svc-sub-row > div:first-child { flex-direction: row !important; align-items: center !important; gap: 1rem !important; }
          .svc-tab { padding: 0 0.85rem !important; font-size: 0.78rem !important; }
        }
        @media (max-width: 480px) {
          .svc-tab { padding: 0 0.65rem !important; font-size: 0.72rem !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ position: "relative", background: "#111a11", overflow: "hidden", padding: "6rem 1.5rem 0" }}>
        <img src={deskImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(17,26,17,0.97) 40%, rgba(17,26,17,0.75))" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "1.5rem", justifyContent: "flex-start" }}>
            <Link to="/" style={{ fontFamily: ibm, color: "rgba(237,228,211,0.45)", fontSize: 13, textDecoration: "none" }}>{t('hero.home')}</Link>
            <span style={{ color: "rgba(237,228,211,0.25)" }}>/</span>
            <Link to="/services" style={{ fontFamily: ibm, color: "rgba(237,228,211,0.45)", fontSize: 13, textDecoration: "none" }}>{t('hero.title')}</Link>
            <span style={{ color: "rgba(237,228,211,0.25)" }}>/</span>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.35)", fontSize: 13 }}>
              {l(activeUnit.tab)}
            </span>
          </div>
          <h1 style={{ fontFamily: noto, fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f4efe5", lineHeight: 1.2, marginBottom: "1rem", textAlign: "start" }}>
            {t('hero.title')}
          </h1>
          <p style={{ fontFamily: ibm, fontSize: "clamp(0.85rem, 1.3vw, 1rem)", color: "rgba(237,228,211,0.6)", lineHeight: 1.9, textAlign: "start", marginBottom: "2.5rem" }}>
            {t('hero.detailSubtitle', 'الشركة مؤسسة لتولي القضايا والاستشارات النوعية والكبيرة، وتشكّل من ثلاث وحدات عمل متخصصة.')}
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ position: "relative", borderTop: "1px solid rgba(184,150,46,0.15)" }}>
          <div className="svc-tab-bar" style={{ maxWidth: 1200, margin: "0 auto" }}>
            {tabs?.map((u) => {
              const isActive = u.slug === activeUnit.slug;
              return (
                <button
                  key={u.slug}
                  className={`svc-tab${isActive ? " active" : ""}`}
                  onClick={() => navigate(`/services/${u.slug}`)}
                  style={{ color: isActive ? "#f4efe5" : "rgba(237,228,211,0.45)", fontWeight: isActive ? 600 : 400 }}
                >
                  {l(u.tab)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#faf8f4", minHeight: "60vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 3.5rem)" }}>
          {activeUnit.subs.map((sub, i) => {
            const Icon = IconMap[sub.iconName] || IconDocument; // Fallback icon
            const items = lArr(sub.items);
            return (
              <div key={i} className="svc-sub-row">
                {/* Right: icon + title */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.25rem" }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: "#1e2818",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={28} color="#b8962e" strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontFamily: noto,
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                      color: "#1e2818",
                      lineHeight: 1.5,
                      textAlign: "start",
                    }}
                  >
                    {l(sub.title)}
                  </h3>
                </div>

                {/* Left: bullet list */}
                <ul style={{ listStyle: "disc", paddingInlineStart: "1.25rem", paddingInlineEnd: 0, display: "flex", flexDirection: "column", gap: "0.85rem", margin: 0, paddingTop: "0.25rem" }}>
                  {items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: ibm,
                        fontSize: "clamp(0.83rem, 1.1vw, 0.92rem)",
                        color: "#3a3a32",
                        lineHeight: 1.9,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#1e2818", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: ibm, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", color: "#b8962e", marginBottom: "1rem" }}>
          {t('cta.tag')}
        </p>
        <h2 style={{ fontFamily: noto, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: "#f5edd8", marginBottom: "2rem" }}>
          {t('cta.needConsultation', 'هل تحتاج إلى استشارة قانونية؟')}
        </h2>
        <Link
          to="/contact"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0.85rem 2.5rem", background: "#b8962e", color: "#1e2818", fontFamily: ibm, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}
        >
          {t('cta.contactNow', 'تواصل معنا الآن')}
        </Link>
      </div>
    </div>
  );
}