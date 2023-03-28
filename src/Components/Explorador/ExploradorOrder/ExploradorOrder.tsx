import React, { useContext, useEffect } from "react";
import { ExploradorContext } from "@/utils/context/ExploradorContext"; 

export const ExploradorOrder = () => {
  const { setItems } = useContext(ExploradorContext);

  return (
    <div className="row align-items-center mt-3 mt-lg-0">
      <div className="col-lg-10 text-start text-lg-end">Ordenar por</div>
      <div className="col-lg-2">
        <select className="form-select bg-dark text-white mt-2 mt-lg-0">
          <option value="estreno">Fecha</option>
          <option value="title">Titulo</option>
        </select>
      </div>
    </div>
  );
};