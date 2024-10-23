import styled from "styled-components";

export const BaseArea = styled("textArea")(() => {
  return {
    fontFamily: "Poppins",
    fontWeight: 100,
    fontSize: 16,
    lineHeight: "normal",
    padding: "calc(var(--cardPadding))",
    overflow: "hidden",
    outline: "none",
    border: "none",
    backgroundColor: "#F2F2F8",
    borderRadius: "8px",
    textOverflow: "ellipsis",
    width: "-webkit-fill-available",
  };
});
