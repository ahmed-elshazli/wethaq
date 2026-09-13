import { Link } from "react-router-dom"; // تم التعديل
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore"; // تم التعديل
import { useServices } from "./hooks/useServices"; // تم الاستيراد
import deskImg from "@/imports/________.jpg.jpeg";

const noto = "'Noto Kufi Arabic', sans-serif";
const ibm = "'IBM Plex Sans Arabic', sans-serif";

export default function Services() {
  const { t } = useTranslation('services');
  const { isAr } = useLangStore();
  const { data: list, isLoading } = useServices(); // جلب البيانات

  // Helper function لفك البيانات حسب اللغة
  const l = (field: { ar: string, en: string }) => isAr ? field.ar : field.en;

  if (isLoading) {
    return <div style={{ minHeight: "100vh", background: "#111a11" }} />; // Loader بسيط
  }

  return (
    <div>
      <style>{`
        .svc-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 520px; }
        .svc-section.reverse .svc-text { order: 2; }
        .svc-section.reverse .svc-img { order: 1; }
        .svc-img { position: relative; overflow: hidden; }
        .svc-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .svc-section:hover .svc-img img { transform: scale(1.04); }
        .svc-text { display: flex; flex-direction: column; justify-content: center; padding: clamp(2rem, 6vw, 6rem) clamp(1.25rem, 5vw, 5rem); }
        @media (max-width: 768px) {
          .svc-section, .svc-section.reverse { grid-template-columns: 1fr !important; min-height: unset !important; }
          .svc-img { min-height: 260px; }
          .svc-section .svc-img { order: -1; }
          .svc-section.reverse .svc-img { order: -1; }
        }
        @media (max-width: 480px) {
          .svc-img { min-height: 220px; }
        }
      `}</style>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          background: "#111a11",
          overflow: "hidden",
          padding: "6rem 1.5rem 5rem",
          textAlign: "start",
        }}
      >
        <img
          src={deskImg}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(17,26,17,0.95) 40%, rgba(17,26,17,0.7))" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "1.5rem", justifyContent: "flex-start" }}>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.5)", fontSize: 13 }}>{t('hero.home')}</span>
            <span style={{ color: "rgba(237,228,211,0.3)" }}>/</span>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.4)", fontSize: 13 }}>{t('hero.title')}</span>
          </div>
          <h1
            style={{
              fontFamily: noto,
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#f4efe5",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            {t('hero.title')}
          </h1>
          <p
            style={{
              fontFamily: ibm,
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "rgba(237,228,211,0.65)",
              maxWidth: 560,
              marginInlineEnd: 0,
              marginInlineStart: "auto",
              lineHeight: 1.9,
            }}
          >
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Alternating service sections */}
      {list?.map((svc, i) => {
        const isEven = i % 2 === 0;
        const bg = isEven ? "#ffffff" : "#faf8f4";

        return (
          <div key={svc.id} className={`svc-section${isEven ? "" : " reverse"}`} style={{ background: bg }}>
            {/* Text */}
            <div className="svc-text">
              <span
                style={{
                  fontFamily: ibm,
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#b8962e",
                  display: "block",
                  marginBottom: "1.25rem",
                }}
              >
                {svc.label}
              </span>
              <h2
                style={{
                  fontFamily: noto,
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: "#1e2818",
                  lineHeight: 1.4,
                  marginBottom: "1.25rem",
                }}
              >
                {l(svc.title)}
              </h2>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: "#b8962e",
                  marginBottom: "1.5rem",
                }}
              />
              <p
                style={{
                  fontFamily: ibm,
                  fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                  color: "#5a6852",
                  lineHeight: 2,
                  marginBottom: "2.5rem",
                  maxWidth: 440,
                }}
              >
                {l(svc.desc)}
              </p>
              <Link
                to={`/services/${svc.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.8rem 2rem",
                  background: "#1e2818",
                  color: "#e8d8b8",
                  fontFamily: ibm,
                  fontWeight: 500,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#253325")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1e2818")}
              >
                {t('common:readMore', 'معرفة المزيد')}
                <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
                  <path d="M7 2.33L11.67 7L7 11.67" stroke="#b8962e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M2.33 7H11.67" stroke="#b8962e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>

            {/* Image */}
            <div className="svc-img">
              <img src={svc.img} alt={l(svc.title)} />
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <section
        style={{
          background: "#1e2818",
          borderTop: "1px solid rgba(184,150,46,0.2)",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <span
            style={{
              fontFamily: ibm,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#b8962e",
              display: "block",
              marginBottom: "1.25rem",
            }}
          >
            {t('cta.tag')}
          </span>
          <h2
            style={{
              fontFamily: noto,
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#f5edd8",
              marginBottom: "1rem",
              lineHeight: 1.4,
            }}
          >
            {t('cta.heading')}
          </h2>
          <p
            style={{
              fontFamily: ibm,
              color: "rgba(232,216,184,0.6)",
              fontSize: "0.9rem",
              lineHeight: 1.9,
              marginBottom: "2.5rem",
            }}
          >
            {t('cta.desc')}
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "0.85rem 2.5rem",
              background: "#b8962e",
              color: "#1e2818",
              fontFamily: ibm,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#c9a84c")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#b8962e")}
          >
            {t('cta.btn')}
          </Link>
        </div>
      </section>
    </div>
  );
}