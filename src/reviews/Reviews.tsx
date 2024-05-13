import React, { useState } from "react";
import "./Reviews.css";
import LoginForm from "../login-form/LoginForm";
import BooksList from "../books-list/BooksList";
import SingleBook from "../single-book/SingleBook";
import BookDetails from "../book-details/BookDetails";

function Reviews() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectBooks, setRedirectBooks] = useState<boolean>(false);
  const [redirectBooksD, setRedirectBooksD] = useState<boolean>(false);
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
  function handleBookDClick() {
    setRedirectBooksD(true);
  }
  if (redirectBooksD) {
    return <BookDetails />;
  }
  function handleBookClick() {
    setRedirectBook(true);
  }
  if (redirectBook) {
    return <SingleBook />;
  }

  const reviewData = [
    {
      id: 1,
      book: "Władca Pierścieni",
      user: "Jan Kowalski",
      rating: 5,
      comment: "Super książka!",
      date: "2024-05-12",
    },
    {
      id: 2,
      book: "Harry Potter i Kamień Filozoficzny",
      user: "Anna Nowak",
      rating: 4,
      comment: "Bardzo przyjemna lektura",
      date: "2024-05-11",
    },
  ];

  return (
    <div className="reviews">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#" onClick={handleBookClick}>
            Informacje o książce
          </a>
          <a href="#" onClick={handleBookDClick}>
            Szczegóły książki
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
      <header className="header">Recenzje książki</header>
      <table className="review-table">
        <thead>
          <tr>
            <th>ID recenzji</th>
            <th>Książka</th>
            <th>Użytkownik</th>
            <th>Ocena</th>
            <th>Komentarz</th>
            <th>Data recenzji</th>
          </tr>
        </thead>
        <tbody>
          {reviewData.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.book}</td>
              <td>{review.user}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reviews;
