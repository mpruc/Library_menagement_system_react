import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books">Lista książek </Link>
          <Link to="/reviews">Recenzje</Link>
          <Link to="#">Kontakt</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Strona główna</header>
      <div>
        <ul className="list-buttons">
          <li>
            <button
              onClick={() => handleNavigation("/loans")}
              className="list-button"
            >
              Wypożyczenia
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("")}
              className="list-button"
            >
              Moje konto
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("")}
              className="list-button"
            >
              Moje recenzje
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
