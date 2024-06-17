import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import "./Users.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useApi } from "../api/dto/ApiProvider";
import { useTranslation } from "react-i18next";
import { User } from "../api/dto/user.dto";
import { Link } from "react-router-dom";

interface UserFormValues {
  userId: number;
  name: string;
  email: string;
}

function UpdateUser() {
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const initialValues: UserFormValues = {
    userId: 1,
    name: "",
    email: "",
  };

  const onSubmit = useCallback(
    async (values: UserFormValues, formik: any) => {
      try {
        const { userId, ...rest } = values;

        const response = await apiClient.updateUser(userId.toString(), rest);
        if (response.success) {
          setSuccessMessage(t("userUpdated"));
          formik.resetForm();
        } else {
          formik.setFieldError(
            "userId",
            `${t("updateUserFailed")}: ${response.statusCode}`,
          );
        }
      } catch (error: any) {
        console.error("Error during user update:", error);
        formik.setFieldError("userId", `${t("updateError")}: ${error.message}`);
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
    userId: yup.number().required(t("fieldRequired")),
    name: yup.string().required(t("fieldRequired")),
    email: yup.string().email(t("invalidEmail")).required(t("fieldRequired")),
  });

  return (
    <div>
      <header className="header">{t("updateUser")}</header>
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
              className="users"
              id="updateUserForm"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="userId"
                name="userId"
                label={t("userId")}
                variant="standard"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId}
                error={formik.touched.userId && !!formik.errors.userId}
                helperText={formik.touched.userId && formik.errors.userId}
              />

              <TextField
                id="name"
                name="name"
                label={t("name")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                id="email"
                name="email"
                label={t("email")}
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
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
                {t("updateUser")}
              </Button>

              <Button variant="contained" style={{ backgroundColor: "purple" }}>
                <Link
                  to="/users"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("backToUserList")}
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

export default UpdateUser;
