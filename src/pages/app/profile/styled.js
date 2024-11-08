import styled from "styled-components";

export const ProfileWrapper = styled("div")(() => {
    return {
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
        overflow: "hidden",
        "p": {
            flex: 1,
            color: "#808080",
        },
        "h2": {
            flex: 1,
        }
    };
});