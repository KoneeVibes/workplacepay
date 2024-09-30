import styled from "styled-components";

export const TableWrapper = styled("table")(() => {
    return {
        width: "100%",
        backgroundColor: "transparent",
        borderCollapse: "collapse",
        cursor: "pointer",
        "& th": {
            textAlign: "left",
            textTransform: "capitalize",
            padding: "var(--cardPadding)",
            borderBottom: "1px solid #000000",
            minWidth: "150px",
            fontSize: "24px",
            fontWeight: 600,
            color: "#CCCCCC",
        },
        "& td": {
            textAlign: "left",
            border: "1px solid #000000",
            padding: "var(--cardPadding)",
            minWidth: "150px",
            color: "#CCCCCC",
        },
        "& tbody tr td:nth-child(1)": {
            textAlign: "left",
        },
        "tr th:nth-child(1)": {
            paddingLeft: 0,
        },
        "tr td:nth-child(1)": {
            paddingLeft: 0,
        }
    }
})