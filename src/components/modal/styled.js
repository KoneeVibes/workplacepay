import styled from "styled-components";

export const BaseModalWrapper = styled("div")(({ open, height, width }) => {
    return {
        display: open ? "block" : "none",
        zIndex: 1,
        overflowY: "auto",
        height: height || "50%",
        width: width || "50%",
    }
})