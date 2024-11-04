import styled from "styled-components";

export const AdmincompaniesWrapper = styled("div")(() => {
  return {
    backgroundColor: "#FFFFFF",
    "& .heading-row": {
      padding: "var(--cardPadding)",
      marginBlockEnd: "var(--sectionMargin)",
      "& span": {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: 18,
        color: "#000000",
      },
    },
  };
});
