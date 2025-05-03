import styled from "styled-components";

export const EmployeeProfileWrapper = styled("div")(() => {
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
        },
        "& input, & select": {
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontWeight: "400",
        },
        "& label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000",
            marginBlockEnd: "calc(var(--sectionMargin)/2)"
        },
        "& .details": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--cardPadding) / 4)",
            "& .detail-label, & .detail-field": {
                flex: 1,
                overflow: "hidden",
            },
        }
    };
});