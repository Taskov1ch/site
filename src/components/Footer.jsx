import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer({ onToggleCredits }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>Тут скоро будет Copyright</p>
        <div className="social-links">
<<<<<<< HEAD
          <a href="https://vk.com/aurion_be" target="_blank">VK</a>
          <Link to="/credits">Credits</Link>
=======
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
>>>>>>> tmp
        </div>
      </div>
    </footer>
  );
}

export default Footer;
