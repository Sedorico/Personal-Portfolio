import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "JavaScript", abbr: "JS", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #1a1a00 0%, #3d3400 50%, #1a1a00 100%)",
    accentColor: "#F7DF1E", chipColor: "#F7DF1E", textColor: "#F7DF1E",
    mutedColor: "rgba(247,223,30,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><rect width="32" height="32" fill="#F7DF1E" rx="3"/><path fill="#000" d="M18.774 19.7a3.727 3.727 0 0 0 3.376 2.078c1.418 0 2.324-.709 2.324-1.688 0-1.173-.931-1.589-2.491-2.272l-.856-.367c-2.469-1.052-4.11-2.37-4.11-5.156 0-2.567 1.956-4.52 5.012-4.52a5.065 5.065 0 0 1 4.87 2.739l-2.665 1.712a2.334 2.334 0 0 0-2.205-1.467 1.489 1.489 0 0 0-1.638 1.467c0 1.027.636 1.443 2.1 2.078l.856.366c2.908 1.247 4.55 2.518 4.55 5.377 0 3.083-2.42 4.77-5.672 4.77a6.567 6.567 0 0 1-6.21-3.5zm-10.923.257c.539.954 1.027 1.762 2.2 1.762 1.124 0 1.834-.44 1.834-2.15V8.1h3.3v11.527c0 3.542-2.078 5.156-5.11 5.156a5.303 5.303 0 0 1-5.132-3.13z"/></svg>,
  },
  {
    name: "Python", abbr: "PY", level: "Intermediate",
    cardBg: "linear-gradient(135deg, #001a2e 0%, #002d4a 50%, #001a2e 100%)",
    accentColor: "#4B8BBE", chipColor: "#FFD43B", textColor: "#4B8BBE",
    mutedColor: "rgba(75,139,190,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><defs><linearGradient id="pyG1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5A9FD4"/><stop offset="100%" stopColor="#306998"/></linearGradient><linearGradient id="pyG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFD43B"/><stop offset="100%" stopColor="#FFE873"/></linearGradient></defs><path fill="url(#pyG1)" d="M15.9 3C11.4 3 11.7 5 11.7 5v2.1h4.3v0.6H9.5S7 7.4 7 12s2.2 4.3 2.2 4.3h1.3v-2.1s-0.1-2.2 2.2-2.2h3.8s2.1 0 2.1-2V6c0 0 0.3-3-2.7-3zm-1.5 1.7c0.4 0 0.8 0.3 0.8 0.8s-0.3 0.8-0.8 0.8-0.8-0.3-0.8-0.8 0.4-0.8 0.8-0.8z"/><path fill="url(#pyG2)" d="M16.1 29c4.5 0 4.2-2 4.2-2v-2.1h-4.3v-0.6h6.5s2.5 0.3 2.5-4.3-2.2-4.3-2.2-4.3h-1.3v2.1s0.1 2.2-2.2 2.2h-3.8s-2.1 0-2.1 2V26c0 0-0.3 3 2.7 3zm1.5-1.7c-0.4 0-0.8-0.3-0.8-0.8s0.3-0.8 0.8-0.8 0.8 0.3 0.8 0.8-0.4 0.8-0.8 0.8z"/></svg>,
  },
  {
    name: "PHP", abbr: "PHP", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #1a0a2e 0%, #2d1a4a 50%, #1a0a2e 100%)",
    accentColor: "#8892BF", chipColor: "#8892BF", textColor: "#AEB2D5",
    mutedColor: "rgba(136,146,191,0.5)",
    logo: <svg viewBox="0 0 32 32" width="42" height="42"><ellipse cx="16" cy="16" rx="15" ry="9" fill="#8892BF"/><text x="16" y="20.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">php</text></svg>,
  },
  {
    name: "Laravel", abbr: "LV", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #2e0a0a 0%, #4a1a1a 50%, #2e0a0a 100%)",
    accentColor: "#FF2D20", chipColor: "#FF2D20", textColor: "#FF6B63",
    mutedColor: "rgba(255,45,32,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><path fill="#FF2D20" d="M29.3 9.4L24.1 1a.6.6 0 0 0-.5-.3H16a.6.6 0 0 0-.5.9l2.8 4.8-7.1 12.3H7.8L5 13.9a.6.6 0 0 0-.5-.3H.6a.6.6 0 0 0-.5.9l5.2 9a.6.6 0 0 0 .5.3H10l4.5 7.8a.6.6 0 0 0 .5.3h4.6a.6.6 0 0 0 .5-.9l-2.8-4.8 7.2-12.5h3.4l2.8 4.8a.6.6 0 0 0 1.1-.3V9.7a.6.6 0 0 0-.5-.3z"/></svg>,
  },
  {
    name: "Java", abbr: "JV", level: "Intermediate",
    cardBg: "linear-gradient(135deg, #1a0e00 0%, #2e1a00 50%, #1a0e00 100%)",
    accentColor: "#E76F00", chipColor: "#E76F00", textColor: "#F0A500",
    mutedColor: "rgba(231,111,0,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><path fill="#E76F00" d="M11.4 22.6s-1.2.7.8.9c2.4.3 3.7.2 6.3-.2 0 0 .7.4 1.7.8-6 2.6-13.6-.1-8.8-1.5zm-.7-3.2s-1.4 1 .7 1.2c2.7.3 4.8.3 8.5-.4 0 0 .5.5 1.3.8-7.5 2.2-15.9.2-10.5-1.6z"/><path fill="#E76F00" d="M17.5 13.6c1.5 1.8-.4 3.4-.4 3.4s3.9-2 2.1-4.5c-1.6-2.3-2.9-3.5 3.9-7.5 0 0-10.7 2.7-5.6 8.6z"/><path fill="#E76F00" d="M24.6 25.8s.9.7-1 1.3c-3.6 1.1-15 1.4-18.1 0-1.1-.5 1-1.2 1.7-1.3.7-.2 1.1-.1 1.1-.1-1.3-.9-8.3 1.8-3.6 2.5 12.9 2.1 23.6-.9 19.9-2.4zm-12.5-9s-6 1.4-2.1 2c1.6.2 4.8.2 7.8-.1 2.4-.2 4.9-.8 4.9-.8s-.9.4-1.5.7c-6.1 1.6-17.9.9-14.5-.6 2.9-1.3 5.4-1.2 5.4-1.2zm10.6 5.9c6.2-3.2 3.3-6.3 1.3-5.9-.5.1-.7.2-.7.2s.2-.3.6-.4c4.3-1.5 7.6 4.5-1.3 6.8 0 0 .1-.1.1-.7z"/><path fill="#E76F00" d="M19.1 0s3.4 3.4-3.2 8.7c-5.3 4.2-1.2 6.6 0 9.3-3.1-2.8-5.4-5.2-3.8-7.5 2.2-3.3 8.3-4.9 7-10.5z"/></svg>,
  },
  {
    name: "HTML", abbr: "H5", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #2e1000 0%, #4a1a00 50%, #2e1000 100%)",
    accentColor: "#E34F26", chipColor: "#E34F26", textColor: "#FF7043",
    mutedColor: "rgba(227,79,38,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><path fill="#E34F26" d="M4 3l2.3 25.7L16 31l9.7-2.3L28 3z"/><path fill="#EF652A" d="M16 28.8V5.7H25.8L23.8 27z"/><path fill="#fff" d="M8.9 11.1h7.1v2.8H11.8l.3 3.4H16v2.8H9.5zm.3 8.5H12l.2 2.2L16 23v2.9l-6.5-1.8z"/><path fill="#EBEBEB" d="M16 11.1h7.1l-.3 2.8H16v-2.8zm-.1 6.2h3.5l-.3 3.5-3.2.9V19l3.1-.9.2-2.5H16z"/></svg>,
  },
  {
    name: "CSS", abbr: "C3", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #001428 0%, #002040 50%, #001428 100%)",
    accentColor: "#1572B6", chipColor: "#1572B6", textColor: "#2196F3",
    mutedColor: "rgba(21,114,182,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><path fill="#1572B6" d="M4 3l2.3 25.7L16 31l9.7-2.3L28 3z"/><path fill="#33A9DC" d="M16 28.8V5.7H25.8L23.8 27z"/><path fill="#fff" d="M8.9 11.1H16v2.8H12l.2 2.4H16v2.8H9.5zm.3 8.3H12l.2 2L16 23v3l-6.5-1.8z"/><path fill="#EBEBEB" d="M16 11.1h7.1l-.3 2.8H16zm0 5.2h3.5l-.3 3.4L16 21v-3l3.1-.9.2-2.5H16z"/></svg>,
  },
  {
    name: "C++", abbr: "C++", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #001428 0%, #002040 50%, #001428 100%)",
    accentColor: "#00599C", chipColor: "#00599C", textColor: "#4FC3F7",
    mutedColor: "rgba(0,89,156,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><path fill="#00599C" d="M16 2L3 9.5v13L16 30l13-7.5v-13z"/><path fill="#004482" d="M16 2v28l13-7.5v-13z"/><path fill="#659AD2" d="M16 2L3 9.5l13 7.5 13-7.5z"/><path fill="#fff" d="M11 16a5 5 0 1 0 5-5 5 5 0 0 0-5 5zm8.5 0h1v-1.5H22v1.5h1V17h-1v1.5h-1.5V17H19zm4 0h1v-1.5H26v1.5h1V17h-1v1.5h-1.5V17H23z"/></svg>,
  },
  {
    name: "SQL", abbr: "SQL", level: "Fundamentals",
    cardBg: "linear-gradient(135deg, #001a0a 0%, #002d14 50%, #001a0a 100%)",
    accentColor: "#00758F", chipColor: "#F29111", textColor: "#00A8CC",
    mutedColor: "rgba(0,117,143,0.5)",
    logo: <svg viewBox="0 0 32 32" width="36" height="36"><ellipse cx="16" cy="9" rx="13" ry="5" fill="#00758F"/><path fill="#00758F" d="M3 9v5c0 2.8 5.8 5 13 5s13-2.2 13-5V9c0 2.8-5.8 5-13 5S3 11.8 3 9z"/><path fill="#F29111" d="M3 14v5c0 2.8 5.8 5 13 5s13-2.2 13-5v-5c0 2.8-5.8 5-13 5S3 16.8 3 14z"/><ellipse cx="16" cy="9" rx="13" ry="5" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3"/></svg>,
  },
];

