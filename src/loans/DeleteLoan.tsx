import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import "./AddLoan.css";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";

interface FormValues {
  loanId: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

function DeleteLoan() {
  const { id } = useParams<{ id: string }>();
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    apiClient.deleteLoan(id).then((response) => {
      if (response.success) {
        setSuccessMessage("Wypożyczenie zostało pomyślnie usunięte.");
      } else {
        console.error(
          "Nie udało się usunąć wypożyczenia:",
          response.statusCode,
        );
      }
    });
  }, [apiClient, id]);

  const onSubmit = useCallback(
    async (values: FormValues, formik: any) => {
      try {
        const response = await apiClient.deleteLoan(values.loanId);
        if (response.success) {
          setSuccessMessage("Wypożyczenie zostało pomyślnie usunięte.");
        } else {
          formik.setFieldError(
            "loanId",
            `Usuwanie wypożyczenia nie powiodło się: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Wystąpił błąd podczas usuwania wypożyczenia:", error);
        const axiosError = error as ErrorResponse;
        formik.setFieldError(
          "loanId",
          `Wystąpił błąd podczas usuwania wypożyczenia: ${axiosError.message}`,
        );
      }
    },
    [apiClient],
  );

  const initialValues: FormValues = {
    loanId: id || "",
  };

  const validationSchema = yup.object().shape({
    loanId: yup.string().required("Pole nie może być puste"),
  });

  return (
    <div>
      <header className="header">Usuń wypożyczenie</header>

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
              id="loanId"
              name="loanId"
              label="Id wypożyczenia"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.loanId && !!formik.errors.loanId}
              helperText={formik.touched.loanId && formik.errors.loanId}
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
              Usuń wypożyczenie
            </Button>

            <Button variant="contained" style={{ backgroundColor: "purple" }}>
              <Link
                to="/loans_librarian"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Wróć do listy wypożyczeń
              </Link>
            </Button>
          </form>
        )}
      </Formik>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default DeleteLoan;
