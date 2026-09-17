import { useState } from "react";
import { Link } from "react-router-dom";
import { useLangStore } from "@/store/useLangStore";
import { useAbout } from "./hooks/useAbout";

// استيراد أيقونات الشركات زي ما هي في كودك (كـ Fallback)
import logoSaudiBar from "@/imports/________________________.jpg";
import logoCommerce  from "@/imports/_____________.jpg";
import logoJustice   from "@/imports/___________.jpg";
import logoHrsd      from "@/imports/_______________.jpg";
import logoGosi      from "@/imports/___________________________________.jpg";
import logoSbc       from "@/imports/______________________.jpg";
import logoAlrabih   from "@/imports/______-1.jpg";
import logoManafa    from "@/imports/_____-1.jpg";

const BUILTIN_LOGOS: Record<string, string> = {
  "الهيئة السعودية للمحامين": logoSaudiBar,
  "وزارة التجارة":             logoCommerce,
  "وزارة العدل":               logoJustice,
  "وزارة الموارد البشرية":     logoHrsd,
  "التأمينات الاجتماعية":      logoGosi,
  "المركز السعودي للأعمال":    logoSbc,
  "الرابح":                    logoAlrabih,
  "منافع":                     logoManafa,
};

// شركاء افتراضيين لو الداتابيز فاضية
const DEFAULT_PARTNERS = [
  { name: "وزارة العدل", logo: logoJustice },
  { name: "الهيئة السعودية للمحامين", logo: logoSaudiBar },
  { name: "وزارة التجارة", logo: logoCommerce }
];

