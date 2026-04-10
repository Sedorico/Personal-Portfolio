import { useEffect, useRef } from "react";

const GlobalCircuit = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, t = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "#09060f";
      ctx.fillRect(0, 0, W, H);

      // Drifting radial glows — drawn first so waves sit on top
      const blobs = [
        { x: 0.60 + Math.sin(t * 0.22) * 0.10, y: 0.50 + Math.cos(t * 0.18) * 0.08, r: 0.35, c: [0, 180, 255],  a: 0.28 },
        { x: 0.72 + Math.cos(t * 0.18) * 0.08, y: 0.52 + Math.sin(t * 0.25) * 0.10, r: 0.30, c: [180, 0, 255],  a: 0.25 },
        { x: 0.55 + Math.sin(t * 0.30) * 0.07, y: 0.58 + Math.cos(t * 0.22) * 0.06, r: 0.28, c: [255, 40, 150], a: 0.22 },
      ];

      blobs.forEach(({ x, y, r, c, a }) => {
        const gx = W * x;
        const gy = H * y;
        const gr = Math.min(W, H) * r;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0,    `rgba(${c[0]},${c[1]},${c[2]},${a})`);
        g.addColorStop(0.55, `rgba(${c[0]},${c[1]},${c[2]},${a * 0.3})`);
        g.addColorStop(1,    `rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Smooth flowing wave bands
      const waveGroups = [
        { color: [0, 200, 255],   count: 6, baseY: 0.45, amp: 0.12, freq: 2.2, speed: 0.28, alpha: 0.18 },
        { color: [140, 0, 255],   count: 6, baseY: 0.50, amp: 0.14, freq: 1.8, speed: 0.20, alpha: 0.18 },
        { color: [255, 30, 160],  count: 6, baseY: 0.55, amp: 0.13, freq: 2.5, speed: 0.24, alpha: 0.18 },
        { color: [255, 255, 255], count: 3, baseY: 0.48, amp: 0.08, freq: 3.0, speed: 0.40, alpha: 0.10 },
      ];

      waveGroups.forEach(({ color, count, baseY, amp, freq, speed, alpha }) => {
        for (let i = 0; i < count; i++) {
          const offset = (i / count) * Math.PI * 2;
          const lt = t * speed + offset;
          const yBase = H * (baseY + (i - count / 2) * 0.035);
          const ampPx = H * amp;

          ctx.beginPath();
          for (let x = 0; x <= W; x += 3) {
            const nx = x / W;
            const y =
              yBase +
              Math.sin(nx * freq * Math.PI + lt) * ampPx +
              Math.sin(nx * freq * 0.5 * Math.PI - lt * 0.7) * ampPx * 0.5 +
              Math.cos(nx * freq * 1.3 * Math.PI + lt * 0.4) * ampPx * 0.3;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const fade = 1 - Math.abs(i - count / 2) / count;
          ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha * fade * 2.5})`;
          ctx.lineWidth = 3 + (count - i) * 0.8;
          ctx.shadowColor = `rgba(${color[0]},${color[1]},${color[2]},0.6)`;
          ctx.shadowBlur = 18;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      t += 0.010;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default GlobalCircuit;
