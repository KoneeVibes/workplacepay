import styled from "styled-components";

export const GeneralReportWrapper = styled("div")(() => {
  return {
    borderRadius: "1rem",
    backgroundColor: "#FFFFFF",
    "& select": {
      padding: "calc(var(--cardPadding)/4)",
      borderRadius: "10px",
      fontWeight: "400",
    },
    "& fieldset": {
      flex: 1,
      overflow: "hidden",
    },
    "& .filter": {
      gap: "calc(var(--flexGap)/4)",
      padding: "var(--cardPadding)",
      paddingBottom: "0",
      justifyContent: "space-between",
      marginBlockEnd: "var(--sectionMargin)",
      "@media screen and (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    "& .general-report-table": {
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
      "& .payment-form": {
        alignItems: "unset",
        justifyContent: "unset",
        padding: "unset"
      },
      "@media screen and (max-width: 425px)": {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: "unset",
        borderRadius: 0,
      }
    },
  };
});
