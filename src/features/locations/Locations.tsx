import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { IconMapPin, IconPhone, IconMail, IconClock, IconBuilding } from "@/components/Icons";
import { useLocations } from "./hooks/useLocations";

export default function Locations() {
  const { t } = useTranslation('locations');
  const { isAr } = useLangStore();
  const { data: locations, isLoading } = useLocations();

  const l = (field: { ar: string, en: string }) => isAr ? field.ar : field.en;

  if (isLoading) return <div style={{ minHeight: "100vh", background: "#111a11" }} />;

  return (
    <div>
      <div style={{ padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textDecoration: "none" }}>{t('hero.home')}</Link>
            <span style={{ color: "rgba(232,216,184,0.3)" }}>/</span>
            <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{t('hero.tag')}</span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>
            {t('hero.title')}
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.9rem", marginTop: "0.75rem", maxWidth: 600 }}>
            {t('hero.subtitle')}
          </p>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
            {locations?.map((loc) => (
              <div key={loc.email} className="card-hover" style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.15)", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(135deg, #111a11, #2d3d2d)", padding: "2.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(184,150,46,0.15)" }}>
                  <div style={{ width: 48, height: 48, border: "1px solid rgba(184,150,46,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconBuilding size={22} color="#b8962e" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "1.3rem", lineHeight: 1 }}>
                      {l(loc.city)}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#b8962e", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                      {l(loc.label)}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
                    {[
                      { Icon: IconMapPin, text: l(loc.address) },
                      { Icon: IconPhone, text: loc.phone },
                      { Icon: IconMail, text: loc.email },
                      { Icon: IconClock, text: l(loc.hours) },
                    ].map(({ Icon, text }) => (
                      <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, marginTop: "0.1rem" }}><Icon size={16} color="#b8962e" strokeWidth={1.5} /></span>
                        <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.65)", fontSize: "0.8rem", lineHeight: 1.6 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-flex", fontSize: "0.78rem", padding: "0.55rem 1.25rem" }}>
                    <IconMapPin size={14} color="#b8962e" strokeWidth={1.5} />
                    {t('actions.openInMaps', isAr ? "افتح في الخرائط" : "Open in Maps")}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.15)", height: 400, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
            <div style={{ border: "1px solid rgba(184,150,46,0.25)", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}><IconMapPin size={26} color="#b8962e" strokeWidth={1.5} /></div>
            <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.4)", fontSize: "0.9rem" }}>
              {t('mapPlaceholder', isAr ? "سيتم تضمين خريطة Google Maps هنا" : "Google Maps will be embedded here")}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}