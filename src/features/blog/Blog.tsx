import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangStore } from "@/store/useLangStore";
import { useBlog } from "./hooks/useBlog";
import type { BlogPost } from "./api/blogApi";
// استخدمنا أيقونة لو مفيش صورة للمقال
import { Image as ImageIcon } from "lucide-react"; 

export default function Blog() {
  const { t } = useTranslation('blog');
  const { isAr } = useLangStore();
  const { data: posts, isLoading } = useBlog();
  const [selectedPost, setSelectedPost] = useState<null | BlogPost>(null);

  const l = (field: { ar: string, en: string } | undefined) => {
    if (!field) return '';
    return isAr ? field.ar : field.en;
  };

  if (isLoading) {
    return <div style={{ minHeight: "100vh", background: "#111a11" }} />;
  }

  // وضع القراءة (تفاصيل المقال)
  if (selectedPost) {
    return (
      <div>
        <div style={{ position: "relative", height: 400, overflow: "hidden", background: "#111a11" }}>
          {selectedPost.img ? (
            <img src={selectedPost.img} alt={l(selectedPost.title)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
          ) : (
             <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.1)" }}>
               <ImageIcon size={60} />
             </div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "rgba(30,43,30,0.6)" }} />
          <div style={{ position: "absolute", bottom: "2.5rem", maxWidth: 1280, padding: "0 1.5rem", left: "50%", transform: "translateX(-50%)", width: "100%" }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{ background: "transparent", border: "none", color: "#b8962e", cursor: "pointer", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "0.8rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              {t('actions.back', isAr ? "→ العودة للمدونة" : "← Back to Blog")}
            </button>
            <span style={{ background: "rgba(184,150,46,0.2)", color: "#b8962e", fontSize: "0.72rem", padding: "0.25rem 0.75rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", marginBottom: "1rem", display: "inline-block" }}>
              {l(selectedPost.cat)}
            </span>
            <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2.25rem)", color: "#f5edd8" }}>
              {l(selectedPost.title)}
            </h1>
          </div>
        </div>
        <div style={{ background: "#1e2b1e", padding: "4rem 1.5rem", minHeight: "50vh" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(184,150,46,0.15)", flexWrap: "wrap" }}>
              {[
                { icon: "✍️", text: l(selectedPost.author) },
                { icon: "📅", text: l(selectedPost.date) },
                { icon: "⏱️", text: l(selectedPost.readTime) },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem" }}>{icon}</span>
                  <span style={{ color: "rgba(232,216,184,0.55)", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* 👈 عرض المحتوى الحقيقي للمقال بدل الـ Dummy Text */}
            <div 
              style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.85)", fontSize: "0.95rem", lineHeight: 2.2, whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: l(selectedPost.body) }} // لو الأدمن بيكتب HTML من Rich Text Editor
            />
            {/* لو الأدمن بيكتب نص عادي، استبدل الـ div اللي فوق بـ: 
              <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.85)", fontSize: "0.95rem", lineHeight: 2.2, whiteSpace: "pre-wrap" }}>
                {l(selectedPost.body)}
              </p>
            */}
          </div>
        </div>
      </div>
    );
  }

  // اللستة (Main Blog Page)
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
              {t('hero.tag', isAr ? "المدونة" : "Blog")}
            </span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f5edd8" }}>
            {t('hero.title', isAr ? "المدونة القانونية" : "Legal Blog")}
          </h1>
          <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.6)", fontSize: "0.9rem", marginTop: "0.75rem", maxWidth: 600 }}>
            {t('hero.subtitle', isAr ? "مقالات وتحليلات قانونية متخصصة..." : "Specialized legal articles...")}
          </p>
          <div style={{ width: 60, height: 2, background: "#b8962e", marginTop: "1rem" }} />
        </div>
      </div>

      <section style={{ background: "#1e2b1e", padding: "5rem 1.5rem", minHeight: "50vh" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {posts && posts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {posts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="card-hover"
                  style={{ background: "#253325", border: "1px solid rgba(184,150,46,0.12)", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ height: 200, overflow: "hidden", background: "#111a11" }}>
                    {post.img ? (
                      <img src={post.img} alt={l(post.title)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, transition: "transform 0.4s ease" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.05)" }}>
                        <ImageIcon size={40} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", height: "calc(100% - 200px)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                      <span style={{ background: "rgba(184,150,46,0.1)", color: "#b8962e", fontSize: "0.68rem", padding: "0.2rem 0.6rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500 }}>
                        {l(post.cat)}
                      </span>
                      <span style={{ color: "rgba(232,216,184,0.4)", fontSize: "0.7rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                        {l(post.readTime)}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, color: "#f5edd8", fontSize: "0.95rem", lineHeight: 1.55, marginBottom: "0.75rem" }}>
                      {l(post.title)}
                    </h2>
                    <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.55)", fontSize: "0.8rem", lineHeight: 1.75, marginBottom: "1.25rem", flexGrow: 1 }}>
                      {l(post.excerpt)}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(184,150,46,0.1)", paddingTop: "1rem", marginTop: "auto" }}>
                      <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: "rgba(232,216,184,0.4)", fontSize: "0.72rem" }}>
                        {l(post.author)}
                      </span>
                      <span style={{ color: "#b8962e", fontSize: "0.78rem", fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500 }}>
                        {t('actions.readArticle', isAr ? "اقرأ المقال" : "Read Article")} →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "rgba(232,216,184,0.6)", padding: "4rem 0" }}>
              <p>لا توجد مقالات مضافة حتى الآن.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}