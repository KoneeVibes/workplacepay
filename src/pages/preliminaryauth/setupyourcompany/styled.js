import styled from "styled-components";
import { Row } from "../../../components/flex/styled";

export const SetUpYourCompanyWrapper = styled(Row)(() => {
    return {
        gap: 0,
        "& .image-container": {
            flex: 1,
            overflow: "hidden",
            padding: "calc(var(--cardPadding) * 2)",
            backgroundColor: "#4E57BB",
            color: "#FFFFFF",
        },
        "& .image-container>svg": {
            width: "100%",
            height: "auto",
        },
        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap) * 2)",
            marginBlock: "calc(var(--sectionMargin) * 2)",
        },
        "& .form-container": {
            flex: 1,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            padding: "calc(var(--cardPadding) * 2)",
        },
        "& .form-container fieldset": {
            flex: 1,
            overflow: "hidden",
            display: "flex",
            gap: "calc(var(--flexGap)/8)",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "& .form-container label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000"
        },
        "& .form-container input, & .form-container select": {
            padding: "calc(var(--cardPadding) / 2) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
            borderRadius: "8px",
        },
        "@media screen and (max-width: 425px)": {
            "& .image-container": {
                padding: "calc(var(--cardPadding))",
            },
            "& .form-container": {
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
            "& .form-container button": {
                marginLeft: "auto",
                marginTop: "calc(var(--sectionMargin))",
                width: "fit-content",
            }
        }
    }
});

export const FieldSetRow = styled(Row)(() => {
    return {
        "@media screen and (max-width: 768px)": {
            flexDirection: "column",
        }
    }
})