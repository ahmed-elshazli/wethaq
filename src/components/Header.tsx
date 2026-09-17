import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import Logo from "@/components/Logo";
import { IconMenu, IconX } from "@/components/Icons";

// مصفوفة احتياطية في حالة عدم وجود الترجمة
const fallbackNavItems = [
  { label: "الرئيسية", path: "/" },
  { label: "من نحن", path: "/about" },
  { label: "الخدمات", path: "/services" },
  { label: "فريق العمل", path: "/team" },
  { label: "المدونة", path: "/blog" },
  { label: "موقعنا", path: "/locations" },
  { label: "اتصل بنا", path: "/contact" },
];

export default function Header() {
  const { t } = useTranslation('common');
  const { toggle, isAr } = useLangStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // States للـ Dropdown الجديدة
  const [aboutDropOpen, setAboutDropOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // جلب العناصر من الترجمة، واستخدام الاحتياطي إذا فشل الجلب أو لم يكن مصفوفة
  const translatedNav = t('navItems', { returnObjects: true });
  const nav = Array.isArray(translatedNav) ? translatedNav : fallbackNavItems;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAboutDropOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // دوال التحكم في الـ Dropdown
  const openDrop = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setAboutDropOpen(true);
  };
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setAboutDropOpen(false), 150);
  };

  return (
    <>
      <style>{`
        .hdr-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .hdr-root.scrolled {
          background: rgba(17, 26, 17, 0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(184,150,46,0.2);
          box-shadow: 0 2px 24px rgba(0,0,0,0.3);
        }
        .hdr-root.top {
          background: rgba(17, 26, 17, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hdr-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 3vw, 1.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 0.5rem;
        }
        .hdr-logo { flex-shrink: 0; min-width: 0; }
        .hdr-nav {
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
          justify-content: center;
        }
        .hdr-nav-link {
          padding: 0.4rem 0.7rem;
          font-size: 0.8rem;
          font-weight: 400;
          color: #e8d8b8;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          white-space: nowrap;
        }
        .hdr-nav-link:hover { color: #c9a84c; }
        .hdr-nav-link.active { color: #b8962e; font-weight: 600; }
        .hdr-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%; transform: translateX(-50%);
          width: 18px; height: 2px;
          background: #b8962e;
        }
        .hdr-actions { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
        
        /* 👈 استايلات الـ Dropdown الجديدة */
        .hdr-about-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .hdr-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(13,21,13,0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(184,150,46,0.25);
          border-radius: 10px;
          min-width: 200px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.45);
          z-index: 300;
          overflow: hidden;
          animation: drop-in 0.18s ease;
        }
        @keyframes drop-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .hdr-drop-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.1rem;
          color: #e8d8b8;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: inherit;
          transition: background 0.15s, color 0.15s;
          border-bottom: 1px solid rgba(232,216,184,0.06);
        }
        .hdr-drop-item:last-child { border-bottom: none; }
        .hdr-drop-item:hover { background: rgba(184,150,46,0.08); color: #b8962e; }
        .hdr-drop-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #b8962e;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .hdr-cta {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1.1rem;
          background: #b8962e;
          color: #111a11;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-weight: 600;
          font-size: 0.78rem;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .hdr-cta:hover { background: #c9a84c; }
        .hdr-burger {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          color: #e8d8b8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .hdr-drawer {
          position: fixed;
          top: 68px; left: 0; right: 0; bottom: 0;
          background: rgba(13, 21, 13, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 199;
          overflow-y: auto;
          padding: 1rem 0 2rem;
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(184,150,46,0.15);
          animation: drawer-in 0.22s ease;
        }
        @keyframes drawer-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdr-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem clamp(1rem, 5vw, 1.75rem);
          border-bottom: 1px solid rgba(232,216,184,0.06);
          color: #e8d8b8;
          font-weight: 400;
          text-decoration: none;
          font-size: 1rem;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          transition: color 0.15s, background 0.15s;
        }
        .hdr-drawer-link:hover { background: rgba(184,150,46,0.05); color: #b8962e; }
        .hdr-drawer-link.active { color: #b8962e; font-weight: 600; }
        .hdr-drawer-link.active .hdr-dot { opacity: 1; }
        .hdr-dot {
          width: 5px; height: 5px;
          background: #b8962e;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .hdr-drawer-bottom {
          padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 5vw, 1.75rem) 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: auto;
        }
        .hdr-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.5rem;
          background: #b8962e;
          color: #111a11;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hdr-drawer-cta:hover { background: #c9a84c; }

        /* 👈 ستايل زرار اللغة الجديد (في الديسكتوب والموبايل) */
        .hdr-lang-toggle {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(184,150,46,0.3);
          border-radius: 100px;
          padding: 3px;
          gap: 0;
          flex-shrink: 0;
        }
        .hdr-lang-seg {
          padding: 0.22rem 0.65rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          letter-spacing: 0.04em;
          transition: background 0.22s, color 0.22s;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          line-height: 1.4;
        }
        .hdr-lang-seg.active {
          background: #b8962e;
          color: #111a11;
        }
        .hdr-lang-seg.inactive {
          background: transparent;
          color: rgba(184,150,46,0.65);
        }
        .hdr-lang-seg.inactive:hover { color: #b8962e; }

        @media (min-width: 1024px) {
          .hdr-inner { height: 72px; }
          .hdr-nav { display: flex; }
          .hdr-cta { display: inline-flex; }
          .hdr-burger { display: none; }
        }
        @media (max-width: 1023px) {
          .hdr-nav { display: none; }
        }
        @media (max-width: 400px) {
          .hdr-lang-btn { padding: 0.28rem 0.55rem; font-size: 0.68rem; }
        }
      `}</style>

      <header className={`hdr-root${scrolled ? " scrolled" : " top"}`}>
        <div className="hdr-inner">
          <div className="hdr-logo">
            <Logo size="sm" withText={true} />
          </div>

          <nav className="hdr-nav">
            {nav.map((item: any) => {
              if (item.path === "/about") {
                return (
                  <div
                    key={item.path}
                    className="hdr-about-wrap"
                    ref={aboutRef}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                  >
                    <Link
                      to={item.path}
                      className={`hdr-nav-link${location.pathname === item.path ? " active" : ""}`}
                    >
                      {item.label}
                      <span style={{ fontSize: "0.55rem", marginInlineStart: "0.2rem", opacity: 0.7, verticalAlign: "middle" }}>▾</span>
                    </Link>
                    {aboutDropOpen && (
                      <div className="hdr-dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                        <Link to="/about" className="hdr-drop-item">
                          <span className="hdr-drop-dot" />
                          {isAr ? "من نحن" : "About Us"}
                        </Link>
                        <button
                          className="hdr-drop-item"
                          onClick={() => {
                            setAboutDropOpen(false);
                            navigate("/about");
                            setTimeout(() => {
                              document.getElementById("why-wethaq")?.scrollIntoView({ behavior: "smooth" });
                            }, 120);
                          }}
                        >
                          <span className="hdr-drop-dot" />
                          {isAr ? "لماذا شركة وثاق؟" : "Why Wethaq?"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hdr-nav-link${location.pathname === item.path ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hdr-actions">
            
            {/* 👈 ديزاين اللغة الجديد في الديسكتوب، معتمد على الـ Toggle بتاعك */}
            <div className="hdr-lang-toggle" role="group" aria-label="Language">
              <button
                className={`hdr-lang-seg ${isAr ? "active" : "inactive"}`}
                onClick={isAr ? undefined : toggle}
                aria-pressed={isAr}
              >
                عربي
              </button>
              <button
                className={`hdr-lang-seg ${!isAr ? "active" : "inactive"}`}
                onClick={!isAr ? undefined : toggle}
                aria-pressed={!isAr}
              >
                EN
              </button>
            </div>

            <Link to="/contact" className="hdr-cta">
              {t('header.freeConsultation', isAr ? "استشارة مجانية" : "Free Consultation")}
            </Link>
            <button
              className="hdr-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('header.closeMenu', "إغلاق") : t('header.openMenu', "قائمة")}
            >
              {menuOpen
                ? <IconX size={22} color="#e8d8b8" strokeWidth={1.5} />
                : <IconMenu size={22} color="#e8d8b8" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="hdr-drawer">
          {nav.map((item: any) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`hdr-drawer-link${active ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="hdr-dot" />
              </Link>
            );
          })}
          <div className="hdr-drawer-bottom">
            <Link to="/contact" className="hdr-drawer-cta" onClick={() => setMenuOpen(false)}>
              {t('header.bookConsultation', isAr ? "احجز استشارة" : "Book Consultation")}
            </Link>
            
            {/* 👈 ديزاين اللغة الجديد في الموبايل، معتمد على الـ Toggle بتاعك */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <div className="hdr-lang-toggle" style={{ background: "rgba(255,255,255,0.04)" }}>
                <button
                  className={`hdr-lang-seg ${isAr ? "active" : "inactive"}`}
                  style={{ fontSize: "0.82rem", padding: "0.3rem 1rem" }}
                  onClick={isAr ? undefined : toggle}
                >
                  عربي
                </button>
                <button
                  className={`hdr-lang-seg ${!isAr ? "active" : "inactive"}`}
                  style={{ fontSize: "0.82rem", padding: "0.3rem 1rem" }}
                  onClick={!isAr ? undefined : toggle}
                >
                  EN
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}