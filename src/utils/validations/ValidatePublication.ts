import { CreatePublicationParams, ValidatePublicationType } from "../types";

export const validatePublication = (values: CreatePublicationParams) => {
  let errors: ValidatePublicationType = {};
  const requerido = "Este campo es requirido";

  if (!values.title) {
    errors.titulo = requerido;
  }

  if (!values.demography) {
    errors.demografia = requerido;
  }

  if (!values.type) {
    errors.tipo = requerido;
  }

  if (!values.image) {
    errors.image = requerido;
  }

  if (values?.chapters! <= 0) {
    errors.capitulos = "Agrega un valor valido";
  }

  if (values?.volumes! <= 0 && values.type !== "Anime") {
    errors.volumenes = requerido;
  }

  if (!values.premiered && values.type === "Anime") {
    errors.estreno = requerido;
  }

  if (!values.source && values.type === "Anime") {
    errors.source = requerido;
  }

  if (!values.duration?.trim() && values.type === "Anime") {
    errors.duracion = requerido;
  }

  if (!values.season?.trim() && values.type === "Anime") {
    errors.temporada = requerido;
  }

  if (values.type !== "Anime") {
    if (values.artist?.length === 0) {
      errors.artista = requerido;
    }

    if (values.author?.length === 0) {
      errors.autor = requerido;
    }
  }

  if (
    values.type === "Anime" &&
    typeof values.author == "string" &&
    !values.author?.trim()
  ) {
    errors.autor = requerido;
  }

  if (
    typeof values.artist == "string" &&
    !values.artist?.trim() &&
    values.type === "Anime"
  ) {
    errors.artista = requerido;
  }

  if (!values.status) {
    errors.estado = requerido;
  }

  if (values.studios?.length === 0 && values.type === "Anime") {
    errors.estudio = requerido;
  }

  if (values.producers?.length === 0 && values.type === "Anime") {
    errors.producers = "Debe tener al menos una productora";
  }

  if (values.genres?.length === 0) {
    errors.generos = "Debe tener al menos un genero";
  }

  if (!values.scans) {
    errors.scans = "Seleccione un scan";
  }

  if (!values.day) {
    errors.day = requerido;
  }

  if (!values.description?.trim()) {
    errors.sinopsis = requerido;
  }

  if (!values.urlContent?.trim()) {
    errors.urlContent = requerido;
  }

  return errors;
};
