import styled from "styled-components";

export const EmployeeDashboardWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& .title-heading": {
      padding: "calc(var(--cardPadding)) calc(var(--cardPadding)) 0",
      "& h1": {
        marginBlock: 0,
      },
      "& h2": {
        marginBlock: "2rem"
      }
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
      justifyContent: "space-between",
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