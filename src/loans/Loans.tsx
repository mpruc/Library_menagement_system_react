import React, { useState } from "react";
import "./Loans.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Loans() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loansPerPage] = useState<number>(10);

  const loanData = [
    {
      id: 1,
      book: "Władca Pierścieni",
      user: "jkowal",
      loanDate: "2024-05-01",
      dueDate: "2024-06-01",
      returnDate: "2024-05-20",
    },
    {
      id: 2,
      book: "Harry Potter i Kamień Filozoficzny",
      user: "ann",
      loanDate: "2024-04-15",
      dueDate: "2024-05-15",
      returnDate: "2024-05-10",
    },
  ];

  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loanData.slice(indexOfFirstLoan, indexOfLastLoan);

  return (
    <div className="loans">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/main">Strona główna</Link>
          <Link to="/"> Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Wypożyczenia książek</header>
      <table className="loan-table">
        <thead>
          <tr>
            <th>ID wypożyczenia</th>
            <th>Książka</th>
            <th>Użytkownik</th>
            <th>Data wypożyczenia</th>
            <th>Wymagany termin oddania</th>
            <th>Data zwrotu</th>
          </tr>
        </thead>
        <tbody>
          {currentLoans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.book}</td>
              <td>{loan.user}</td>
              <td>{loan.loanDate}</td>
              <td>{loan.dueDate}</td>
              <td>{loan.returnDate}</td>
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
              prevPage < Math.ceil(loanData.length / loansPerPage)
                ? prevPage + 1
                : prevPage,
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="add-loan-button">
        <Button variant="contained" style={{ backgroundColor: "purple" }}>
          Dodaj wypożyczenie
        </Button>
      </div>
    </div>
  );
}

export default Loans;
