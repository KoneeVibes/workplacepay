import styled from "styled-components";

export const BaseButton = styled.button(({ width, backgroundcolor }) => {
  return {
    //styles for button should begin below this line.
    textAlign: "center",
    backgroundColor: backgroundcolor || "#8A90DC",
    border: "none",
    color: "white",
    borderRadius: "7px",
    width: "9rem",
    padding: "1rem",
    fontSize: "1rem",
    cursor: "pointer",
  };
});
