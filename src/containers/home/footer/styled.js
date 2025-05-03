import styled from "styled-components";
import { Column } from "../../../components/flex/styled";
import { useContext } from "react";
import { Context } from "../../../context";

export const FooterWrapper = styled(Column)(() => {
  const { isMenuOpen } = useContext(Context);
  return {
    position: "relative",
    top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
    // Mirabel, your CSS styling should begin below this line
    margin: "calc(var(--sectionMargin) * 2) 0",
    padding: "0 var(--pagePadding)",
    backgroundColor: "#5F69DC",
    color: "white",
    gap: 0,

    "& .top-row": {
      gap: "calc(var(--flexGap)*3)",
      justifyContent: "space-between",
    },

    "& .bottom-row": {
      padding: "0 0 calc(var(--pagePadding)/2) 0",
      justifyContent: "space-between",
    },

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
      "& a": {
        textDecoration: "none",
        color: "white",
      }
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
      "& .top-row": {
        flexDirection: "column",
        gap: "calc(var(--flexGap))",
      },
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
    "@media screen and (max-width: 768px)": {
      "& .bottom-row": {
        flexDirection: "column",
        gap: "0",
      },


    }
  }
});
