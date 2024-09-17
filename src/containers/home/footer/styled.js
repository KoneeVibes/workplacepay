import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const FooterWrapper = styled(Row)(() => {
  return {
    // Mirabel, your CSS styling should begin below this line
    margin: "calc(var(--sectionMargin) * 2) 0",
    padding: "0 var(--pagePadding)",
    backgroundColor: "#5F69DC",
    color: "white",
    gap: "calc(var(--flexGap)*6)",
    justifyContent: "space-between",

    ".footer-form": {
      flex: 1,
      overflow: "hidden",
      padding: "var(--cardPadding) 0",
    },

    ".site-map": {
      flex: 1,
      padding: "var(--cardPadding) 0",
    },

    ".contact": {
      flex: 1,
      padding: "var(--cardPadding) 0",
    },

    "@media screen and (max-width: 1024px)": {
      flexDirection: "column",
      gap: "calc(var(--flexGap))",
    },

    "@media screen and (max-width: 1280px)": {
      gap: "calc(var(--flexGap) * 3)",
    },
  };
});
