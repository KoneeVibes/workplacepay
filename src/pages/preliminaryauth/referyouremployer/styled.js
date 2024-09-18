import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const ReferYourEmployerWrapper = styled(Row)(() => {
    return {
        // IBK, your CSS should go under here
        gap: 0,
        "& .refer-text": {
            flex: 1,
            backgroundColor: "#4E57BB",
            color: "#ffffff",
            padding: "calc(var(--cardPadding) * 2) ",
            overflow: "hidden",
        },
        "& .refer-form": {
            flex: 1,
            backgroundColor: "#ffffff",
            padding: "calc(var(--cardPadding) * 2)",

        },
        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap) * 2)",
            marginBlock: "calc(var(--sectionMargin) * 2)",
        },
        "& .refer-text>svg": {
            width: "100%",
            height: "auto",
        },
        "& .refer-form fieldset": {
            flex: 1,
            overflow: "hidden",
            display: "flex",
            gap: "calc(var(--flexGap)/8)",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "& .refer-form label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000"
        },
        "& .refer-form input, & .form-container select": {
            padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
            borderRadius: "8px",
        },
        "@media screen and (max-width: 425px)": {
            "& .refer-text": {
                padding: "calc(var(--cardPadding))",
            },
            "& .refer-form": {
                padding: "calc(var(--cardPadding))",
            },
        },
        "@media screen and (max-width: 1024px)": {
            "& h2": {
                marginBlock: 0,
            },
            "& form": {
                gap: "var(--flexGap)",
            },
        },
        "@media screen and (min-width: 1440px)": {
            "& .refer-form button": {
                marginLeft: "auto",
                marginTop: "calc(var(--sectionMargin))",
                width: "fit-content",
            }
        }
    }
})

export const ReferYourEmployerRow = styled(Row)(() => {
    return {
       "@media screen and (max-width: 768px)": {
            flexDirection: "column",
        }
    }
})