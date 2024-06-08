import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./AddLoan.css";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";

function AddLoan() {
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = useCallback(
    (
      values: {
        bookId: number;
        user: number;
        loanDate: string;
        dueDate: string;
        returnDate: string | null;
      },
      formik: any,
    ) => {
      console.log("Submitting values:", values);
      const { bookId, user, loanDate, dueDate, returnDate } = values;

      const loanData = {
        bookId: bookId,
        user: user,
        loanDate: new Date(loanDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        returnDate: returnDate ? new Date(returnDate).toISOString() : null,
      };

      console.log("Formatted loanData:", JSON.stringify(loanData, null, 2));

      apiClient
        .addLoan(loanData)
        .then((response) => {
          console.log("Received response:", response);
          if (response.success) {
            setSuccessMessage("Dodano wypożyczenie!");
            formik.resetForm();
          } else {
            formik.setFieldError(
              "user",
              `Dodanie wypożyczenia nie powiodło się: ${response.statusCode}`,
            );
          }
        })
        .catch((error) => {
          console.error("Error during adding loan:", error);
          formik.setFieldError(
            "user",
            `Wystąpił błąd podczas dodawania wypożyczenia: ${error.message}`,
          );
        });
    },
    [apiClient],
  );

  const initialValues = {
    user: 1,
    bookId: 1,
    loanDate: "",
    dueDate: "",
    returnDate: null,
  };

  const validationSchema = yup.object().shape({
    user: yup.string().required("Pole nie może być puste"),
    bookId: yup.string().required("Pole nie może być puste"),
    loanDate: yup.string().required("Pole nie może być puste"),
    dueDate: yup.string().required("Pole nie może być puste"),
  });

  return (
    <div>
      <header className="header">Dodaj wypożyczenie</header>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form
            className="add-loan"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="user"
              name="user"
              label="Id użytkownika"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user && !!formik.errors.user}
              helperText={formik.touched.user && formik.errors.user}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="bookId"
              name="bookId"
              label="Id książki"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bookId && !!formik.errors.bookId}
              helperText={formik.touched.bookId && formik.errors.bookId}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="loanDate"
              name="loanDate"
              label="Data wypożyczenia"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.loanDate && !!formik.errors.loanDate}
              helperText={formik.touched.loanDate && formik.errors.loanDate}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="dueDate"
              name="dueDate"
              label="Data wymaganego zwrotu"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dueDate && !!formik.errors.dueDate}
              helperText={formik.touched.dueDate && formik.errors.dueDate}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="returnDate"
              name="returnDate"
              label="Data zwrotu"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.returnDate && !!formik.errors.returnDate}
              helperText={formik.touched.returnDate && formik.errors.returnDate}
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
              Dodaj wypożyczenie
            </Button>

            <Button variant="contained" style={{ backgroundColor: "purple" }}>
              <Link
                to="/loans_librarian"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Wróc do listy wypożyczeń
              </Link>
            </Button>
          </form>
        )}
      </Formik>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default AddLoan;
