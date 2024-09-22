import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const GetStartedWrapper = styled(Row)(() => {
  return {
    // Newton and Awele, your CSS should go under here
    gap: 0,
    "& .first-section": {
      flex: 1,
      overflow: "hidden",
      padding: "calc(var(--cardPadding) * 2)",
      backgroundColor: "#4E57BB",
      color: "#FFFFFF",
    },
    ".first-section>svg": {
      width: "100%",
      height: "auto",
    },
    "& form": {
      display: "flex",
      flexDirection: "column",
      marginBlock: "calc(var(--sectionMargin) * 2)",
    },

    "& .emailAddress-page fieldset": {
      flex: 1,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& .emailAddress-page": {
      flex: 1,
      backgroundColor: "#FFFFFF",
      overflow: "hidden",
      padding: "calc(var(--cardPadding) * 2)",
    },

    "& .emailAddress-page label": {
      fontFamily: "Poppins",
      fontWeight: 500,
      color: "#000000",
    },
    "& input ": {
      padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
    },
    "@media screen and (max-width: 425px)": {
      "& .first-section": {
        padding: "calc(var(--cardPadding))",
      },
      "& .emailAddress-page": {
        padding: "calc(var(--cardPadding))",
      },
    },
    "@media screen and (max-width: 768px)": {
      "& form": {
        alignItems: "stretch",
      },
      "& .emailAddress-page input": {
        width: "100%",
      },
      "& .emailAddress-page button": {
        width: "100%",
      },
      "& .emailAddress-page": {
        display: "flex",
        flexDirection: "column", // Ensure vertical stacking
      },
    },
    "@media screen and (max-width: 1024px)": {
      "& h2": {
        marginBlock: 0,
      },
      "& form": {
        gap: "var(--flexGap)",
      },
    },
    "@media screen and (min-width: 1440px)": {
      "& .emailAddress-page button": {
        marginTop: "calc(var(--sectionMargin))",
        width: "fit-content",
      },
    },
  };
});
export const GetStartedWrapperRow = styled(Row)(() => {
  return {
    "@media screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  };
});
