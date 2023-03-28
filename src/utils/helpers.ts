import { ContentType } from "./types";
import { StylesConfig } from "react-select/dist/declarations/src/styles";

export const fileTypes = ["JPG", "PNG", "GIF", "WEBP", "AVIF", "JPEG"];

export const selectStyles: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#3b434",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "white",
      backgroundColor: "var(--dark-bg)",
      borderColor: "green",
      cursor: "pointer",
    };
  },
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles, color: "white" }),
};

export const findFavorite = (
  id: number,
  contentType: string,
  favorites: ContentType[]
) => {
  const favorite = favorites.find(
    (favorite) => favorite.id === id && favorite.contentType === contentType
  );

  if (favorite) return true;

  return false;
};
