import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const navLinks = [
  { id: "home", text: "Главная", href: "#home" },
  { id: "world-lore", text: "Лор", href: "#world-lore" },
  { id: "ranks", text: "Ранги", href: "#ranks" },
  { id: "faq", text: "ЧАВО", href: "#faq" },
  { id: "roadmap", text: "Планы", href: "#roadmap" },
  { id: "team", text: "Команда", href: "#team" },
];

const Navbar = ({ isVisible, isMusicPlaying, toggleMusic, currentTrack }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0]?.id || "");

  useEffect(() => {
    const sections = navLinks.map(link => document.getElementById(link.id));
    const sectionVisibility = new Map();

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
      });

      let bestMatchId = "";
      let maxRatio = -1;

      sections.forEach(section => {
        if (section) {
          const ratio = sectionVisibility.get(section.id) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestMatchId = section.id;
          }
        }
      });

      if (window.scrollY < window.innerHeight * 0.4 && navLinks.length > 0) {
        setActiveSection(navLinks[0].id);
      } else if (bestMatchId && maxRatio > 0.05) {
        setActiveSection(bestMatchId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => { if (section) observer.observe(section); });

    const initialCheck = () => {
      const initialEntries = sections.map(section => {
        if (!section) return null;
        const rect = section.getBoundingClientRect();
        const vpHeight = window.innerHeight || document.documentElement.clientHeight;
        const isIntersecting = rect.top < vpHeight && rect.bottom > 0;
        let ratio = 0;
        if (isIntersecting) {
          const visibleHeight = Math.min(rect.bottom, vpHeight) - Math.max(rect.top, 0);
          ratio = rect.height > 0 ? Math.max(0, Math.min(1, visibleHeight / rect.height)) : 0;
        }
        return { target: section, isIntersecting, intersectionRatio: ratio };
      }).filter(Boolean);
      if (initialEntries.length > 0) observerCallback(initialEntries);
    };
    const initialCheckTimeout = setTimeout(initialCheck, 100);

    return () => {
      clearTimeout(initialCheckTimeout);
      sections.forEach(section => { if (section) observer.unobserve(section); });
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = () => { if (isMobileMenuOpen) setIsMobileMenuOpen(false); };

  const MusicToggleButton = ({ className = "" }) => (
    <button
      onClick={toggleMusic}
      className={`navbar-music-toggle ${className}`}
      aria-label={isMusicPlaying ? "Приостановить музыку" : "Воспроизвести музыку"}
      title={isMusicPlaying ? "Пауза" : "Играть"}
    >
      {isMusicPlaying ? "❚❚" : "►"}
    </button>
  );

  const TrackInfoDisplay = () => (
    currentTrack ? (
      <a
        href={currentTrack.sourceUrl} target="_blank" rel="noopener noreferrer"
        className="navbar-track-info" title={`Слушать "${currentTrack.title}" на источнике`}
      >
        <span className="track-title">{currentTrack.title}</span>
        <span className="track-composer"> – {currentTrack.composer}</span>
      </a>
    ) : null
  );

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden-above"}`}>
      <div className="navbar-container">
        <div className="navbar-mobile-controls-left">
           <MusicToggleButton />
           <div className="navbar-track-info-mobile-wrapper">
             <TrackInfoDisplay />
           </div>
        </div>
        <ul className="navbar-links-desktop">
          {navLinks.map(link => (
             <li key={link.id} className={activeSection === link.id ? "active" : ""}>
              <a href={link.href} onClick={handleLinkClick}>
                {link.text}
                <span className="vine vine-1"></span>
                <span className="vine vine-2"></span>
                <span className="vine vine-3"></span>
                <span className="vine vine-4"></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-desktop-controls-right">
            <TrackInfoDisplay />
            <MusicToggleButton />
        </div>
        <button
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню" aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "open" : "closed"}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.id} className={activeSection === link.id ? "active" : ""}>
              <a href={link.href} onClick={handleLinkClick}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  isVisible: false,
  isMusicPlaying: false,
  toggleMusic: () => {},
  currentTrack: null,
};

export default Navbar;
