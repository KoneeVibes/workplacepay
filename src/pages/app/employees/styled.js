import styled from "styled-components";

export const EmployeesWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& select, & input": {
      padding: "calc(var(--cardPadding)/2)",
      borderRadius: "10px",
      border: "1px solid #000000",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& label": {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontSize: 20,
      color: "#000000",
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
      padding: "0 var(--cardPadding)",
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .employees-table": {
      overflow: "auto",
      "& tr:not(:last-of-type)": {
        borderBottom: "1px solid #000000",
      },
      "& .drop-down": {
        position: "absolute",
        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        paddingInlineStart: 0,
        listStyleType: "none",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.25rem",
        zIndex: 10,
        overflow: "hidden",
        "& li": {
          padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)/4)",
          "&:hover": {
            backgroundColor: "#4E57BB",
          },
        },
      },
    },
    "& th": {
      color: "#FFFFFF",
      background: "#4E57BB",
      minWidth: "200px",
    },
    "& th:not(:last-of-type)": {
      width: "90%",
      minWidth: "200px",
    },
    "& td": {
      minWidth: "200px",
    },
    "& td:last-of-type": {
      borderLeft: "1px solid #000000",
    },
  };
});
