import styled from "styled-components";

export const BaseButton = styled.button(
    ({ width, backgroundColor }) => {
        return {
            //styles for button should begin below this line.
            textAlign: "center",
            backgroundColor: backgroundColor || "#8A90DC",
            border: "none",
            color: "white",
            borderRadius: "7px",
            width: width || "100%",
            padding: "1rem",
            fontSize: "1rem",
            cursor: "pointer",
        }
    }
)