import styled from "styled-components";

export const BaseButton = styled.button(({ width, backgroundcolor }) => {
  return {
    //styles for button should begin below this line.
    textAlign: "center",
    backgroundColor: backgroundcolor || "#8A90DC",
    border: "none",
    color: "white",
    borderRadius: "8px",
    width: width || "-webkit-fill-available",
    padding: "calc(var(--cardPadding)/2) var(--cardPadding)",
    fontSize: "1rem",
    cursor: "pointer",
    "@media screen and (max-width: 425px)": {
      width: "-webkit-fill-available",
    },
  };
});
