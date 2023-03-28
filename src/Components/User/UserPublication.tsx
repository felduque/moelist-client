import React, { useState, useEffect, FormEvent } from "react";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import {
  demografia,
  tipos,
  generos,
  estado,
  scans,
  source,
  dias,
} from "@/utils/valoresParaSelects";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import { RiImageAddFill } from "react-icons/ri";
import { fileTypes, selectStyles } from "@/utils/helpers";
import { createAnime, updateAnime } from "@/utils/api/anime";
import { createManga, updateManga } from "@/utils/api/manga";
import { createManhua, updateManhua } from "@/utils/api/manhua";
import { createManhwa, updateManhwa } from "@/utils/api/manhwas";
import { validatePublication } from "@/utils/validations/ValidatePublication";
import { useAppContext } from "@/utils/state";
import {
  CreatePublicationParams,
  SelectOption,
  ValidatePublicationType,
} from "@/utils/types";
import styles from "@/styles/User.module.css";

const initFormState: CreatePublicationParams = {
  type: "",
  image: "",
  demography: "",
  status: "",
  title: "",
  source: "",
  chapters: 0,
  volumes: 0,
  premiered: new Date(),
  duration: "",
  season: "",
  studios: [],
  author: "",
  artist: "",
  description: "",
  producers: [],
  genres: [],
  scans: 0,
  day: "",
  urlContent: "",
};

