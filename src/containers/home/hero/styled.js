import styled from "styled-components";
import { BaseButton } from "../../../components/buttons";

export const HeroWrapper = styled("div")(() => {
  return {
    // Newton, your CSS styling should begin below this line
    ".container": {
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
      gap: "2rem",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
