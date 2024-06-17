import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import "./Loans.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface UserFormValues {
  loanId: number;
  book: number;
  user: number;
  loanDate: string;
  dueDate: string;
  returnDate: string;
}

function UpdateLoan() {
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const initialValues: UserFormValues = {
    loanId: 1,
    book: 1,
    user: 1,
    loanDate: "",
    dueDate: "",
    returnDate: "",
  };

  const onSubmit = useCallback(
    async (values: UserFormValues, formik: any) => {
      try {
        const { loanId, ...rest } = values;

        const response = await apiClient.updateLoan(loanId.toString(), rest);
        if (response.success) {
          setSuccessMessage(t("loanUpdated"));
          formik.resetForm();
        } else {
          formik.setFieldError(
            "loanId",
            `${t("updateLoanFailed")}: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Error during loan update:", error);
        formik.setFieldError("loanId", `${t("updateError")}: ${error.message}`);
      }
    },
    [apiClient, t],
  );

  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const validationSchema = yup.object().shape({
    loanId: yup.number().required(t("fieldRequired")),
    book: yup.string().required(t("fieldRequired")),
    user: yup.string().required(t("fieldRequired")),
    loanDate: yup.string().required(t("fieldRequired")),
    dueDate: yup.string().required(t("fieldRequired")),
  });

  return (
    <div>
      <header className="header">{t("updateLoan")}</header>
      <div style={{ marginTop: "10vh" }}>
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
              className="loans"
              id="updateLoanForm"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="loanId"
                name="loanId"
                label={t("loanId")}
                variant="standard"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.loanId}
                error={formik.touched.loanId && !!formik.errors.loanId}
                helperText={formik.touched.loanId && formik.errors.loanId}
              />

              <TextField
                id="book"
                name="book"
                label={t("bookId")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.book}
                error={formik.touched.book && !!formik.errors.book}
                helperText={formik.touched.book && formik.errors.book}
              />

              <TextField
                id="user"
                name="user"
                label={t("userId")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user}
                error={formik.touched.user && !!formik.errors.user}
                helperText={formik.touched.user && formik.errors.user}
              />

              <TextField
                id="loanDate"
                name="loanDate"
                label={t("loanDate")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.loanDate}
                error={formik.touched.loanDate && !!formik.errors.loanDate}
                helperText={formik.touched.loanDate && formik.errors.loanDate}
              />

              <TextField
                id="dueDate"
                name="dueDate"
                label={t("dueDate")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dueDate}
                error={formik.touched.dueDate && !!formik.errors.dueDate}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
              />
              <TextField
                id="returnDate"
                name="returnDate"
                label={t("returnDate")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.returnDate}
                error={formik.touched.returnDate && !!formik.errors.returnDate}
                helperText={
                  formik.touched.returnDate && formik.errors.returnDate
                }
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
                {t("updateLoan")}
              </Button>

              <Button variant="contained" style={{ backgroundColor: "purple" }}>
                <Link
                  to="/loans_librarian"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("backToLoansList")}
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

export default UpdateLoan;
