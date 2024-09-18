import styled from "styled-components";

export const GetStartedWrapper = styled("div")(() => {
  return {
    // Newton and Awele, your CSS should go under here
    gap: 0,
    justifyContent: "space-between",
    ".first-section, .emailAddress-page": {
      flex: 1,
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
