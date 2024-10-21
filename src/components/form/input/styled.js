import styled from "styled-components";

export const BaseInput = styled("input")(() => {
  return {
    fontFamily: "Poppins",
    fontWeight: 100,
    fontSize: 16,
    lineHeight: "normal",
    padding: "calc(var(--cardPadding))",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "-webkit-fill-available",
  };
});
