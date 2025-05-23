import React, { useState, useEffect } from "react";
import "../styles/Preloader.css";

const PRELOADER_LOGO_URL =
  "https://raw.githubusercontent.com/Taskov1ch/Aurion/main/logo.png";

const Preloader = ({ siteActuallyLoading, onInteraction, audioLoading }) => {
  const [phase, setPhase] = useState("loading");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!siteActuallyLoading && !audioLoading && phase === "loading") {
      const timer = setTimeout(() => {
        setPhase("prompt");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [siteActuallyLoading, audioLoading, phase]);

  const handleClick = () => {
    if (phase === "prompt") {
      setPhase("exiting");
      onInteraction();
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`preloader-overlay preloader-phase-${phase}`}
      onClick={handleClick}
    >
      <div
        className={`preloader-spinner-container ${
          phase === "loading" ? "visible" : "hidden"
        }`}
      >
        <div className="loader"></div>
      </div>

      <div
        className={`preloader-logo-prompt-container ${
          phase === "prompt" ? "visible" : "hidden"
        }`}
      >
        <img
          src={PRELOADER_LOGO_URL}
          alt="Логотип Проекта"
          className="preloader-logo"
        />
        <p className="preloader-prompt-text">
          Нажмите в любом месте чтобы продолжить.
        </p>
      </div>
    </div>
  );
};

export default Preloader;
