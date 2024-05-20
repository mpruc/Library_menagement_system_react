import React, { useState } from "react";
import "./Reviews.css";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

interface Review {
  id: number;
  bookId: number;
  comment: string;
  rating: number;
  user: string;
  date: string;
}

function Reviews() {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewsPerPage] = useState<number>(10);

  const reviews: Review[] = [
    {
      id: 1,
      bookId: 1,
      comment: "Świetna książka!",
      rating: 5,
      user: "alc",
      date: "2024-02-25",
    },
    {
      id: 2,
      bookId: 2,
      comment: "Zakończenie zawiodło",
      rating: 3,
      user: "jkowal",
      date: "2024-03-15",
    },
    {
      id: 3,
      bookId: 1,
      comment: "Bardzo dobra ksiazka.",
      rating: 5,
      user: "chrl",
      date: "2024-03-08",
    },
    {
      id: 4,
      bookId: 3,
      comment: "Nie polecam.",
      rating: 1,
      user: "user1",
      date: "2024-04-17",
    },
  ];

  const filteredReviews = id
    ? reviews.filter((review) => review.bookId === parseInt(id, 10))
    : reviews;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview,
  );

  return (
    <div className="reviews">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books">Lista książek</Link>
          <Link to="/main">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Recenzje książek</header>
      <table className="review-table">
        <thead>
          <tr>
            <th>ID recenzji</th>
            <th>Id książki</th>
            <th>Użytkownik</th>
            <th>Ocena</th>
            <th>Komentarz</th>
            <th>Data recenzji</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.bookId}</td>
              <td>{review.user}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.date}</td>
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
              prevPage < Math.ceil(filteredReviews.length / reviewsPerPage)
                ? prevPage + 1
                : prevPage,
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="reviews">
        <Button variant="contained" style={{ backgroundColor: "purple" }}>
          Dodaj recenzję
        </Button>
      </div>
    </div>
  );
}

export default Reviews;
