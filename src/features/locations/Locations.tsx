import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { IconMapPin, IconPhone, IconMail, IconClock, IconBuilding } from "@/components/Icons";
import { useLocations } from "./hooks/useLocations";

export default function Locations() {
  const { t } = useTranslation('locations');
  const { isAr } = useLangStore();
  const { data: locations, isLoading } = useLocations();

  // Helper للتعامل مع الـ Objects (ar/en) أو النصوص المباشرة
  const l = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return isAr ? field.ar : field.en;
  };

  if (isLoading) return <div style={{ minHeight: "100vh", background: "#111a11" }} />;

  return (
    <div>
      <div style={{ padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textDecoration: "none" }}>{t('hero.home', isAr ? 'الرئيسية' : 'Home')}</Link>
            <span style={{ color: "rgba(232,216,184,0.3)" }}>/</span>
            <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{t('hero.tag', isAr ? 'فروعنا' : 'Locations')}</span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>
            {t('hero.title', isAr ? 'مكاتب وفروع وثاق الحق' : 'Wethaq Al-Haq Offices & Branches')}
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.9rem", marginTop: "0.75rem", maxWidth: 600 }}>
            {t('hero.subtitle', isAr ? 'ننتشر عبر فروعنا الرئيسية لتقديم خدماتنا القانونية والاستشارية في مختلف مناطق المملكة.' : 'We operate across our main branches to deliver legal and advisory services.')}
          </p>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
            {locations?.map((loc: any, idx: number) => (
              <div key={idx} className="card-hover" style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.15)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ background: "linear-gradient(135deg, #111a11, #2d3d2d)", padding: "2rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(184,150,46,0.15)" }}>
                  <div style={{ width: 48, height: 48, border: "1px solid rgba(184,150,46,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconBuilding size={22} color="#b8962e" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "1.15rem", lineHeight: 1.3 }}>
                      {l(loc.city)}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#b8962e", fontSize: "0.72rem", marginTop: "0.3rem" }}>
                      {l(loc.label)}
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
                    
                    {/* العنوان */}
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconMapPin size={16} color="#b8962e" strokeWidth={1.5} /></span>
                      <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.75)", fontSize: "0.82rem", lineHeight: 1.6 }}>{l(loc.address)}</span>
                    </div>

                    {/* التليفون */}
                    {loc.phone && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconPhone size={16} color="#b8962e" strokeWidth={1.5} /></span>
                        <a href={`tel:${loc.phone}`} style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.75)", fontSize: "0.82rem", lineHeight: 1.6, textDecoration: "none", direction: "ltr" }}>
                          {loc.phone}
                        </a>
                      </div>
                    )}

                    {/* الإيميل */}
                    {loc.email && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconMail size={16} color="#b8962e" strokeWidth={1.5} /></span>
                        <a href={`mailto:${loc.email}`} style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.75)", fontSize: "0.82rem", lineHeight: 1.6, textDecoration: "none" }}>
                          {loc.email}
                        </a>
                      </div>
                    )}

                    {/* ساعات العمل */}
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><IconClock size={16} color="#b8962e" strokeWidth={1.5} /></span>
                      <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.75)", fontSize: "0.82rem", lineHeight: 1.6 }}>{l(loc.hours)}</span>
                    </div>

                  </div>

                  <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.78rem", padding: "0.65rem 1.25rem", border: "1px solid #b8962e", color: "#b8962e", textDecoration: "none", width: "100%", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#b8962e"; e.currentTarget.style.color = "#111a11"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b8962e"; }}>
                    <IconMapPin size={14} strokeWidth={1.5} />
                    {t('actions.openInMaps', isAr ? "افتح في الخرائط" : "Open in Maps")}
                  </a>
                </div>
              </div>
            ))}
          </div>

            {/* قسم الخريطة */}
          <div style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.15)", height: 400, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
            {locations?.[0]?.mapIframe ? (
               // لو الأدمن وضع رابط Iframe من جوجل مابس
              <iframe 
                src={locations[0].mapIframe.includes('<iframe') ? locations[0].mapIframe.split('src="')[1].split('"')[0] : locations[0].mapIframe} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <>
                <div style={{ border: "1px solid rgba(184,150,46,0.25)", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}><IconMapPin size={26} color="#b8962e" strokeWidth={1.5} /></div>
                <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.4)", fontSize: "0.9rem" }}>
                  {t('mapPlaceholder', isAr ? "سيتم تضمين خريطة Google Maps هنا" : "Google Maps will be embedded here")}
                </div>
              </>
            )}
          </div>
          
        </div>
      </section>
    </div>
  );
}