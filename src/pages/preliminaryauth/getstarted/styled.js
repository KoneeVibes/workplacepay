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
      padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
      fontWeight: 400,
    },
    "& .get-started-modal": {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFFFFF",
      padding: "var(--cardPadding)",
      borderRadius: "1rem",
      boxShadow: "0px 20px 24px -4px #10182814",
    },
    "& .logo-box-area": {
      marginBlockEnd: "calc(var(--cardPadding)/1)",
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
      },
      "& .logo-box-area": {
        maxWidth: "50%",
        marginBlockEnd: 0,
        "& svg": {
          width: "100%",
          height: "auto",
        }
      }
    },
  };
});
export const GetStartedWrapperRow = styled(Row)(({ step }) => {
  return {
    gap: (step === 1) ? "calc(var(--flexGap)/4)" : "calc(var(--flexGap)/1)",
    flexDirection: (step === 2) && "column",
    "& button>span": {
      whiteSpace: "nowrap",
    },
    "@media screen and (max-width: 1280px)": {
      gap: "calc(var(--flexGap)/1)",
      flexDirection: "column",
      "& button>span": {
        whiteSpace: "normal",
      },
    }
  };
});
