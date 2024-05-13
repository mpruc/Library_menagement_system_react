// LoginForm.tsx
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import "./LoginForm.css";
import BooksList from "../books-list/BooksList";

interface FormValues {
  username: string;
  password: string;
}

function LoginForm() {
  const onSubmit = (values: FormValues, formik: FormikHelpers<FormValues>) => {
    console.log(values);
  };
  const [redirect, setRedirect] = useState<boolean>(false);
  function handleClick() {
    setRedirect(true);
  }
  if (redirect) {
    return <BooksList />;
  }
  const validationSchema = yup.object().shape({
    username: yup.string().required("Pole nie może być puste"),
    password: yup
      .string()
      .required("Pole nie może być puste")
      .min(5, "Hasło nie może być krótsze niż 5 znaków"),
  });

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <a href="#" onClick={handleClick}>
            Lista książek
          </a>
          <a href="#">Kontakt</a>
        </div>
      </nav>
      <header className="header">Zaloguj się</header>
      <Formik
        initialValues={{ username: "", password: "" }}
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

            <Button
              variant="contained"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Zaloguj się
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
