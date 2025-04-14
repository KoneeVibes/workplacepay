import styled from "styled-components";
import { Row } from "../../../components/flex/styled";
import { useContext } from "react";
import { Context } from "../../../context";

export const FooterWrapper = styled(Row)(() => {
  const { isMenuOpen } = useContext(Context);
  return {
    position: "relative",
    top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
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
      padding: "var(--cardPadding) 0 calc(var(--cardPadding) * 2)",
      gap: "calc(var(--flexGap)/3)",
    },

    ".site-map": {
      flex: 1,
      padding: "var(--cardPadding) 0 calc(var(--cardPadding) * 2)",
      gap: "0",
    },

    ".contact": {
      flex: 1,
      padding: "var(--cardPadding) 0 calc(var(--cardPadding) * 2)",
      gap: "0",
    },

    ".emailInput": {
      padding: "10px",
    },

    "@media screen and (max-width: 1024px)": {
      flexDirection: "column",
      gap: "calc(var(--flexGap))",
      ".footer-form": {
        padding: "var(--cardPadding) 0 0",
      },

      ".site-map": {
        padding: "0 0",
      },

      ".contact": {
        padding: "0 0 var(--cardPadding)",
      },
    },
  }
});
