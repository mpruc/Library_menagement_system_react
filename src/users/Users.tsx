import React, { useEffect, useState } from "react";
import "./Users.css";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../api/dto/ApiProvider";

interface User {
  id: number;
  name: string;
  email: string;
}

function Users() {
  const apiClient = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);

  useEffect(() => {
    apiClient.getUsers().then((response) => {
      if (response.success) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.statusCode);
      }
    });
  }, [apiClient]);

  const filteredUsers = id
    ? users.filter((user) => user.id === parseInt(id, 10))
    : users;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="users">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books-librarian">Lista książek</Link>
          <Link to="/main_librarian">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Użytkownicy</header>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID użytkownika</th>
            <th>Imię i nazwisko</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
              prevPage < Math.ceil(filteredUsers.length / usersPerPage)
                ? prevPage + 1
                : prevPage,
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="add-user">
        <Link to="/add_user">
          <Button variant="contained" style={{ backgroundColor: "purple" }}>
            Dodaj użytkownika
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Users;
