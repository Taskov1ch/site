// src/pages/CreditsPage.jsx
import React from 'react';
import "../styles/CreditsPage.css";

const CreditsPage = () => {
  return (
    <div className="credits-page">
      <div className="credits-container">
        <h1 className="credits-title">Благодарности</h1>

        <section className="credits-section">
          <h2>Музыка</h2>
          <ul className="credits-list">
            <li>
              <span className="credit-name">Monumental</span> by
              <a href="https://www.chosic.com/download-audio/59421/" target="_blank" rel="noopener noreferrer">
                Alex-Productions
              </a>
            </li>
          </ul>
        </section>

        <section className="credits-section">
          <h2>Ресурсы</h2>
          <ul className="credits-list">
            <li>
              <span className="credit-name">Minecraft Font</span> by
              <a href="https://www.dafont.com/minecraft.font" target="_blank" rel="noopener noreferrer">
                Mojang
              </a>
            </li>
          </ul>
        </section>

        <a href="/" className="credits-back-button">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default CreditsPage;