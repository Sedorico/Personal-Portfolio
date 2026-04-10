import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01", title: "ATM Banking System",
    category: "Software Development",
    description: "A simple ATM banking system with basic account operations, transactions, and user authentication",
    accent: "#00C2FF", tags: ["Python", "OOP", "CLI"], year: "2022",
  },
  {
    number: "02", title: "Sonara: Voice Recognition",
    category: "AI / IoT",
    description: "A desktop application secured with voice authentication, enabling access through user voice input.",
    accent: "#A78BFA", tags: ["Python", "ML", "IoT"], year: "2025",
  },
  {
    number: "03", title: "Microsauce E. coli Detector",
    category: "Embedded Systems",
    description: "Thesis project — real-time bacteria detection system for food safety using sensors and microcontrollers. Presented at university capstone defense.",
    accent: "#34D399", tags: ["Arduino", "C++", "Sensors"], year: "2025",
  },
  {
    number: "04", title: "Sisig Babi Fast Food Online Order",
    category: "Web Development",
    description: "A full-stack e-commerce platform featuring product browsing, cart management, secure authentication, and real-time order tracking.",
    accent: "#FB923C", tags: ["Laravel", "PHP", "MySQL"], year: "2025",
  },
  {
    number: "05", title: "Numerical Methods Calculator",
    category: "Scientific Computing",
    description: "Scientific calculator implementing numerical analysis algorithms — Newton-Raphson, Euler's method, Gaussian elimination, and more.",
    accent: "#F472B6", tags: ["Python", "NumPy", "Math"], year: "2023",
  },
  {
    number: "06", title: "Jackpot Joyride Slot Machine",
    category: "Game Development",
    description: "A web-based slot machine game featuring interactive reels, basic animations, and a betting system.",
    accent: "#FBBF24", tags: ["Python", "Pygame", "Audio"], year: "2024",
  },
  {
    number: "07", title: "OBRAKADA Blog Website",
    category: "Web Development",
    description: "A social blogging platform with real-time posting, user interaction, and friend-based networking—designed like a modern fusion of content sharing and community building.",
    accent: "#60A5FA", tags: ["React", "GSAP", "Vite"], year: "2024",
  },
  {
    number: "08", title: "Ping Pong Pygame Game",
    category: "Game Development",
    description: "A 2D ping pong game built using Pygame, featuring real-time paddle mechanics, ball physics, and competitive gameplay.",
    accent: "#F87171", tags: ["Python", "Pygame", "2D"], year: "2023",
  },
];

