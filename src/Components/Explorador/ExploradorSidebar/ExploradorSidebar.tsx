import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectStyles } from "@/utils/helpers";
import { FaChevronDown } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";

import { search } from "@/utils/api/search";

import { useContext } from "react";
import { ExploradorContext } from "../../../utils/context/ExploradorContext";

import { tipos, demografia, estado, generos } from "@/utils/valoresParaSelects";
import { FiltersType } from "@/utils/types";

const animatedComponents = makeAnimated();

export const ExploradorSidebar = () => {
  const { setItems, setLoading, setCount, setFilters, filters } =
    useContext(ExploradorContext);
  const [data, setData] = useState<FiltersType>({
    type: "Anime",
    demography: "",
    status: "",
    genres: [],
  });
  const handlePushGenres = (e: string) => {
    console.log(e);
    //se usa set para que nose repitan los generos
    setData({ ...data, genres: [...new Set([...data?.genres!, e])] });
    setFilters(data);
  };

  useEffect(() => {
    setFilters(data);

    const fetchItems = async () => {
      //if (!loading) setLoading(true);
      // setLoading(true);
      const items = await search(data);

      setLoading(false);
      setItems(items.data.result);
      setCount(items.data.count);
    };

    fetchItems();
  }, [data.type, data.demography, data.status, data.genres]);

  return (
    <>
      <h5> Tipo </h5>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={tipos}
        classNamePrefix="select"
        defaultValue={tipos[0]}
        styles={selectStyles}
        onChange={(value: any) => setData({ ...data, type: value.label })}
      />

      <h5 className="mt-4">Demografia</h5>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={demografia}
        classNamePrefix="select"
        styles={selectStyles}
        onChange={(value: any) => setData({ ...data, demography: value.label })}
      />

      <h5 className="mt-4">Estado</h5>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={estado}
        classNamePrefix="select"
        styles={selectStyles}
        onChange={(value: any) => setData({ ...data, status: value.label })}
      />
      <div className="accordion mt-4" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button bg-dark text-white fw-semibold z-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-controls="collapseOne"
            >
              Generos
              <FaChevronDown className="ms-auto" />
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse txt-primary"
            aria-labelledby="favorites-filter"
          >
            <div className="accordion-body bg-dark text-white">
              {generos.map((genero) => (
                <div key={genero.value} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={genero.label}
                    name="genero"
                    // cuando se marca se agrega el genero al array de generos si se desmarca se elimina
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePushGenres(e.target.value);
                      } else {
                        setData({
                          ...data,
                          genres: data?.genres?.filter(
                            (item) => item !== e.target.value
                          ),
                        });
                      }
                    }}

                    // onChange={(e) => handlePushGenres(e.target.value)}
                  />
                  <label className="form-check-label">{genero.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
