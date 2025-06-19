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
            "@media screen and (max-width: 768px)": {
                flexDirection: "column",
                alignItems: "flex-start",
            }
        },
        "& .filter": {
            display: "flex",
            gap: "calc(var(--flexGap)/2)",
            "& select, & input": {
                padding: "calc(var(--cardPadding)/4)",
                borderRadius: "10px",
                fontWeight: "400",
                border: "1px solid #000000",
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
        "& .billing-card": {
            background: "#F5F5F5",
            borderRadius: "1rem",
            padding: "var(--cardPadding)",
            marginBottom: "var(--cardMargin)",
            "& .card-title": {
                marginBottom: "var(--cardMargin)",
                "& h3": {
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#000000",
                },
            },
        },
        "& .billing-summary": {
            overflow: "auto",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 var(--cardPadding) var(--cardPadding)",
            "& th": {
                width: "50%",
                textAlign: "center",
                fontSize: "20px",
                padding: "10px",
            }
        },
        "& .billing-summary-table": {
            borderCollapse: "collapse",
            "& th": {
                textAlign: "left",
                textTransform: "capitalize",
                padding: "calc(var(--cardPadding)/3)",
                border: "1px solid #000000",
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
        },
        "@media screen and (max-width: 768px)": {
            "& fieldset": {
                flex: 1,
            },
            "& .filter": {
                width: "100%"
            },
            "& .billing-summary": {
                justifyContent: "flex-start",
                "& .billing-summary-table": {
                    width: "100%",
                }
            },
        },
    }
});