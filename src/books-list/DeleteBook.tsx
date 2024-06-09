import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
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

interface FormValues {
  bookId: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

function DeleteBook() {
  const { id } = useParams<{ id: string }>();
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    apiClient.deleteBook(id).then((response) => {
      if (response.success) {
        setSuccessMessage("Książka została pomyślnie usunięta.");
      } else {
        console.error("Nie udało się usunąć książki:", response.statusCode);
      }
    });
  }, [apiClient, id]);

  const onSubmit = useCallback(
    async (values: FormValues, formik: any) => {
      try {
        const response = await apiClient.deleteBook(values.bookId);
        if (response.success) {
          setSuccessMessage("Książka została pomyślnie usunięta.");
        } else {
          formik.setFieldError(
            "bookId",
            `Usuwanie książki nie powiodło się: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Wystąpił błąd podczas usuwania wypożyczenia:", error);
        const axiosError = error as ErrorResponse;
        formik.setFieldError(
          "bookId",
          `Wystąpił błąd podczas usuwania wypożyczenia: ${axiosError.message}`,
        );
      }
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

  const initialValues: FormValues = {
    bookId: id || "",
  };

  const validationSchema = yup.object().shape({
    bookId: yup.string().required("Pole nie może być puste"),
  });

  return (
    <div>
      <header className="header">{t("deleteBook")}</header>
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
                id="bookId"
                name="bookId"
                label={t("bookId")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bookId && !!formik.errors.bookId}
                helperText={formik.touched.bookId && formik.errors.bookId}
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
                {t("deleteBook")}
              </Button>

              <Button variant="contained" style={{ backgroundColor: "purple" }}>
                <Link
                  to="/books-librarian"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("backToList")}
                </Link>
              </Button>
            </form>
          )}
        </Formik>

        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default DeleteBook;
