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

  const handleBackgroundClick = (event) => {
    // Закрываем, только если клик был именно по фону, а не по контенту
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={`credits-overlay ${isVisible ? "visible" : ""}`} onClick={handleBackgroundClick}>
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
                  CC BY 3.0
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
                <a target="_blank" href="https://fonts-online.ru/fonts/minecraft-ten-font-cyrillic">
                  Шрифты онлайн
                </a>
              </p>
              <p>
                Лицензия:{" "}
                <a target="_blank" href="https://creativecommons.org/licenses/by-sa/3.0/">
                  CC BY-SA 3.0
                </a>
              </p>
              <br></br>
              "F77 Minecraft" от "Se7enty-Se7en"
              <p>
                Источник:{" "}
                <a target="_blank" href="https://fonts-online.ru/fonts/f77-minecraft">
                  Шрифты онлайн
                </a>
              </p>
              Лицензия:{" "}
                <a target="_blank" href="https://creativecommons.org/licenses/by-nd/3.0/">
                  CC BY-ND 3.0
                </a>
            </li>
          </ul>
        </div>
        <p className="credits-footer-note">Спасибо всем!</p>
      </div>
    </div>
  );
};

export default Credits;
