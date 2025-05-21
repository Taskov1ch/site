import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { FaPause, FaPlay } from "react-icons/fa";

const navLinks = [
  { id: "home", text: "Главная", href: "#home" },
  { id: "about-project", text: "О проекте", href: "#about-project" },
  { id: "world-lore", text: "Лор", href: "#world-lore" },
  { id: "ranks", text: "Ранги", href: "#ranks" },
  { id: "faq", text: "ЧАВО", href: "#faq" },
  { id: "roadmap", text: "Планы", href: "#roadmap" },
  { id: "team", text: "Команда", href: "#team" },
];
const MusicToggleButton = React.memo(
  ({ isMusicPlaying, toggleMusic, className = "" }) => {
    return (
      <button
        onClick={toggleMusic}
        className={`navbar-music-toggle ${
          isMusicPlaying ? "is-playing" : ""
        } ${className}`}
        aria-label={
          isMusicPlaying ? "Приостановить музыку" : "Воспроизвести музыку"
        }
        title={isMusicPlaying ? "Пауза" : "Играть"}
      >
        <span
          className="icon-container"
          key={isMusicPlaying ? "pause-icon" : "play-icon"}
        >
          {isMusicPlaying ? <FaPause /> : <FaPlay />}
        </span>
      </button>
    );
  }
);
MusicToggleButton.displayName = "MusicToggleButton";

