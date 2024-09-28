import styled from "styled-components";
import { Card } from "../card";

export const ChartWrapper = styled(Card)(() => {
    return {
        backgroundColor: "#F5F8FC",
        color: "#040507",
        marginBlock: "var(--sectionMargin)"
    }
})