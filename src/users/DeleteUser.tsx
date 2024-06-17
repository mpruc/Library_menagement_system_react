import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import "./Users.css";
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
  userId: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

function DeleteUser() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const apiClient = useApi();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    apiClient.deleteUser(id).then((response) => {
      if (response.success) {
        setSuccessMessage(t("userSuccessfullyDeleted"));
      } else {
        console.error("Failed to delete user:", response.statusCode);
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
        const response = await apiClient.deleteUser(values.userId);
        if (response.success) {
          setSuccessMessage(t("userSuccessfullyDeleted"));
        } else {
          formik.setFieldError(
            "userId",
            `${t("userDeletionFailed")}: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Error while deleting user:", error);
        const axiosError = error as ErrorResponse;
        formik.setFieldError(
          "userId",
          `${t("userDeletionError")}: ${axiosError.message}`,
        );
      }
    },
    [apiClient, t],
  );

  const initialValues: FormValues = {
    userId: id || "",
  };

  const validationSchema = yup.object().shape({
    userId: yup.string().required(t("fieldCannotBeEmpty")),
  });

  return (
    <div>
      <header className="header">{t("deleteUser")}</header>
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

      <div style={{ marginTop: "10vh" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik) => (
            <form
              className="users"
              id="signForm"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="userId"
                name="userId"
                label={t("userId")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userId && !!formik.errors.userId}
                helperText={formik.touched.userId && formik.errors.userId}
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
                {t("deleteUser")}
              </Button>

              <Button variant="contained" style={{ backgroundColor: "purple" }}>
                <Link
                  to="/users"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("backToListOfUsers")}
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

export default DeleteUser;
