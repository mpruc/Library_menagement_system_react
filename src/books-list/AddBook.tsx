import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./BooksList.css";
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

function AddBook() {
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const onSubmit = useCallback(
    (
      values: {
        title: string;
        author: string;
        isbn: string;
        publisher: string;
        yearOfPublish: number;
        availableCopies: number;
      },
      formik: any,
    ) => {
      console.log("Submitting values:", values);
      const { title, author, isbn, publisher, yearOfPublish, availableCopies } =
        values;
      const bookData = {
        title,
        author,
        isbn,
        publisher,
        yearOfPublish,
        availableCopies,
      };

      console.log("Formatted bookData:", JSON.stringify(bookData, null, 2));

      apiClient
        .addBook(bookData)
        .then((response) => {
          console.log("Received response:", response);
          if (response.success) {
            setSuccessMessage(t("bookAdded"));
            formik.resetForm();
          } else {
            formik.setFieldError(
              "title",
              `${t("addBookFailed")}: ${response.statusCode}`,
            );
          }
        })
        .catch((error) => {
          console.error("Error during adding book:", error);
          formik.setFieldError(
            "title",
            `${t("addingBookError")}: ${error.message}`,
          );
        });
    },
    [apiClient, t],
  );

  const initialValues = {
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    yearOfPublish: 2024,
    availableCopies: 1,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required(t("fieldRequired")),
    author: yup.string().required(t("fieldRequired")),
    isbn: yup.string().required(t("fieldRequired")),
    publisher: yup.string().required(t("fieldRequired")),
    yearOfPublish: yup
      .number()
      .typeError(t("yearMustBeNumber"))
      .required(t("fieldRequired")),
    availableCopies: yup
      .number()
      .typeError(t("copiesMustBeNumber"))
      .required(t("fieldRequired")),
  });

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div>
      <header className="header">{t("addBook")}</header>
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
      <div style={{ marginTop: "5vh" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik) => (
            <form
              className="books-list"
              id="signForm"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="title"
                name="title"
                label={t("bookTitle")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && formik.errors.title}
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />

              <TextField
                id="author"
                name="author"
                label={t("bookAuthor")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
                error={formik.touched.author && !!formik.errors.author}
                helperText={formik.touched.author && formik.errors.author}
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />

              <TextField
                id="isbn"
                name="isbn"
                label={t("isbn")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isbn}
                error={formik.touched.isbn && !!formik.errors.isbn}
                helperText={formik.touched.isbn && formik.errors.isbn}
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />

              <TextField
                id="publisher"
                name="publisher"
                label={t("publisher")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publisher}
                error={formik.touched.publisher && !!formik.errors.publisher}
                helperText={formik.touched.publisher && formik.errors.publisher}
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />
              <TextField
                id="yearOfPublish"
                name="yearOfPublish"
                label={t("yearOfPublish")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.yearOfPublish}
                error={
                  formik.touched.yearOfPublish && !!formik.errors.yearOfPublish
                }
                helperText={
                  formik.touched.yearOfPublish && formik.errors.yearOfPublish
                }
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />
              <TextField
                id="availableCopies"
                name="availableCopies"
                label={t("availableCopies")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.availableCopies}
                error={
                  formik.touched.availableCopies &&
                  !!formik.errors.availableCopies
                }
                helperText={
                  formik.touched.availableCopies &&
                  formik.errors.availableCopies
                }
                InputLabelProps={{ style: { fontSize: "25px" } }}
              />

              <Button
                variant="contained"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                style={{
                  backgroundColor:
                    formik.isValid && formik.dirty ? "purple" : "",
                }}
              >
                {t("addBook")}
              </Button>

              <Button variant="contained" style={{ backgroundColor: "purple" }}>
                <Link
                  to="/books-librarian"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("backToBooksList")}
                </Link>
              </Button>
            </form>
          )}
        </Formik>
      </div>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default AddBook;
