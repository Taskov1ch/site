import React, { useState, useEffect } from "react";
import "../styles/Preloader.css";

const PRELOADER_FADE_OUT_START_DELAY = 200;
const PRELOADER_FADE_OUT_DURATION = 200;
const PRELOADER_TOTAL_EXIT_TIME =
  PRELOADER_FADE_OUT_START_DELAY + PRELOADER_FADE_OUT_DURATION;

const Preloader = ({ appIsLoading }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!appIsLoading) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, PRELOADER_TOTAL_EXIT_TIME);
      return () => clearTimeout(timer);
    }
  }, [appIsLoading]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`preloader-overlay ${isFadingOut ? "fading-out" : ""}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
