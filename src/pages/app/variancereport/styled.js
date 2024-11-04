import styled from "styled-components";

export const VarianceWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& select": {
      padding: "calc(var(--cardPadding)/2)",
      borderRadius: "10px",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& .heading": {
      padding: "var(--cardPadding)",
      paddingBottom: "0",
      marginBlockEnd: "var(--sectionMargin)",
      "& h3": {
        marginBlock: 0,
      },
    },
    "& .filter": {
      padding: "0 var(--cardPadding)",
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .variance-table": {
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
