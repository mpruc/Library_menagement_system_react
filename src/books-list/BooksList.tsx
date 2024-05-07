import React from "react";
import "./BooksList.css";

const BooksList = () => {
  return (
    <div className="books-list">
      <h1 style={{ color: "black" }}>List of books</h1>
      <ol style={{ listStyleType: "decimal" }}>
        <li>Harry Potter i Kamień Filozoficzny, J.K. Rowling...</li>
        <li>Władca Pierścieni, J.R.R. Tolkien...</li>
        <li>Hobbit, czyli tam i z powrotem, J.R.R. Tolkien...</li>
      </ol>
    </div>
  );
};

export default BooksList;
