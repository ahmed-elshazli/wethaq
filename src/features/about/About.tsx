import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useAbout } from "./hooks/useAbout";

const noto = "'Noto Kufi Arabic', sans-serif";
const ibm = "'IBM Plex Sans Arabic', sans-serif";

export default function About() {
  const { t } = useTranslation('common');
  const { isAr } = useLangStore();
  const { data, isLoading } = useAbout();

  const l = (field: { ar: string, en: string } | undefined) => {
    if (!field) return '';
    return isAr ? field.ar : field.en;
  };

  if (isLoading || !data) {
    return <div style={{ minHeight: "100vh", background: "#111a11" }} />;
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", background: "#111a11", overflow: "hidden", padding: "6rem 1.5rem 5rem", textAlign: "start" }}>
        
        {/* استخدمنا الصورة اللي جاية من الباك إند كخلفية */}
        {data.image && (
          <img src={data.image} alt={l(data.heading)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, pointerEvents: "none" }} />
        )}
        
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(17,26,17,0.95) 40%, rgba(17,26,17,0.7))" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "1.5rem", justifyContent: "flex-start" }}>
            <Link to="/" style={{ fontFamily: ibm, color: "rgba(237,228,211,0.5)", fontSize: 13, textDecoration: "none" }}>{t('hero.home', isAr ? "الرئيسية" : "Home")}</Link>
            <span style={{ color: "rgba(237,228,211,0.3)" }}>/</span>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.4)", fontSize: 13 }}>{l(data.tag)}</span>
          </div>
          <h1 style={{ fontFamily: noto, fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f4efe5", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            {l(data.heading)}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#faf8f4", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: ibm, fontSize: "1.1rem", color: "#3a3a32", lineHeight: 2, marginBottom: "1.5rem", fontWeight: 500 }}>
            {l(data.p1)}
          </p>
          <p style={{ fontFamily: ibm, fontSize: "1rem", color: "#5a6852", lineHeight: 1.9, marginBottom: "3.5rem" }}>
            {l(data.p2)}
          </p>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div style={{ background: "#fff", padding: "2rem", border: "1px solid rgba(184,150,46,0.15)", borderInlineStart: "4px solid #b8962e" }}>
              <h3 style={{ fontFamily: noto, fontWeight: 700, color: "#1e2818", fontSize: "1.25rem", marginBottom: "1rem" }}>
                {isAr ? "الرؤية" : "Vision"}
              </h3>
              <p style={{ fontFamily: ibm, color: "#5a6852", lineHeight: 1.8 }}>{l(data.vision)}</p>
            </div>

            <div style={{ background: "#fff", padding: "2rem", border: "1px solid rgba(184,150,46,0.15)", borderInlineStart: "4px solid #b8962e" }}>
              <h3 style={{ fontFamily: noto, fontWeight: 700, color: "#1e2818", fontSize: "1.25rem", marginBottom: "1rem" }}>
                {isAr ? "الرسالة" : "Mission"}
              </h3>
              <p style={{ fontFamily: ibm, color: "#5a6852", lineHeight: 1.8 }}>{l(data.mission)}</p>
            </div>

            {/* عرض القيم فقط لو الأدمن كاتبها */}
            {data.values && data.values.ar && (
              <div style={{ background: "#fff", padding: "2rem", border: "1px solid rgba(184,150,46,0.15)", borderInlineStart: "4px solid #b8962e" }}>
                <h3 style={{ fontFamily: noto, fontWeight: 700, color: "#1e2818", fontSize: "1.25rem", marginBottom: "1rem" }}>
                  {isAr ? "القيم" : "Values"}
                </h3>
                <p style={{ fontFamily: ibm, color: "#5a6852", lineHeight: 1.8, whiteSpace: "pre-line" }}>{l(data.values)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}