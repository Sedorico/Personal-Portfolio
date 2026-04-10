import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── Custom Cursor (dark blue theme) ─────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dotRef.current, {
        x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out"
      });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ringRef.current, { x: ringX, y: ringY });
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      gsap.to(ringRef.current, { scale: 2.2, borderColor: "#0066FF", opacity: 0.7, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 0, duration: 0.3 });
    };
    const onLeaveLink = () => {
      gsap.to(ringRef.current, { scale: 1, borderColor: "rgba(0, 102, 255, 0.4)", opacity: 1, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const links = document.querySelectorAll("a, button, [data-hover]");
    links.forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach(el => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "6px", height: "6px",
        background: "#0066FF",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "36px", height: "36px",
        border: "1px solid rgba(0, 102, 255, 0.4)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9998,
        transform: "translate(-50%, -50%)",
      }} />
    </>
  );
}

// ─── Ripple Canvas (dark blue) ────────────────────────────────────────────
function RippleCanvas() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      if (Math.random() > 0.85) {
        ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.25, speed: 1.8 + Math.random() * 1.2 });
      }
    };
    const onClick = (e) => {
      ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.5, speed: 3 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ripples.current = ripples.current.filter((r) => r.alpha > 0.01);
      ripples.current.forEach((rip) => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 102, 255, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.r > 15) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 150, 255, ${rip.alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        rip.r += rip.speed;
        rip.alpha *= 0.94;
      });
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 3,
    }} />
  );
}

// ─── Glitch hook ───────────────────────────────────────────────────────────────
function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);
  const chars = "01#$%&<>/\\|ABCDEFabcdef!@#$%^&*()";

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const id = setInterval(() => {
      if (frame > 18) { setDisplay(text); clearInterval(id); return; }
      setDisplay(text.split("").map((c, i) =>
        i < frame ? c : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      frame++;
    }, 35);
    return () => clearInterval(id);
  }, [active, text]);

  return display;
}

