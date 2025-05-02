import styled from "styled-components";

export const BillingWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading": {
            "& h3": {
                marginBlock: 0,
            },
        },
        "& .filter-row": {
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--cardPadding)",
        },
        "& .filter": {
            display: "flex",
            "& select": {
                padding: "calc(var(--cardPadding)/2)",
                borderRadius: "10px",
                fontWeight: "400",
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
        },
        "& .billing-table": {
            overflow: "auto",
            "& tr:not(:last-of-type)": {
                borderBottom: "1px solid #000000"
            },
        },
        "& th": {
            color: "#FFFFFF",
            background: "#4E57BB",
            minWidth: "50px",
        },
        "& th:not(:last-of-type)": {
            width: "90%",
            minWidth: "200px",
        },
        "& td": {
            border: "none",
            borderLeft: "1px solid #000000",
        },
        "& td:first-of-type": {
            borderLeft: "none",
        },
    }
});