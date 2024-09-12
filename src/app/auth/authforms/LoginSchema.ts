import * as yup from "yup";

const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(mailRegex, "Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
