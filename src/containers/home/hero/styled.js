import styled from "styled-components";


export const HeroWrapper = styled("div")(() => {
  return {
    // Newton, your CSS styling should begin below this line
    ".container": {
      textAlign: "center",
      width: "95%",
      margin: "auto",
    },

    p: {
      maxWidth: "77%",
      margin: "auto",
      marginBottom: "var(--sectionMargin)",
    },

    ".hero-button": {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      gap: "var(--flexGap)",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
