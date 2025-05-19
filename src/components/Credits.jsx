import React, { useState, useEffect } from "react";
import "../styles/Credits.css";

const Credits = ({ onClose, mainTrackInfo, preloaderLogoUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`credits-overlay ${isVisible ? "visible" : ""}`}>
      <div className="credits-container">
        <button
          className="credits-back-button"
          onClick={handleClose}
          title="Вернуться назад"
          aria-label="Закрыть окно благодарностей"
        >
          &times;
        </button>
        <h2>Благодарности</h2>

        <div className="credits-section">
          <h3>Материалы</h3>
          <ul>
            <li>
              <strong>Фоновая Музыка:</strong>
              <p>"Monumental" от "Alex-Productions"</p>
              <p>
                Источник:{" "}
                <a
                  href="https://www.chosic.com/download-audio/59421/"
                  target="_blank"
                >
                  Chosic
                </a>
                .
              </p>
              <p>
                Лицензия:{" "}
                <a
                  href="https://creativecommons.org/licenses/by/3.0/"
                  target="_blank"
                >
                  Creative Commons CC BY 3.0
                </a>
                .
              </p>
            </li>
            <br></br>
            <li>
              <strong>Шрифты:</strong>
              <p>"Minecraft Ten font cyrillic" от "SinMedia Studios"</p>
              <p>
                Источник:{" "}
                <a href="https://fonts-online.ru/fonts/minecraft-ten-font-cyrillic">
                  Шрифты онлайн
                </a>
              </p>
              <p>
                Лицензия:{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/">
                  Creative Commons Attribution Share Alike 3.0
                </a>
              </p>
              <br></br>
              "Minecraft Rus" от ???
              <p>
                Источник:{" "}
                <a href="https://fonts-online.ru/fonts/minecraft-rus">
                  Шрифты онлайн
                </a>
              </p>
              <p>Лицензия: ???</p>
            </li>
          </ul>
        </div>
        <p className="credits-footer-note">Спасибо всем!</p>
      </div>
    </div>
  );
};

export default Credits;
