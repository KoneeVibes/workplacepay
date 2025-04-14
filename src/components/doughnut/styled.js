import styled from "styled-components";
import { Card } from "../card";

export const DoughnutWrapper = styled(Card)(() => {
    return {
        backgroundColor: "#D9D9D9",
        color: "#040507",
        height: "100%",
        boxSizing: "border-box",
        "& h2": {
            fontSize: "20px",
            marginBlockStart: 0,
            textAlign: "center",
            // whiteSpace: "nowrap"
        },
        "@media screen and (max-width: 768px)": {
            padding: "calc(var(--cardPadding)/4)",
            "& h2": {
                fontSize: "14px",
            },
        }
    }
})