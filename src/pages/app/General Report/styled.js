import styled from "styled-components";

export const GeneralReportWrapper = styled("div")(() => {
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
    "& .filter": {
      padding: "var(--cardPadding)",
      paddingBottom:"0",
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
  };
});
