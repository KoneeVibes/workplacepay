import styled from "styled-components";

export const SummaryWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        "& .heading-row": {
            padding: "var(--cardPadding)",
            "& h3": {
                marginBlock: 0,
            }
        },
        "& form": {
            display: "flex",
            alignItems: "flex-end",
            gap: "var(--flexGap)",
            justifyContent: "space-between",
            padding: "var(--cardPadding)",
            // marginBlockEnd: "calc(var(--sectionMargin) * 3)",
            "& select": {
                padding: "calc(var(--cardPadding)/2.7)",
                borderRadius: "10px",
                fontWeight: "400",
            },
            "& fieldset": {
                flex: 1,
                overflow: "hidden",
            },
            "@media screen and (max-width: 500px)": {
                alignItems: "stretch",
                flexDirection: "column",
            }
        },
        "& .summary-table": {
            overflow: "auto",
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
        "& .payment-modal": {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            padding: "calc(var(--cardPadding) * 1)",
            borderRadius: "1rem",
            boxShadow: "0px 20px 24px -4px #10182814",
            "& .payment-form": {
                alignItems: "unset",
                justifyContent: "unset",
                padding: "unset"
            },
            "@media screen and (max-width: 425px)": {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: "unset",
                borderRadius: 0,
            }
        },
        "& .error-box": {
            padding: "0 calc(var(--cardPadding))",
            "& p": {
                marginBlock: 0
            },
        }
    }
})