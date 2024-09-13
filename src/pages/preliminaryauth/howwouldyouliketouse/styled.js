import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const HowWouldYouLikeToUseWrapper = styled(Row)(() => {
  return {
    // Mirabel, your CSS should go under here
    gap: 0,
    justifyContent: "space-between",
    ".image-page, .basebutton-page": {
      flex: 1,
    },

    ".image-page": {
      padding: "calc(var(--cardPadding) * 2) calc(var(--cardPadding) * 4)",
      backgroundColor: "#4E57BB",
      color: "white",
    },

    ".image-page>svg": {
      width: "100%",
    },

    ".basebutton-page": {
      padding: "calc(var(--cardPadding) * 2) calc(var(--cardPadding) * 4)",
      margintop: "calc(var(--sectionMargin) ) ",
    }, 

    ".basebutton": {
      gap: "calc(var(--flexGap) * 4)",
    },
  };
});
