import styled from "styled-components";

export const LayoutWrapper = styled("div")(() => {
    return {

    }
})

export const MainAreaWrapper = styled("div")(() => {
    return {
        "@media screen and (min-width: 1024px)": {
            position: "absolute",
            left: "var(--sideNavWidth)",
            top: "var(--topNavHeight)",
            right: 0,
            bottom: 0,
        },
        padding: "var(--cardPadding)",
        backgroundColor: "#CCCCCC",
    }
})