// ─── Typewriter (dark blue) ───────────────────────────────────────────────────
function TypedText({ lines, delay = 0 }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (lineIdx >= lines.length) return;
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 45);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [started, charIdx, lineIdx, lines]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.65rem", color: "#0066FF" }}>{">"}</span>
          <span style={{ fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#0066FF", textTransform: "uppercase" }}>
            {i < lineIdx ? line : i === lineIdx ? line.slice(0, charIdx) : ""}
            {i === lineIdx && charIdx < line.length && (
              <span style={{ animation: "blink 0.8s step-end infinite", color: "#0066FF" }}>█</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Corner Brackets (dark blue) ──────────────────────────────────────────────
function CornerBracket({ top, left, right, bottom }) {
  return (
    <div className="corner-bracket" style={{
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

// ─── Hero ─────────────────────────────────────────────────────────
const Hero = ({ onNavigate, isTransitioning }) => {
  const heroRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const tagRef = useRef(null);
  const lineRef = useRef(null);
  const statsContainerRef = useRef(null);
  
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const firstName = useGlitch("Karl Cedric", glitchActive);
  const lastName = useGlitch("Del Carmen", glitchActive);

  const stats = [
    { icon: "🔵", label: "STATUS", value: "SEEKING OJT", sub: "Available for internship", isPrimary: true },
    { icon: "📁", label: "PROJECTS", value: "8", sub: "Completed projects", isPrimary: false },
    { icon: "🏆", label: "CERTIFICATIONS", value: "5", sub: "Professional certs", isPrimary: false },
    
  ];

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline();
      
      tl.from(".corner-bracket", { opacity: 0, duration: 0.5, stagger: 0.1 }, 0);
      tl.from(tagRef.current, { opacity: 0, x: -50, duration: 0.6, ease: "back.out(1.2)" }, 0.3);
      tl.from(lineRef.current, { scaleX: 0, duration: 0.5, ease: "power2.out", transformOrigin: "left" }, "-=0.3");
      tl.from(firstNameRef.current, { opacity: 0, y: 100, rotationX: 45, filter: "blur(8px)", duration: 0.8, ease: "elastic.out(1, 0.5)" }, 0.5);
      tl.from(lastNameRef.current, { opacity: 0, y: 100, rotationX: 45, filter: "blur(8px)", duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.6");
      tl.from(descRef.current, { opacity: 0, y: 30, filter: "blur(4px)", duration: 0.6, ease: "power3.out" }, "-=0.3");
      tl.from(btnsRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");
      
      gsap.fromTo(statsContainerRef.current.children,
        { opacity: 0, x: 60, rotationY: 30 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setGlitchActive(true), 1800);
    setTimeout(() => setGlitchActive(false), 2500);

    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 700);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate && !isTransitioning) {
      onNavigate();
    }
  };

  return (
    <>
      <CustomCursor />
      <section ref={heroRef} id="hero" style={{
        minHeight: "100vh", width: "100%",
        background: "transparent",
        position: "relative", overflow: "hidden", display: "flex", alignItems: "center",
        cursor: "none",
      }}>
        <RippleCanvas />

        <div style={{
          position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 102, 255, 0.04) 2px, rgba(0, 102, 255, 0.04) 4px)",
        }} />

        <CornerBracket top="20px" left="20px" />
        <CornerBracket top="20px" right="20px" />
        <CornerBracket bottom="20px" left="20px" />
        <CornerBracket bottom="20px" right="20px" />

        <div style={{
          position: "relative", zIndex: 5, width: "100%", maxWidth: "1200px",
          margin: "0 auto", padding: "0 5rem",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            <div ref={tagRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div ref={lineRef} style={{ width: "32px", height: "1px", background: "#0066FF" }} />
              <TypedText lines={["Computer Engineering Student", "Bulacan State University · BSCPE"]} delay={400} />
            </div>

            <div style={{ lineHeight: 1 }}>
              <h1 ref={firstNameRef} style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                fontWeight: 700, color: "#ffffff", margin: 0,
                letterSpacing: "-0.03em", userSelect: "none",
                textShadow: "0 0 30px rgba(0, 102, 255, 0.3)",
              }}>
                {firstName}
              </h1>
              <h1 ref={lastNameRef} style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                fontWeight: 700, color: "transparent",
                WebkitTextStroke: "1px rgba(0, 102, 255, 0.5)",
                margin: 0, letterSpacing: "-0.03em", userSelect: "none",
              }}>
                {lastName}
              </h1>
            </div>

            <p ref={descRef} style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.85rem",
              lineHeight: 1.8, color: "rgba(255,255,255,0.6)",
              maxWidth: "460px", margin: 0,
            }}>
              4th-year Computer Engineering student at Bulacan State University.
              Passionate about hardware-software integration and building innovative ICT solutions.
            </p>

            <div ref={btnsRef} style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
              <a 
                href="#"
                onClick={handleClick}
                style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace", fontSize: "0.7rem",
                  letterSpacing: "0.1em", textTransform: "none",
                  padding: "0.85rem 2rem", border: "1px solid #0066FF",
                  color: "#0066FF", textDecoration: "none",
                  position: "relative", overflow: "hidden", display: "inline-block",
                  transition: "all 0.3s ease", backgroundColor: "rgba(0, 102, 255, 0.05)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.color = "#ffffff"; 
                  e.currentTarget.style.backgroundColor = "#0066FF";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 102, 255, 0.3)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.color = "#0066FF"; 
                  e.currentTarget.style.backgroundColor = "rgba(0, 102, 255, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                $ ./enter-portfolio --init
              </a>
            </div>
          </div>

          <div ref={statsContainerRef} style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px", 
            minWidth: "250px",
          }}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                style={{
                  padding: stat.isPrimary ? "16px 20px" : "12px 20px",
                  border: hoveredStat === index 
                    ? "1px solid #0066FF" 
                    : stat.isPrimary 
                      ? "1px solid rgba(0, 102, 255, 0.3)" 
                      : "1px solid rgba(0, 102, 255, 0.2)",
                  background: hoveredStat === index
                    ? stat.isPrimary 
                      ? "rgba(0, 102, 255, 0.15)" 
                      : "rgba(0, 102, 255, 0.1)"
                    : stat.isPrimary 
                      ? "rgba(0, 102, 255, 0.05)" 
                      : "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(4px)",
                  cursor: "none",
                  transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  transform: hoveredStat === index ? "translateX(5px) scale(1.02)" : "translateX(0) scale(1)",
                  boxShadow: hoveredStat === index ? "0 5px 20px rgba(0, 102, 255, 0.15)" : "none",
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div style={{ 
                  fontSize: "0.6rem", 
                  letterSpacing: "0.15em", 
                  textTransform: "uppercase", 
                  color: stat.isPrimary ? "#0066FF" : "rgba(255,255,255,0.5)", 
                  marginBottom: stat.isPrimary ? "8px" : "4px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px",
                  transition: "all 0.3s ease",
                }}>
                  <span style={{ 
                    fontSize: hoveredStat === index ? "0.9rem" : "0.8rem",
                    transition: "all 0.3s ease",
                  }}>{stat.icon}</span> 
                  {stat.label}
                </div>
                <div style={{ 
                  fontSize: stat.isPrimary ? "0.9rem" : "1.2rem", 
                  fontWeight: "bold", 
                  color: stat.isPrimary ? "#0066FF" : "#ffffff",
                  transition: "all 0.3s ease",
                  letterSpacing: hoveredStat === index ? "1px" : "0",
                }}>
                  {stat.value}
                </div>
                {stat.sub && (
                  <div style={{ 
                    fontSize: "0.65rem", 
                    color: stat.isPrimary ? "rgba(0, 102, 255, 0.6)" : "rgba(255,255,255,0.4)", 
                    marginTop: "4px",
                    opacity: hoveredStat === index ? 1 : 0.7,
                    transition: "all 0.3s ease",
                  }}>
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
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
    </>
  );
};

export default Hero;