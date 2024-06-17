import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";

function GetMeLibrarian() {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.getMe();
        if (response.success) {
          setUserData(response.data);
        } else {
          console.error(t("fetchUserFailed"), response.statusCode);
          setError(t("fetchUserFailedWithCode", { code: response.statusCode }));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(t("fetchUserError"), error);
          setError(t("fetchUserErrorWithMessage", { message: error.message }));
        } else {
          console.error(t("unexpectedError"), error);
          setError(t("unexpectedError"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiClient, t]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("error")}: {error}
      </div>
    );
  }

  return (
    <div className="single-book">
      <nav className="navbar">
        <div className="nav-links">
          {/*<Link to="/books-librarian">{t("booksList")}</Link>*/}
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
      <header className="header">{t("myAccount")}</header>
      <table className="user-table">
        <tbody>
          {Object.entries(userData).map(([key, value]) => (
            <tr key={key}>
              <td>{t(key)}</td>
              <td>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetMeLibrarian;
