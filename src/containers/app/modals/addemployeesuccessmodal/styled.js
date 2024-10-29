import styled from "styled-components";

export const AddEmployeeSuccessModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        "& .confirmation-modal-title": {
            overflow: "hidden",
            "& h2": {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "32px",
                textAlign: "center",
                marginBlock: 0,
            },
        },
        "@media screen and (max-width: 1024px)": {
            "& .form-cta-row": {
                gap: "calc(var(--flexGap)/2) !important",
            }
        }
    }
})