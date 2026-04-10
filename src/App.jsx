import { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GlobalCursor from "./components/GlobalCursor";
import GlobalCircuitBG from "./components/GlobalCircuitBG";
import GlobalGradient from "./components/GlobalGradient";
import "./index.css";

function App() {
  const [showHero, setShowHero] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const observerRef = useRef(null);

  // Track scroll position using IntersectionObserver
  useEffect(() => {
    if (!showMainContent) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = ["home", "about", "projects", "education", "skills", "contact"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setCurrentSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionElements.forEach(section => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [showMainContent]); // Inalis ang currentSection dito

  useEffect(() => {
    if (showMainContent) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMainContent]);

  const handleNavigateFromHero = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowHero(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setShowMainContent(true);
      setCurrentSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  const handleNavigateToHome = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowMainContent(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setShowHero(true);
      setCurrentSection("home");
    }, 1100);
  };

  const handleNavNavigate = (sectionId) => {
    if (isTransitioning) return;
    
    if (sectionId === "home") {
      handleNavigateToHome();
      return;
    }
    
    setIsTransitioning(true);
    setCurrentSection(sectionId);
    
    setTimeout(() => {
      setIsTransitioning(false);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const handleTransitionComplete = () => {};

  return (
    <>
      {!showHero && <GlobalCursor />}
      
      <GlobalGradient />
      <GlobalCircuitBG 
        isTransitioning={isTransitioning} 
        onTransitionComplete={handleTransitionComplete}
      />
      
      {showHero && (
        <Hero 
          onNavigate={handleNavigateFromHero}
          isTransitioning={isTransitioning}
        />
      )}
      
      {showMainContent && (
        <>
          <Navbar 
            onNavigate={handleNavNavigate}
            currentSection={currentSection}
            isTransitioning={isTransitioning}
          />
          <div id="home">
            <About />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="education">
            <Education />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;