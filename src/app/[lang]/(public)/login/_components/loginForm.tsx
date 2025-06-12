"use client";
import { useApolloClient } from "@apollo/client";
import { Button, Card, InputLabel, TextField, Typography } from "@mui/material";
import { Box, grid } from "@mui/system";
import { useContext, useState } from "react";
import { SIGN_IN } from "../../../../../graphql/mutation/SING_IN";
import { LogoIcon } from "@/icons";
import { useFormik } from "formik";

import { createSession } from "@/utils/createSession";
import { ACCESS_TOKEN_KEY } from "@/libs/constants";
import { AppContext } from "@/provider/appContext";
import useSchemaLoginForm from "./schemas";
import LoginImage from "@/assets/images/image_for_login_page.jpg"
import { useTranslations } from "next-intl";



const LoginForm = () => {
  const t = useTranslations("pages")
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext);
  const [loadingPage, setLoadingPage] = useState(false);
  const schemaLoginForm = useSchemaLoginForm(t)
  const onSubmit = async (data: any) => {

    setLoadingPage(true);
    try {
      const variables = {
        ...data,
      };
      const {
        data: { signIn },
      } = await client.mutate({
        mutation: SIGN_IN,
        variables,
      });

      if (signIn?.accessToken) {
        await createSession(ACCESS_TOKEN_KEY, signIn?.accessToken)
        setLoadingPage(false);
        window.location.reload()
      }
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        status: "error",
        message: error?.message,
      });
    }
  };
  const { handleChange, handleSubmit , errors} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaLoginForm,
    onSubmit,
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignContent: "center",
        display: "grid",
        backgroundImage:`url(${LoginImage?.src})`,
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        direction:t("dir")
      }}
      
    >
      <Card sx={{ p: 5, boxShadow: "none", width: "450px" }}>
      <Box display={"flex"} justifyContent={"center"}>
        <LogoIcon height={100} />
      </Box>
      <Box mb={5}>
        <Typography variant="h5" textAlign={"center"}>
          {t("login.welcome_to_alpha_accounting_software")}
        </Typography>
      </Box>
        <form onSubmit={handleSubmit}>
          <Box rowGap={1} display={"grid"}>
            <InputLabel>{t("login.email")}</InputLabel>
            <TextField
              placeholder={t("login.enter_your_email")}
              name="email"
              type="email"
              onChange={handleChange}
              size="small"
              fullWidth
              error={errors?.email ? true: false}
            />
            <Typography variant="body2" color="error">{errors?.email}</Typography>
          </Box>
          <Box mt={3} rowGap={1} display={"grid"}>
            <InputLabel>{t("login.password")}</InputLabel>
            <TextField
              placeholder={t("login.enter_your_password")}
              name="password"
              type="password"
              onChange={handleChange}
              size="small"
              fullWidth
              error={errors?.password ? true : false}
            />
             <Typography variant="body2" color="error">{errors?.password}</Typography>
          </Box>
          <Box display={"grid"} mt={5}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              loading={loadingPage}
            >
              {t("login.continue")}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default LoginForm;
