import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      style={{
        width: "100%",
        background: "rgba(10, 10, 20, 0.8)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0, 102, 255, 0.15)",
        padding: "3rem 5rem 2rem",
        marginTop: "4rem",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "2rem",
        alignItems: "start",
      }}>
        
        {/* Left Section - Tagline */}
        <div>
          <div style={{
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#0066FF",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            {">"} Zedricodes
          </div>
          <p style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.75rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "280px",
          }}>
            Computer Engineering student driven by problem-solving and system-level thinking.
          </p>
        </div>

        {/* Center Section - Navigation */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "rgba(0, 102, 255, 0.6)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            NAVIGATION
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.6)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: "0.2rem 0",
                  width: "fit-content",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0066FF";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Connect */}
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "rgba(0, 102, 255, 0.6)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            CONNECT
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}>
            <a
              href="mailto:kzedelcarmen@gmail.com"
              style={{
                fontFamily: "'Fira Code', 'SF Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0066FF";
                e.currentTarget.style.transform = "translateX(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              kzedelcarmen@gmail.com
            </a>
            <a
              href="https://github.com/Sedorico"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Fira Code', 'SF Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0066FF";
                e.currentTarget.style.transform = "translateX(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              github.com/Sedorico
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Row - Copyright and Back to Top */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "3rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(0, 102, 255, 0.1)",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div style={{
          fontFamily: "'Fira Code', 'SF Mono', monospace",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.35)",
        }}>
          © {new Date().getFullYear()} Karl Cedric F. Del Carmen - Zedricodes
        </div>
        
        <button
          onClick={scrollToTop}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.5)",
            background: "transparent",
            border: "1px solid rgba(0, 102, 255, 0.2)",
            borderRadius: "30px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0066FF";
            e.currentTarget.style.borderColor = "#0066FF";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(0, 102, 255, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>↑</span> Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;