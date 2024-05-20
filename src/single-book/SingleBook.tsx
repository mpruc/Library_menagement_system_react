import React from "react";
import "./SingleBook.css";
import { Link } from "react-router-dom";

function SingleBook() {
  const bookData = {
    id: 1,
    tytuł: "Władca Pierścieni",
    autor: "J.R.R. Tolkien",
    wydawca: "Wydawnictwo XYZ",
    isbn: "9788373191723",
    rok: 1954,
    dostępność: "dostępna",
  };

  return (
    <div className="single-book">
      <nav className="navbar">
        <div className="nav-links">
          <Link to={`/book-details/${bookData.id}`}>Szczegóły książki</Link>
          <Link to={`/reviews/${bookData.id}`}>Recenzje książki</Link>
          <Link to="/books">Lista książek</Link>
          <Link to="/main">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Informacje o książce</header>
      <table className="book-table">
        <tbody>
          {Object.entries(bookData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SingleBook;
