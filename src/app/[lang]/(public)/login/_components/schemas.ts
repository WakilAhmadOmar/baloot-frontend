import * as yup from "yup";

// Yup schema to validate the form
export const schemaLoginForm = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(7),
  });