const CARD_W = 340;
const CARD_H = 220;

// Dragon Club-style fan formation offsets for each card slot
// Each entry: { x (% from center), y (px from base), rotate (deg), zIndex, scale }
const FAN_SLOTS = [
  { x: -52, y: 28,  rotate: -18, zIndex: 1,  scale: 0.82 }, // far left back
  { x: -30, y: 10,  rotate: -10, zIndex: 2,  scale: 0.88 }, // mid left
  { x: -12, y: 2,   rotate: -4,  zIndex: 3,  scale: 0.93 }, // near left
  { x:  0,  y: 0,   rotate:  0,  zIndex: 10, scale: 1.0  }, // CENTER (active)
  { x:  12, y: 2,   rotate:  4,  zIndex: 3,  scale: 0.93 }, // near right
  { x:  30, y: 10,  rotate:  10, zIndex: 2,  scale: 0.88 }, // mid right
  { x:  52, y: 28,  rotate:  18, zIndex: 1,  scale: 0.82 }, // far right back
];

// How many cards visible on each side of center
const VISIBLE_SIDES = 3;

function CardFace({ skill, isCenter }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      borderRadius: "20px",
      background: skill.cardBg,
      border: `1px solid ${skill.accentColor}44`,
      boxShadow: isCenter
        ? `0 32px 80px ${skill.accentColor}66, 0 8px 32px rgba(0,0,0,0.7)`
        : `0 8px 24px rgba(0,0,0,0.5)`,
      padding: "1.4rem 1.6rem",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      boxSizing: "border-box",
    }}>
      {/* EMV Chip */}
      <div style={{
        position: "absolute", top: "1.2rem", right: "1.4rem",
        width: "38px", height: "28px", borderRadius: "5px",
        background: `linear-gradient(135deg, ${skill.chipColor}55, ${skill.chipColor}22)`,
        border: `1px solid ${skill.chipColor}66`,
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr", gap: "2px", padding: "3px",
      }}>
        {Array(9).fill(0).map((_, i) => (
          <div key={i} style={{ background: `${skill.chipColor}44`, borderRadius: "1px" }} />
        ))}
      </div>
      {/* Logo */}
      <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {skill.logo}
      </div>
      {/* Bottom info */}
      <div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: skill.mutedColor, marginBottom: "0.45rem" }}>
          ···· ···· ···· {skill.abbr.padStart(4, "·")}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: skill.mutedColor, textTransform: "uppercase", marginBottom: "2px" }}>SKILL NAME</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: skill.textColor }}>{skill.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: skill.mutedColor, textTransform: "uppercase", marginBottom: "2px" }}>LEVEL</div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.6rem", color: skill.accentColor }}>{skill.level}</div>
          </div>
        </div>
      </div>
      {/* Status dot */}
      <div style={{ position: "absolute", bottom: "0.8rem", left: "1.5rem", width: "7px", height: "7px", borderRadius: "50%", background: skill.accentColor, opacity: 0.8, boxShadow: `0 0 8px ${skill.accentColor}` }} />
    </div>
  );
}

