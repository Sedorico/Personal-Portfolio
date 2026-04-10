import { useState, useEffect } from "react";

const Navbar = ({ onNavigate, currentSection, isTransitioning }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleClick = (id, e) => {
    e.preventDefault();
    if (onNavigate && !isTransitioning) {
      onNavigate(id);
    }
  };

  return (
    <nav style={{
      position: "fixed",
      top: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      padding: scrolled ? "0.5rem 1rem" : "0.6rem 1.2rem",
      background: "rgba(10, 10, 20, 0.7)",
      backdropFilter: "blur(16px)",
      borderRadius: "12px",
      border: "1px solid rgba(0, 102, 255, 0.2)",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.25rem",
      }}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => handleClick(item.id, e)}
            style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: currentSection === item.id ? "600" : "400",
              color: currentSection === item.id ? "#0066FF" : "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              cursor: "pointer",
              background: currentSection === item.id ? "rgba(0, 102, 255, 0.15)" : "transparent",
              border: currentSection === item.id ? "1px solid rgba(0, 102, 255, 0.3)" : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (currentSection !== item.id) {
                e.currentTarget.style.background = "rgba(0, 102, 255, 0.08)";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== item.id) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;