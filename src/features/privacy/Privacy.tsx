import { useTranslation } from "react-i18next";


export default function Privacy() {
  const { t } = useTranslation('privacy');

  // جلب الأقسام من ملف الترجمة (privacy.json)
  const sections = t('sections', { returnObjects: true }) as { title: string, content: string }[];

  return (
    <div>
      <div style={{ padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#f5edd8" }}>
            {t('pageTitle')}
          </h1>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>
      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {sections?.map((s) => (
            <div key={s.title} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#b8962e", fontSize: "1rem", marginBottom: "0.75rem" }}>
                {s.title}
              </h2>
              <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.7)", fontSize: "0.88rem", lineHeight: 2 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}