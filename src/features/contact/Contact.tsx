import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useSiteSettings } from "@/features/settings/hooks/useSiteSettings";
import { IconMapPin, IconPhone, IconMail, IconClock, IconWhatsApp } from "@/components/Icons";

export default function Contact() {
  const { t } = useTranslation('contact');
  const { isAr } = useLangStore();
  const { data: settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا مستقبلاً ستستخدم mutation لإرسال البيانات للباك إند
    setSent(true);
  };

  const fields = t('formFields', { returnObjects: true }) as { key: string, label: string, type: string, placeholder: string }[];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.875rem 1rem", background: "#111a11", border: "1px solid rgba(184,150,46,0.2)",
    color: "#f5edd8", fontSize: "0.85rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", outline: "none", transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.7)", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.5rem",
  };

  return (
    <div>
      <div style={{ padding: "5rem 1.5rem 4rem", background: "#111a11", borderBottom: "1px solid rgba(184,150,46,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textDecoration: "none" }}>{t('hero.home')}</Link>
            <span style={{ color: "rgba(232,216,184,0.3)" }}>/</span>
            <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{t('hero.tag')}</span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>{t('hero.title')}</h1>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      <style>{`.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; } @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
          <div>
            <span className="section-label">{t('info.tag')}</span>
            <div className="gold-line" style={{ marginTop: "0.75rem", marginBottom: "2rem" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2.5rem" }}>
  {[
    { Icon: IconMapPin, title: t('info.addressTitle'), lines: settings ? [isAr ? settings.riyadhAddress.ar : settings.riyadhAddress.en] : [] },
    { Icon: IconPhone, title: t('info.phoneTitle'), lines: settings ? [settings.phone, settings.phone2] : [] },
    { Icon: IconMail, title: t('info.emailTitle'), lines: settings ? [settings.email] : [] },
    { Icon: IconClock, title: t('info.hoursTitle'), lines: [t('info.hoursDays'), t('info.hoursTime')] },
  ].map(({ Icon, title, lines }, i) => (
    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div style={{ width: 42, height: 42, border: "1px solid rgba(184,150,46,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={18} color="#b8962e" strokeWidth={1.5} /></div>
      <div>
        <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 600, color: "#b8962e", fontSize: "0.82rem", marginBottom: "0.3rem" }}>{title}</div>
        {lines.map((l, idx) => (<div key={idx} style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.65)", fontSize: "0.8rem", lineHeight: 1.7 }}>{l}</div>))}
      </div>
    </div>
  ))}
</div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${settings?.whatsapp || ''}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem", background: "#25D366", color: "#fff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                <IconWhatsApp size={16} color="#fff" />{t('info.whatsappBtn')}
              </a>
              <a href={`tel:${settings?.phone || ''}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem", border: "1px solid #b8962e", color: "#b8962e", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                <IconPhone size={15} color="#b8962e" strokeWidth={1.5} />{t('info.callBtn')}
              </a>
            </div>
          </div>

          <div style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.15)", padding: "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "1.2rem", marginBottom: "0.75rem" }}>{t('form.successTitle')}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.65)", fontSize: "0.85rem", lineHeight: 1.8 }}>{t('form.successMsg')}</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="btn-primary" style={{ marginTop: "1.5rem", fontSize: "0.82rem" }}>{t('form.sendAnother')}</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "1.1rem", marginBottom: "1.75rem" }}>{t('form.heading')}</h3>
                <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div className="form-grid">
                    {fields?.slice(0, 2).map((f) => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required style={inputStyle} onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#b8962e")} onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(184,150,46,0.2)")} />
                      </div>
                    ))}
                  </div>
                  {fields?.slice(2).map((f) => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#b8962e")} onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(184,150,46,0.2)")} />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>{t('form.messageLabel')}</label>
                    <textarea placeholder={t('form.messagePlaceholder')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#b8962e")} onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(184,150,46,0.2)")} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ fontSize: "0.9rem", justifyContent: "center" }}>{t('form.submitBtn')}</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}