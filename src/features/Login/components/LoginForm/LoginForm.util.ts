import { object, string } from "yup";

export const validateSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
