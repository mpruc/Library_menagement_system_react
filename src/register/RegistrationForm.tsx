import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import "./RegistrationForm.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";

function RegistrationForm() {
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const onSubmit = useCallback(
    (
      values: {
        username: string;
        password: string;
        role: string;
        name: string;
        email: string;
      },
      formik: any,
    ) => {
      console.log("Submitting values:", values);
      apiClient
        .addUser(values)
        .then((response) => {
          console.log("Received response:", response);
          if (response.success) {
            setSuccessMessage(t("userAdded"));
            formik.resetForm();
          } else {
            formik.setFieldError(
              "username",
              `${t("addUserFailed")}: ${response.statusCode}`,
            );
          }
        })
        .catch((error) => {
          console.error("Error during user registration:", error);
          formik.setFieldError(
            "username",
            `${t("registrationError")}: ${error.message}`,
          );
        });
    },
    [apiClient, t],
  );

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const initialValues = {
    username: "",
    password: "",
    role: "ROLE_READER",
    name: "",
    email: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required(t("fieldRequired")),
    password: yup
      .string()
      .required(t("fieldRequired"))
      .min(5, t("passwordMinLength")),
    role: yup.string().required(t("fieldRequired")),
    name: yup.string().required(t("fieldRequired")),
    email: yup.string().email(t("invalidEmail")).required(t("fieldRequired")),
  });

  return (
    <div>
      <header className="header">{t("addUser")}</header>
      <div className="language-selector">
        <FormControl>
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

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form
            className="add-user"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">{t("role")}</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                row
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="ROLE_LIBRARIAN"
                  control={<Radio />}
                  label={t("librarian")}
                />
                <FormControlLabel
                  value="ROLE_READER"
                  control={<Radio />}
                  label={t("reader")}
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

            <TextField
              id="name"
              name="name"
              label={t("name")}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="email"
              name="email"
              label={t("email")}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
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
              {t("addUser")}
            </Button>

            <Button variant="contained" style={{ backgroundColor: "purple" }}>
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {t("backToUserList")}
              </Link>
            </Button>
          </form>
        )}
      </Formik>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default RegistrationForm;
