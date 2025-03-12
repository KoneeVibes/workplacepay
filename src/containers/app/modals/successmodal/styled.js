import styled from "styled-components";

export const SuccessModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFFFFF",
        padding: "var(--cardPadding)",
        borderRadius: "1rem",
        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        "& .icon-box>svg": {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
        },
        "& .title-box>h1": {
            textAlign: "center"
        },
        "& .message-box>p": {
            textAlign: "center"
        }
    }
})