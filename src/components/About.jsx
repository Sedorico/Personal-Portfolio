import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Corner Brackets (DARK BLUE) ────────────────────────────────────
function CornerBracket({ top, left, right, bottom }) {
  return (
    <div style={{
      position: "absolute", top, left, right, bottom,
      width: "28px", height: "28px",
      borderTop: top !== undefined ? "1px solid rgba(0, 102, 255, 0.4)" : undefined,
      borderBottom: bottom !== undefined ? "1px solid rgba(0, 102, 255, 0.4)" : undefined,
      borderLeft: left !== undefined ? "1px solid rgba(0, 102, 255, 0.4)" : undefined,
      borderRight: right !== undefined ? "1px solid rgba(0, 102, 255, 0.4)" : undefined,
      zIndex: 5, pointerEvents: "none",
    }} />
  );
}

// ─── GitHub Icon SVG ────────────────────────────────────────────────
const GitHubIcon = ({ size = 22, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

// ─── Download Icon SVG (for Resume) ─────────────────────────────────
const DownloadIcon = ({ size = 22, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// ─── Mail Icon SVG (for Contact) ────────────────────────────────────
const MailIcon = ({ size = 22, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

function About() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const terminalRef = useRef(null);
  const dividerRef = useRef(null);
  const buttonsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  // ENTRANCE ANIMATION
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.95,
          filter: "blur(15px)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)", 
          duration: 0.9, 
          ease: "back.out(1.2)",
          delay: 0.3
        }
      );
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(tagRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: tagRef.current, start: "top 88%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(nameRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: nameRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: dividerRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(bioRef.current.querySelectorAll("p, ul"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: bioRef.current, start: "top 82%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: buttonsRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(terminalRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: terminalRef.current, start: "top 82%", toggleActions: "play none none reverse" }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle functions
  const handleGitHub = () => {
    window.open("https://github.com/Sedorico", "_blank");
  };

  const handleResume = () => {
    const resumeUrl = "https://drive.google.com/file/d/1P8Hn2p4NoUsioTxJYg2w0OalaADiiV88/view?usp=sharing";
    window.open(resumeUrl, "_blank");
  };

  const handleContact = () => {
    window.location.href = "mailto:kzedelcarmen@gmail.com";
  };

  const buttons = [
    { id: "github", label: "GitHub", icon: <GitHubIcon />, onClick: handleGitHub, color: "#0066FF" },
    { id: "resume", label: "Resume", icon: <DownloadIcon />, onClick: handleResume, color: "#0066FF" },
    { id: "contact", label: "Contact", icon: <MailIcon />, onClick: handleContact, color: "#0066FF" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "7rem 5rem",
        cursor: "none",
      }}
    >
      {/* Gradient vignette - dark */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 40% 50%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.5) 100%)",
      }} />

      {/* Scanlines - dark blue tint */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 102, 255, 0.03) 2px, rgba(0, 102, 255, 0.03) 4px)",
      }} />

      {/* Corner Brackets */}
      <CornerBracket top="20px"    left="20px"  />
      <CornerBracket top="20px"    right="20px" />
      <CornerBracket bottom="20px" left="20px"  />
      <CornerBracket bottom="20px" right="20px" />

      <div style={{
        position: "relative", zIndex: 5,
        width: "100%", maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "start",
      }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          <div ref={tagRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "1px", background: "#0066FF" }} />
            <span style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.3em", color: "#0066FF", textTransform: "uppercase",
            }}>{">"} about.me</span>
          </div>

          <div ref={nameRef}>
            <h2 style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700, color: "#ffffff", margin: 0,
              lineHeight: 1.15, letterSpacing: "-0.02em",
            }}>
              Karl Cedric F.<br />Del Carmen
            </h2>
            <p style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem",
              color: "#0066FF", marginTop: "0.5rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Computer Engineering Student
            </p>
          </div>

          <div ref={dividerRef} style={{ width: "100%", height: "1px", background: "rgba(0, 102, 255, 0.2)" }} />

          <div ref={bioRef} style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.85rem",
            lineHeight: 1.85, color: "rgba(255,255,255,0.85)",
          }}>
            <p>Hi, I'm Karl Cedric — a 4th-year BS Computer Engineering student at Bulacan State University with a strong focus on Software Engineering and Artificial Intelligence.</p>

            <p style={{ marginTop: "1rem" }}>I build systems that are functional and user-focused, working across Python, Java, PHP (Laravel), C++, and modern web technologies.</p>

            <p style={{ marginTop: "1rem", color: "#0066FF", fontWeight: 500 }}>featured-projects:</p>
            <ul style={{ marginLeft: "1.2rem", marginTop: "0.4rem", display: "flex", flexDirection: "column", gap: "4px" }}>
              <li>Sonara — voice recognition-based unlock system</li>
              <li>Fast Food Online Ordering Website</li>
              <li>Portfolio & Blog Website</li>
              <li>Microsauce E. coli Detector <span style={{ color: "rgba(0, 102, 255, 0.6)" }}>(Thesis)</span></li>
            </ul>

            <p style={{ marginTop: "1rem", color: "#0066FF", fontWeight: 500 }}>consider myself:</p>
            <p>I consider myself a consistent and dedicated problem solver who enjoys taking on challenges and continuously learning.</p>
          </div>

          {/* Action Buttons - GitHub, Resume, Contact */}
          <div ref={buttonsRef} style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            {buttons.map((btn) => (
              <button
                key={btn.id}
                onClick={btn.onClick}
                onMouseEnter={() => setHoveredBtn(btn.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.6rem 1.2rem",
                  background: hoveredBtn === btn.id ? "rgba(0, 102, 255, 0.15)" : "rgba(10, 10, 20, 0.6)",
                  border: hoveredBtn === btn.id ? "1px solid rgba(0, 102, 255, 0.5)" : "1px solid rgba(0, 102, 255, 0.2)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: hoveredBtn === btn.id ? "translateY(-2px)" : "translateY(0)",
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  fontSize: "0.7rem",
                  color: hoveredBtn === btn.id ? "#0066FF" : "rgba(255,255,255,0.7)",
                }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Terminal (DARK BLUE THEME) ── */}
        <div
          ref={terminalRef}
          style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.72rem",
            lineHeight: 1.85,
            background: "rgba(10, 10, 20, 0.8)",
            backdropFilter: "blur(12px)",
            padding: "1.8rem",
            border: "1px solid rgba(0, 102, 255, 0.2)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          {/* Top accent line - dark blue */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #0066FF, transparent)",
          }} />

          {/* Terminal header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", border: "1px solid rgba(0,0,0,0.08)" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", border: "1px solid rgba(0,0,0,0.08)" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", border: "1px solid rgba(0,0,0,0.08)" }} />
            </div>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#0066FF", textTransform: "uppercase" }}>
              karlCedric.json
            </span>
          </div>

          <div style={{ color: "rgba(0, 102, 255, 0.6)", marginBottom: "0.8rem", fontSize: "0.65rem" }}>
            <span style={{ color: "rgba(0, 102, 255, 0.4)" }}>~/portfolio</span> $ cat karlCedric.json
          </div>

          <div style={{ color: "rgba(0, 102, 255, 0.5)" }}>{"{"}</div>

          <div style={{ marginLeft: "1.2rem" }}>
            {[
              { key: "name",       val: '"Karl Cedric F. Del Carmen"' },
              { key: "role",       val: '"Computer Engineering Student"' },
              { key: "year",       val: '"4th Year"' },
              { key: "university", val: '"Bulacan State University"' },
              { key: "status",     val: '"Seeking OJT"',  highlight: true },
            ].map(row => (
              <div key={row.key} style={{ display: "flex", gap: "0" }}>
                <span style={{ color: "rgba(0, 102, 255, 0.5)" }}>"{row.key}"</span>
                <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>: </span>
                <span style={{ color: row.highlight ? "#0066FF" : "rgba(255,255,255,0.7)", fontWeight: row.highlight ? 500 : 400 }}>{row.val}</span>
                <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>,</span>
              </div>
            ))}

            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ color: "rgba(0, 102, 255, 0.5)" }}>"interests"</span>
              <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>: </span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>["Software Engineering", "AI"]</span>
              <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>,</span>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ color: "rgba(0, 102, 255, 0.5)" }}>"techStack"</span>
              <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>: [</span>
            </div>
            <div style={{ marginLeft: "1.5rem" }}>
              {["Python", "Java", "PHP/Laravel", "C++", "HTML/CSS/JS", "Arduino", "ESP32"].map((t, i, arr) => (
                <div key={t}>
                  <span style={{ color: "rgba(0, 102, 255, 0.7)" }}>"{t}"</span>
                  <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>{i < arr.length - 1 ? "," : ""}</span>
                </div>
              ))}
            </div>
            <div style={{ color: "rgba(0, 102, 255, 0.5)" }}>],</div>

            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ color: "rgba(0, 102, 255, 0.5)" }}>"projects"</span>
              <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>: [</span>
            </div>
            <div style={{ marginLeft: "1.5rem" }}>
              {["Sonara", "Fast Food Ordering Website", "Portfolio & Blog", "Microsauce E. coli Detector"].map((p, i, arr) => (
                <div key={p}>
                  <span style={{ color: "rgba(0, 102, 255, 0.7)" }}>"{p}"</span>
                  <span style={{ color: "rgba(0, 102, 255, 0.3)" }}>{i < arr.length - 1 ? "," : ""}</span>
                </div>
              ))}
            </div>
            <div style={{ color: "rgba(0, 102, 255, 0.5)" }}>]</div>
          </div>

          <div style={{ color: "rgba(0, 102, 255, 0.5)" }}>{"}"}</div>

          <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "rgba(0, 102, 255, 0.5)" }}>~/portfolio $</span>
            <span style={{
              display: "inline-block", width: "8px", height: "1rem",
              background: "#0066FF", animation: "blink 1s step-end infinite",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&display=swap');
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        * { cursor: none !important; }
      `}</style>
    </section>
  );
}

export default About;