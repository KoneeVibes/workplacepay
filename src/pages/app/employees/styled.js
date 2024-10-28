import styled from "styled-components";

export const EmployeesWrapper = styled("div")(() => {
  return {
    "& select": {
      padding: "calc(var(--cardPadding)/2.7)",
      borderRadius: "10px",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& .employeesWrapper": {
      backgroundColor: "#FFFFFF",
    },

    "& .employees-button-box": {
      overflow: "hidden",
    },
    "@media screen and (max-width: 500px)": {
      alignItems: "stretch",
      flexDirection: "column",
    },
    "& label": {
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "20",
      color: "#000000",
    },
    "& .row": {
      marginBottom: "3rem",
    },
    "& .employeesList": {
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "20",
      color: "#000000",
    },
    "& .filter": {
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "& select": {
        padding: "calc(var(--cardPadding)/2)",
        borderRadius: "10px",
      },
      "& fieldset": {
        flex: 1,
        overflow: "hidden",
      },
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .employees-table": {
      overflow: "auto",
    },
    "& th": {
      color: "#000000",
      minWidth: "200px",
    },
    "& td": {
      minWidth: "200px",
    },
  };
});
