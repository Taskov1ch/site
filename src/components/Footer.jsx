import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer({ onToggleCredits }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>Тут скоро будет Copyright</p>
        <div className="social-links">
          <a
            href="https://vk.com/aurion_be"
            target="_blank"
            rel="noopener noreferrer"
          >
            VK
          </a>
          <span className="footer-link-separator">|</span>
          <button onClick={onToggleCredits} className="footer-credits-button">
            Благодарности
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
