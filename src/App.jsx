// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorldLoreSection from "./components/WorldLoreSection";
import RanksSection from "./components/RanksSection";
import FAQSection from "./components/FAQSection";
import RoadmapSection from "./components/RoadmapSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
// import { mainTrack } from './musicData'; // Если вынесли в отдельный файл

import "./App.css";
import "./styles/animations.css"; // Глобальные анимации для секций



// Определяем информацию о треке здесь или импортируем из musicData.js
const mainTrack = {
  src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/sounds/bg.mp3",
  title: "Monumental", // Пример
  composer: "Alex-Productions", // Пример
  sourceUrl: "https://www.chosic.com/download-audio/59421/", // Ссылка на источник музыки, если есть
};

function App() {
  const [siteResourceLoading, setSiteResourceLoading] = useState(true); // Загрузка ресурсов сайта
  const [mainContentLoaded, setMainContentLoaded] = useState(false); // Контент показан после клика на прелоадере

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicAudioRef = useRef(null);

  const { ref: heroSectionRef, entry: heroEntry } = useInView({ threshold: 0 });
  const [isHeroScrolledPast, setIsHeroScrolledPast] = useState(false);

  // Эффект для определения окончания загрузки ресурсов
  useEffect(() => {
    const handleLoad = () => {
      // Имитация минимального времени показа спиннера + реальная загрузка
      setTimeout(() => {
        setSiteResourceLoading(false); // Ресурсы "загружены", прелоадер перейдет к фазе 'prompt'
      }, 1000); // Минимум 1с для спиннера

    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Эффект для отслеживания прокрутки HeroSection (для Navbar)
  useEffect(() => {
    if (heroEntry) {
      setIsHeroScrolledPast(heroEntry.boundingClientRect.bottom < 0);
    }
  }, [heroEntry]);

  // Инициализация и блокировка/разблокировка скролла
  useEffect(() => {
    if (siteResourceLoading || !mainContentLoaded) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Очистка класса при размонтировании, на всякий случай
    return () => document.body.classList.remove("no-scroll");
  }, [siteResourceLoading, mainContentLoaded]);

  // Инициализация основного музыкального плеера
  useEffect(() => {
    musicAudioRef.current = new Audio(mainTrack.src);
    musicAudioRef.current.loop = true;
  }, []);

  // Колбэк, вызываемый из Preloader после клика пользователя
  const handlePreloaderInteraction = () => {
    setMainContentLoaded(true); // Показываем основной контент
    if (musicAudioRef.current) {
      musicAudioRef.current
        .play()
        .catch((e) => console.error("Ошибка музыки:", e));
      setIsMusicPlaying(true);
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // 'instant' для мгновенного перехода,
        // 'smooth' для плавной прокрутки наверх (если это нужно)
      });
  };

  const toggleMusic = () => {
    if (musicAudioRef.current) {
      if (isMusicPlaying) {
        musicAudioRef.current.pause();
      } else {
        musicAudioRef.current
          .play()
          .catch((e) => console.error("Ошибка музыки:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <>
      <Preloader
        siteActuallyLoading={siteResourceLoading}
        onInteraction={handlePreloaderInteraction}
      />

      <div
        className={`app-content-wrapper ${
          !mainContentLoaded ? "content-hidden" : "content-visible"
        }`}
      >
        <Navbar
          isVisible={isHeroScrolledPast}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
          currentTrack={mainTrack}
        />
        <div className="main-content-scroll-wrapper">
          <HeroSection ref={heroSectionRef} />
          <WorldLoreSection />
          <RanksSection />
          <FAQSection />
          <RoadmapSection />
          <TeamSection />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
