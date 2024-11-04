import styled from "styled-components";

export const PensionWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& select": {
      padding: "calc(var(--cardPadding)/5)",
      borderRadius: "10px",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& .heading-row": {
      padding: "var(--cardPadding)",
      marginBlockEnd: "var(--sectionMargin)",
      "& span": {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: 18,
        color: "#000000",
      },
    },
    "& .filter": {
      padding: " var(--cardPadding)",
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .pension-table": {
      overflow: "auto",
    },
    "& th": {
      color: "#FFFFFF",
      background: "#4E57BB",
      minWidth: "200px",
    },
    "& td": {
      minWidth: "200px",
    },
  };
});
