import { RegisterParams } from "../types";

export function validateRegister(values: RegisterParams) {
  let errors: RegisterParams = {};

  if (!values.userName || values.userName === "") {
    errors.userName = "Es necesario un nombre de usuario";
  } else if (values.userName.length < 3) {
    errors.userName = "El nombre de usuario debe tener al menos 3 caracteres";
  } else if (values.userName.length > 15) {
    errors.userName = "El nombre de usuario debe tener menos de 15 caracteres";
  } else if (values.userName.includes(" ")) {
    errors.userName = "El nombre de usuario no puede tener espacios";
  }

  if (!values.email) {
    errors.email = "Email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Este email no es valido";
  } else if (values.email.length > 60) {
    errors.email = "El email debe tener menos de 60 caracteres";
  } else if (values.email.includes(" ")) {
    errors.email = "El email no puede tener espacios";
  } else if (values.email.length < 8) {
    errors.email = "El email debe tener al menos 8 caracteres";
  }
  if (!values.password) {
    errors.password = "Password es requerido";
  } else if (values.password.length < 6) {
    errors.password = "Password debe tener al menos 6 caracteres";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Las contraseñas no coinciden";
  } else if (values.password.length > 60) {
    errors.password = "El password debe tener menos de 60 caracteres";
  } else if (values.password.includes(" ")) {
    errors.password = "El password no puede tener espacios";
  }

  return errors;
}
