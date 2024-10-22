import styled from "styled-components";

export const LayoutWrapper = styled("div")(() => {
    return {

    }
})

export const MainAreaWrapper = styled("div")(() => {
    return {
        padding: "var(--cardPadding)",
        backgroundColor: "#CCCCCC",
        overflow: "hidden",
        "@media screen and (min-width: 1024px)": {
            position: "absolute",
            left: "var(--sideNavWidth)",
            top: "var(--topNavHeight)",
            right: 0,
            bottom: 0,
            height: "max-content",
        },
    }
})