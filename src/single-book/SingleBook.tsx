import React, { useState } from "react";
import "./SingleBook.css";
import LoginForm from "../login-form/LoginForm";
import BooksList from "../books-list/BooksList";
import BookDetails from "../book-details/BookDetails";
import Reviews from "../reviews/Reviews";

function SingleBook() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectBooks, setRedirectBooks] = useState<boolean>(false);
  const [redirectBooksD, setRedirectBooksD] = useState<boolean>(false);
  const [redirectRev, setRedirectRev] = useState<boolean>(false);

  function handleLoginClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <LoginForm />;
  }

  function handleBookDClick() {
    setRedirectBooksD(true);
  }

  function handleReviewsClick() {
    setRedirectRev(true);
  }
  if (redirectRev) {
    return <Reviews />;
  }

  function handleBooksListClick() {
    setRedirectBooks(true);
  }

  if (redirectBooks) {
    return <BooksList />;
  }
  if (redirectBooksD) {
    return <BookDetails />;
  }

  const bookData = {
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
          <a href="#" onClick={handleBookDClick}>
            Szczegóły książki
          </a>
          <a href="#" onClick={handleReviewsClick}>
            Recenzje książki
          </a>
          <a href="#" onClick={handleBooksListClick}>
            Lista książek
          </a>
          {!redirect && (
            <a href="#" onClick={handleLoginClick}>
              Zaloguj się
            </a>
          )}
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
