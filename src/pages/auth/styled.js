import styled from "styled-components";

export const AuthWrapper = styled("div")(() => {
    return {
        padding: "calc(var(--cardPadding))",
        background: "#FFFFFF",
        "& h1": {
            fontWeight: 500,
            color: "#4E57BB",
            marginBlockStart: "0",
        },
        "& .main-area": {
            gap: "calc(var(--flexGap) * 2)",
            "@media screen and (min-width: 1025px)": {
                alignItems: "center",
            }
        },
        "& .auth-img": {
            flex: 1,
            overflow: "hidden",
            "& svg": {
                width: "100%",
                height: "auto",
            }
        },
        "& .auth-form": {
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap))",
            "& legend": {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingInline: 0,
            },
            "& label": {
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "20px",
                color: "#000000",
                lineHeight: "3rem",
            },
            "&  input": {
                fontSize: "20px",
                padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
                outline: "none",
                border: "1px solid #4E57BB",
                backgroundColor: "transparent",
                borderRadius: "8px",
            },
            "@media screen and (max-width: 768px)": {
                paddingBottom: "calc(var(--cardPadding))",
                "& legend": {
                    fontSize: "20px",
                },
                "& label, & input": {
                    fontSize: "16px",
                }
            }
        },
        "@media screen and (min-width: 425px)": {
            padding: "calc(var(--cardPadding) * 1.5)",
        },
        "@media screen and (min-width: 768px)": {
            padding: "calc(var(--cardPadding) * 2)",
        },
    }
})
