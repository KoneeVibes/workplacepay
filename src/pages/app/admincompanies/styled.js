import styled from "styled-components";

export const AdmincompaniesWrapper = styled("div")(() => {
  return {
    "& .heading-row": {
      padding: "calc(var(--cardPadding)/2)",
      //   marginBlockEnd: "var(--sectionMargin)",
    },
    "& span": {
      fontFamily: "inter",
      fontSize: "1.5rem",
      fontWeight: "400",
      lineHeight: "30px",
      textAlign: "left",
    },
    "& H2": {
      fontSize: "2rem",
      fontWeight: "600",
      lineHeight: "30px",
      textAlign: "left",
    },
    "& .section2": {
      marginTop: "5rem",
    },
    "& .span2": {
      color: "#808080",
    },
  };
});
