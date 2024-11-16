import styled from "styled-components";

export const AnalyticsWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .filter": {
            padding: "var(--cardPadding)",
            "& select": {
                padding: "calc(var(--cardPadding)/2)",
                borderRadius: "10px",
            },
            "& label": {
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 20,
                color: "#000000",
            },
            "& fieldset": {
                overflow: "hidden",
            },
        }
    }
})