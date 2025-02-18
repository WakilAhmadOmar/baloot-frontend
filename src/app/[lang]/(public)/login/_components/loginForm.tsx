"use client"
import { useApolloClient } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {SIGN_IN} from "../../../../../graphql/mutation/SING_IN"

import { useFormik } from "formik";
import { schemaLoginForm } from "./schemas";
import { createSession } from "@/utils/createSession";
import { ACCESS_TOKEN_KEY } from "@/libs/constants";

const LoginForm = () => {
  const client = useApolloClient();
const onSubmit = async (data: any) => {

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
      console.log("singIn", signIn);
      await createSession( ACCESS_TOKEN_KEY , signIn?.accessToken  )
      if (signIn?.accessToken) {
        setLoadingPage(false);
      }
    } catch (error: any) {
      setLoadingPage(false);
      console.log("error" , error)
      setHandleError({
        open: true,
        status: "error",
        message: error?.message,
      });
    }
  };
const {  handleChange , handleSubmit } = useFormik({
    initialValues:{
        email:"",
        password:""
    },
    onSubmit,
    validationSchema:schemaLoginForm
})
  const [loadingPage, setLoadingPage] = useState(false);
  const [handleError, setHandleError] = useState<{
    open: boolean;
    status: "success" | "info" | "warning" | "error";
    message: string;
  }>({
    open: false,
    message: "",
    status: "error",
  });
  
  const handleCloseFunction = () => {};
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignContent: "center",
        display: "grid",
      }}
    >

      <form onSubmit={handleSubmit}>
      <label>Email</label>
      <TextField
        placeholder="email"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <label>Password</label>
      <TextField
        placeholder="password"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Button variant="contained" size="large" type="submit">
        Login{" "}
      </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
