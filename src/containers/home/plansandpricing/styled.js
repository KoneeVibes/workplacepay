import styled from "styled-components";
import { Row } from "../../../components/flex/styled";
import { useContext } from "react";
import { Context } from "../../../context";

export const PlansAndPricingWrapper = styled('div')(() => {
    const { isMenuOpen } = useContext(Context);
    return {
        position: "relative",
        top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
        // Awele, your CSS styling should begin below this line
        padding: "0 var(--pagePadding)",
        margin: "calc(var(--sectionMargin) * 2) 0",
        ".pricingRow": {
            overflow: "hidden",
        },
        '.bronze': {
            flex: 1,
            backgroundColor: '#D3D5F0',
            borderRadius: "1rem",
            padding: "var(--cardPadding)",
        },

        ".silver": {
            flex: 1,
            backgroundColor: '#8A90DC',
            borderRadius: "1rem",
            padding: "var(--cardPadding)",
        },

        ".gold": {
            flex: 1,
            backgroundColor: '#D3D5F0',
            borderRadius: "1rem",
            padding: "var(--cardPadding)"
        },

        "@media screen and (min-width: 1024px)": {
            margin: "calc(var(--sectionMargin) * 3) 0",
            "h2": {
                textAlign: "center",
            },
        }
    }
});

export const PlansAndPricingRow = styled(Row)(() => {
    return {
        justifyContent: "space-between"
    }
})