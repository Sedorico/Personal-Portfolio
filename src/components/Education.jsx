import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  const educationData = [
    {
      year: "2022 — Present",
      degree: "BSCPE",
      title: "Computer Engineering",
      school: "Bulacan State University",
      description: "Broad academic background in embedded systems, computer architecture, and digital electronics, combined with solid programming fundamentals. Capable of quick adaptation and project-based development.",
      achievements: ["Thesis: Microsauce: E. coli Detector", "Embedded Systems", "Computer Architecture", "Programming Fundamentals"],
      
    },
    {
      year: "2020 — 2022",
      degree: "STEM",
      title: "Science, Technology, Engineering, Mathematics",
      school: "Meycauayan College",
      description: "Science, Technology, Engineering, and Mathematics (STEM) strand focused on building preparing students for technology-driven and research-oriented fields.",
      achievements: ["Honor Student", "Research Excellence"],
      
    },
    {
      year: "2016 — 2019",
      degree: "JHS",
      title: "Junior High School",
      school: "Meycauayan College",
      description: "Focused on building fundamental knowledge and skills across core subjects such as mathematics and sciences. A strong academic foundation that supports further learning in technical and specialized fields.",
      achievements: ["Best in Mathematics"],
      
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -60, filter: "blur(8px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, delay: i * 0.15, ease: "back.out(1.2)",
            scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none reverse" }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "transparent",
        position: "relative",
        padding: "7rem 5rem",
      }}
    >
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <div style={{ width: "32px", height: "1px", background: "#0066FF" }} />
            <span style={{
              fontFamily: "'Fira Code', 'SF Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "#0066FF",
              textTransform: "uppercase",
            }}>{">"} education.history</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "0.5rem",
          }}>
            Education
          </h2>
        </div>

        {/* Education Cards - Terminal Block Style */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              style={{
                background: "rgba(10, 10, 20, 0.8)",
                backdropFilter: "blur(12px)",
                borderRadius: "12px",
                border: "1px solid rgba(0, 102, 255, 0.2)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0066FF";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 102, 255, 0.2)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Terminal Header Bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem 1.5rem",
                background: "rgba(0, 0, 0, 0.4)",
                borderBottom: "1px solid rgba(0, 102, 255, 0.2)",
              }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <span style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#0066FF",
                }}>
                  {edu.degree}.json
                </span>
                <span style={{ width: "36px" }} />
              </div>

              {/* Content */}
              <div style={{ padding: "1.8rem" }}>
                {/* Year and Icon Row */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}>
                  <div style={{
                    fontFamily: "'Fira Code', 'SF Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#0066FF",
                    background: "rgba(0, 102, 255, 0.1)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                  }}>
                    {edu.year}
                  </div>
                  <div style={{ fontSize: "1.8rem" }}>{edu.icon}</div>
                </div>

                {/* Title and Degree */}
                <h3 style={{
                  fontFamily: "'Inter', 'SF Pro Display', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "0.25rem",
                }}>
                  {edu.title}
                </h3>
                <p style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#0066FF",
                  marginBottom: "1rem",
                }}>
                  {edu.school}
                </p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Fira Code', 'SF Mono', monospace",
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "1.2rem",
                }}>
                  {edu.description}
                </p>

                {/* Achievements as Tags */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}>
                  {edu.achievements.map((achievement, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "'Fira Code', 'SF Mono', monospace",
                        fontSize: "0.6rem",
                        padding: "0.2rem 0.8rem",
                        background: "rgba(0, 102, 255, 0.1)",
                        border: "1px solid rgba(0, 102, 255, 0.3)",
                        borderRadius: "4px",
                        color: "#0066FF",
                      }}
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;