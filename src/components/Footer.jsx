import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer({ onToggleCredits }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© 2025 Aurion BE.<br></br>
        Все права защищены.<br></br>
Aurion BE не является официальным продуктом Minecraft Bedrock Edition и не одобрено, не связано, не поддерживается и не спонсируется Mojang AB или Microsoft Corp.
Все права на Minecraft Bedrock Edition принадлежат Mojang AB и Microsoft Corp.</p>
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
