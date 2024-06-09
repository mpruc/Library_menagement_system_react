import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

function MainPageLibrarian() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/reviews">{t("reviews")}</Link>
          <Link to="#">{t("contact")}</Link>
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
      <header className="header">{t("homePage")}</header>
      <div>
        <div style={{ marginTop: "3vh" }}>
          <ul className="list-buttons">
            <li>
              <button
                onClick={() => handleNavigation("/books-librarian")}
                className="list-button"
              >
                {t("booksList")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/users")}
                className="list-button"
              >
                {t("users")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/loans_librarian")}
                className="list-button"
              >
                {t("loans")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/all_bookdetails")}
                className="list-button"
              >
                {t("bookDetails")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/get_me_librarian")}
                className="list-button"
              >
                {t("myAccount")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainPageLibrarian;
