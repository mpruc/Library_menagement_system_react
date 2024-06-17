import React, { useEffect, useState } from "react";
import "./Users.css";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="users">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books-librarian">{t("booksList")}</Link>
          <Link to="/main_librarian">{t("homePage")}</Link>
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
      <header className="header">{t("users")}</header>
      <table className="users-table">
        <thead>
          <tr>
            <th>{t("userId")}</th>
            <th>{t("nameAndSurname")}</th>
            <th>{t("email")}</th>
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
          className="pagination-button"
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
            {t("addUser")}
          </Button>
        </Link>
        <Link to="/delete_user">
          <Button variant="contained" style={{ backgroundColor: "purple" }}>
            {t("deleteUser")}
          </Button>
        </Link>
        <Link to="/update_user">
          <Button variant="contained" style={{ backgroundColor: "purple" }}>
            {t("updateUser")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Users;
