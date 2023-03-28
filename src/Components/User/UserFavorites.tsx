import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import Select, { ActionMeta, SingleValue } from "react-select";
import { FaChevronDown } from "react-icons/fa";

import { CardLoop } from "../CardLoop/CardLoop";
import { selectStyles } from "@/utils/helpers";
import { demografia, estado, generos, tipos } from "@/utils/valoresParaSelects";
import { Pagination } from "../Pagination/Pagination";
import { ContentType, FiltersType } from "@/utils/types";

const filtersInitState = {
  type: "",
  demography: "",
  genres: [],
  status: "",
};

export const UserFavorites = () => {
  const { favorites } = useContext(AuthContext);
  const [filteredFavs, setFilterFavs] = useState(favorites);
  const [filters, setFilters] = useState<FiltersType>({
    type: "",
    demography: "",
    genres: [],
    status: "",
  });
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 18;

  let totalPages = Math.ceil(totalItems / itemsPerPage);

  const filtrar = (pag = 0) => {
    const filtersConditions = {
      type: (item: ContentType) =>
        !filters.type ? true : filters.type == item.contentType,
      demography: (item: ContentType) =>
        !filters.demography
          ? true
          : filters.demography == item.demography.toLowerCase(),
      status: (item: ContentType) =>
        !filters.status
          ? true
          : filters.status == item.status?.toLowerCase() ||
            item.status == "Emision",
      genres: (item: ContentType) =>
        filters.genres?.length == 0
          ? true
          : filters.genres?.every((g: any) => item?.genres?.includes(g.label)),
    };

    const selectedT = [
      filtersConditions.type,
      filtersConditions.demography,
      filtersConditions.genres,
      filtersConditions.status,
    ];

    const result = favorites.filter((fav) => selectedT.every((f) => f(fav)));
    let paginated = result.slice(
      pag * itemsPerPage,
      pag * itemsPerPage + itemsPerPage
    );

    if (paginated.length === 0 && pag > 0) pag--;

    let from = pag * itemsPerPage;
    let to = pag * itemsPerPage + itemsPerPage;

    paginated = result.slice(from, to);

    setTotalItems(result.length);
    setFilterFavs(paginated);
    setCurrentPage(pag);
  };

  useEffect(() => {
    filtrar();
  }, [
    filters.type,
    filters.demography,
    filters.status,
    filters.genres?.length,
  ]);

  useEffect(() => {
    setFilterFavs(favorites);
    filtrar(currentPage);
  }, [favorites, currentPage]);

  const handleChange = (option: any) => {
    console.log(favorites);
    const { label } = option.val;
    const isArr = Array.isArray(option.val);
    console.log(label);
    setFilters({
      ...filters,
      [option.filter]: isArr ? option.val : label.toLowerCase(),
    });
  };

  return (
    <>
      <div className="row mb-4 align-items-center">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button bg-dark text-white fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-controls="collapseOne"
              >
                Favoritos Añadidos:
                <span className="ms-1 txt-primary"> {favorites.length}</span>
                <FaChevronDown className="ms-auto" />
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse txt-primary"
              aria-labelledby="favorites-filter"
            >
              <div className="accordion-body bg-dark text-white">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-3">
                    <label htmlFor="types">types</label>
                    <Select
                      className="mt-2"
                      id="types"
                      styles={selectStyles}
                      placeholder="Todos"
                      defaultValue={filters.type}
                      value={{ label: filters.type, value: filters.type }}
                      options={tipos}
                      onChange={(val) => handleChange({ val, filter: "type" })}
                      classNamePrefix="select"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-xl-3">
                    <label htmlFor="demography">demography</label>
                    <Select
                      className="mt-2"
                      id="demography"
                      styles={selectStyles}
                      placeholder="Todos"
                      value={{
                        label: filters.demography,
                        value: filters.demography,
                      }}
                      options={demografia}
                      onChange={(val) =>
                        handleChange({ val, filter: "demography" })
                      }
                      classNamePrefix="select"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-xl-3 mt-4 mt-xl-0">
                    <label htmlFor="status">status</label>
                    <Select
                      className="mt-2"
                      id="status"
                      styles={selectStyles}
                      onChange={(val) =>
                        handleChange({ val, filter: "status" })
                      }
                      value={{
                        label: filters.status,
                        value: filters.status,
                      }}
                      placeholder="Todos"
                      options={estado}
                      classNamePrefix="select"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-xl-3 mt-4 mt-xl-0">
                    <label htmlFor="genres">genres</label>
                    <Select
                      isMulti
                      className="mt-2"
                      id="genres"
                      styles={selectStyles}
                      placeholder="Todos"
                      options={generos}
                      value={filters.genres}
                      onChange={(val) =>
                        handleChange({ val, filter: "genres" })
                      }
                      classNamePrefix="select"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setFilters(filtersInitState)}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-9 d-flex justify-content-end gap-3"></div>
      </div>
      <CardLoop cards={filteredFavs} action="remove" />
      <Pagination
        pages={totalPages}
        onPageChange={filtrar}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        initialPage={currentPage}
      />
    </>
  );
};
