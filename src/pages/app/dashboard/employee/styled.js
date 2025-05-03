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
      fontWeight: "400",
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
      minWidth: "150px",
      fontSize: "18px",
    },
    "& td": {
      minWidth: "200px",
      border: "none",
      borderLeft: "1px solid #000000",
    },
    "& td:first-of-type": {
      borderLeft: "none",
    },
    "& .reset-password-modal": {
      padding: "var(--cardPadding)",
      background: "#FFFFFF",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1rem",
      boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    "& .payslip-details-modal": {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFFFFF",
      borderRadius: "1rem",
      boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
      "@media screen and (max-width: 768px)": {
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        transform: "unset",
        borderRadius: "unset"
      }
    },
  };
});