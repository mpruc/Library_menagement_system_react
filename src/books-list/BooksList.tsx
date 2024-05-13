import React, { useState } from "react";
import "./BooksList.css";
import LoginForm from "../login-form/LoginForm";
import SingleBook from "../single-book/SingleBook";

function BooksList() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [redirectLog, setRedirectLog] = useState<boolean>(false);

  function handleBookClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <SingleBook />;
  }

  function handleLoginClick() {
    setRedirectLog(true);
  }

  if (redirectLog) {
    return <LoginForm />;
  }

  const books = [
    { title: "Władca Pierścieni", author: "J.R.R. Tolkien", year: 1954 },
    {
      title: "Harry Potter i Kamień Filozoficzny",
      author: "J.K. Rowling",
      year: 1997,
    },
    { title: "1984", author: "George Orwell", year: 1949 },
    {
      title: "Zabójstwo Rogera Ackroyda",
      author: "Agatha Christie",
      year: 1926,
    },
    { title: "Pan Tadeusz", author: "Adam Mickiewicz", year: 1834 },
    { title: "Duma i uprzedzenie", author: "Jane Austen", year: 1813 },
    { title: "Wojna i pokój", author: "Lew Tołstoj", year: 1869 },
    { title: "Mały Książę", author: "Antoine de Saint-Exupéry", year: 1943 },
    { title: "Zbrodnia i kara", author: "Fiodor Dostojewski", year: 1866 },
    {
      title: "Harry Potter i Więzień Azkabanu",
      author: "J.K. Rowling",
      year: 1999,
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="books-list">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#" onClick={handleLoginClick}>
            Zaloguj się
          </a>
          <a href="#">Kontakt</a>
        </div>
      </nav>
      <header className="header">Lista książek</header>
      <input
        type="text"
        placeholder="Wyszukaj książkę..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ol
        className="book-list"
        style={{ listStyleType: "decimal", margin: 0, padding: 0 }}
      >
        {filteredBooks.map((book, index) => (
          <li key={index}>
            <button onClick={handleBookClick} className="book-button">
              {book.title}, {book.author}, {book.year}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BooksList;
