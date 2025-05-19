import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Тут скоро будет Copyright</p>
        <div className="social-links">
          <a href="https://vk.com/aurion_be" target="_blank">VK</a>
          <Link to="/credits">Credits</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;