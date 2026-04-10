import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── Ripple Canvas ────────────────────────────────────────────────────────────
function RippleCanvas() {
  const canvasRef = useRef(null);
  const ripples   = useRef([]);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      if (Math.random() > 0.85)
        ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.25, speed: 1.8 + Math.random() * 1.2 });
    };
    const onClick = (e) =>
      ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.5, speed: 3 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ripples.current = ripples.current.filter(r => r.alpha > 0.01);
      ripples.current.forEach(rip => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,102,255,${rip.alpha})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        if (rip.r > 15) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,150,255,${rip.alpha * 0.6})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
        rip.r     += rip.speed;
        rip.alpha *= 0.94;
      });
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1,
    }} />
  );
}

// ─── Glitch hook ──────────────────────────────────────────────────────────────
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

// ─── Typewriter ───────────────────────────────────────────────────────────────
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
      const t = setTimeout(() => setCharIdx(c => c + 1), 45);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [started, charIdx, lineIdx, lines]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.65rem", color: "#5aaaff" }}>{">"}</span>
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#5aaaff", textTransform: "uppercase" }}>
            {i < lineIdx ? line : i === lineIdx ? line.slice(0, charIdx) : ""}
            {i === lineIdx && charIdx < line.length && (
              <span style={{ animation: "blink 0.8s step-end infinite", color: "#5aaaff" }}>█</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Corner Brackets ──────────────────────────────────────────────────────────
function CornerBracket({ top, left, right, bottom }) {
  return (
    <div className="corner-bracket" style={{
      position: "absolute", top, left, right, bottom,
      width: "28px", height: "28px",
      borderTop:    top    !== undefined ? "1px solid rgba(0,102,255,0.55)" : undefined,
      borderBottom: bottom !== undefined ? "1px solid rgba(0,102,255,0.55)" : undefined,
      borderLeft:   left   !== undefined ? "1px solid rgba(0,102,255,0.55)" : undefined,
      borderRight:  right  !== undefined ? "1px solid rgba(0,102,255,0.55)" : undefined,
      zIndex: 5, pointerEvents: "none",
    }} />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ onNavigate, isTransitioning }) => {
  const firstNameRef      = useRef(null);
  const lastNameRef       = useRef(null);
  const descRef           = useRef(null);
  const btnsRef           = useRef(null);
  const tagRef            = useRef(null);
  const lineRef           = useRef(null);
  const statsContainerRef = useRef(null);

  const [glitchActive, setGlitchActive] = useState(false);
  const [hoveredStat,  setHoveredStat]  = useState(null);
  const firstName = useGlitch("Karl Cedric", glitchActive);
  const lastName  = useGlitch("Del Carmen",  glitchActive);

  const stats = [
    { icon: "🔵", label: "STATUS",         value: "SEEKING OJT", sub: "Available for internship", isPrimary: true  },
    { icon: "🔵", label: "PROJECTS",       value: "8",           sub: "Completed projects",        isPrimary: false },
    { icon: "🔵", label: "GRADE YEAR",     value: "4TH YEAR",                   isPrimary: false },
  ];

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline();
      tl.from(".corner-bracket",    { opacity: 0, duration: 0.5, stagger: 0.1 }, 0);
      tl.from(tagRef.current,       { opacity: 0, x: -50, duration: 0.6, ease: "back.out(1.2)" }, 0.3);
      tl.from(lineRef.current,      { scaleX: 0, duration: 0.5, ease: "power2.out", transformOrigin: "left" }, "-=0.3");
      tl.from(firstNameRef.current, { opacity: 0, y: 100, rotationX: 45, filter: "blur(8px)", duration: 0.8, ease: "elastic.out(1,0.5)" }, 0.5);
      tl.from(lastNameRef.current,  { opacity: 0, y: 100, rotationX: 45, filter: "blur(8px)", duration: 0.8, ease: "elastic.out(1,0.5)" }, "-=0.6");
      tl.from(descRef.current,      { opacity: 0, y: 30, filter: "blur(4px)", duration: 0.6, ease: "power3.out" }, "-=0.3");
      tl.from(btnsRef.current,      { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");

      gsap.fromTo(statsContainerRef.current.children,
        { opacity: 0, x: 60, rotationY: 30 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setGlitchActive(true),  1800);
    setTimeout(() => setGlitchActive(false), 2500);
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 700);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate && !isTransitioning) onNavigate();
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh", width: "100%",
      background: "transparent",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <RippleCanvas />

      {/* ── Dark overlay — makes ALL text clearly readable ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(4, 8, 20, 0.75)",
        backdropFilter: "blur(1.5px)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,102,255,0.03) 2px, rgba(0,102,255,0.03) 4px)",
      }} />

      <CornerBracket top="20px"    left="20px"  />
      <CornerBracket top="20px"    right="20px" />
      <CornerBracket bottom="20px" left="20px"  />
      <CornerBracket bottom="20px" right="20px" />

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 5,
        width: "100%", maxWidth: "1200px",
        margin: "0 auto", padding: "0 5rem",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: "4rem", alignItems: "center",
      }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          <div ref={tagRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div ref={lineRef} style={{ width: "32px", height: "1px", background: "#5aaaff" }} />
            <TypedText lines={["Computer Engineering Student", "Bulacan State University · BSCPE"]} delay={400} />
          </div>

          <div style={{ lineHeight: 1 }}>
            <h1 ref={firstNameRef} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 800, color: "#ffffff", margin: 0,
              letterSpacing: "-0.03em", userSelect: "none",
              textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 60px rgba(0,102,255,0.3)",
            }}>
              {firstName}
            </h1>
            <h1 ref={lastNameRef} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 800, color: "transparent",
              WebkitTextStroke: "1.5px rgba(90, 170, 255, 0.8)",
              margin: 0, letterSpacing: "-0.03em", userSelect: "none",
            }}>
              {lastName}
            </h1>
          </div>

          <p ref={descRef} style={{
            fontFamily: "'Fira Code', monospace", fontSize: "0.85rem",
            lineHeight: 1.8, color: "rgba(255,255,255,0.85)",
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
                fontFamily: "'Fira Code', monospace", fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "0.85rem 2rem",
                border: "1px solid #5aaaff",
                color: "#5aaaff", textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(0,102,255,0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.backgroundColor = "#0066FF";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,102,255,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#5aaaff";
                e.currentTarget.style.backgroundColor = "rgba(0,102,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              $ ./enter-portfolio --init
            </a>
          </div>
        </div>

        {/* Right — Stats */}
        <div ref={statsContainerRef} style={{
          display: "flex", flexDirection: "column",
          gap: "12px", minWidth: "250px",
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                padding: stat.isPrimary ? "16px 20px" : "12px 20px",
                border: hoveredStat === index
                  ? "1px solid #5aaaff"
                  : stat.isPrimary
                    ? "1px solid rgba(90,170,255,0.5)"
                    : "1px solid rgba(90,170,255,0.25)",
                background: hoveredStat === index
                  ? "rgba(0,102,255,0.22)"
                  : stat.isPrimary
                    ? "rgba(0,102,255,0.12)"
                    : "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s cubic-bezier(0.2,0.9,0.4,1.1)",
                fontFamily: "'Fira Code', monospace",
                transform: hoveredStat === index ? "translateX(5px) scale(1.02)" : "translateX(0) scale(1)",
                boxShadow: hoveredStat === index ? "0 5px 20px rgba(0,102,255,0.2)" : "none",
              }}
            >
              <div style={{
                fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase",
                color: stat.isPrimary ? "#5aaaff" : "rgba(255,255,255,0.7)",
                marginBottom: stat.isPrimary ? "8px" : "4px",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <span style={{ fontSize: "0.85rem" }}>{stat.icon}</span>
                {stat.label}
              </div>
              <div style={{
                fontSize: stat.isPrimary ? "0.9rem" : "1.2rem",
                fontWeight: "bold",
                color: stat.isPrimary ? "#5aaaff" : "#ffffff",
              }}>
                {stat.value}
              </div>
              {stat.sub && (
                <div style={{
                  fontSize: "0.65rem",
                  color: stat.isPrimary ? "rgba(90,170,255,0.8)" : "rgba(255,255,255,0.6)",
                  marginTop: "4px",
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
      `}</style>
    </section>
  );
};

export default Hero;
