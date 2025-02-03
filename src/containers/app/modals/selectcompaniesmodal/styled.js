import styled from "styled-components";

export const SelectCompaniesModalWrapper = styled("div")(() => {
  return {
    textAlign: "center",
    "& select": {
      padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    "& label": {
      fontSize: "2rem",
      fontFamily: "Poppins",
      fontWeight: 500,
      color: "#000000",
    },
  };
});
