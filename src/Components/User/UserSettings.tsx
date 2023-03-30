import React, { useState, useEffect, FormEvent } from "react";
import { BsPaypal, BsTwitter } from "react-icons/bs";
import { SiBinance } from "react-icons/si";
import { RiImageAddFill } from "react-icons/ri";
import { FaUserAlt, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import { FileUploader } from "react-drag-drop-files";
import { updateUser } from "@/utils/api/user";
import { fileTypes } from "@/utils/helpers";
import {
  UpdateParamsErrorType,
  validateUserSettings,
} from "@/utils/validations/ValidateUser";
import { useAppContext } from "@/utils/state";
import { UpdateUserParams } from "@/utils/types";

import styles from "@/styles/User.module.css";

export const UserSettings = () => {
  const { user } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<UpdateParamsErrorType>();
  const [preview, setPreview] = useState<string>();
  const [data, setData] = useState<UpdateUserParams>({
    avatar: user?.avatar,
    userName: user?.userName,
    binanceId: user?.binanceId,
    paypal: user?.paypal,
    twitter: user?.twitter,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setErrors(validateUserSettings(data));
  };

  const handleImage = (image: File) => {
    const reader = new FileReader();

    setData({ ...data, avatar: image });
    reader.onloadend = () => {
      setPreview(reader.result?.toString());
    };

    reader.readAsDataURL(image);
  };

  const editUser = () => {
    setTimeout(() => {
      setSubmitting(false);
      updateUser(user?.id!, data);
      Swal.fire({
        icon: "success",
        title: "Ha actualizado su perfil correctamente",
      });
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length === 0) {
        editUser();
      } else {
        setSubmitting(false);
      }
    }
  }, [submitting]);

  return (
    <form className={`row ${styles.user_form}`} onSubmit={handleSubmit}>
      <h1 className="mb-3">Configuración de Usuario</h1>

      {user?.role === "Author" && (
        <div className="col-12 mb-5">
          <label className="mb-2" htmlFor="">
            Imagen
          </label>
          <FileUploader
            multiple={false}
            classes={styles.drop_zone}
            maxSize={1}
            handleChange={(file: File) => handleImage(file)}
            children={
              <>
                {preview || user.avatar ? (
                  <img src={preview || user.avatar} />
                ) : (
                  <>
                    <RiImageAddFill className="fs-1" />
                    <span className="fs-3 fw-semibold">
                      Arrasta una imagen aca!
                    </span>
                  </>
                )}
              </>
            }
            name="image"
            label="Arrastra una imagen aqui"
            types={fileTypes}
          />
        </div>
      )}

      <div className="col-md-6">
        <div className="input-group">
          <div className="input-group-text">
            <BsPaypal />
          </div>
          <input
            placeholder="Ingrese su email de Paypal"
            type="email"
            value={data?.paypal}
            name="paypal"
            className="form-control"
            onChange={(e) => setData({ ...data, paypal: e.target.value })}
          />
        </div>
        {errors?.paypal && (
          <span className="text-danger mt-2 d-block">{errors?.paypal}</span>
        )}
      </div>

      <div className="col-md-6">
        <div className="input-group">
          <div className="input-group-text">
            <SiBinance />
          </div>
          <input
            type="number"
            value={data?.binanceId}
            onChange={(e) =>
              setData({ ...data, binanceId: parseInt(e.target.value) })
            }
            placeholder="Pay Id de Binance"
            className="form-control"
          />
        </div>
        {errors?.binanceId && (
          <span className="text-danger mt-2 d-block">{errors?.binanceId}</span>
        )}
      </div>

      <div className="col-md-6">
        <div className="input-group">
          <div className="input-group-text">
            <BsTwitter />
          </div>
          <input
            type="text"
            placeholder="Nombre de usuario usado en twitter"
            className="form-control"
            value={data?.twitter}
            onChange={(e) => setData({ ...data, twitter: e.target.value })}
          />
        </div>
        {errors?.twitter && (
          <span className="text-danger mt-2 d-block">{errors?.twitter}</span>
        )}
      </div>

      <div className="col-md-6">
        <div className="input-group">
          <div className="input-group-text">
            <FaUserAlt />
          </div>
          <input
            type="text"
            placeholder="Nombre de usuario en moelist"
            className="form-control"
            value={data?.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />
        </div>
        {errors?.userName && (
          <span className="text-danger mt-2 d-block">{errors?.userName}</span>
        )}
      </div>

      <div className="col">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Editar
          {!submitting ? (
            <FaSave className={`ms-2 fs-5 ${styles.button_icon}`} />
          ) : (
            <div className={`button-icon ${styles.button_icon}`}>
              <div
                className="spinner-border ms-2"
                role="status"
                style={{ width: "15px", height: "15px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};
