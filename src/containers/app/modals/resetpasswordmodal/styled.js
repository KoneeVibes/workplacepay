import styled from "styled-components";

export const ResetPasswordModalWrapper = styled("div")(() => {
  return {
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    padding: "var(--cardPadding)",
    "& form": {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--flexGap))",
      "& legend": {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "24px",
        textAlign: "center",
        marginBlock: "0 cal(var(--sectionMargin)/1.5)",
        paddingInline: 0,
      },
      "&  input": {
        padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
        outline: "none",
        border: "1px solid #4E57BB",
        backgroundColor: "transparent",
        borderRadius: "8px",
        fontWeight: "400",
      },
      "@media screen and (min-width: 612px)": {
        "& legend": {
          fontSize: "32px",
        },
      },
    },
  };
});
