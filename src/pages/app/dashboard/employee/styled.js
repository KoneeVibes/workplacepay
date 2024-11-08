import styled from "styled-components";

export const EmployeeDashboardWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "h1": {
            padding: "calc(var(--cardPadding)/2)",
        },
        "h2": {
            padding: "calc(var(--cardPadding)/2)",
        },
        "& select": {
      padding: "calc(var(--cardPadding)/2)",
      borderRadius: "10px",
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
    "& .filter": {
      padding: "var(--cardPadding)",
      paddingBottom:"0",
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .table": {
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