const Skills = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef    = useRef([]);
  const bottomRef   = useRef(null);
  const activeRef   = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef    = useRef(null);
  const stateRef    = useRef("gathered");
  const [spread, setSpread] = useState(false);

  const goTo = useCallback((idx) => {
    const next = ((idx % skills.length) + skills.length) % skills.length;
    activeRef.current = next;
    setActiveIndex(next);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo(activeRef.current + 1);
    }, 4000);
  }, [goTo]);

  const handleClick = (idx) => {
    goTo(idx);
    startTimer();
  };

  // Compute each card's fan slot relative to the active card
  const getSlotForCard = (i, active) => {
    const total = skills.length;
    let offset = i - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    if (abs > VISIBLE_SIDES) return null; // hidden

    // Map offset (-3..3) to slot index (0..6)
    const slotIdx = offset + VISIBLE_SIDES;
    return { slot: FAN_SLOTS[slotIdx], offset, abs };
  };

  // ── Spread OUT: cards drop in one by one from above ──────────────────────────
  const doSpread = useCallback(() => {
    if (stateRef.current === "spread") return;
    stateRef.current = "spread";
    setSpread(true);

    gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    gsap.to(bottomRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: "power3.out" });

    const active = activeRef.current;
    const total  = skills.length;

    // Build drop order: center first, then alternate outward
    // so cards appear one by one like dealing cards
    const dropOrder = [0]; // center offset
    for (let d = 1; d <= VISIBLE_SIDES; d++) {
      dropOrder.push(-d);
      dropOrder.push(d);
    }

    dropOrder.forEach((offset, dropIdx) => {
      // Find the card with this offset
      let cardIdx = ((active + offset) % total + total) % total;
      const el = cardsRef.current[cardIdx];
      if (!el) return;

      const slotData = getSlotForCard(cardIdx, active);
      if (!slotData) return;
      const { slot } = slotData;

      const targetX     = (slot.x / 100) * (CARD_W * 2.2);
      const targetY     = slot.y;
      const targetRot   = slot.rotate;
      const targetScale = slot.scale;
      const targetOpa   = slot.zIndex === 10 ? 1 : slot.scale * 0.95;

      // Each card drops from high above
      gsap.fromTo(el,
        {
          x: targetX,
          y: -500,
          rotation: targetRot * 0.3,
          scale: targetScale * 0.8,
          opacity: 0,
          transformPerspective: 1200,
          zIndex: slot.zIndex,
        },
        {
          x: targetX,
          y: targetY,
          rotation: targetRot,
          scale: targetScale,
          opacity: targetOpa,
          duration: 0.65,
          delay: dropIdx * 0.12, // stagger: each card drops after the previous
          ease: "bounce.out",
          zIndex: slot.zIndex,
          clearProps: "none",
        }
      );
    });

    startTimer();
  }, [startTimer]); // eslint-disable-line

  // ── Gather IN: cards fly back up one by one ──────────────────────────────────
  const doGather = useCallback(() => {
    if (stateRef.current === "gathered") return;
    stateRef.current = "gathered";
    clearInterval(timerRef.current);

    gsap.to(headerRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
    gsap.to(bottomRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });

    const active = activeRef.current;
    const total  = skills.length;

    // Outer cards fly out first, center last
    const flyOrder = [];
    for (let d = VISIBLE_SIDES; d >= 0; d--) {
      if (d === 0) { flyOrder.push(0); continue; }
      flyOrder.push(-d);
      flyOrder.push(d);
    }

    flyOrder.forEach((offset, flyIdx) => {
      let cardIdx = ((active + offset) % total + total) % total;
      const el = cardsRef.current[cardIdx];
      if (!el) return;

      const slotData = getSlotForCard(cardIdx, active);
      if (!slotData) return;
      const { slot } = slotData;
      const targetX = (slot.x / 100) * (CARD_W * 2.2);

      gsap.to(el, {
        x: targetX,
        y: -500,
        opacity: 0,
        rotation: slot.rotate * 0.3,
        scale: slot.scale * 0.8,
        duration: 0.4,
        delay: flyIdx * 0.07,
        ease: "power2.in",
      });
    });

    setTimeout(() => setSpread(false), 700);
  }, []); // eslint-disable-line

  // ── ScrollTrigger ────────────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: 40 });
    gsap.set(bottomRef.current, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      end:   "bottom 30%",
      onEnter:     () => doSpread(),
      onLeave:     () => doGather(),
      onEnterBack: () => doSpread(),
      onLeaveBack: () => doGather(),
    });

    return () => {
      trigger.kill();
      clearInterval(timerRef.current);
    };
  }, [doSpread, doGather]);

  // ── Fan layout style for steady carousel switching ───────────────────────────
  const getFanStyle = (i) => {
    if (!spread) return {};

    const result = getSlotForCard(i, activeIndex);
    if (!result) return { opacity: 0, pointerEvents: "none" };

    const { slot } = result;
    const targetX   = (slot.x / 100) * (CARD_W * 2.2);
    const targetOpa = slot.zIndex === 10 ? 1 : slot.scale * 0.95;

    return {
      transform: `translateX(${targetX}px) translateY(${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`,
      opacity:   targetOpa,
      zIndex:    slot.zIndex,
      filter:    slot.zIndex === 10 ? "none" : `blur(${(VISIBLE_SIDES - result.abs + 1) < 2 ? 2 : 0.5}px)`,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "transparent",
        position: "relative",
        padding: "8rem 0",
        overflow: "visible",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 5, padding: "0 2rem" }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "5rem", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "1.2rem" }}>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, #0066FF)" }} />
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.62rem", letterSpacing: "0.4em", color: "#0066FF", textTransform: "uppercase" }}>
              {">"} skills.techStack
            </span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, #0066FF)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 700, color: "#ffffff",
            marginBottom: "0.8rem", lineHeight: 1, letterSpacing: "-0.02em",
          }}>
            Tech Stack
          </h2>
        </div>

        {/* Fan Carousel */}
        <div
          ref={carouselRef}
          style={{
            position: "relative",
            width: "100%",
            height: `${CARD_H + 180}px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {skills.map((skill, i) => {
            const fanStyle = spread ? getFanStyle(i) : {};
            const isCenter = i === activeIndex;

            return (
              <div
                key={skill.name}
                ref={el => cardsRef.current[i] = el}
                onClick={() => spread && handleClick(i)}
                style={{
                  position: "absolute",
                  width:  `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  left:   "50%",
                  top:    "50%",
                  marginLeft: `-${CARD_W / 2}px`,
                  marginTop:  `-${CARD_H / 2}px`,
                  transformOrigin: "center bottom",
                  // CSS transition only for carousel switching (not GSAP phases)
                  transition: spread
                    ? "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, filter 0.4s ease"
                    : "none",
                  cursor: "pointer",
                  ...(spread
                    ? fanStyle
                    : { opacity: 0, transform: "translateY(-500px) scale(0.7)" }),
                }}
              >
                <CardFace skill={skill} isCenter={isCenter} />
              </div>
            );
          })}
        </div>

        {/* Name + level + dots + pills */}
        <div ref={bottomRef}>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.7rem", fontWeight: 700, color: "#ffffff", lineHeight: 1, marginBottom: "4px", transition: "all 0.3s ease" }}>
              {skills[activeIndex].name}
            </div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: skills[activeIndex].accentColor }}>
              {skills[activeIndex].level}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", marginTop: "1.5rem" }}>
            {skills.map((_, i) => (
              <div key={i} onClick={() => handleClick(i)} style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeIndex ? "#0066FF" : "rgba(0,102,255,0.25)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }} />
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", maxWidth: "600px", margin: "2rem auto 0" }}>
            {skills.map((s, i) => (
              <div key={i} onClick={() => handleClick(i)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 14px", borderRadius: "8px",
                border: `1px solid ${i === activeIndex ? "#0066FF" : "rgba(0,102,255,0.18)"}`,
                background: i === activeIndex ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.05)",
                cursor: "pointer", transition: "all 0.25s ease", backdropFilter: "blur(8px)",
              }}>
                <div style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.logo}
                </div>
                <span style={{
                  fontFamily: "'Fira Code', monospace", fontSize: "0.6rem", letterSpacing: "0.1em",
                  color: i === activeIndex ? "#0066FF" : "rgba(255,255,255,0.5)",
                  fontWeight: i === activeIndex ? 700 : 400, transition: "color 0.25s ease",
                }}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
