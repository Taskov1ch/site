// src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorldLoreSection from "./components/WorldLoreSection";
import RanksSection from "./components/RanksSection";
import FAQSection from "./components/FAQSection";
import RoadmapSection from "./components/RoadmapSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import Credits from "./components/Credits"; // Импорт остается

import "./App.css";
import "./styles/animations.css";
import AboutProjectSection from "./components/AboutProjectSection";

const mainTrack = {
  src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/sounds/bg.mp3",
  title: "Monumental",
  composer: "Alex-Productions",
  sourceUrl: "https://www.chosic.com/download-audio/59421/",
  artWork: [
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_1024.png", sizes: "1024x1024", type: "image/png" },
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_512.png", sizes: "512x512", type: "image/png" },
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_256.png", sizes: "256x256", type: "image/png" },
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_128.png", sizes: "128x128", type: "image/png" },
  ]
};

const PRELOADER_LOGO_URL_APP = "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/logo.png";

function App() {
  const [siteResourceLoading, setSiteResourceLoading] = useState(true);
  const [mainContentLoaded, setMainContentLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicAudioRef = useRef(null);
  const { ref: heroSectionRef, entry: heroEntry } = useInView({ threshold: 0 });
  const [isHeroScrolledPast, setIsHeroScrolledPast] = useState(false); // Оставляем, если используется еще где-то или для Navbar
  const [isCreditsVisible, setIsCreditsVisible] = useState(false);


  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setSiteResourceLoading(false);
      }, 1000);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (heroEntry) {
      setIsHeroScrolledPast(heroEntry.boundingClientRect.bottom < 0);
    }
  }, [heroEntry]);

  useEffect(() => {
    if (siteResourceLoading || !mainContentLoaded || isCreditsVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [siteResourceLoading, mainContentLoaded, isCreditsVisible]);

  useEffect(() => {
    musicAudioRef.current = new Audio(mainTrack.src);
    musicAudioRef.current.loop = true;

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: mainTrack.title,
        artist: mainTrack.composer,
        artwork: mainTrack.artWork,
      });

    }
  }, []);

  const handlePreloaderInteraction = () => {
    setMainContentLoaded(true);
    if (musicAudioRef.current) {
      musicAudioRef.current
        .play()
        .catch((e) => console.error("Ошибка музыки:", e));
      setIsMusicPlaying(true);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const toggleMusic = useCallback(() => {
    if (musicAudioRef.current) {
      const currentAudio = musicAudioRef.current;
      // Используем функциональное обновление состояния, чтобы setIsMusicPlaying не зависела от isMusicPlaying в зависимостях useCallback
      setIsMusicPlaying(prevIsPlaying => {
        if (prevIsPlaying) {
          currentAudio.pause();
        } else {
          currentAudio.play().catch(e => console.error("Ошибка воспроизведения музыки:", e));
        }
        return !prevIsPlaying;
      });
    }
  }, [setIsMusicPlaying]);

  const handleToggleCredits = () => {
    setIsCreditsVisible(prev => !prev);
    // Убираем скролл наверх при открытии/закрытии Credits,
    // так как теперь это модальное окно и основное содержимое не меняет позицию.
    // if (!isCreditsVisible) {
    //     window.scrollTo({ top: 0, behavior: "instant" });
    // }
  };

  return (
    <>
      <Preloader
        siteActuallyLoading={siteResourceLoading}
        onInteraction={handlePreloaderInteraction}
      />

      {/* Основной контент сайта теперь всегда рендерится (после прелоадера) */}
      <div
        className={`app-content-wrapper ${
          !mainContentLoaded ? "content-hidden" : "content-visible"
        }`}
      >
        {mainContentLoaded && (
          <Navbar
            // Navbar теперь всегда видима, если mainContentLoaded true
            // (в соответствии с предыдущим запросом)
            isVisible={true}
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
            currentTrack={mainTrack}
          />
        )}
        <div className="main-content-scroll-wrapper">
          <HeroSection ref={heroSectionRef} />
          <AboutProjectSection></AboutProjectSection>
          <WorldLoreSection />
          <RanksSection />
          <FAQSection />
          <RoadmapSection />
          <TeamSection />
        </div>
        {mainContentLoaded && (
          <Footer onToggleCredits={handleToggleCredits} />
        )}
      </div>

      {/* Компонент Credits рендерится поверх, если isCreditsVisible === true */}
      {isCreditsVisible && (
        <Credits
          onClose={handleToggleCredits}
          mainTrackInfo={mainTrack}
          preloaderLogoUrl={PRELOADER_LOGO_URL_APP}
        />
      )}
    </>
  );
}

export default App;