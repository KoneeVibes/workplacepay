import styled from "styled-components";
import { Row } from "../../../../components/flex/styled";

export const EmployerProfileWrapper = styled("div")(() => {
    return {
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
        overflow: "hidden",
        "& input, & select, & textarea": {
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontWeight: "400",
        },
        "& label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000",
            marginBlockEnd: "calc(var(--sectionMargin)/2)"
        },
        "& fieldset": {
            flex: 1,
            overflow: "hidden",
        },
        "& .submit-button-box": {
            paddingTop: "var(--cardPadding)",
        },
        "& .payment-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            padding: "calc(var(--cardPadding) * 2)",
            borderRadius: "1rem",
            boxShadow: "0px 20px 24px -4px #10182814",
        },
    }
});

export const ProfileRow = styled(Row)(() => {
    return {
        justifyContent: "space-between",
        "@media screen and (max-width: 768px)": {
            gap: "calc(var(--flexGap)*1.5)",
            flexDirection: "column",
        },
    };
});