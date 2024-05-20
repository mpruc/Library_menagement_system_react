import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BooksList.css";

function BooksList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const booksPerPage = 15;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const books = [
    { id: 1, title: "Władca Pierścieni", author: "J.R.R. Tolkien", year: 1954 },
    {
      id: 2,
      title: "Harry Potter i Kamień Filozoficzny",
      author: "J.K. Rowling",
      year: 1997,
    },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    {
      id: 4,
      title: "Zabójstwo Rogera Ackroyda",
      author: "Agatha Christie",
      year: 1926,
    },
    { id: 5, title: "Pan Tadeusz", author: "Adam Mickiewicz", year: 1834 },
    { id: 6, title: "Duma i uprzedzenie", author: "Jane Austen", year: 1813 },
    { id: 7, title: "Wojna i pokój", author: "Lew Tołstoj", year: 1869 },
    {
      id: 8,
      title: "Mały Książę",
      author: "Antoine de Saint-Exupéry",
      year: 1943,
    },
    {
      id: 9,
      title: "Zbrodnia i kara",
      author: "Fiodor Dostojewski",
      year: 1866,
    },
    {
      id: 10,
      title: "Harry Potter i Więzień Azkabanu",
      author: "J.K. Rowling",
      year: 1999,
    },
  ];

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(indexOfFirstBook, indexOfLastBook);

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="books-list">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/main">Strona główna</Link>
          {/*<Link to="#">Kontakt</Link>*/}
          <Link to="/">Wyloguj</Link>
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
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <button
              onClick={() => handleBookClick(book.id)}
              className="book-button"
            >
              {book.title}, {book.author}, {book.year}
            </button>
          </li>
        ))}
      </ol>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage > 1 ? prevPage - 1 : prevPage,
            )
          }
        >
          <span>&lt;</span>
        </button>
        <button
          className="pagination-btn"
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage < books.length / booksPerPage ? prevPage + 1 : prevPage,
            )
          }
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}

export default BooksList;
