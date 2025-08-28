
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Masukkan username"),
  password: Yup.string().required("Masukkan password"),
});