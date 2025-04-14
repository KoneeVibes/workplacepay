import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../context";

export const FeaturesWrapper = styled("div")(() => {
    const { isMenuOpen } = useContext(Context);
    return {
        position: "relative",
        top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
        // Jimmy, your CSS styling should begin below this line
        margin: "calc(var(--sectionMargin) * 2) 0",
        padding: "0 var(--pagePadding)",
        gap: "calc(var(--flexGap) * 2)",
        ".feature-img, .feature-text": {
            flex: 1,
        },
        ".feature-img>img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
        },
        ".feature-text>h3 ": {
            marginBlock: 0,
            fontWeight: 600,
        },
        ".feature-text": {
            gap: "calc(var(--flexGap)/2)",
            overflow: "hidden",
        },
        " ul": {
            lineHeight: "250%",
            color: "#7B7C80",
        },
        "@media screen and (min-width: 1024px)": {
            margin: "calc(var(--sectionMargin) * 3) 0",
            "h2": {
                textAlign: "center",
            },
        },
    };
});