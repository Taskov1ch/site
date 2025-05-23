import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer({ onToggleCredits }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© 2025 Aurion BE.<br></br>
        Все права защищены.<br></br>
Aurion BE не является официальным продуктом Minecraft Bedrock Edition и никак не связан с Mojang AB или Microsoft Corp.
</p>
        <div className="social-links">
          <a
            href="https://vk.com/aurion_be"
            target="_blank"
            rel="noopener noreferrer"
          >
            VK
          </a>
          {/* <span className="footer-link-separator">|</span> */}
          <a href="https://t.me/aurion_be" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          {/* <span className="footer-link-separator">|</span> */}
          <a href="https://github.com/Taskov1ch/Aurion" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {/* <span className="footer-link-separator">|</span> */}
          <button onClick={onToggleCredits} className="footer-credits-button">
            Благодарности
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