function PartnerInitials({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const initials = words.length >= 2 ? words[0][0] + words[1][0] : words[0].slice(0, 2);
  return (
    <div style={{
      width: 72, height: 72, borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(184,150,46,0.18), rgba(184,150,46,0.06))",
      border: "1.5px solid rgba(184,150,46,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#b8962e", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

const WHY_ICONS = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L4 7v5c0 4.418 3.582 8 8 8s8-3.582 8-8V7L12 3z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
];

export default function About() {
  const { isAr } = useLangStore();
  const { data, isLoading } = useAbout();
  const [open, setOpen] = useState<string | null>("vision");

  const l = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return isAr ? field.ar : field.en;
  };

  if (isLoading || !data) return <div style={{ minHeight: "100vh", background: "#111a11" }} />;

  const { aboutData, whyUsData, partnersData } = data;
  
  // 👈 التأكد من وجود شركاء حقيقيين، وإلا نستخدم الـ Fallback
  const partners = partnersData?.length ? partnersData : DEFAULT_PARTNERS;
  // التكرار 4 مرات عشان الشريط يلف بشكل سلس
  const tickerItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <div>
      {/* Page Header */}
      <div style={{ position: "relative", padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)", overflow: "hidden" }}>
        {aboutData?.image && (
          <img src={aboutData.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
        )}
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textDecoration: "none" }}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span style={{ color: "rgba(232,216,184,0.3)", fontSize: "0.78rem" }}>/</span>
            <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{l(aboutData?.tag) || (isAr ? "من نحن" : "About Us")}</span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>
            {l(aboutData?.heading) || (isAr ? "وثاق الحق للمحاماة" : "Wethaq Al-Haq Law Firm")}
          </h1>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      {/* Main Content */}
      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
          <div>
            <span className="section-label">{l(aboutData?.tag) || (isAr ? "نبذة عن الشركة" : "Company Overview")}</span>
            <div className="gold-line" style={{ marginTop: "0.75rem", marginBottom: "1.5rem" }} />
            
            <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.75)", lineHeight: 1.9, fontSize: "0.9rem", marginBottom: "2.5rem" }}>
              {l(aboutData?.p1)}
              <br/><br/>
              {l(aboutData?.p2)}
            </p>

            {/* Accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { key: "vision", title: isAr ? "الرؤية" : "Vision", content: l(aboutData?.vision) },
                { key: "mission", title: isAr ? "الرسالة" : "Mission", content: l(aboutData?.mission) },
                { key: "values", title: isAr ? "القيم" : "Values", content: l(aboutData?.values) }
              ].map((s) => s.content && (
                <div key={s.key} style={{ border: "1px solid", borderColor: open === s.key ? "rgba(184,150,46,0.5)" : "rgba(184,150,46,0.12)", background: open === s.key ? "rgba(184,150,46,0.05)" : "transparent", transition: "all 0.25s" }}>
                  <button onClick={() => setOpen(open === s.key ? null : s.key)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: open === s.key ? "#b8962e" : "#e8d8b8" }}>
                    {s.title}
                    <span style={{ color: "#b8962e", fontSize: "1.2rem", transform: open === s.key ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.25s" }}>+</span>
                  </button>
                  {open === s.key && (
                    <div style={{ padding: "0 1.25rem 1.25rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.7)", fontSize: "0.85rem", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                      {s.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Ticker (Dynamic from DB) */}
      <section style={{ background: "#faf8f4", padding: "4rem 0", borderTop: "1px solid #e9e5de" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem", padding: "0 1.5rem" }}>
          <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", color: "#b8962e" }}>{isAr ? "شركاؤنا" : "OUR PARTNERS"}</span>
          <h2 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: "#1e2818", marginTop: "0.6rem" }}>{isAr ? "نفخر بشراكاتنا الاستراتيجية" : "Proud of Our Strategic Partnerships"}</h2>
          <div style={{ width: 40, height: 2, background: "#b8962e", margin: "0.9rem auto 0" }} />
        </div>
        <style>{`
          @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }
          .ticker-track { display: flex; width: max-content; animation: ticker-scroll 28s linear infinite; }
          .ticker-track:hover { animation-play-state: paused; }
          .ticker-card { width: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 2.25rem 1.5rem; border-inline-end: 1px solid #e9e5de; }
          .ticker-card img { max-height: 68px; max-width: 180px; object-fit: contain; }
        `}</style>
        <div style={{ overflow: "hidden", background: "#ffffff", borderTop: "1px solid #e3ddd1", borderBottom: "1px solid #e3ddd1" }}>
          <div className="ticker-track">
            {tickerItems.map((p, i) => {
              const nameRaw = typeof p.name === 'string' ? p.name : (isAr ? p.name.ar : p.name.en);
              // 👈 الأولوية للصورة الحقيقية من الداتابيز (p.logo) ثم الصور المخزنة عندك
              const logoSrc = p.logo || BUILTIN_LOGOS[nameRaw] || "";
              
              return (
                <div key={i} className="ticker-card text-center">
                  {logoSrc ? <img src={logoSrc} alt={nameRaw} className="mx-auto" /> : <PartnerInitials name={nameRaw} />}
                  <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.78rem", color: "#7a7570", marginTop: "10px" }}>{nameRaw}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Wethaq section (Dynamic from DB) */}
      <section id="why-wethaq" style={{ background: "#111a11", padding: "5rem 1.5rem", borderTop: "1px solid rgba(184,150,46,0.15)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", color: "#b8962e" }}>{isAr ? "ما يميزنا" : "WHAT SETS US APART"}</span>
            <h2 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#f5edd8", marginTop: "0.75rem" }}>{isAr ? "لماذا تختار شركة وثاق الحق؟" : "Why Choose Wethaq Al-Haq?"}</h2>
            <div style={{ width: 48, height: 2, background: "#b8962e", margin: "1rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {whyUsData?.map((pt: any, i: number) => (
              <div key={pt.id || i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(184,150,46,0.15)", borderRadius: 2, padding: "2rem 1.75rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, insetInlineStart: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #b8962e, transparent)" }} />
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(184,150,46,0.08)", border: "1px solid rgba(184,150,46,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  {WHY_ICONS[i % WHY_ICONS.length]}
                </div>
                <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f5edd8", marginBottom: "0.75rem" }}>{l(pt.title)}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.85rem", lineHeight: 1.8 }}>{l(pt.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}