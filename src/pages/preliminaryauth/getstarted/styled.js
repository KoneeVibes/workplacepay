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
    "& .first-section>svg": {
      width: "100%",
      height: "auto",
    },
    "& form": {
      paddingBottom: "calc(var(--cardPadding))",
    },
    "& form>fieldset": {
      overflow: "hidden",
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
      lineHeight: "6rem",
      display: "inline-block",
      width: "100%",
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
    "@media screen and (max-width: 1024px)": {
      "& h2": {
        marginBlock: 0,
      }
    },
  };
});
export const GetStartedWrapperRow = styled(Row)(() => {
  return {
    gap: 0,
    "@media screen and (max-width: 1280px)": {
      gap: "calc(var(--flexGap)/1)",
      flexDirection: "column",
    },
  };
});
