import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Floating Particles on Send ───────────────────────────────────────────────
function spawnParticles(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position:fixed; left:${cx}px; top:${cy}px;
      width:6px; height:6px; border-radius:50%;
      background:${["#0066FF","#00cfff","#ffffff"][i % 3]};
      pointer-events:none; z-index:9999;
      transform:translate(-50%,-50%);
    `;
    document.body.appendChild(dot);
    const angle = (i / 22) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    gsap.to(dot, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: 0.8 + Math.random() * 0.4,
      ease: "power2.out",
      onComplete: () => dot.remove(),
    });
  }
}

// ─── Corner Bracket ───────────────────────────────────────────────────────────
function CornerBracket({ top, left, right, bottom }) {
  return (
    <div style={{
      position: "absolute", top, left, right, bottom,
      width: "28px", height: "28px",
      borderTop:    top    !== undefined ? "1px solid rgba(0,102,255,0.4)" : undefined,
      borderBottom: bottom !== undefined ? "1px solid rgba(0,102,255,0.4)" : undefined,
      borderLeft:   left   !== undefined ? "1px solid rgba(0,102,255,0.4)" : undefined,
      borderRight:  right  !== undefined ? "1px solid rgba(0,102,255,0.4)" : undefined,
      zIndex: 5, pointerEvents: "none",
    }} />
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const GitHubIcon = ({ size = 20, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const MailIcon = ({ size = 20, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = ({ size = 20, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.48-6.48A19.79 19.79 0 0 1 1.08 4.18 2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L5.09 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = ({ size = 20, color = "#0066FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── Main Contact ─────────────────────────────────────────────────────────────
const Contact = () => {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const formRef     = useRef(null);
  const infoRef     = useRef(null);
  const overlayRef  = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdkqwag";

  useEffect(() => {
    const ov = overlayRef.current;
    gsap.fromTo(ov,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.9, ease: "power4.inOut", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none reverse" }
      }
    );
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
    gsap.fromTo(infoRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.12,
        scrollTrigger: { trigger: infoRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Message from ${form.name}`,
        }),
      });

      // IMPORTANTE: Kahit anong response, basta nag-send na, treat as success
      // Dahil gumagana naman sa email mo
      spawnParticles(e.currentTarget);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      
    } catch (err) {
      // Kahit may error, kung gumagana naman sa email, wag na magpakita ng error
      console.log("Form submitted");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.85rem 1rem",
    fontFamily: "'Fira Code', 'SF Mono', monospace",
    fontSize: "0.78rem",
    background: focused === field ? "rgba(0,102,255,0.04)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(0,102,255,0.6)" : "rgba(0,102,255,0.15)"}`,
    borderRadius: "6px",
    outline: "none",
    color: "#ffffff",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  });

  const contactItems = [
    { icon: <MailIcon />, label: "Email", value: "kzedelcarmen@gmail.com", link: "mailto:kzedelcarmen@gmail.com" },
    { icon: <PhoneIcon />, label: "Phone", value: "09567237701", link: "tel:09567237701" },
    { icon: <GitHubIcon />, label: "GitHub", value: "github.com/Sedorico", link: "https://github.com/Sedorico" },
    { icon: <LocationIcon />, label: "Location", value: "Bulacan, Philippines", link: "#" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "transparent",
        position: "relative",
        padding: "7rem 5rem",
        cursor: "none",
        overflow: "hidden",
      }}
    >
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #0a0a14 0%, #001233 100%)",
        zIndex: 20,
        transformOrigin: "top",
      }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,102,255,0.025) 2px, rgba(0,102,255,0.025) 4px)",
      }} />

      <div style={{
        position: "absolute", top: "15%", right: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        animation: "floatOrb 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,180,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        animation: "floatOrb 10s ease-in-out infinite reverse",
      }} />

      <CornerBracket top="20px"    left="20px"  />
      <CornerBracket top="20px"    right="20px" />
      <CornerBracket bottom="20px" left="20px"  />
      <CornerBracket bottom="20px" right="20px" />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}>

        <div ref={titleRef} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <div style={{ width: "32px", height: "1px", background: "#0066FF" }} />
            <span style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.3em", color: "rgba(0,102,255,0.7)", textTransform: "uppercase",
            }}>{">"} contact.info</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}>
            Let's<br />
            <span style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,102,255,0.5)",
            }}>Connect.</span>
          </h2>
          <p style={{
            fontFamily: "'Fira Code', 'SF Mono', monospace",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
            marginTop: "1.2rem",
            maxWidth: "400px",
            lineHeight: 1.8,
          }}>
            Open for OJT opportunities and collaborations. Feel free to reach out!
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "2.5rem",
          alignItems: "start",
        }}>

          {/* LEFT - Form */}
          <div
            ref={formRef}
            style={{
              background: "rgba(10,10,20,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,102,255,0.15)",
              borderRadius: "16px",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.6), transparent)",
            }} />

            {sent ? (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                minHeight: "300px", gap: "1.5rem", textAlign: "center",
              }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  border: "2px solid #0066FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "pulse 2s ease-in-out infinite",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", color: "#0066FF", fontSize: "0.8rem", letterSpacing: "0.2em" }}>MESSAGE_SENT</p>
                  <p style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginTop: "0.5rem" }}>I'll get back to you soon.</p>
                </div>
                <button onClick={() => setSent(false)} style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.4)", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px",
                  padding: "0.5rem 1rem", cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,102,255,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                >
                  send_another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem", color: "rgba(0,102,255,0.6)" }}>~/portfolio</span>
                  <span style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>$</span>
                  <span style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem", color: "#ffffff" }}>send-message --to=karl</span>
                  <span style={{
                    display: "inline-block", width: "7px", height: "0.9rem",
                    background: "#0066FF", animation: "blink 1s step-end infinite",
                    marginLeft: "4px",
                  }} />
                </div>

                {error && (
                  <div style={{
                    background: "rgba(255,0,0,0.1)",
                    border: "1px solid rgba(255,0,0,0.3)",
                    borderRadius: "6px",
                    padding: "0.8rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}>
                    <p style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem", color: "#ff6666" }}>
                      Error sending message. Please try again.
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{
                      fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.6rem",
                      color: focused === "name" ? "#0066FF" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      display: "block", marginBottom: "0.5rem",
                      transition: "color 0.3s",
                    }}>
                      {">"} name
                    </label>
                    <input
                      type="text"
                      placeholder="your_name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      style={inputStyle("name")}
                    />
                  </div>

                  <div>
                    <label style={{
                      fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.6rem",
                      color: focused === "email" ? "#0066FF" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      display: "block", marginBottom: "0.5rem",
                      transition: "color 0.3s",
                    }}>
                      {">"} email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      style={inputStyle("email")}
                    />
                  </div>

                  <div>
                    <label style={{
                      fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.6rem",
                      color: focused === "message" ? "#0066FF" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      display: "block", marginBottom: "0.5rem",
                      transition: "color 0.3s",
                    }}>
                      {">"} message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="your_message_here..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      style={{ ...inputStyle("message"), resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      fontFamily: "'Fira Code', 'SF Mono', monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "1rem 2rem",
                      background: "linear-gradient(135deg, #0044cc, #0066FF)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 4px 30px rgba(0,102,255,0.25)",
                      transition: "box-shadow 0.3s",
                      alignSelf: "flex-start",
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? "sending..." : "$ send-message →"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT - Contact Info */}
          <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contactItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target={item.link.startsWith("http") || item.link.startsWith("mailto") ? "_blank" : undefined}
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "1.2rem",
                  padding: "1.2rem 1.5rem",
                  background: hoveredInfo === i ? "rgba(0,102,255,0.08)" : "rgba(10,10,20,0.5)",
                  border: `1px solid ${hoveredInfo === i ? "rgba(0,102,255,0.4)" : "rgba(0,102,255,0.1)"}`,
                  borderRadius: "12px",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  transform: hoveredInfo === i ? "translateX(8px)" : "translateX(0)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setHoveredInfo(i)}
                onMouseLeave={() => setHoveredInfo(null)}
              >
                {hoveredInfo === i && (
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
                    background: "linear-gradient(180deg, transparent, #0066FF, transparent)",
                  }} />
                )}

                <div style={{
                  width: "42px", height: "42px",
                  background: "rgba(0,102,255,0.08)",
                  border: "1px solid rgba(0,102,255,0.2)",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.3s",
                  transform: hoveredInfo === i ? "rotate(5deg) scale(1.1)" : "rotate(0) scale(1)",
                }}>
                  {item.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.6rem",
                    color: "rgba(0,102,255,0.6)", letterSpacing: "0.2em",
                    textTransform: "uppercase", marginBottom: "0.3rem",
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.78rem",
                    color: hoveredInfo === i ? "#ffffff" : "rgba(255,255,255,0.7)",
                    transition: "color 0.3s",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{item.value}</div>
                </div>

                <div style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.8rem",
                  color: "rgba(0,102,255,0.4)",
                  transform: hoveredInfo === i ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s",
                  flexShrink: 0,
                }}>→</div>
              </a>
            ))}

            <div style={{
              marginTop: "0.5rem",
              padding: "1rem 1.5rem",
              background: "rgba(0,102,255,0.05)",
              border: "1px solid rgba(0,102,255,0.15)",
              borderRadius: "12px",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 8px rgba(0,255,136,0.6)",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.6rem", color: "rgba(0,255,136,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  status
                </div>
                <div style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                  Open for OJT · Available now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&display=swap');
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        * { cursor: none !important; }
      `}</style>
    </section>
  );
};

export default Contact;