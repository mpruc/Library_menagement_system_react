import React, { useState } from "react";
import "./BookDetails.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface BookDetails {
  bookDetailsId: number;
  coverImage: string;
  genre: string;
  summary: string;
  bookId: number;
}

function BookDetailsTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [detailsPerPage] = useState<number>(10);

  const bookDetails: BookDetails[] = [
    {
      bookDetailsId: 1,
      coverImage: "cover1.jpg",
      genre: "Fantasy",
      summary: "An epic tale of magic and adventure.",
      bookId: 1,
    },
    {
      bookDetailsId: 2,
      coverImage: "cover2.jpg",
      genre: "Science Fiction",
      summary: "A journey through space and time.",
      bookId: 2,
    },
    {
      bookDetailsId: 3,
      coverImage: "cover3.jpg",
      genre: "Mystery",
      summary: "A thrilling whodunit with twists and turns.",
      bookId: 3,
    },
    {
      bookDetailsId: 4,
      coverImage: "cover4.jpg",
      genre: "Non-fiction",
      summary: "A deep dive into historical events.",
      bookId: 4,
    },
  ];

  const indexOfLastDetail = currentPage * detailsPerPage;
  const indexOfFirstDetail = indexOfLastDetail - detailsPerPage;
  const currentDetails = bookDetails.slice(
    indexOfFirstDetail,
    indexOfLastDetail,
  );

  return (
    <div className="book-details">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books">Lista książek</Link>
          <Link to="/main">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Szczegóły książek</header>
      <table className="book_details-table">
        <thead>
          <tr>
            <th>ID szczegółów książki</th>
            <th>Okładka</th>
            <th>Gatunek</th>
            <th>Podsumowanie</th>
            <th>ID książki</th>
          </tr>
        </thead>
        <tbody>
          {currentDetails.map((detail) => (
            <tr key={detail.bookDetailsId}>
              <td>{detail.bookDetailsId}</td>
              <td>
                <img
                  src={detail.coverImage}
                  alt={`Cover of book ${detail.bookId}`}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{detail.genre}</td>
              <td>{detail.summary}</td>
              <td>{detail.bookId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage > 1 ? prevPage - 1 : prevPage,
            )
          }
        >
          &lt;
        </button>
        <button
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage < Math.ceil(bookDetails.length / detailsPerPage)
                ? prevPage + 1
                : prevPage,
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="book-details">
        <Button variant="contained" style={{ backgroundColor: "purple" }}>
          Dodaj szczegóły książki
        </Button>
      </div>
    </div>
  );
}

export default BookDetailsTable;
