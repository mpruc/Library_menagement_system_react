import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BooksList.css";
import "../pagination.css";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";

function BooksList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const apiClient = useApi();
  const [books, setBooks] = useState<any[]>([]);
  const booksPerPage = 15;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    apiClient.getBooks().then((response) => {
      if (response.success) {
        setBooks(response.data);
      } else {
        console.error(t("fetchBooksFailed"), response.statusCode);
      }
    });
  }, [apiClient, t]);

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
          <Link to="/main">{t("homePage")}</Link>
          <Link to="/">{t("logout")}</Link>
          <FormControl sx={{ backgroundColor: "white" }}>
            <Select
              value={language}
              onChange={handleChangeLanguage}
              label={t("language")}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="pl">PL</MenuItem>
            </Select>
          </FormControl>
        </div>
      </nav>
      <header className="header">{t("booksList")}</header>
      <input
        type="text"
        placeholder={t("searchBook")}
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