// ─── Single full-height project panel ─────────────────────────────────────────
function ProjectPanel({ project, index }) {
  const panelRef = useRef(null);
  const maskRef = useRef(null);
  const numRef = useRef(null);
  const lineRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = panelRef.current;
    const mask = maskRef.current;
    const num = numRef.current;
    const line = lineRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    // ── ENTER timeline ───────────────────────────────────────────────────────
    const enterTl = gsap.timeline({ paused: true });
    enterTl
      .fromTo(mask,
        { scaleX: 1, transformOrigin: isEven ? "left center" : "right center" },
        { scaleX: 0, duration: 0.75, ease: "expo.inOut" }
      )
      .fromTo(num,
        { opacity: 0, scale: 1.25, filter: "blur(24px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(left,
        { opacity: 0, x: isEven ? -70 : 70 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        "-=0.55"
      )
      .fromTo(right,
        { opacity: 0, x: isEven ? 70 : -70 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        "-=0.65"
      );

    // ── EXIT timeline ────────────────────────────────────────────────────────
    const exitTl = gsap.timeline({ paused: true });
    exitTl
      .to([left, right], { opacity: 0, y: -40, duration: 0.38, ease: "power2.in", stagger: 0.06 })
      .to(num, { opacity: 0, scale: 0.8, filter: "blur(16px)", duration: 0.35, ease: "power2.in" }, "-=0.25")
      .to(line, { scaleX: 0, duration: 0.28, ease: "power2.in" }, "-=0.28")
      .fromTo(mask,
        { scaleX: 0, transformOrigin: isEven ? "right center" : "left center" },
        { scaleX: 1, duration: 0.55, ease: "expo.in" },
        "-=0.15"
      );

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 72%",
      end: "bottom 28%",
      onEnter: () => { exitTl.pause(0); enterTl.restart(); },
      onEnterBack: () => { exitTl.pause(0); enterTl.restart(); },
      onLeave: () => { enterTl.pause(); exitTl.restart(); },
      onLeaveBack: () => { enterTl.pause(); exitTl.restart(); },
    });

    return () => st.kill();
  }, [isEven]);

  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.035)",
      }}
    >
      {/* Giant ghost number */}
      <div ref={numRef} style={{
        position: "absolute",
        top: "50%",
        left: isEven ? "-2%" : "auto",
        right: isEven ? "auto" : "-2%",
        transform: "translateY(-50%)",
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "clamp(28vw, 34vw, 42vw)",
        fontWeight: 900,
        lineHeight: 0.82,
        color: "transparent",
        WebkitTextStroke: `2px ${project.accent}`,
        opacity: 0.18,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        zIndex: 3,
      }}>
        {project.number}
      </div>

      {/* Dark backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(6, 6, 10, 0.82)",
        backdropFilter: "blur(2px)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Accent glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: isEven ? "35%" : "65%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "700px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${project.accent}12 0%, transparent 65%)`,
        pointerEvents: "none", zIndex: 3,
      }} />

      {/* Diagonal accent stripe */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: isEven ? "48%" : "auto",
        right: isEven ? "auto" : "48%",
        width: "1px",
        background: `linear-gradient(to bottom, transparent, ${project.accent}25, transparent)`,
        zIndex: 3, pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 4,
        width: "100%", maxWidth: "1300px",
        margin: "0 auto", padding: "6rem 5rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8rem",
        alignItems: "center",
      }}>

        {/* ── LEFT ── */}
        <div ref={leftRef} style={{
          display: "flex", flexDirection: "column",
          order: isEven ? 0 : 1,
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "1.8rem",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: project.accent,
              boxShadow: `0 0 10px ${project.accent}`,
            }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              color: project.accent,
              textTransform: "uppercase",
            }}>
              {project.category}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              color: "rgba(255,255,255,0.18)",
            }}>
              · {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(3.2rem, 4.5vw, 5.8rem)",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            marginBottom: "2.2rem",
          }}>
            {project.title}
          </h3>

          {/* Accent line */}
          <div ref={lineRef} style={{
            width: "55px", height: "2px",
            background: `linear-gradient(to right, ${project.accent}, ${project.accent}44)`,
            marginBottom: "2rem",
            transformOrigin: isEven ? "left center" : "right center",
          }} />
        </div>

        {/* ── RIGHT ── */}
        <div ref={rightRef} style={{
          display: "flex", flexDirection: "column",
          order: isEven ? 1 : 0,
        }}>
          {/* Index counter */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "2.5rem",
            textTransform: "uppercase",
          }}>
            {project.number} / {String(projects.length).padStart(2, "0")}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.85rem",
            lineHeight: 2.1,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "400px",
            marginBottom: "3.5rem",
          }}>
            {project.description}
          </p>

          {/* CTA */}
          <a
            href="https://github.com/Sedorico?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "16px", cursor: "pointer", width: "fit-content", textDecoration: "none" }}
            onMouseEnter={e => {
              e.currentTarget.querySelector(".cta-line").style.width = "55px";
              e.currentTarget.querySelector(".cta-text").style.color = "#ffffff";
              e.currentTarget.querySelector(".cta-arrow").style.transform = "translateX(8px)";
              e.currentTarget.querySelector(".cta-arrow").style.color = project.accent;
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector(".cta-line").style.width = "28px";
              e.currentTarget.querySelector(".cta-text").style.color = "rgba(255,255,255,0.28)";
              e.currentTarget.querySelector(".cta-arrow").style.transform = "translateX(0)";
              e.currentTarget.querySelector(".cta-arrow").style.color = "rgba(255,255,255,0.28)";
            }}
          >
            <div className="cta-line" style={{
              width: "28px", height: "1px",
              background: project.accent,
              transition: "width 0.35s ease",
              flexShrink: 0,
            }} />
            <span className="cta-text" style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              transition: "color 0.3s ease",
            }}>
              View Project
            </span>
            <span className="cta-arrow" style={{
              color: "rgba(255,255,255,0.28)",
              fontSize: "0.9rem",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}>
              →
            </span>
          </a>
        </div>
      </div>

      {/* Wipe mask */}
      <div ref={maskRef} style={{
        position: "absolute", inset: 0,
        background: "#080808",
        zIndex: 20,
      }} />
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const eyebrow = headerRef.current.querySelector(".proj-eyebrow");
      const title = headerRef.current.querySelector(".proj-title");

      gsap.fromTo(eyebrow,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Char split on title
      const chars = title.textContent.split("");
      title.innerHTML = chars.map(c =>
        c === " "
          ? `<span style="display:inline-block;width:0.28em"> </span>`
          : `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="proj-char" style="display:inline-block">${c}</span></span>`
      ).join("");

      gsap.fromTo(".proj-char",
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          duration: 0.72, stagger: 0.018, ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ width: "100%", background: "transparent", position: "relative" }}
    >
      {/* Section header */}
      <div ref={headerRef} style={{ maxWidth: "1300px", margin: "0 auto", padding: "8rem 5rem 3rem" }}>
        <div className="proj-eyebrow" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.18)" }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
            letterSpacing: "0.4em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
          }}>
            {'>'} projects.list
          </span>
        </div>

        <h2 className="proj-title" style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(4.5rem, 9vw, 11rem)",
          fontWeight: 900, color: "#ffffff",
          lineHeight: 0.88, letterSpacing: "0.02em",
        }}>
          Featured Project
        </h2>
      </div>

      {/* One panel per project */}
      {projects.map((project, i) => (
        <ProjectPanel key={i} project={project} index={i} />
      ))}

      {/* Footer rule */}
      <div style={{
        maxWidth: "1300px", margin: "0 auto",
        padding: "3rem 5rem 6rem",
        display: "flex", alignItems: "center", gap: "20px",
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.52rem",
          letterSpacing: "0.3em", color: "rgba(255,255,255,0.12)", textTransform: "uppercase",
        }}>
          {projects.length} projects total
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
};

export default Projects;