import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const HeroWrapper = styled("div")(() => {
  return {
    // Newton, your CSS styling should begin below this line
    margin: "calc(var(--sectionMargin) * 3) 0",
    padding: "0 var(--pagePadding)",
    textAlign: "center",
    position: "relative",
    "@media screen and (max-width: 768px)": {
      textAlign: "left",
    }
  };
});

export const HeroButtonRow = styled(Row)(() => {
  return {
    justifyContent: "center",
    overflow: "hidden",
    "@media screen and (max-width: 425px)": {
      flexDirection: "column",
      gap: "calc(var(--flexGap)/2)",
      alignItems: "center",
    }
  }
})
