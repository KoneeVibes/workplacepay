import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const ReferYourEmployerWrapper = styled(Row)(() => {
    return {
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
            overflow: "hidden",
        },
        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap) * 2)",
            marginBlock: "calc(var(--sectionMargin) * 2)",
            overflow: "hidden",
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
        "& .refer-form input": {
            padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
            fontWeight: 400,
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
    }
})

export const ReferYourEmployerRow = styled(Row)(() => {
    return {
       "@media screen and (max-width: 768px)": {
            flexDirection: "column",
        }
    }
})