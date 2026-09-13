import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore"; 
import { useHomeData } from "./hooks/useHomeData";

import {
  IconScales, IconGavel, IconDocument, IconBriefcase, IconUsers, IconHandshake,
  IconStar, IconLink, IconTarget, IconTrust, IconArrowLeft, IconArrowRight,
} from "@/components/Icons";
import overImg from "@/imports/over.jpg";
import heroVideo from "@/imports/Camera_motion_over_city_skyline_202609080449.mp4";
import deskImg from "@/imports/________.jpg.jpeg";

const SERVICE_ICONS = [IconScales, IconGavel, IconDocument, IconBriefcase, IconUsers, IconHandshake];
const WHY_ICONS = [IconStar, IconLink, IconTarget, IconTrust];

// مصفوفة احتياطية في حال غياب ملف الترجمة
const fallbackWhyItems = [
  { title: "خبرات قانونية متخصصة", desc: "نخبة من المحامين والمستشارين ذوي الكفاءات العالية في مختلف المجالات القانونية." },
  { title: "حلول قانونية متكاملة", desc: "نلبي احتياجات الأفراد وقطاع الأعمال وفق منهجية تراعي طبيعة كل عميل." },
  { title: "دقة في الأداء والتنفيذ", desc: "نلتزم بأعلى معايير الجودة والاحتراف في كل ملف نتولاه." },
  { title: "شراكة قائمة على الثقة", desc: "نبني علاقة مهنية طويلة الأمد قائمة على الشفافية والثقة المتبادلة." },
];

