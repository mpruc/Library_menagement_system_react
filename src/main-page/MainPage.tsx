import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";

function MainPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books">{t("booksList")}</Link>
          <Link to="/reviews">{t("reviews")}</Link>
          {/*<Link to="#">{t("contact")}</Link>*/}
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
      <div className="content">
        <div style={{ marginTop: "3vh" }}>
          <ul className="list-buttons">
            <li>
              <button
                onClick={() => handleNavigation("/loans")}
                className="list-button"
              >
                {t("myLoans")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/get_me")}
                className="list-button"
              >
                {t("myAccount")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("")}
                className="list-button"
              >
                {t("myReviews")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
