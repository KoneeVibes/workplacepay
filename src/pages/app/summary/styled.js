import styled from "styled-components";

export const SummaryWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading-row": {
            padding: "var(--cardPadding)",
            "& h3": {
                marginBlock: 0,
            }
        },
        "& .summary-table": {
            overflow: "auto",
        },
        "& th": {
            color: "#FFFFFF",
            background: "#4E57BB",
            minWidth: "200px",
        },
        "& td": {
            minWidth: "200px",
        }
    }
})