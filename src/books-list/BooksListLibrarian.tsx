import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BooksList.css";
import { Button } from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";

function BooksListLibrarian() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const apiClient = useApi();
  const [books, setBooks] = useState<any[]>([]);
  const booksPerPage = 15;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  useEffect(() => {
    apiClient.getBooks().then((response) => {
      if (response.success) {
        setBooks(response.data);
      } else {
        console.error("Failed to fetch books:", response.statusCode);
      }
    });
  }, [apiClient]);

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
          <Link to="/main_librarian">Strona główna</Link>
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
      <div className="books-list">
        <Button variant="contained" style={{ backgroundColor: "purple" }}>
          Dodaj książkę
        </Button>
      </div>
    </div>
  );
}

export default BooksListLibrarian;
