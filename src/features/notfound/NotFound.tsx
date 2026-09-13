import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation('common'); // سنضع نصوص الخطأ في common.json لسهولة الوصول

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e2b1e",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "clamp(4rem, 12vw, 8rem)",
          fontWeight: 700,
          color: "rgba(184,150,46,0.15)",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontWeight: 700,
          color: "#f5edd8",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          marginBottom: "1rem",
        }}
      >
        {t('notFound.title')}
      </h1>
      <p
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          color: "rgba(232,216,184,0.55)",
          fontSize: "0.9rem",
          marginBottom: "2.5rem",
          maxWidth: 400,
          lineHeight: 1.8,
        }}
      >
        {t('notFound.message')}
      </p>
      <Link to="/" className="btn-primary">
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}