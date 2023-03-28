import React, { useState } from "react";
import { useContext } from "react";
import { ExploradorContext } from "@/utils/context/ExploradorContext";
import Swal from "sweetalert2";




export const ExploradorSearch = () => {
  const { setItems, items } = useContext(ExploradorContext);
  const [busqueda, setBusqueda] = useState("");

  const handleSearch = () => {
    if (busqueda.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Necesitamos al menos 2 palabras para realizar la busqueda",
      });
      return;
    }
    const filtered = items.filter((item) => {
      return item.title.toLowerCase().includes(busqueda.toLowerCase());
    });

    setItems(filtered);
  };

  return (
    <>
      <div className="col-lg-10 mb-2 mb-lg-0">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="col-lg-2">
        <button className="btn btn-primary w-100" onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  );
};