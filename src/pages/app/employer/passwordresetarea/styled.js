import styled from "styled-components";

export const PasswordResetAreaWrapper = styled("div")(() => {
  return {
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    padding: "var(--cardPadding)",
    "& form": {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--flexGap))",
      "&  input": {
        padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
        outline: "none",
        border: "1px solid #4E57BB",
        backgroundColor: "transparent",
        borderRadius: "8px",
        fontWeight: "400",
      },
    },
  };
});
