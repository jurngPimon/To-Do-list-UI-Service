import { object, string } from "yup";

export const validateSchema = object({
  title: string()
    .min(6, "Title must be at least 6 characters long")
    .max(60, "Title must be at most 60 characters long")
    .required("Title is required"),
  description: string()
    .min(10, "Description must be at least 10 characters long")
    .max(300, "Description must be at most 300 characters long")
    .required("Description is required"),
});
