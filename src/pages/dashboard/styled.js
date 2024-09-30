import styled from "styled-components";

export const DashboardWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        "& h3": {
            marginBlock: 0,
            fontWeight: 600,
            fontSize: "24px",
        },
        "& .upcoming-salary-date-card": {
            backgroundColor: "#5F69DC",
            color: "#F5F8FC",
            "& .card-title": {
                borderBottom: "1px solid #FFFFFF",
                paddingBottom: "1rem"
            },
            "& .card-body>p": {
                fontWeight: 700,
                fontSize: "16px",
            },
        },
        "& .upcoming-salary-amount-card": {
            backgroundColor: "#F5F8FC",
            color: "#040507",
            "& .card-title": {
                borderBottom: "1px solid #040507",
                paddingBottom: "1rem"
            },
            "& .card-body>p:nth-child(1)": {
                fontWeight: 700,
                fontSize: "32px",
            },
            "& .card-body>p:nth-child(2)": {
                fontWeight: 500,
                fontSize: "16px",
                color: "#D9D9D9",
            },
        },
        "& .employee-table-card": {
            backgroundColor: "#F5F8FC",
            color: "#040507",
            "& .card-title": {
                flexWrap: "wrap",
                justifyContent: "space-between",
            },
            "& .card-title>h3:nth-child(2)": {
                color: "#448DEF",
            },
            "& .card-table-filter": {
                marginBlock: "var(--sectionMargin)",
                "@media screen and (min-width: 769px)": {
                    alignItems: "flex-end",
                }
            },
            "& .card-table-filter>*": {
                flex: 1,
            },
            "& .card-table-filter label": {
                color: "#000000",
                lineHeight: 2,
            },
            "& .card-table-filter input": {
                borderRadius: "1rem",
                padding: "calc(var(--cardPadding)/4)",
                outline: "none",
                border: "1px solid #000000",
            },
            "& .card-table-filter select": {
                borderRadius: "1rem",
                padding: "calc(var(--cardPadding)/4)",
                outline: "none",
                border: "1px solid #000000",
            },
            "& .card-table": {
                overflow: "auto",
            }
        },
        "@media screen and (max-width: 768px)": {
            "& .cards-group": {
                flexDirection: "column",
            },
            "& .card-table-filter": {
                gap: 0,
                flexDirection: "column",
                overflow: "hidden",
            },
        }
    }
})