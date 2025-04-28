import styled from "styled-components";

export const PricingWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading": {
            padding: "var(--cardPadding)",
            paddingBottom: "0",
            marginBlockEnd: "var(--sectionMargin)",
            "& h3": {
                marginBlock: 0,
            },
        },
        "& .plans-and-pricing-table": {
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
        "& .plans-and-pricing-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
            "@media screen and (max-width: 768px)": {
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                transform: "unset",
                borderRadius: "unset"
            }
        },
    }
})