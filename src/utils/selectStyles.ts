import { StylesConfig } from "react-select";


export const selectStyles:StylesConfig = {
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