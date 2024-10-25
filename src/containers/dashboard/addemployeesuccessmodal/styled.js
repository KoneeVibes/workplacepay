import styled from "styled-components";

export const AddEmployeeSuccessModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        ".payment-modal-title": {
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            "& h2": {
                fontFamily: "Inter",
                fontWeight: 800,
                fontSize: "32px",
                marginBlock: 0,
            },
            "button": {
                width: "auto",
                padding: "1rem",
            },
        }
    }
})