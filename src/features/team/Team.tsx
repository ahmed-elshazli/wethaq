import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useTeam } from "./hooks/useTeam";
import { IconPhone, IconMail, IconLink, IconWhatsApp } from "@/components/Icons";

// استخدمنا صورة موجودة بالفعل ونتأكد من مسارها
import deskImg from "@/imports/________.jpg.jpeg"; 

const noto = "'Noto Kufi Arabic', sans-serif";
const ibm = "'IBM Plex Sans Arabic', sans-serif";

// تم استبدال الـ SVG المعقدة بأيقوناتنا النظيفة
function SocialIcons() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <a href="#" style={{ border: "1px solid #e3ddd1", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#e3ddd1")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <IconLink size={16} color="#3E4C37" strokeWidth={1.6} />
      </a>
      <a href="#" style={{ border: "1px solid #e3ddd1", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#e3ddd1")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <IconPhone size={16} color="#3E4C37" strokeWidth={1.6} />
      </a>
      <a href="#" style={{ border: "1px solid #e3ddd1", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#e3ddd1")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <IconMail size={16} color="#3E4C37" strokeWidth={1.6} />
      </a>
    </div>
  );
}

export default function Team() {
  const { t } = useTranslation('team');
  const { isAr } = useLangStore();
  const { data, isLoading } = useTeam();

  const l = (field: { ar: string, en: string } | undefined) => {
    if (!field) return '';
    return isAr ? field.ar : field.en;
  };

  if (isLoading || !data) {
    return <div style={{ minHeight: "100vh", background: "#1e2818" }} />;
  }

  const { featured, members } = data;

  return (
    <div>
      <style>{`
        .team-featured { flex-direction: row; }
        .team-cards { grid-template-columns: repeat(3, 1fr); }
        .team-content-wrap { padding: 0 clamp(1rem, 4vw, 40px); }
        .team-featured-img { width: clamp(200px, 36%, 432px); }
        @media (max-width: 900px) {
          .team-featured { flex-direction: column !important; }
          .team-featured-img { width: 100% !important; max-width: 420px; }
          .team-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .team-cards { grid-template-columns: 1fr !important; }
          .team-cta-row { flex-direction: column !important; }
          .team-featured-img { max-width: 100% !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ position: "relative", background: "#1e2818", overflow: "hidden", padding: "5rem 1.5rem 4rem" }}>
        <img src={deskImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(22,30,18,0.7)" }} />
        <div style={{ position: "relative", maxWidth: 1196, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.6)", fontSize: 13 }}>{t('hero.home')}</span>
            <span style={{ color: "rgba(237,228,211,0.3)" }}>/</span>
            <span style={{ fontFamily: ibm, color: "rgba(237,228,211,0.5)", fontSize: 13 }}>{t('hero.title')}</span>
          </div>
          <h1 style={{ fontFamily: noto, fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f4efe5", lineHeight: 1.25, marginBottom: "1rem" }}>
            {t('hero.title')}
          </h1>
          <p style={{ fontFamily: ibm, fontSize: 17, color: "rgba(237,228,211,0.7)", maxWidth: 600 }}>
            {t('hero.subtitle', 'فريق متعدد التخصصات يجمع بين الترافع أمام المحاكم والاستشارات المؤسسية.')}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(198,166,98,0.3)" }} />
      </div>

      {/* Cream content area */}
      <div style={{ background: "#faf8f4" }}>
        <div className="team-content-wrap" style={{ maxWidth: 1196, margin: "0 auto" }}>

          {/* Featured member */}
          <div className="team-featured" style={{ display: "flex", gap: "clamp(1.5rem, 5vw, 5rem)", alignItems: "center", padding: "clamp(2.5rem, 5vw, 5rem) 0", borderBottom: "1px solid #e3ddd1", flexWrap: "wrap" }}>
            <div className="team-featured-img" style={{ flexShrink: 0 }}>
              <img src={featured.img} alt={l(featured.name)} style={{ width: "100%", aspectRatio: "432 / 540", objectFit: "cover", borderRadius: 42, display: "block" }} />
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{ fontFamily: ibm, fontWeight: 600, fontSize: 20, color: "#a6843f", display: "block", marginBottom: "0.65rem" }}>
                {l(featured.label)}
              </span>
              <h2 style={{ fontFamily: noto, fontWeight: 400, fontSize: 34, color: "#1e2818", lineHeight: 1.375, marginBottom: "0.5rem" }}>
                {l(featured.name)}
              </h2>
              <p style={{ fontFamily: ibm, fontWeight: 500, fontSize: 15, color: "#a6843f", letterSpacing: "0.75px", marginBottom: "1.75rem" }}>
                {l(featured.role)}
              </p>
              <p style={{ fontFamily: ibm, fontSize: 17, color: "#6b6a62", lineHeight: "32.3px", marginBottom: "2.5rem", textAlign: "start" }}>
                {l(featured.bio)}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: ibm, fontSize: 13, color: "#5a6852", marginBottom: "0.35rem" }}>{t('labels.mobile', 'رقم الجوال')}</p>
                  <p style={{ fontFamily: ibm, fontSize: 16, color: "#232e20" }}>{featured.phone}</p>
                </div>
                <div>
                  <p style={{ fontFamily: ibm, fontSize: 13, color: "#5a6852", marginBottom: "0.35rem" }}>{t('labels.email', 'البريد الإلكتروني')}</p>
                  <p style={{ fontFamily: ibm, fontSize: 16, color: "#232e20" }}>{featured.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3-member grid */}
          <div className="team-cards" style={{ display: "grid", gap: "clamp(16px, 3vw, 44px)", padding: "clamp(2rem, 4vw, 4rem) 0 clamp(2.5rem, 5vw, 5rem)" }}>
            {members.map((m) => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ overflow: "hidden", aspectRatio: "345 / 432", background: "#1e2818" }}>
                  <img src={m.img} alt={l(m.name)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ paddingTop: 20 }}>
                  <h3 style={{ fontFamily: noto, fontWeight: 400, fontSize: 18, color: "#1e2818", lineHeight: "24.75px", marginBottom: "0.5rem" }}>
                    {l(m.name)}
                  </h3>
                  <p style={{ fontFamily: ibm, fontWeight: 500, fontSize: 13, color: "#a6843f", letterSpacing: "0.65px", marginBottom: "0.85rem" }}>
                    {l(m.role)}
                  </p>
                  <p style={{ fontFamily: ibm, fontSize: 15, color: "#6b6a62", lineHeight: "24.375px", marginBottom: "1.5rem" }}>
                    {l(m.bio)}
                  </p>
                  <SocialIcons />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: "relative", background: "#161e12", overflow: "hidden", padding: "5rem 1.5rem" }}>
        <img src={deskImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(22,30,18,0.85)" }} />
        <div className="team-cta-row" style={{ position: "relative", maxWidth: 1196, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 1, background: "#c6a662" }} />
              <span style={{ fontFamily: ibm, fontWeight: 600, fontSize: 12, color: "#dcc38c", letterSpacing: "2.16px" }}>
                {t('cta.tag', 'تواصل معنا')}
              </span>
            </div>
            <h2 style={{ fontFamily: noto, fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", color: "#f4efe5", lineHeight: 1.25, marginBottom: "1rem" }}>
              {t('cta.heading', 'اعرض قضيتك على فريقنا')}
            </h2>
            <p style={{ fontFamily: ibm, fontSize: 16, color: "rgba(237,228,211,0.7)", lineHeight: "26px" }}>
              {t('cta.desc', 'أرسل ملخصًا موجزًا لحالتك وسيعاود أحد محامينا التواصل معك خلال يوم عمل واحد.')}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              to="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 2rem", height: 52, background: "#c6a662", color: "#161e12", fontFamily: ibm, fontWeight: 500, fontSize: 16, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <IconLink size={16} color="#161E12" strokeWidth={1.75} />
              {t('cta.bookBtn', 'احجز استشارة قانونية')}
            </Link>
            <a
              href="https://wa.me/966XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 1.5rem", height: 52, border: "1px solid rgba(237,228,211,0.35)", color: "#ede4d3", fontFamily: ibm, fontSize: 16, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <IconWhatsApp size={17} color="#EDE4D3" />
              {t('cta.whatsapp', 'واتساب')}
            </a>
            <a
              href="tel:+966114567890"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 1.5rem", height: 52, border: "1px solid rgba(237,228,211,0.35)", color: "#ede4d3", fontFamily: ibm, fontSize: 16, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <IconPhone size={17} color="#EDE4D3" strokeWidth={1.6} />
              +966 11 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}