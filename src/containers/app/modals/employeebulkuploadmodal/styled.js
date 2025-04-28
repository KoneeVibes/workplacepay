import styled from "styled-components";

export const EmployeeBulkUploadModalWrapper = styled("form")(() => {
    return {
        overflow: "hidden",
        backgroundColor: "#F5F5F5",
        padding: "var(--cardPadding)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--flexGap))",
        height: "-webkit-fill-available",
        "& legend": {
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "24px",
            textAlign: "center",
            marginBlock: "0 cal(var(--sectionMargin)/1.5)",
            paddingInline: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        "&  input": {
            padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
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
        "& .modal-header>p": {
            textAlign: "center",
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
            "& legend": {
                fontSize: "32px",
            },
        },
    }
});