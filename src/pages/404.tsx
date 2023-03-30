import React from "react";
import styles from "@/styles/NotFound.module.css";
import Image from "next/image";

const NotFound = () => {
  return (
    <section className={`container-fluid ${styles.not_found_container}`}>
      <div
        className={`${styles.not_found_wrapper} d-flex flex-column text-white justify-content-center align-items-center`}
      >
        <img
          src="/not-found-error.svg"
          alt="Pagina no encontrada"
          className={styles.not_found_img}
          width={300}
          height={300}
        />
        <div className={`${styles.not_found_text_wrapper} text-center`}>
          <h1 className="fw-bold">Pagina no encontrada</h1>
          <p className="text-white mt-4">La pagina que buscas no existe</p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
