import styled from "styled-components";

export const ManageEmployeePayslipModalWrapper = styled("form")(() => {
    return {
        overflow: "hidden",
        backgroundColor: "#F5F5F5",
        padding: "var(--cardPadding)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--flexGap))",
        height: "-webkit-fill-available",
        "&  input, & select": {
            padding: "calc(var(--cardPadding)/4)",
            outline: "none",
            border: "1px solid #4E57BB",
            backgroundColor: "transparent",
            borderRadius: "8px",
            fontWeight: "400",
        },
        "& fieldset": {
            flex: 1,
            overflow: "hidden",
        },
        "& .submit-button-area": {
            overflow: "hidden",
        },
        "& .close-modal-button-area": {
            overflow: "hidden",
            "& .close-modal-button": {
                width: "fit-content",
            },
            "@media screen and (min-width: 768px)": {
                display: "none",
            }
        },
        "@media screen and (min-width: 768px)": {
            height: "auto",
        },
    }
});