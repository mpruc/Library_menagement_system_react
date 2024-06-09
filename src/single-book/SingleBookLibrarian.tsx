import React, { useEffect, useState } from "react";
import "./SingleBook.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";

function SingleBookLibrarian() {
  const { id } = useParams<{ id: string }>();
  const [bookData, setBookData] = useState<any | null>(null);
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    if (!id) return;

    apiClient.getBookById(id).then((response) => {
      if (response.success) {
        setBookData(response.data);
      } else {
        console.error(t("fetchBookFailed"), response.statusCode);
      }
    });
  }, [apiClient, id, t]);

  const handleDelete = () => {
    if (!id) return;

    apiClient
      .deleteBook(id)
      .then((response) => {
        if (response.success) {
          console.log(t("deleteBookSuccess"));
          navigate("/books-librarian");
        } else {
          console.error(t("deleteBookFailed"), response.statusCode);
        }
      })
      .catch((error) => {
        console.error(t("deleteBookError"), error);
      });
  };

  if (!bookData) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="single-book">
      <nav className="navbar">
        <div className="nav-links">
          <Link to={`/book-details/${bookData.id}`}>{t("bookDetails")}</Link>
          <Link to={`/reviews/${bookData.id}`}>{t("bookReviews")}</Link>
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
      <header className="header">{t("bookInfo")}</header>
      <table className="book-table">
        <tbody>
          {Object.entries(bookData).map(([key, value]) => (
            <tr key={key}>
              <td>{t(key)}</td>
              <td>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <Button
          variant="contained"
          style={{ backgroundColor: "purple" }}
          onClick={handleDelete}
        >
          {t("deleteBook")}
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" style={{ backgroundColor: "purple" }}>
          {t("editBook")}
        </Button>
      </div>
    </div>
  );
}
export default SingleBookLibrarian;
