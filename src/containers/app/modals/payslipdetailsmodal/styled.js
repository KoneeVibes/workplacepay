import styled from "styled-components";

export const PayslipDetailsModalWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        " h1, h2": {
            fontWeight: "600",
            margin: "auto",
        },
        " .firstContainer": {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
        },
        " .companyName": {
            marginBlock: "0",
            marginLeft: "Auto",
        },
        " .middleContainer": {
            backgroundColor: "#979DE885",
            borderRadius: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "var(--cardPadding)",
        },
        " .card": {
            backgroundColor: "#FFFFFF",
            flex: "1",
        },
        " .cardRow": {
            display: "flex",
            justifyContent: "space-between",
        },
        ".bottomContainer": {
            marginTop: "1rem",
            ".amount": {
                backgroundColor: "#979DE885",
                borderRadius: "0.5rem",
                padding: "var(--cardPadding)",
            },
        },
    }
})