const S = {
  sectionLabel: { fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#b8962e" },
  goldRule: { width: 40, height: 2, background: "#b8962e", marginTop: "0.75rem", marginBottom: "1.5rem" },
  h2: { fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.65rem, 3vw, 2.35rem)", color: "#f5edd8", lineHeight: 1.28 },
  h2Light: { fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.65rem, 3vw, 2.35rem)", color: "#1a2318", lineHeight: 1.28 },
  body: { fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.7)", fontSize: "0.88rem", lineHeight: 1.95 },
  bodyLight: { fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(37,51,37,0.65)", fontSize: "0.88rem", lineHeight: 1.95 },
};

export default function Home() {
  const { t } = useTranslation('home');
  const { isAr } = useLangStore();
  const { data, isLoading } = useHomeData();

  const l = (field: { ar: string, en: string } | undefined) => field ? (isAr ? field.ar : field.en) : '';
  
  // التأكد من أن القيمة الراجعة من الترجمة عبارة عن مصفوفة، وإلا استخدام الاحتياطي
  const translatedWhy = t('why', { returnObjects: true });
  const whyItems = Array.isArray(translatedWhy) ? translatedWhy : fallbackWhyItems;

  const ArrowIcon = isAr ? IconArrowLeft : IconArrowRight;
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoading || !data) return;
    const els = pageRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isLoading, data]);

  if (isLoading || !data) return <div style={{ minHeight: "100vh", background: "#111a11" }} />;

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <video ref={videoRef} autoPlay muted loop playsInline aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.32) saturate(0.6)", zIndex: 0 }}>
          <source src={heroVideo} type="video/mp4" />
          <img src={overImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(120deg, rgba(12,19,12,0.93) 38%, rgba(25,38,25,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", zIndex: 1, background: "linear-gradient(to bottom, transparent, rgba(30,43,30,0.95))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="hero-tag" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", border: "1px solid rgba(184,150,46,0.35)", padding: "0.4rem 1rem", marginBottom: "2rem" }}>
              <span style={{ width: 5, height: 5, background: "#b8962e", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
              <span style={{ ...S.sectionLabel, letterSpacing: "0.1em" }}>{l(data.hero.tag)}</span>
            </div>
            <h1 className="hero-h1" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(2.1rem, 5.5vw, 3.75rem)", lineHeight: 1.22, color: "#f5edd8", marginBottom: "1.75rem" }}>
              {l(data.hero.h1a)}<br />
              <span style={{ color: "rgba(245,237,216,0.9)" }}>{t('hero.h1bPre', isAr ? 'فإن ' : '')}</span>
              <span style={{ color: "#b8962e" }}>{t('hero.h1bHighlight', isAr ? 'الوثاق' : 'Wethaq')}</span>
              <span style={{ color: "rgba(245,237,216,0.9)" }}>{t('hero.h1bRest', isAr ? ' هو الطريق إليه' : ' Is the Path to It')}</span>
            </h1>
            <p className="hero-p" style={{ ...S.body, maxWidth: 520, fontSize: "1rem", lineHeight: 1.85, marginBottom: "2.5rem", color: "rgba(232,216,184,0.75)" }}>{l(data.hero.subtitle)}</p>
            <div className="hero-btns hero-ctas" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: "0.88rem", padding: "0.85rem 2.25rem" }}>{l(data.hero.cta1)}</Link>
              <Link to="/services" className="btn-outline" style={{ fontSize: "0.88rem", padding: "0.85rem 2.25rem" }}>{l(data.hero.cta2)}</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #b8962e, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="about-section" style={{ background: "#253325", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          <div className="reveal">
            <span style={S.sectionLabel}>{l(data.about.tag)}</span>
            <div style={S.goldRule} />
            <h2 style={{ ...S.h2, marginBottom: "1.5rem" }}>{l(data.about.heading)}</h2>
            <p style={{ ...S.body, marginBottom: "1rem" }}>{l(data.about.p1)}</p>
            <p style={{ ...S.body, marginBottom: "2.5rem" }}>{l(data.about.p2)}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(184,150,46,0.15)", marginBottom: "2.5rem" }}>
              {data.stats.map(({ n, label }) => (
                <div key={l(label)} style={{ background: "#1e2b1e", padding: "1.25rem 1rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#b8962e", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.7rem", color: "rgba(232,216,184,0.5)", marginTop: "0.3rem" }}>{l(label)}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary" style={{ fontSize: "0.88rem" }}>{t('aboutBtn', isAr ? 'اقرأ المزيد' : 'Read More')}</Link>
          </div>
          <div className="reveal reveal-delay-1" style={{ position: "relative" }}>
            <img src={deskImg} alt="وثاق الحق" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", top: 0, insetInlineStart: 0, width: 4, height: "40%", background: "#b8962e" }} />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section" style={{ background: "#f7f3ec", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
            <div>
              <span style={S.sectionLabel}>{t('servicesTag', isAr ? 'خدماتنا القانونية' : 'Our Legal Services')}</span>
              <div style={S.goldRule} />
              <h2 style={{ ...S.h2Light, marginBottom: 0 }}>{t('servicesH', isAr ? 'حلول قانونية متكاملة' : 'Integrated Legal Solutions')}</h2>
            </div>
            <Link to="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.6rem", border: "1px solid rgba(37,51,37,0.35)", color: "#253325", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif", whiteSpace: "nowrap", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#253325"; e.currentTarget.style.color = "#e8d8b8"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#253325"; }}>
              {t('servicesMore', isAr ? 'عرض جميع الخدمات' : 'View All Services')}
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="services-grid reveal reveal-delay-1">
            {data.services.map((svc, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <Link key={svc.id} to="/services" style={{ background: "#ffffff", padding: "2.25rem 2rem", textDecoration: "none", display: "flex", flexDirection: "column", border: "1px solid rgba(184,150,46,0.18)", transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,51,37,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 48, height: 48, background: "rgba(184,150,46,0.08)", border: "1px solid rgba(184,150,46,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", flexShrink: 0 }}>
                    <Icon size={22} color="#b8962e" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#1a2318", fontSize: "0.95rem", marginBottom: "0.75rem", lineHeight: 1.4 }}>{l(svc.title)}</h3>
                  <p style={{ ...S.bodyLight, fontSize: "0.82rem", flexGrow: 1, marginBottom: "1.75rem" }}>{l(svc.desc)}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "auto", borderTop: "1px solid rgba(184,150,46,0.15)", paddingTop: "1rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.76rem", fontWeight: 600, color: "#b8962e" }}>{t('readMore', isAr ? 'اقرأ المزيد' : 'Read More')}</span>
                    <ArrowIcon size={14} color="#b8962e" strokeWidth={2} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why-section" style={{ position: "relative", padding: "7rem 2rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,26,17,0.98)" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={S.sectionLabel}>{t('whyTag', isAr ? 'لماذا نحن' : 'Why Us')}</span>
            <div style={{ ...S.goldRule, margin: "0.75rem auto 0" }} />
            <h2 style={{ ...S.h2, marginTop: "0.5rem" }}>{t('whyH', isAr ? 'ما يميز وثاق الحق' : 'What Sets Wethaq Apart')}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(184,150,46,0.15)" }} className="why-grid reveal reveal-delay-1">
            {whyItems.map((w, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length];
              return (
                <div key={w.title} style={{ background: "rgba(30,43,30,0.85)", padding: "2.5rem 1.75rem", backdropFilter: "blur(8px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <div style={{ width: 44, height: 44, border: "1px solid rgba(184,150,46,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={20} color="#b8962e" strokeWidth={1.5} /></div>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.65rem", color: "rgba(184,150,46,0.5)", fontWeight: 700, letterSpacing: "0.1em" }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#e8d8b8", fontSize: "0.92rem", marginBottom: "0.75rem", lineHeight: 1.45 }}>{w.title}</h3>
                  <p style={{ ...S.body, fontSize: "0.8rem" }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section className="team-section" style={{ background: "#253325", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
            <div>
              <span style={S.sectionLabel}>{t('teamTag', isAr ? 'فريقنا' : 'Our Team')}</span>
              <div style={S.goldRule} />
              <h2 style={{ ...S.h2, marginBottom: 0 }}>{t('teamH', isAr ? 'نخبة من الخبراء القانونيين' : 'Elite Legal Professionals')}</h2>
            </div>
            <Link to="/team" className="btn-outline" style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>{t('teamBtn', isAr ? 'تعرف على الفريق كاملاً' : 'Meet the Full Team')}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }} className="team-grid reveal reveal-delay-1">
            {data.team.map((m, i) => (
              <div key={m.id} style={{ background: "#1e2b1e", border: "1px solid rgba(184,150,46,0.1)", overflow: "hidden" }}>
                <div style={{ height: 190, background: `linear-gradient(145deg, #111a11 0%, ${["#1e2b1e", "#222e22", "#1a281a", "#202d20"][i % 4]} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", bottom: "0.75rem", insetInlineStart: "0.75rem", background: "#b8962e", padding: "0.2rem 0.6rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#111a11" }}>{l(m.exp)}</span>
                  </div>
                </div>
                <div style={{ padding: "1.4rem 1.5rem" }}>
                  <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "0.88rem", marginBottom: "0.3rem", lineHeight: 1.4 }}>{l(m.name)}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#b8962e", fontSize: "0.72rem", marginBottom: "0.35rem" }}>{l(m.role)}</div>
                  <div style={{ width: 24, height: 1, background: "rgba(184,150,46,0.3)", marginBottom: "0.4rem" }} />
                  <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.4)", fontSize: "0.7rem" }}>{l(m.spec)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="blog-section" style={{ background: "#f0ece3", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
            <div>
              <span style={S.sectionLabel}>{t('blogTag', isAr ? 'مدونتنا القانونية' : 'Our Legal Blog')}</span>
              <div style={S.goldRule} />
              <h2 style={{ ...S.h2Light, marginBottom: 0 }}>{t('blogH', isAr ? 'أحدث المقالات والتحليلات' : 'Latest Articles & Analysis')}</h2>
            </div>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.6rem", border: "1px solid rgba(37,51,37,0.35)", color: "#253325", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>{t('blogBtn', isAr ? 'عرض جميع المقالات' : 'View All Articles')}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "1.25rem" }} className="blog-grid reveal reveal-delay-1">
            {data.blog.map((post, i) => (
              <Link key={post.id} to="/blog" style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#ffffff", border: "1px solid rgba(184,150,46,0.18)", overflow: "hidden" }}>
                <div style={{ height: i === 0 ? 240 : 160, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <img src={post.image} alt={l(post.title)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "1rem", insetInlineStart: "1rem", background: "#b8962e", padding: "0.2rem 0.75rem" }}><span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#fff", fontSize: "0.62rem", fontWeight: 700 }}>{l(post.cat)}</span></div>
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#1a2318", fontSize: i === 0 ? "0.97rem" : "0.86rem", lineHeight: 1.6, marginBottom: "auto", paddingBottom: "1.25rem" }}>{l(post.title)}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(184,150,46,0.15)", paddingTop: "1rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(37,51,37,0.45)", fontSize: "0.7rem" }}>{l(post.date)}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "#b8962e", fontSize: "0.72rem", fontWeight: 600 }}>{t('readMore', isAr ? 'اقرأ المزيد' : 'Read More')}</span><ArrowIcon size={13} color="#b8962e" strokeWidth={2} /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", background: "#b8962e", padding: "5.5rem 2rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 14px)" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#111a11", marginBottom: "1rem", lineHeight: 1.3 }}>{l(data.cta.heading)}</h2>
          <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(17,26,17,0.7)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "2.25rem" }}>{l(data.cta.body)}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2.25rem", background: "#111a11", color: "#b8962e", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{l(data.cta.btn1)}</Link>
            <a href="https://wa.me/966" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2.25rem", border: "2px solid rgba(17,26,17,0.5)", color: "#111a11", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{l(data.cta.btn2)}</a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes hero-vid-zoom { from { transform: scale(1); } to { transform: scale(1.06); } }
        video[aria-hidden] { animation: hero-vid-zoom 20s ease-in-out alternate infinite; }
        @keyframes hero-fade-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .hero-tag { animation: hero-fade-up 0.7s cubic-bezier(.22,.68,0,1.2) 0.3s both; }
        .hero-h1 { animation: hero-fade-up 0.8s cubic-bezier(.22,.68,0,1.1) 0.55s both; }
        .hero-p { animation: hero-fade-up 0.8s ease 0.8s both; }
        .hero-ctas { animation: hero-fade-up 0.8s ease 1.05s both; }
        @keyframes hero-line-grow { from { transform: translateX(-50%) scaleY(0); opacity: 0; } to { transform: translateX(-50%) scaleY(1); opacity: 0.45; } }
        .hero-scroll-cue { animation: hero-line-grow 0.9s ease 1.4s both; transform-origin: top; }
        @keyframes reveal-up { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,.68,0,1.05); }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.15s; }
        @media (prefers-reduced-motion: reduce) { video[aria-hidden] { animation: none; } .hero-tag, .hero-h1, .hero-p, .hero-ctas, .hero-scroll-cue { animation: none; } .reveal { opacity: 1; transform: none; transition: none; } }
        @media (max-width: 900px) { .about-grid, .blog-grid { grid-template-columns: 1fr !important; } .services-grid, .why-grid, .stats-grid, .team-grid { grid-template-columns: 1fr 1fr !important; } .about-section, .services-section, .why-section, .team-section, .blog-section { padding: 4rem 1.25rem !important; } }
        @media (max-width: 580px) { .services-grid, .why-grid { grid-template-columns: 1fr !important; } .hero-btns { flex-direction: column !important; align-items: flex-start !important; } .hero-btns a { width: 100% !important; justify-content: center !important; } }
        @media (max-width: 420px) { .team-grid, .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}