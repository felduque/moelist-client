import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { validateLogin } from "@/utils/validations/LoginValidation";
import { loginUser } from "@/utils/api/Login";
import { LoginParams } from "@/utils/types";

type Props = {
  setFormType: Dispatch<SetStateAction<"login" | "register">>;
  modalRef: any;
};

export const LoginForm: FC<Props> = ({ setFormType, modalRef }) => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<LoginParams>({});
  const [data, setData] = useState<LoginParams>({
    email: "",
    password: "",
  });

  const { setToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors(
      validateLogin({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const newForm = {
        email: data.email,
        password: data.password,
      };

      try {
        const res = await loginUser(newForm);
        if (res) {
          modalRef.current.click();
          Swal.fire({
            icon: "success",
            title: "Usuario logueado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("token", res.token);
          setToken(res.token);
        } else {
          Swal.fire({
            icon: "error",
            title: "El Email o el Password son incorrectos, corrige los campos",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error al loguear el usuario",
          text: "Error inesperado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="p-4">
      <div className="input-group">
        <div className=" mb-4 input-field">
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Escriba su Email"
            autoComplete="current-email"
            required
          />
          <MdEmail className="input-icon" />
        </div>
        {errors?.email && (
          <div className="alert alert-danger" role="alert">
            {errors?.email}
          </div>
        )}
      </div>

      <div className="input-group">
        <div className="mb-4 input-field">
          <input
            type={show ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Escriba su Contraseña"
            autoComplete="current-password"
            required
          />
          <FaLock className="input-icon" />
          <div className="showHide" onClick={() => setShow(!show)}>
            {show ? (
              <BiShow className="input-icon show-hide-pw" />
            ) : (
              <BiHide className="input-icon show-hide-pw" />
            )}
          </div>
        </div>
        {errors?.password && (
          <div className="alert alert-danger" role="alert">
            {errors?.password}
          </div>
        )}
      </div>

      <input
        className="btn btn-primary submit-btn w-100 fs-5 fw-bold"
        type="submit"
        value="Login"
      />

      <p className="mt-4">
        No tiene una Cuenta?
        <button
          type="button"
          className="btn btn-link p-0 ps-1"
          onClick={() => setFormType("register")}
        >
          Create una!!
        </button>
      </p>
    </form>
  );
};
