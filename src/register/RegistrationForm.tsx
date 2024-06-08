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
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";

function RegistrationForm() {
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState("");

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
            setSuccessMessage("Dodano użytkownika!");
            formik.resetForm();
          } else {
            formik.setFieldError(
              "username",
              `Dodanie użytkownika nie powiodło się: ${response.statusCode}`,
            );
          }
        })
        .catch((error) => {
          console.error("Error during user registration:", error);
          formik.setFieldError(
            "username",
            `Wystąpił błąd podczas rejestracji: ${error.message}`,
          );
        });
    },
    [apiClient],
  );

  const initialValues = {
    username: "",
    password: "",
    role: "ROLE_READER",
    name: "",
    email: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Pole nie może być puste"),
    password: yup
      .string()
      .required("Pole nie może być puste")
      .min(5, "Hasło nie może być krótsze niż 5 znaków"),
    role: yup.string().required("Pole nie może być puste"),
    name: yup.string().required("Pole nie może być puste"),
    email: yup
      .string()
      .email("Nieprawidłowy adres email")
      .required("Pole nie może być puste"),
  });

  return (
    <div>
      <header className="header">Dodaj użytkownika</header>

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
              <FormLabel component="legend">Rola</FormLabel>
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
                  label="Librarian"
                />
                <FormControlLabel
                  value="ROLE_READER"
                  control={<Radio />}
                  label="Reader"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="username"
              name="username"
              label="Nazwa użytkownika"
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
              label="Hasło"
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
              label="Imię"
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
              label="Email"
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
              Dodaj użytkownika
            </Button>

            <Button variant="contained" style={{ backgroundColor: "purple" }}>
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Wróc do listy użytkowników
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
