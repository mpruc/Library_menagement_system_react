import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./LoginForm.css";
import { useApi } from "../api/dto/ApiProvider";

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const onSubmit = useCallback(
    (
      values: { username: string; password: string; role: string },
      formik: any,
    ) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          if (values.role === "librarian") {
            navigate("/main_librarian");
          } else if (values.role === "reader") {
            navigate("/main");
          }
        } else {
          formik.setFieldError("username", t("invalidUsernameOrPassword"));
        }
      });
    },
    [apiClient, navigate, t],
  );

  const validationSchema = yup.object().shape({
    username: yup.string().required(t("fieldCannotBeEmpty")),
    password: yup
      .string()
      .required(t("fieldCannotBeEmpty"))
      .min(5, t("passwordMinLength")),
    role: yup.string().required(t("fieldCannotBeEmpty")),
  });

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="#">{t("contact")}</Link>
          <Link to="">{t("aboutUs")}</Link>
        </div>
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
      </nav>
      <header className="header">{t("login")}</header>
      <Formik
        initialValues={{ username: "", password: "", role: "reader" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form
            className="login-form"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ fontSize: "25px" }}>
                {t("role")}
              </FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                row
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="librarian"
                  control={<Radio />}
                  label={t("librarian")}
                />
                <FormControlLabel
                  value="reader"
                  control={<Radio />}
                  label={t("reader")}
                  style={{ fontSize: "25px" }}
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="username"
              name="username"
              label={t("username")}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />
            <TextField
              id="password"
              name="password"
              label={t("password")}
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              style={{
                backgroundColor: formik.isValid && formik.dirty ? "purple" : "",
              }}
            >
              {t("login")}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
