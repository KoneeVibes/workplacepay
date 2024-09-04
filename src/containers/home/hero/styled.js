import styled from "styled-components";


export const HeroWrapper = styled("div")(() => {
  return {
    // Newton, your CSS styling should begin below this line
    ".container":{
      margin: "calc(var(--sectionMargin)) var(--pagePadding)",
    },
    ".hero": {
      textAlign: "center",
      width: "68%",
      margin: "auto",
    },

    p: {
      maxWidth: "77%",
      margin: "auto",
      marginBottom: "2rem",
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
