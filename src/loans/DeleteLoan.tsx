import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
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

interface FormValues {
  loanId: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

function DeleteLoan() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    apiClient.deleteLoan(id).then((response) => {
      if (response.success) {
        setSuccessMessage(t("loanSuccessfullyDeleted"));
      } else {
        console.error("Failed to delete loan:", response.statusCode);
      }
    });
  }, [apiClient, id, t]);

  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const onSubmit = useCallback(
    async (values: FormValues, formik: any) => {
      try {
        const response = await apiClient.deleteLoan(values.loanId);
        if (response.success) {
          setSuccessMessage(t("loanSuccessfullyDeleted"));
        } else {
          formik.setFieldError(
            "loanId",
            `${t("loanDeletionFailed")}: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Error while deleting loan:", error);
        const axiosError = error as ErrorResponse;
        formik.setFieldError(
          "loanId",
          `${t("loanDeletionError")}: ${axiosError.message}`,
        );
      }
    },
    [apiClient, t],
  );

  const initialValues: FormValues = {
    loanId: id || "",
  };

  const validationSchema = yup.object().shape({
    loanId: yup.string().required(t("fieldCannotBeEmpty")),
  });

  return (
    <div>
      <header className="header">{t("deleteLoan")}</header>
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
              id="loanId"
              name="loanId"
              label={t("loanId")}
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
              {t("deleteLoan")}
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

export default DeleteLoan;
