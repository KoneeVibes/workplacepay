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
        },
        "& .reset-password-modal": {
            padding: "var(--cardPadding)",
            background: "#FFFFFF",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        }
    };
});