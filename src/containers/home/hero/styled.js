import styled from "styled-components";
import { BaseButton } from "../../../components/buttons";

export const HeroWrapper = styled("div")(() => {
    return {
        // Newton, your CSS styling should begin below this line
        ".container": {
            textAlign: "center",
        },

        "p": {
            maxWidth: "85ch",
            margin: "auto",
            marginBottom: "2rem"
        },

        ".hero-button": {
            display: "flex",
            width: "30%",
            gap: "3rem",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
        },
    }
})
