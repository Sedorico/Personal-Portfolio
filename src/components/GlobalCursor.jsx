import { useEffect, useRef } from "react";

const GlobalCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
        cursorRef.current.style.backgroundColor = "#0066FF";
        cursorRef.current.style.boxShadow = "0 0 16px rgba(0, 102, 255, 0.6)";
      }
    };

    const onLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "8px";
        cursorRef.current.style.height = "8px";
        cursorRef.current.style.backgroundColor = "#0066FF";
        cursorRef.current.style.boxShadow = "0 0 6px rgba(0, 102, 255, 0.2)";
      }
    };

    window.addEventListener("mousemove", onMove);

    const interactiveElements = document.querySelectorAll("a, button, .stat-card, .project-card");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("a, button, .stat-card, .project-card");
      newElements.forEach(el => {
        if (!el.hasAttribute('data-cursor-listener')) {
          el.setAttribute('data-cursor-listener', 'true');
          el.addEventListener("mouseenter", onEnterLink);
          el.addEventListener("mouseleave", onLeaveLink);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "8px",
      height: "8px",
      backgroundColor: "#0066FF",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 9999,
      transform: "translate(-50%, -50%)",
      boxShadow: "0 0 6px rgba(0, 102, 255, 0.2)",
      transition: "width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s",
      opacity: 0.9,
    }} />
  );
};

export default GlobalCursor;