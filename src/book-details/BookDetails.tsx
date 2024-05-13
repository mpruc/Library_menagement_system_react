import React, { useState } from "react";
import "./BookDetails.css";
import LoginForm from "../login-form/LoginForm";
import BooksList from "../books-list/BooksList";
import Reviews from "../reviews/Reviews";
import SingleBook from "../single-book/SingleBook";

function BookDetails() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectBooks, setRedirectBooks] = useState<boolean>(false);
  const [redirectRev, setRedirectRev] = useState<boolean>(false);
  const [redirectBook, setRedirectBook] = useState<boolean>(false);

  function handleLoginClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <LoginForm />;
  }
  function handleBooksListClick() {
    setRedirectBooks(true);
  }

  if (redirectBooks) {
    return <BooksList />;
  }
  function handleReviewsClick() {
    setRedirectRev(true);
  }
  if (redirectRev) {
    return <Reviews />;
  }
  function handleBookClick() {
    setRedirectBook(true);
  }

  if (redirectBook) {
    return <SingleBook />;
  }

  const bookData = {
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
          <a href="#" onClick={handleBookClick}>
            Informacje o książce
          </a>
          <a href="#" onClick={handleReviewsClick}>
            Recenzje książki
          </a>
          <a href="#" onClick={handleBooksListClick}>
            Lista książek
          </a>
          <a href="#" onClick={handleLoginClick}>
            Zaloguj się
          </a>
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