export const UserPublication = () => {
  const [productoras, setProductoras] = useState<SelectOption[]>([]);
  const [genresView, setGenresView] = useState<SelectOption[]>([]);
  const [estudioView, setEstudioView] = useState<SelectOption[]>([]);
  const [authorsView, setAuthorsView] = useState<SelectOption[]>([]);
  const [artistsView, setArtistsView] = useState<SelectOption[]>([]);
  const [id, setId] = useState();
  const { user } = useAppContext();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidatePublicationType>();
  const [preview, setPreview] = useState<string>();
  const [data, setData] = useState<CreatePublicationParams>(initFormState);

  const handleImage = (image: File) => {
    const reader = new FileReader();

    setData({ ...data, image });
    reader.onloadend = () => {
      setPreview(reader.result?.toString());
    };

    reader.readAsDataURL(image);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(validatePublication(data));
  };

  const handlePush = (datos: any, type: string) => {
    if (data.producers?.length != productoras.length) {
      setProductoras([]);
      setData({ ...data, producers: [] });
    }
    if (data.genres?.length != genresView.length) {
      setGenresView([]);
      setData({ ...data, genres: [] });
    }

    if (data.studios?.length != estudioView.length) {
      setEstudioView([]);
      setData({ ...data, studios: [] });
    }

    if (data.author?.length != authorsView.length) {
      setAuthorsView([]);
      setData({ ...data, author: [] });
    }

    if (data.artist?.length != artistsView.length) {
      setArtistsView([]);
      setData({ ...data, artist: [] });
    }

    if (type === "author") {
      setAuthorsView(datos);
    }

    if (type === "artist") {
      setArtistsView(datos);
    }

    if (type === "producers") {
      setProductoras(datos);
    }

    if (type === "genres") {
      setGenresView(datos);
    }

    if (type === "studios") {
      setEstudioView(datos);
    }

    const arrProperty = data[type as keyof CreatePublicationParams];

    datos.forEach((element: SelectOption) => {
      if (Array.isArray(arrProperty)) {
        if (arrProperty.length > 0) {
          setData({
            ...data,
            [type]: [...new Set([...arrProperty, element.label])],
          });
        } else if (arrProperty.length === 0) {
          setData({ ...data, [type]: [element.label] });
        }
      }
    });
  };

  const savePublication = () => {
    if (data.type === "Anime") {
      const newData: CreatePublicationParams = {
        type: "Tv", // ✔️
        demography: data.demography, // ✔️
        status: data.status, // ✔️
        title: data.title, // ✔️
        source: data.source, // ✔️
        episodes: data.chapters, // ✔️
        premiered: data.premiered, // ✔️
        duration: data.duration, // ✔️
        season: data.season, // ✔️
        studios: data.studios, // ✔️
        author: data.author, // ✔️
        artist: data.artist, // ✔️
        description: data.description, // ✔️
        producers: data.producers, // ✔️
        genres: data.genres, // ✔️
        scanId: data.scans, // ✔️
        authorId: user?.id, // ✔️
        day: data.day, // ✔️
        urlContent: data.urlContent, // ✔️
      };
      createAnime(newData)
        .then((res) => {
          const id = parseInt(res?.data?.id);
          const images = {
            image: data.image,
          };
          console.log(data.image, id);
          updateAnime(id, images.image!);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const newData = {
        status: data.status, // ✔️
        title: data.title, // ✔️
        demography: data.demography, // ✔️
        description: data.description,
        source: data.source, // ✔️
        day: data.day, // ✔️
        volumes: data.volumes, // ✔️
        chapters: data.chapters, // ✔️
        genres: data.genres, // ✔️
        urlContent: data.urlContent, // ✔️
        scanId: data.scans, // ✔️
        authorId: user?.id, // ✔️
        authors: data.author, // ✔️
        artists: data.artist, // ✔️
        //premiered: data.estreno, // ❌
        //demography: data.demografia, // ❌
        // duration: data.duracion,  // ❌
        // season: data.temporada, // ❌
        //studios: data.estudio, // ❌
      };

      switch (data.type) {
        case "Manga":
          createManga(newData)
            .then((res) => {
              const id = parseInt(res?.data?.id);
              const images = {
                image: data.image,
              };
              updateManga(id, images.image!);
            })
            .catch((err) => {
              console.log(err);
            });
          break;

        case "Mahua":
          createManhua(newData)
            .then((res) => {
              const id = parseInt(res?.data?.id);
              const images = {
                image: data.image,
              };
              updateManhua(id, images.image!);
            })
            .catch((err) => {
              console.log(err);
            });

          break;

        case "Manhwa":
          createManhwa(newData)
            .then((res) => {
              const id = parseInt(res?.data?.id);
              const images = {
                image: data.image,
              };
              updateManhwa(id, images.image!);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
          break;
      }
    }
  };

  const handleChange = (option: any) => {
    const { value, label } = option.option;
    const isArr = Array.isArray(option.option);
    console.log(label);
    setData({
      ...data,
      [option.type]: isArr ? value : label,
    });
  };

  const resetForm = () => {
    setData(initFormState);
    setPreview(undefined);
  };

  useEffect(() => {
    if (data.type !== "Anime") {
      setData({ ...data, author: [], artist: [] });
      setErrors((currentErrors) => {
        const copy = { ...currentErrors };

        delete copy["source"];
        delete copy["duracion"];
        delete copy["estreno"];
        delete copy["temporada"];
        delete copy["estudio"];
        delete copy["producers"];

        return copy;

        /*Remueve los errores relacionados a anime*/
      });
    } else {
      setData({ ...data, author: "", artist: "" });
    } /*se cambio el tipo de dato del valor de acuerdo al tipo seleccionado para que la validacion lo procese correctamente*/
  }, [data.type]);

  /*se ejecuta este codigo cuando uno le da a publicar */
  useEffect(() => {
    console.log(errors, submitting);

    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        Swal.fire({
          icon: "error",
          title: "hay campos invalidos",
          timer: 1500,
        });
      } else {
        savePublication();
        Swal.fire({
          icon: "success",
          title: `${data.type} Publicado`,
        });
        //resetForm();
      }

      setSubmitting(false);
    }
  }, [JSON.stringify(errors), submitting]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="fw-bold">Publicacion </h1>
      <div className="col mb-4">
        <label className="mb-2" htmlFor="">
          Imagen
        </label>
        <FileUploader
          multiple={false}
          classes={styles.drop_zone}
          // maxSize={1}
          handleChange={(file: File) => handleImage(file)}
          children={
            <>
              {preview ? (
                <img src={preview} />
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
        {errors?.image && (
          <span className="text-danger mt-2 d-block">{errors?.image}</span>
        )}
      </div>

      <div className={`row ${styles.fields_container}`}>
        <div className="col-12">
          <label htmlFor="">Titulo</label>
          <input
            type="text"
            name="title"
            className="form-control bg-dark text-white"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          {errors?.titulo && (
            <span className="text-danger mt-2 d-block">{errors?.titulo}</span>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Tipo</label>
          <Select
            placeholder="Seleccione un tipo"
            options={tipos}
            styles={selectStyles}
            onChange={(option) => handleChange({ option, type: "type" })}
            classNamePrefix="select"
          />
          {errors?.tipo && (
            <span className="text-danger mt-2 d-block">{errors.tipo}</span>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Demografia</label>
          <Select
            placeholder="Seleccione una demografia"
            options={demografia}
            styles={selectStyles}
            onChange={(option) => handleChange({ option, type: "demography" })}
            classNamePrefix="select"
          />
          {errors?.demografia && (
            <span className="text-danger mt-2 d-block">
              {errors?.demografia}
            </span>
          )}
        </div>

        {data.type !== "Anime" ? (
          <div className="col-12 col-md-6 col-lg-4">
            <label htmlFor="">Artistas</label>
            <Creatable
              name="artista"
              placeholder="Escriba los Artistas"
              isMulti
              value={artistsView}
              styles={selectStyles}
              classNamePrefix="select"
              onChange={(val) => handlePush(val, "artist")}
            />
            {errors?.artista && (
              <span className="text-danger mt-2 d-block">
                {errors?.artista}
              </span>
            )}
          </div>
        ) : null}

        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Estado de la Obra</label>
          <Select
            placeholder="Seleccione un estado"
            options={estado}
            styles={selectStyles}
            classNamePrefix="select"
            onChange={(option) => handleChange({ option, type: "status" })}
          />
          {errors?.estado && (
            <span className="text-danger mt-2 d-block">{errors?.estado}</span>
          )}
        </div>

        {data.type === "Anime" && (
          <>
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="">Source</label>
              <Select
                placeholder="Seleccione un Source"
                name="source"
                options={source}
                styles={selectStyles}
                classNamePrefix="select"
                onChange={(option) => handleChange({ option, type: "source" })}
              />
              {errors?.source && (
                <span className="text-danger mt-2 d-block">
                  {errors.source}
                </span>
              )}
            </div>
          </>
        )}

        <div className="col-12 col-md-6 col-lg-4">
          {data.type === "Anime" ? (
            <label htmlFor="">Capitulos</label>
          ) : (
            <label htmlFor="">Chapters</label>
          )}
          <input
            type="number"
            value={data.chapters}
            className="form-control bg-dark text-white"
            onChange={(e) =>
              setData({ ...data, chapters: parseInt(e.target.value) })
            }
          />
          {errors?.capitulos && (
            <span className="text-danger mt-2 d-block">{errors.capitulos}</span>
          )}
        </div>

        {/* Si Manga, Manhua o Manhwa existe muestra volumes */}
        {data.type !== "Anime" ? (
          <div className="col-12 col-md-6 col-lg-4">
            <label htmlFor="">Volumenes</label>
            <input
              type="number"
              value={data.volumes}
              className="form-control bg-dark text-white"
              onChange={(e) =>
                setData({ ...data, volumes: parseInt(e.target.value) })
              }
            />
            {errors?.volumenes && (
              <span className="text-danger mt-2 d-block">
                {errors?.volumenes}
              </span>
            )}
          </div>
        ) : null}

        {data.type === "Anime" && (
          <>
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="">Estreno</label>
              <DatePicker
                name="estreno"
                placeholderText="Ingrese una fecha"
                selected={data.premiered}
                className="form-control bg-dark text-white"
                onChange={(date) => {
                  setData({
                    ...data,
                    premiered: date,
                  });
                }}
              />

              {errors?.estreno && (
                <span className="text-danger mt-2 d-block">
                  {errors?.estreno}
                </span>
              )}
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="">Duración</label>
              <input
                type="text"
                className="form-control bg-dark text-white"
                onChange={(e) => setData({ ...data, duration: e.target.value })}
              />

              {errors?.duracion && (
                <span className="text-danger mt-2 d-block">
                  {errors?.duracion}
                </span>
              )}
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="">Temporada</label>
              <input
                type="text"
                className="form-control bg-dark text-white"
                onChange={(e) => setData({ ...data, season: e.target.value })}
              />
              {errors?.temporada && (
                <span className="text-danger mt-2 d-block">
                  {errors?.temporada}
                </span>
              )}
            </div>
          </>
        )}

        {data.type === "Anime" && (
          <>
            <div className="col-12 col-md-6 col-lg-4">
              <label htmlFor="">Estudio</label>
              <Creatable
                placeholder="Seleccione un estudio"
                isMulti
                value={estudioView}
                styles={selectStyles}
                onChange={(val) => handlePush(val, "studios")}
                classNamePrefix="select"
              />

              {errors?.estudio && (
                <span className="text-danger mt-2 d-block">
                  {errors?.estudio}
                </span>
              )}
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label htmlFor="">Autor</label>
              <input
                type="text"
                value={data.author}
                className="form-control bg-dark text-white"
                onChange={(e) => setData({ ...data, author: e.target.value })}
              />
              {errors?.autor && (
                <span className="text-danger mt-2 d-block">{errors.autor}</span>
              )}
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label htmlFor="">Artista</label>
              <input
                type="text"
                value={data.artist}
                className="form-control bg-dark text-white"
                onChange={(e) => setData({ ...data, artist: e.target.value })}
              />
              {errors?.artista && (
                <span className="text-danger mt-2 d-block">
                  {errors?.artista}
                </span>
              )}
            </div>
          </>
        )}

        {data.type === "Anime" && (
          <div className="col-12 col-md-6 col-lg-4">
            <label htmlFor="">Productoras</label>
            <Creatable
              name="producers"
              placeholder="Introduzca las productoras"
              isMulti
              value={productoras}
              styles={selectStyles}
              classNamePrefix="select"
              onChange={(val) => handlePush(val, "producers")}
            />
            {errors?.producers && (
              <span className="text-danger mt-2 d-block">
                {errors?.producers}
              </span>
            )}
          </div>
        )}

        {data.type !== "Anime" ? (
          <div className="col-12 col-md-6 col-lg-4">
            <label htmlFor="">Autor(es)</label>
            <Creatable
              name="autor"
              placeholder="Escriba los Autor(es)"
              isMulti
              value={authorsView}
              styles={selectStyles}
              classNamePrefix="select"
              onChange={(val) => handlePush(val, "author")}
            />
            {errors?.autor && (
              <span className="text-danger mt-2 d-block">{errors.autor}</span>
            )}
          </div>
        ) : null}

        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Generos</label>
          <Select
            name="generos"
            placeholder="Seleccione generos"
            classNamePrefix="select"
            options={generos}
            isMulti
            styles={selectStyles}
            onChange={(val) => handlePush(val, "genres")}
          />
          {errors?.generos && (
            <span className="text-danger mt-2 d-block">{errors?.generos}</span>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Scans</label>
          <Select
            name="scans"
            placeholder="Seleccione scans"
            classNamePrefix="select"
            isMulti={false}
            options={scans}
            onChange={(val: any) =>
              setData({ ...data, scans: parseInt(val.value) })
            }
            styles={selectStyles}
          />
          {errors?.scans && (
            <span className="text-danger mt-2 d-block">{errors?.scans}</span>
          )}
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Url Para ver el contenido</label>
          <input
            type="text"
            className="form-control bg-dark text-white"
            placeholder="ejemplo: https://animefenix.tv/revenger"
            onChange={(e) => setData({ ...data, urlContent: e.target.value })}
          />
          {errors?.urlContent && (
            <span className="text-danger mt-2 d-block">
              {errors?.urlContent}
            </span>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <label htmlFor="">Dia de la semana que sale capitulo</label>
          <Select
            name="dia"
            placeholder="Seleccione dia"
            classNamePrefix="select"
            isMulti={false}
            options={dias}
            onChange={(option) => handleChange({ option, type: "day" })}
            styles={selectStyles}
          />
          {errors?.day && (
            <span className="text-danger mt-2 d-block">{errors?.day}</span>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="">Sinopsis</label>
          <textarea
            className="form-control bg-dark text-white"
            name=""
            id=""
            cols={30}
            rows={10}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
          {errors?.sinopsis && (
            <span className="text-danger mt-2 d-block">{errors?.sinopsis}</span>
          )}
        </div>
      </div>

      <div className="col-12 mt-4">
        <button
          className="btn btn-primary w-25 d-flex justify-content-center gap-3"
          type="submit"
          disabled={submitting && true}
        >
          Publicar
          {submitting && (
            <div
              className="spinner-border"
              role="status"
              style={{ width: "22px", height: "22px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};
