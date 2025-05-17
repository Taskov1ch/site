import "../styles/Navbar.css";


function Navbar({ serverName }) {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="/" className="navbar-logo">
          {serverName || "MyServer"}
        </a>
        <ul className="navbar-links">
          <li><a href="#home">Главная</a></li>
          <li><a href="#ranks">Ранги</a></li>
          <li><a href="#rules">Правила</a></li>
          <li><a href="#store">Магазин</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
