import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./AddLoan.css";
import { Formik } from "formik";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";

function AddLoan() {
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = useCallback(
    (
      values: {
        book: number;
        user: number;
        loanDate: string;
        dueDate: string;
        returnDate: string | null;
      },
      formik: any,
    ) => {
      console.log("Submitting values:", values);
      const { book, user, loanDate, dueDate, returnDate } = values;

      const loanData = {
        book: book,
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

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const initialValues = {
    user: 1,
    book: 1,
    loanDate: "",
    dueDate: "",
    returnDate: null,
  };

  const validationSchema = yup.object().shape({
    user: yup.number().required(t("fieldCannotBeEmpty")),
    bookId: yup.number().required(t("fieldCannotBeEmpty")),
    loanDate: yup.string().required(t("fieldCannotBeEmpty")),
    dueDate: yup.string().required(t("fieldCannotBeEmpty")),
  });

  return (
    <div>
      <header className="header">{t("addLoan")}</header>
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
            className="add-loan"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="user"
              name="user"
              label={t("user")}
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
              label={t("bookId")}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.book && !!formik.errors.book}
              helperText={formik.touched.book && formik.errors.book}
              InputLabelProps={{ style: { fontSize: "25px" } }}
            />

            <TextField
              id="loanDate"
              name="loanDate"
              label={t("loanDate")}
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
              label={t("dueDate")}
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
              label={t("returnDate")}
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
              {t("addLoan")}
            </Button>

            <Button variant="contained" style={{ backgroundColor: "purple" }}>
              <Link
                to="/loans_librarian"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {t("backToListOfLoans")}
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
