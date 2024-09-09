import styled from "styled-components";

export const BaseInput = styled("input")(() => {
  return {
    padding: "calc(var(--cardPadding))",
    overflow: "hidden",
    textOverflow: "ellipsis",
      width: "-webkit-fill-available",
  };
});
