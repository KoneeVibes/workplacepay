import styled from "styled-components";

export const UserSummaryWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading-row": {
            padding: "var(--cardPadding)",
            "& h3": {
                marginBlock: 0,
                fontWeight: 600,
            }
        },
        "& .employee-information-block": {
            gap: "calc(var(--flexGap)/2)",
            padding: "0 var(--cardPadding) var(--cardPadding)",
            "& .employee-information": {
                flexDirection: "column",
                gap: "calc(var(--flexGap)/8)",
                "& span": {
                    display: "inline-block",
                    width: "100%"
                },
                "@media screen and (min-width: 615px)": {
                    flexDirection: "row",
                    gap: "calc(var(--flexGap)/1)",
                    "& div:nth-of-type(1)": {
                        flex: 0.3,
                        overflow: "hidden"
                    },
                    "& div:nth-of-type(2)": {
                        flex: 0.7,
                        overflow: "hidden"
                    }
                }
            }
        },
        "& .user-summary-table": {
            overflow: "auto",
            marginBlockEnd: "var(--cardPadding)"
        },
        "& .table-footer": {
            padding: "0 var(--cardPadding)",
            "& .table-footer-title": {
                flex: 1,
                "& h3": {
                    minWidth: "230px",
                }
            },
            "& .table-footer-value": {
                flex: 1,
                "& h3": {
                    minWidth: "230px",
                    paddingInlineStart: "var(--cardPadding)"
                }
            }
        },
        "& th": {
            color: "#FFFFFF",
            background: "#4E57BB",
            minWidth: "150px",
            fontSize: "18px",
        },
        "& td": {
            minWidth: "200px",
        },
        "& .net-payable-summary": {
            margin: "0 var(--cardPadding)",
            padding: "0 0 var(--cardPadding) 0",
            "& .net-payable-summary-row": {
                border: "1px solid #999999",
                borderRadius: "1rem",
                overflow: "hidden",
                "& .net-payable-description": {
                    padding: "calc(var(--cardPadding)/2)",
                    overflow: "hidden",
                    flex: 0.8,
                },
                "& .net-payable-amount": {
                    padding: "calc(var(--cardPadding)/2)",
                    overflow: "hidden",
                    backgroundColor: "#8A90DC",
                    flex: 0.2,
                },
                "@media screen and (max-width: 615px)": {
                    flexDirection: "column",
                    gap: "0",
                }
            }
        },
             "& .summary-button": {
                position: "relative",
                padding: "0 var(--cardPadding) var(--cardPadding)",
                "& button": {
                    overflow: "hidden",
                    // padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)/4)",  
                }
            },
        
    }
})