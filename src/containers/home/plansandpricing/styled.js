import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const PlansAndPricingWrapper = styled('div')(({ isMenuOpen }) => ({
    position: "relative",
    top: isMenuOpen ? "var(--mobileNavLinks)" : "0",
    // Awele, your CSS styling should begin below this line
    padding: "0 var(--pagePadding)",
    margin: "calc(var(--sectionMargin) * 2) 0 calc(var(--sectionMargin))",
    '& .card': {
        flex: 1,
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
    },
    "& .introduction": {
        "& h2": {
            marginBlockEnd: 0,
        },
        "& p": {
            marginBlockStart: 0,
            marginBlockEnd: "calc(var(--flexGap)/1)",
        },
    },
    "@media screen and (min-width: 1024px)": {
        margin: "calc(var(--sectionMargin)) 0 calc(var(--sectionMargin) * 2)",
        "& .introduction": {
            "& h2, & p": {
                textAlign: "center",
            },
        },
    }
}));

export const PlansAndPricingRow = styled(Row)(() => {
    return {
        overflow: "hidden",
        justifyContent: "space-between",
        "& h3": {
            textAlign: "center",
            marginBlockEnd: 0,
        },
        "& p": {
            marginBlockStart: 0,
            marginBlockEnd: "var(--sectionMargin)",
            textAlign: "center"
        },
        "& i": {
            display: "flex",
            justifyContent: "center",
        }
    }
})