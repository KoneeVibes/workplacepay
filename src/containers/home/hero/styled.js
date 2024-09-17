import styled from "styled-components";
import { Row } from "../../../components/flex/styled";
import { useContext } from "react";
import { Context } from "../../../context/index";

export const HeroWrapper = styled("div")(() => {
  const { isMenuOpen } = useContext(Context);
  return {
    // Newton, your CSS styling should begin below this line
    margin: "calc(var(--sectionMargin) * 2) 0",
    padding: "0 var(--pagePadding)",
    textAlign: "center",
    position: "relative",
    top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
    "@media screen and (max-width: 768px)": {
      textAlign: "left",
    },
    "@media screen and (min-width: 1024px)": {
      margin: "calc(var(--sectionMargin) * 3) 0",
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
