import styled from "styled-components";

export const ReferralWrapper = styled("div")(() => {
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
        "& .referrals-table": {
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
    }
})