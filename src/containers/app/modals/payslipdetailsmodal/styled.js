import styled from "styled-components";

export const PayslipDetailsModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        padding: 0,
        "& span": {
            display: "inline-block",
            width: "100%",
        },
        "& .firstContainer": {
            alignItems: "center",
            gap: "calc(var(--flexGap)/2)",
            padding: "calc(var(--cardPadding)/1.5) var(--cardPadding)",
            "& .first-container-item": {
                overflow: "hidden",
                width: "100%",
                "& h1": {
                    // style the h1 to be alot smaller (fontsize)
                    marginBlock: 0,
                },
                "& h2": {
                    // style the h1 to be alot smaller (fontsize)
                    marginBlock: 0,
                },
                "& .full-name": {
                    flex: 0.4
                },
                "& .date": {
                    flex: 0.3
                },
                "& .companyName": {
                    flex: 0.3
                },
            },
            "@media screen and (max-width: 1024px)": {
                alignItems: "flex-start",
                gap: "calc(var(--flexGap)/4)",
                flexDirection: "column-reverse"
            }
        },
        " .middleContainer": {
            backgroundColor: "#979DE885",
            padding: "calc(var(--cardPadding)/1.5) var(--cardPadding)",
            "& .middle-container-column": {
                gap: "calc(var(--flexGap)/4)",
                flex: 1,
                overflow: "hidden",
                "& h3": {
                    marginBlock: 0
                }
            },
            "@media screen and (max-width: 1720px)": {
                flexDirection: "column"
            }
        },
        " .card": {
            backgroundColor: "#FFFFFF",
            flex: "1",
            borderRadius: "4px",
        },
        "& .cardRow": {
            gap: "calc(var(--flexGap)/2)",
            "& div": {
                flex: 1,
                overflow: "hidden"
            },
            "@media screen and (max-width: 350px)": {
                flexDirection: "column",
                gap: "calc(var(--flexGap)/4)",
                "& div:nth-child(2)": {
                    textAlign: "left !important"
                },
            },
        },
        "& .cardRow > div:nth-child(2)": {
            textAlign: "right"
        },
        "& .bottomContainer": {
            padding: "calc(var(--cardPadding)/1.5) var(--cardPadding)",
            alignItems: "center",
            "& >*": {
                width: "100%"
            },
            ".amount": {
                backgroundColor: "#979DE885",
                borderRadius: "4px",
                padding: "calc(var(--cardPadding)/4)",
                boxSizing: "border-box",
            },
            "@media screen and (max-width: 1024px)": {
                alignItems: "flex-start",
                gap: "calc(var(--flexGap)/4)",
                flexDirection: "column"
            }
        },
    }
})