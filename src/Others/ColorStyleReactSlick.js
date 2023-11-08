export const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "#ffffff",
      marginBottom: "4px",
      backgroundColor: isFocused ? "#018543" : "#01854338",
    };
  },
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "6px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#018543",
      borderRadius: "4px",
    },
  }),
};

export const colorStylesMulti = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "#ffffff",
      marginBottom: "4px",
      backgroundColor: isFocused ? "#018543" : "#01854338",
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#018543",
      color: "#ffffff",
    };
  },
  multiValueLabel: (styles, { data }) => {
    return {
      ...styles,
      color: "#ffffff",
    };
  },
  multiValueRemove: (styles, { data }) => {
    return {
      ...styles,
      color: "#ffffff",
      cursor: "pointer",
      ":hover": {
        color: "#e31e25",
      },
    };
  },
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#018543",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#018543",
      borderRadius: "4px",
    },
  }),
};
