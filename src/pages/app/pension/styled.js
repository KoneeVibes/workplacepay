import styled from "styled-components";

export const PensionWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& select": {
      padding: "calc(var(--cardPadding)/4)",
      borderRadius: "10px",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& .filter": {
      padding: " var(--cardPadding)",
      justifyContent: "space-between",
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
    "& .payment-modal": {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFFFFF",
      padding: "calc(var(--cardPadding) * 2)",
      borderRadius: "1rem",
      boxShadow: "0px 20px 24px -4px #10182814",
    },
  };
});
