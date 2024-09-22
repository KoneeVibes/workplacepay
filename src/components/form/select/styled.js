import styled from "styled-components";

export const BaseSelect = styled("select")(() => {
    return {
        fontFamily: "Poppins",
        fontWeight: 100,
        fontSize: 24,
        lineHeight: "normal",
        padding: "calc(var(--cardPadding))",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "-webkit-fill-available",
    };
});