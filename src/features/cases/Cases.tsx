import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { IconBuilding, IconCheck } from "@/components/Icons";
import { useCases } from "./hooks/useCases";
import type { CaseCategorySlug } from "./api/casesApi";

export default function Cases() {
  const { t } = useTranslation('cases');
  const { isAr } = useLangStore();
  const { data: cases, isLoading } = useCases();
  
  // استخدمنا الـ slug كقيمة حقيقية للفلترة لتجنب مشاكل الترجمة
  const [activeSlug, setActiveSlug] = useState<CaseCategorySlug | "all">("all");

  const l = (field: { ar: string, en: string }) => isAr ? field.ar : field.en;

  if (isLoading) {
    return <div style={{ minHeight: "100vh", background: "#111a11" }} />;
  }

  const filtered = activeSlug === "all" ? cases : cases?.filter((c) => c.catSlug === activeSlug);

  // مصفوفة التصنيفات للعرض
  const filterCategories: { slug: CaseCategorySlug | "all", label: string }[] = [
    { slug: "all", label: isAr ? "الكل" : "All" },
    { slug: "commercial", label: isAr ? "تجارية" : "Commercial" },
    { slug: "labor", label: isAr ? "عمالية" : "Labor" },
    { slug: "arbitration", label: isAr ? "تحكيم دولي" : "International Arbitration" },
    { slug: "corporate", label: isAr ? "شركات" : "Corporate" },
    { slug: "contracts", label: isAr ? "عقود" : "Contracts" },
  ];

  return (
    <div>
      <div style={{ padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textDecoration: "none" }}>
              {t('hero.home', isAr ? "الرئيسية" : "Home")}
            </Link>
            <span style={{ color: "rgba(232,216,184,0.3)" }}>/</span>
            <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              {t('hero.tag', isAr ? "القضايا" : "Cases")}
            </span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>
            {t('hero.title', isAr ? "القضايا" : "Cases")}
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.9rem", marginTop: "0.75rem", maxWidth: 600 }}>
            {t('hero.subtitle', isAr ? "نعرض هنا نماذج مختارة من القضايا التي تولى فريقنا..." : "We present here selected examples...")}
          </p>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {filterCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveSlug(c.slug)}
                style={{
                  padding: "0.45rem 1.1rem",
                  border: "1px solid",
                  borderColor: activeSlug === c.slug ? "#b8962e" : "rgba(184,150,46,0.2)",
                  background: activeSlug === c.slug ? "rgba(184,150,46,0.12)" : "transparent",
                  color: activeSlug === c.slug ? "#b8962e" : "rgba(232,216,184,0.6)",
                  fontSize: "0.78rem",
                  fontWeight: activeSlug === c.slug ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(184,150,46,0.1)" }} className="cases-grid">
            <style>{`@media(max-width:900px){.cases-grid{grid-template-columns:1fr 1fr !important}}@media(max-width:580px){.cases-grid{grid-template-columns:1fr !important}}`}</style>
            {filtered?.map((c) => (
              <div key={c.id} style={{ background: "#253325", padding: "2.25rem 2rem", display: "flex", flexDirection: "column", transition: "background 0.2s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2d3d2d"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#253325"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <span style={{ background: "rgba(184,150,46,0.1)", border: "1px solid rgba(184,150,46,0.25)", color: "#b8962e", fontSize: "0.7rem", padding: "0.25rem 0.65rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500 }}>
                    {l(c.cat)}
                  </span>
                  <span style={{
                    background: l(c.status) === (isAr ? "مُنجزة" : "Concluded") ? "rgba(40,100,40,0.3)" : "rgba(100,80,20,0.3)",
                    color: l(c.status) === (isAr ? "مُنجزة" : "Concluded") ? "#6aba6a" : "#c9a84c",
                    fontSize: "0.68rem", padding: "0.25rem 0.65rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500
                  }}>
                    {l(c.status)}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  {l(c.title)}
                </h3>
                <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.8rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {l(c.desc)}
                </p>
                <div style={{ borderTop: "1px solid rgba(184,150,46,0.12)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconBuilding size={13} color="#b8962e" strokeWidth={1.5} /></span>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.5)", fontSize: "0.73rem" }}>{l(c.court)}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconCheck size={13} color="#b8962e" strokeWidth={2} /></span>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.5)", fontSize: "0.73rem" }}>{l(c.outcome)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}