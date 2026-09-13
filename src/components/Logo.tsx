import { Link } from "react-router-dom"; // تم التعديل

import { useLangStore } from "@/store/useLangStore"; // تم التعديل

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export default function Logo({ size = "md", withText = true }: LogoProps) {
  const { isAr } = useLangStore();
  const dim = size === "sm" ? 36 : size === "md" ? 48 : 64;

  return (
    <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: "none", minWidth: 0 }}>
      {/* SVG code remains identical */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transition: "transform 0.3s" }}
      >
        <circle cx="50" cy="50" r="46" stroke="#E8D8B8" strokeWidth="2.5" fill="none" />
        <line x1="50" y1="18" x2="50" y2="82" stroke="#E8D8B8" strokeWidth="2" />
        <line x1="32" y1="38" x2="68" y2="38" stroke="#E8D8B8" strokeWidth="2" />
        <line x1="32" y1="38" x2="26" y2="55" stroke="#E8D8B8" strokeWidth="1.5" />
        <line x1="68" y1="38" x2="74" y2="55" stroke="#E8D8B8" strokeWidth="1.5" />
        <path d="M23 55 Q26 61 29 55" stroke="#E8D8B8" strokeWidth="1.5" fill="none" />
        <path d="M71 55 Q74 61 77 55" stroke="#E8D8B8" strokeWidth="1.5" fill="none" />
        <path d="M43 20 L50 14 L57 20" stroke="#E8D8B8" strokeWidth="1.5" fill="none" />
        <rect x="46" y="78" width="8" height="4" fill="#E8D8B8" />
        <line x1="38" y1="82" x2="62" y2="82" stroke="#E8D8B8" strokeWidth="2" />
      </svg>
      {withText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, minWidth: 0, overflow: "hidden" }}>
          <span
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#E8D8B8",
              fontWeight: 600,
              fontSize: size === "sm" ? "0.8rem" : size === "md" ? "0.95rem" : "1.1rem",
              lineHeight: 1.35,
              whiteSpace: "nowrap",
            }}
          >
            {isAr ? "وثاق الحق" : "Wethaq Al-Haq"}
          </span>
          <span
            className="logo-sub"
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              color: "#B8962E",
              fontWeight: 400,
              fontSize: size === "sm" ? "0.58rem" : "0.68rem",
              lineHeight: 1.4,
              whiteSpace: "nowrap",
            }}
          >
            {isAr ? "للمحاماة والاستشارات القانونية" : "Law Firm & Legal Consultations"}
          </span>
        </div>
      )}
      <style>{`@media (max-width: 420px) { .logo-sub { display: none !important; } }`}</style>
    </Link>
  );
}