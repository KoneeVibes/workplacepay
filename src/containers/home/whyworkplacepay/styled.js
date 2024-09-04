import styled from "styled-components";

export const WhyWorkPlacePayWrapper = styled("div")(() => {
  return {
    // Ibukun, your CSS styling should begin below this line
    ".container":{
      margin:"calc(var(--sectionMargin)) var(--pagePadding)",
    },
    ".second-hero": {
      textAlign: "left",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      width: "60%",
      margin: "0 auto",
      marginTop: "calc(var(--sectionMargin)*2)",
    },
    ".second-hero-text-section": {
      width: "40%",
    },
    h4: {
      fontSize: "2rem",
      fontWeight: "800",
      margin: "0",
      padding: "0",
    },
    ".hero-paragraph": {
      color: "grey",
      fontSize: "1.5rem",
      fontWeight: "400",
      padding: "0",
      marginTop: "var(--sectionMargin)",
      marginBottom: "calc(var(--sectionMargin)/3)",
    },
    ".second-hero-paragraph": {
      fontSize: ".9rem",
      padding: "0",
      marginTop: "0",
      marginBottom: "calc(var(--sectionMargin)/3)",
    },
    img: {
      width: "52%",
    },
  };
});
