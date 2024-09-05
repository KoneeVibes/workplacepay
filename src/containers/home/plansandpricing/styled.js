import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const PlansAndPricingWrapper = styled('div')(() => ({
    // Awele, your CSS styling should begin below this line
    padding: "var(--cardPadding) var(--pagePadding)",
    "h2":{
        textAlign: "center",
    },
    ".pricingRow":{
        overflow:"hidden",
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

    ".gold":{
        flex: 1,
        backgroundColor: '#D3D5F0',
        borderRadius: "1rem",
        padding: "var(--cardPadding)"
    },
}));

export const PlansAndPricingRow = styled(Row)(() => {
    return{
        justifyContent: "space-between"
    }
})