import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

function MainPageLibrarian() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="nav-links">
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
              onClick={() => handleNavigation("/books-librarian")}
              className="list-button"
            >
              Lista książek
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation("/users")}
              className="list-button"
            >
              Użytkownicy
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation("/loans_librarian")}
              className="list-button"
            >
              Wypożyczenia
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/all_bookdetails")}
              className="list-button"
            >
              Szczegóły książek
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/get_me")}
              className="list-button"
            >
              Moje konto
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainPageLibrarian;
