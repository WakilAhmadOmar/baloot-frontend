import * as Yup from "yup";

const useSchemaLoginForm = (t:any) => {
 

  return Yup.object().shape({
    email: Yup.string()
      .email(t("login.validate_email"))
      .required(t("login.enter_your_email")),
    password: Yup.string()
      .required(t("login.enter_your_password")),
  });
};

export default useSchemaLoginForm;