const GlobalGradient = () => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      pointerEvents: "none",
      background: `
        radial-gradient(ellipse at 50% 50%, rgba(0, 80, 150, 0.35) 0%, transparent 60%),
        radial-gradient(ellipse at 30% 20%, rgba(0, 50, 100, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, rgba(0, 60, 120, 0.2) 0%, transparent 50%),
        #0a0a14
      `,
    }} />
  );
};

export default GlobalGradient;