const Navbar = ({ isVisible, isMusicPlaying, toggleMusic, currentTrack }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0]?.id || "");

  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id));
    const sectionVisibility = new Map();

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
      });

      let bestMatchId = "";
      let maxRatio = -1;

      sections.forEach((section) => {
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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    const initialCheck = () => {
      const initialEntries = sections
        .map((section) => {
          if (!section) return null;
          const rect = section.getBoundingClientRect();
          const vpHeight =
            window.innerHeight || document.documentElement.clientHeight;
          const isIntersecting = rect.top < vpHeight && rect.bottom > 0;
          let ratio = 0;
          if (isIntersecting) {
            const visibleHeight =
              Math.min(rect.bottom, vpHeight) - Math.max(rect.top, 0);
            ratio =
              rect.height > 0
                ? Math.max(0, Math.min(1, visibleHeight / rect.height))
                : 0;
          }
          return { target: section, isIntersecting, intersectionRatio: ratio };
        })
        .filter(Boolean);
      if (initialEntries.length > 0) observerCallback(initialEntries);
    };
    const initialCheckTimeout = setTimeout(initialCheck, 100);

    return () => {
      clearTimeout(initialCheckTimeout);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id));
    const sectionVisibility = new Map();

    const observerOptions = {
      root: null,
      // ИЗМЕНЕНО: rootMargin, чтобы считать пересечение в центральной части экрана
      // Например, -30% сверху и -30% снизу означает, что "активная зона" - это средние 40% вьюпорта.
      // Можете поэкспериментировать со значениями, например "-25% 0px -25% 0px" для средних 50%.
      rootMargin: "-30% 0px -30% 0px",
      // ИЗМЕНЕНО: Можно использовать более простой или такой же массив порогов.
      // Этот массив [0, 0.1, 0.2, ..., 1.0] тоже достаточно гранулированный.
      threshold: Array.from({ length: 11 }, (_, i) => parseFloat((i * 0.1).toFixed(1))),
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // entry.intersectionRatio теперь будет относиться к пересечению с root, определенным rootMargin
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
      });

      let bestMatchId = "";
      let maxRatio = -1;

      sections.forEach((section) => {
        if (section) {
          const ratio = sectionVisibility.get(section.id) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestMatchId = section.id;
          }
        }
      });

      // ИЗМЕНЕНО: Условие для "home" делаем менее "липким"
      // Например, если прокручено меньше 20% высоты экрана
      if (window.scrollY < window.innerHeight * 0.20 && navLinks.length > 0 && navLinks[0].id === "home") {
        if (activeSection !== navLinks[0].id) { // Обновляем только если изменилось
            setActiveSection(navLinks[0].id);
        }
      } else if (bestMatchId && maxRatio > 0.1) { // ИЗМЕНЕНО: Порог для активации (10% видимости в пределах rootMargin)
        if (activeSection !== bestMatchId) { // Обновляем только если изменилось
            setActiveSection(bestMatchId);
        }
      }
      // Если ничего не подходит, activeSection остается прежним, что обычно нормально.
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // InitialCheck остается важным
    const initialCheck = () => {
      // ... (ваш код initialCheck остается без изменений, он использует тот же observerCallback)
      // Важно, чтобы initialCheck тоже корректно отработал с новыми observerOptions.
      // Он должен вызываться после того, как все секции отрендерены и имеют размеры.
      // Ваш setTimeout(initialCheck, 100) должен быть достаточным.
      const initialEntries = sections
        .map((section) => {
          if (!section) return null;
          // Для initialCheck, getBoundingClientRect все еще относительно реального viewport.
          // Но intersectionRatio будет посчитан observer'ом уже с учетом rootMargin при первом срабатывании.
          // Можно немного упростить initialCheck, если он просто триггерит первый расчет через observer.
          // Однако, ваша текущая логика initialCheck пытается сама вычислить начальные коэффициенты,
          // что может быть не совсем точно с новым rootMargin.
          // Проще всего заставить observer сделать первоначальный замер для всех элементов.
          // Вместо сложного initialCheck, можно просто вызвать observerCallback с текущими состояниями.
          // Но IntersectionObserver спроектирован так, что он сам вызовет callback при observe().
          // Давайте оставим ваш initialCheck, он должен быть достаточно адекватен для первоначальной установки.
          const rect = section.getBoundingClientRect();
          // const intersectionRect = entry?.intersectionRect || { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0}; // Добавил ? для entry
            // const rootBounds = entry?.rootBounds || { top: 0, bottom: 0, left: 0, right: 0, width: window.innerWidth, height: window.innerHeight }; // Добавил ? для entry

            // Расчет видимой части относительно rootBounds (с учетом rootMargin) более сложен здесь вручную.
            // Проще положиться на то, что observer сам вызовет callback для начального состояния.
            // Поэтому setTimeout(initialCheck, 100) с observer.observe(section) уже должен дать начальные данные.
            // Упростим initialCheck, чтобы он просто гарантировал, что observerCallback был вызван.
            // На самом деле, observer.observe() уже должен вызвать колбэк для начальных состояний.
            // Так что сложный initialCheck может быть не нужен, если observer настроен правильно.
            // Оставим как есть, но если что, его можно будет упростить до простой задержки.
            const vpHeight = window.innerHeight || document.documentElement.clientHeight; // Используем viewport для расчета общего положения
            const isIntersecting = rect.top < vpHeight && rect.bottom > 0; // Общее пересечение с viewport
            let ratio = 0;
            if (isIntersecting) { // Этот ratio - это общий % видимости на экране, а не в rootMargin зоне
                const visibleHeight = Math.min(rect.bottom, vpHeight) - Math.max(rect.top, 0);
                ratio = rect.height > 0 ? Math.max(0, Math.min(1, visibleHeight / rect.height)) : 0;
            }
            return { target: section, isIntersecting, intersectionRatio: ratio }; // Этот ratio может быть не тем, что использует observer
        })
        .filter(Boolean);

        // Вместо того, чтобы передавать эти "сырые" initialEntries, лучше положиться
        // на то, что observer уже сработал или сработает для начального состояния.
        // Если initialCheck все же нужен, он должен имитировать структуру entry, которую ждет observerCallback,
        // или еще лучше - просто триггерить обновление состояний, если observer уже что-то записал в sectionVisibility.
        // Самый простой initialCheck - это просто дождаться первого вызова observer'а.
        // Либо, если хотим форсировать, то после observer.observe() можно вызвать callback вручную с текущими данными из sectionVisibility,
        // но это усложняет.
        // Ваш текущий initialCheck вызывает observerCallback, что должно быть нормально.
      if (initialEntries.length > 0) observerCallback(initialEntries.map(e => ({ ...e, intersectionRatio: sectionVisibility.get(e.target.id) || 0 })));

    };
    const initialCheckTimeout = setTimeout(initialCheck, 200); // Увеличил немного таймаут для надежности


    return () => {
      clearTimeout(initialCheckTimeout);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const TrackInfoDisplay = () =>
    currentTrack ? (
      <a
        href={currentTrack.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-track-info"
        title={`Слушать "${currentTrack.title}" на источнике`}
      >
        <span className="track-title">{currentTrack.title}</span>
        <span className="track-composer"> – {currentTrack.composer}</span>
      </a>
    ) : null;

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden-above"}`}>
      <div className="navbar-container">
        <div className="navbar-mobile-controls-left">
          <MusicToggleButton
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
          />
          {/* <div className="navbar-track-info-mobile-wrapper">
            <TrackInfoDisplay />
          </div> */}
        </div>
        <ul className="navbar-links-desktop">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={activeSection === link.id ? "active" : ""}
            >
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
          {/* <TrackInfoDisplay /> */}
          <MusicToggleButton
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
          />
        </div>
        <button
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      <div
        className={`navbar-mobile-menu ${isMobileMenuOpen ? "open" : "closed"}`}
      >
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={activeSection === link.id ? "active" : ""}
            >
              <a href={link.href} onClick={handleLinkClick}>
                {link.text}
              </a>
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
