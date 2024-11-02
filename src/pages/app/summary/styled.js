import styled from "styled-components";

export const SummaryWrapper = styled("div")(() => {
    return {
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