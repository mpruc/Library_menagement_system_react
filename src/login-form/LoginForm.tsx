import React, { useCallback } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useApi } from "../api/dto/ApiProvider";

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
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
          formik.setFieldError("username", "Invalid username or password");
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = yup.object().shape({
    username: yup.string().required("Pole nie może być puste"),
    password: yup
      .string()
      .required("Pole nie może być puste")
      .min(5, "Hasło nie może być krótsze niż 5 znaków"),
    role: yup.string().required("Pole nie może być puste"),
  });

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="#">Kontakt</Link>
          <Link to="">O nas</Link>
        </div>
      </nav>
      <header className="header">Zaloguj się</header>

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
                  value="librarian"
                  control={<Radio />}
                  label="Librarian"
                />
                <FormControlLabel
                  value="reader"
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

            <Button
              variant="contained"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              style={{
                backgroundColor: formik.isValid && formik.dirty ? "purple" : "",
              }}
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
