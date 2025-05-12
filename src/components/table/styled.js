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
            padding: "calc(var(--cardPadding)/3)",
            borderBottom: "1px solid #000000",
            minWidth: "150px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#FFFFFF",
            userSelect: "none",
        },
        "& td": {
            textAlign: "left",
            border: "1px solid #000000",
            padding: "calc(var(--cardPadding)/3)",
            minWidth: "150px",
            color: "#222222",
        },
        "& tbody tr td:nth-child(1)": {
            textAlign: "left",
        },
    }
})