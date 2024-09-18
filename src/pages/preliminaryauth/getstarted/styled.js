import styled from "styled-components";

export const GetStartedWrapper = styled("div")(() => {
  return {
    // Newton and Awele, your CSS should go under here
    gap: 0,
    justifyContent: "space-between",
    ".first-section, .emailAddress-page": {
      flex: 1,
    },
    "& .emailAddress-page": {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: "calc(var(--cardPadding) * 2)",
    },
    "& form": {
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--flexGap) * 2)",
      marginBlock: "calc(var(--sectionMargin) * 2)",
    },
    "& .emailAddress-page fieldset": {
      flex: 1,
      overflow: "hidden",
      display: "flex",
      gap: "calc(var(--flexGap)/8)",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& .emailAddress-page label": {
      fontFamily: "Poppins",
      fontWeight: 500,
      color: "#000000",
    },
    "& .emailAddress-page input, & .form-container select": {
      padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
      outline: "none",
      border: "none",
      backgroundColor: "#F2F2F8",
      borderRadius: "8px",
    },

    ".first-section": {
      padding: "calc(var(--cardPadding) * 2) calc(var(--cardPadding) * 4)",
      backgroundColor: "#4E57BB",
      color: "white",
    },

    ".first-section>svg": {
      width: "100%",
      height: "auto",
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
