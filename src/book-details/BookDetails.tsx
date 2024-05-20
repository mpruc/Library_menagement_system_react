import React, { useState } from "react";
import "./BookDetails.css";
import LoginForm from "../login-form/LoginForm";
import BooksList from "../books-list/BooksList";
import Reviews from "../reviews/Reviews";
import SingleBook from "../single-book/SingleBook";
import { Link } from "react-router-dom";

function BookDetails() {
  const bookData = {
    id: 1,
    tytuł: "Władca pierścieni",
    autor: "J.R.R. Tolkien",
    gatunek: "fantasy",
    podsumowanie:
      " Epicka powieść fantasy, która opowiada o niezwykłej podróży grupy bohaterów, zmierzających do zniszczenia potężnego Pierścienia, który jest kluczem do władzy nad światem Śródziemia.",
    cover_image_url: "gnsidgnoix",
  };

  return (
    <div className="book-details">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/book/${bookData.id}">Informacje o książce</Link>
          {/*<Link to="/reviews/${bookData.id}">Recenzje książki</Link>*/}
          <Link to="/books">Lista książek</Link>
          <Link to="/main">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Szczegóły książki</header>
      <table className="bookdet-table">
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

export default BookDetails;
