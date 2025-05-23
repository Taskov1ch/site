// tmp/src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Credits from "./components/Credits";

import "./App.css";
import "./styles/animations.css";
import AboutProjectSection from "./components/AboutProjectSection";

const mainTrack = {
  src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/sounds/bg.mp3",
  title: "Monumental",
  composer: "Alex-Productions",
  sourceUrl: "https://www.chosic.com/download-audio/59421/",
  artWork: [
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_512.png", sizes: "512x512", type: "image/png" },
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_256.png", sizes: "256x256", type: "image/png" },
    { src: "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/site_assets/aw_128.png", sizes: "128x128", type: "image/png" },
  ]
};
const PRELOADER_LOGO_URL_APP = "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/logo.png";

function App() {
  const [siteResourceLoading, setSiteResourceLoading] = useState(true);
  const [audioLoading, setAudioLoading] = useState(true); // Оставляем, если используется для чего-то еще
  const [mainContentLoaded, setMainContentLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicAudioRef = useRef(null);
  const { ref: heroSectionRef, entry: heroEntry } = useInView({ threshold: 0 });
  const [isHeroScrolledPast, setIsHeroScrolledPast] = useState(false);
  const [isCreditsVisible, setIsCreditsVisible] = useState(false);

  const isPreloaderActive = !mainContentLoaded;

  // Эффект для блокировки скролла (без изменений)
  useEffect(() => {
    const bodyElement = document.body;
    const htmlElement = document.documentElement;
    const shouldLockScroll = siteResourceLoading || !mainContentLoaded || isCreditsVisible;

    if (shouldLockScroll) {
      bodyElement.classList.add("no-scroll");
      htmlElement.classList.add("no-scroll-html");
    } else {
      bodyElement.classList.remove("no-scroll");
      htmlElement.classList.remove("no-scroll-html");
    }
    return () => {
      bodyElement.classList.remove("no-scroll");
      htmlElement.classList.remove("no-scroll-html");
    };
  }, [siteResourceLoading, mainContentLoaded, isCreditsVisible]);

  // Эффект для scrollToTop и scrollRestoration (без изменений)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Инициализация аудио и его слушателей событий
  useEffect(() => {
    const audio = new Audio(mainTrack.src);
    audio.loop = true;
    musicAudioRef.current = audio;

    const handleAudioPlay = () => setIsMusicPlaying(true);
    const handleAudioPause = () => setIsMusicPlaying(false);

    audio.addEventListener('play', handleAudioPlay);
    audio.addEventListener('pause', handleAudioPause);
    audio.addEventListener('ended', handleAudioPause); // На случай, если loop=false или для полноты

    // Загрузка аудио (если это необходимо делать явно)
    // audio.load(); // Обычно браузер делает это сам, когда src установлен

    setAudioLoading(false); // Устанавливаем audioLoading в false после инициализации

    return () => {
      audio.removeEventListener('play', handleAudioPlay);
      audio.removeEventListener('pause', handleAudioPause);
      audio.removeEventListener('ended', handleAudioPause);
      if (audio) {
        audio.pause();
        audio.src = ""; // Освобождаем ресурс
      }
    };
  }, []); // Пустой массив зависимостей, т.к. mainTrack.src не меняется

  // Эффект для загрузки ресурсов сайта (можно объединить с аудио, если удобно)
   useEffect(() => {
    const siteLoadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    // Имитация минимального времени показа спиннера, если нужно
    const minSpinnerTimePromise = new Promise(resolve => setTimeout(resolve, 1000));


    Promise.all([siteLoadPromise, minSpinnerTimePromise]).then(() => {
      setSiteResourceLoading(false); // Завершаем фазу загрузки ресурсов сайта
    });

  }, []);


  // Настройка Media Session API
  useEffect(() => {
    if ("mediaSession" in navigator && musicAudioRef.current) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: mainTrack.title,
        artist: mainTrack.composer,
        artwork: mainTrack.artWork,
      });

      const audio = musicAudioRef.current;

      const handlePlayAction = async () => {
        try {
          await audio.play();
          // setIsMusicPlaying(true); // Будет установлено через слушатель 'play' на audio элементе
        } catch (error) {
          console.error("Media Session: Ошибка воспроизведения", error);
        }
      };

      const handlePauseAction = () => {
        audio.pause();
        // setIsMusicPlaying(false); // Будет установлено через слушатель 'pause' на audio элементе
      };

      navigator.mediaSession.setActionHandler('play', handlePlayAction);
      navigator.mediaSession.setActionHandler('pause', handlePauseAction);
      // Можно добавить и другие обработчики: 'stop', 'seekforward', 'seekbackward'
    }

    return () => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      }
    };
  }, [mainTrack]); // Зависит от mainTrack для метаданных (хотя они константны)

  // Обновление playbackState для Media Session
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isMusicPlaying ? "playing" : "paused";
    }
  }, [isMusicPlaying]);


  useEffect(() => {
    if (heroEntry) {
      setIsHeroScrolledPast(heroEntry.boundingClientRect.bottom < 0);
    }
  }, [heroEntry]);


  const handlePreloaderInteraction = () => {
    setMainContentLoaded(true);
    if (musicAudioRef.current && musicAudioRef.current.paused) {
      musicAudioRef.current
        .play()
        .catch((e) => console.error("Ошибка музыки:", e));
      // setIsMusicPlaying(true); // будет установлено через слушатель 'play'
    }
  };

  const toggleMusic = useCallback(() => {
    if (musicAudioRef.current) {
      if (musicAudioRef.current.paused) {
        musicAudioRef.current.play().catch((e) => console.error("Ошибка музыки при toggle:", e));
      } else {
        musicAudioRef.current.pause();
      }
      // Состояние isMusicPlaying обновится автоматически благодаря слушателям 'play'/'pause'
    }
  }, []); // Зависимостей нет, т.к. musicAudioRef.current не меняется после инициализации

  const handleToggleCredits = () => {
    setIsCreditsVisible(prev => !prev);
  };

  return (
    <>
      <Preloader
        siteActuallyLoading={siteResourceLoading}
        // audioLoading={audioLoading} // audioLoading теперь управляется внутри App
        onInteraction={handlePreloaderInteraction}
        // isActive={isPreloaderActive} // Не используется в Preloader.jsx из контекста
      />
      <div
        className={`app-content-wrapper ${
          !mainContentLoaded ? "content-hidden" : "content-visible"
        }`}
      >
        {mainContentLoaded && (
          <Navbar
            isVisible={true} // isHeroScrolledPast был для скрытия Navbar, если нужно - вернуть
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
            currentTrack={mainTrack}
          />
        )}
        <div className="main-content-scroll-wrapper">
          <HeroSection ref={heroSectionRef} />
          <AboutProjectSection />
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