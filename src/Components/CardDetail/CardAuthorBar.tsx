import React from "react";
import { BiHappyBeaming } from "react-icons/bi";

export const CardTopBar = () => {
  return (
    <div className="bg-green autor-bar text-white">
      <a
        href="https://discord.gg/UfdnmZ5DJE"
        target="_blank"
        className="fw-bold cardMessage text-white"
      >
        <BiHappyBeaming className="me-2 fs-4" />
        Conviertete en Autor! Click Aqui
      </a>
    </div>
  );
};
