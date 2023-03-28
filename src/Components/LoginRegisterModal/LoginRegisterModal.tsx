import React, { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { LoginForm } from "../Forms/LoginForm";
import { RegisterForm } from "../Forms/RegisterForm";

export const LoginRegisterModal = () => {
  const modalRef = useRef(null);
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <div
      className="modal fade"
      id="modal"
      aria-labelledby="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog bg-dark">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header ">
            <h5 className="modal-title fs-2 form-title">{formType}</h5>
            <button
              ref={modalRef}
              className="btn p-0 text-white fs-1"
              id="modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <IoIosClose />
            </button>
          </div>
          {formType == "login" ? (
            <LoginForm setFormType={setFormType} modalRef={modalRef} />
          ) : (
            <RegisterForm setFormType={setFormType} />
          )}
        </div>
      </div>
    </div>
  );
};
