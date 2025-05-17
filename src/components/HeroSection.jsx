import { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";

const START_DATE_STRING = "2025-05-06T00:00:00Z";

const TimeDisplay = ({ value, label, isAnimating }) => (
  <div className="hero-timer-unit">
    <span className={`hero-timer-digit ${isAnimating ? "animating" : ""}`}>
      {String(value).padStart(2, "0")}
    </span>
    <span className="hero-timer-label">{label}</span>
  </div>
);

function HeroSection() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAnimating] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  const intervalRef = useRef(null);
  const startDateRef = useRef(new Date(START_DATE_STRING));

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let diffInSeconds = Math.floor((now.getTime() - startDateRef.current.getTime()) / 1000);
      if (diffInSeconds < 0) diffInSeconds = 0;

      const d = Math.floor(diffInSeconds / (24 * 60 * 60));
      diffInSeconds %= (24 * 60 * 60);
      const h = Math.floor(diffInSeconds / (60 * 60));
      diffInSeconds %= (60 * 60);
      const m = Math.floor(diffInSeconds / 60);
      const s = diffInSeconds % 60;

      setTimeElapsed(() => {
        return { days: d, hours: h, minutes: m, seconds: s };
      });
    };

    updateTimer();
    intervalRef.current = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="hero-section">
      <div className="particles-overlay"></div>
      <div className="hero-content-wrapper">
        <div className="hero-title-main">Сервер в разработке</div>
        <div className="hero-subtitle">Скоро всё будет готово!</div>
        <div className="hero-timer-box-title">Разработка длится уже:</div>
        <div className="hero-timer-box">
          <TimeDisplay value={timeElapsed.days} label="дней" isAnimating={isAnimating.days} />
          <TimeDisplay value={timeElapsed.hours} label="часов" isAnimating={isAnimating.hours} />
          <TimeDisplay value={timeElapsed.minutes} label="минут" isAnimating={isAnimating.minutes} />
          <TimeDisplay value={timeElapsed.seconds} label="секунд" isAnimating={isAnimating.seconds} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
