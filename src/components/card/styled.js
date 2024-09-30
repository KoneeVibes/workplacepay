import styled from "styled-components";

export const CardWrapper = styled("div")(({ width }) => {
    return {
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
        width: width || "-webkit-fill-available",
    }
})