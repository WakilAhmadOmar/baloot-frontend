"use client";
import { Button, Card, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { LogoIcon } from "@/icons";
import { useFormik } from "formik";

import { AppContext } from "@/provider/appContext";
import useSchemaLoginForm from "./schemas";
import LoginImage from "@/assets/images/image_for_login_page.jpg";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const t = useTranslations("pages");
  const { setHandleError } = useContext(AppContext);
  const [loadingPage, setLoadingPage] = useState(false);
  const schemaLoginForm = useSchemaLoginForm(t);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setLoadingPage(true);
    try {
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });
      if (res?.ok) {

        setLoadingPage(false);
        setHandleError({
          open: true,
          status: "success",
          message:t("login.welcome_to_alpha_accounting_software") ,
        });
        console.log("res" , res);
        router.push("/");
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
  const { handleChange, handleSubmit, errors } = useFormik({
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
        backgroundImage: `url(${LoginImage?.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        direction: t("dir"),
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
              error={errors?.email ? true : false}
            />
            <Typography variant="body2" color="error">
              {errors?.email}
            </Typography>
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
            <Typography variant="body2" color="error">
              {errors?.password}
            </Typography>
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
