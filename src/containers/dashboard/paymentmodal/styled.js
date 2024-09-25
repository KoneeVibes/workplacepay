import styled from "styled-components";
import { Column } from "../../../components/flex/styled";

export const PaymentModalWrapper = styled(Column)(() => {
    return {
        overflow: "hidden",
        ".payment-modal-title": {
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            "& h2": {
                fontFamily: "Inter",
                fontWeight: 800,
                fontSize: "32px",
                marginBlock: 0,
            },
            "button": {
                width: "auto",
                padding: "1rem",
            },
            "@media screen and (max-width: 768px)": {
                flexDirection: "column",
                alignItems: "flex-start",
                "button": {
                    order: -1,
                },
                "h2": {
                    width: "100%",
                }
            },
        },
        "& .payment-details": {
            border: "1px solid #4E57BB",
            borderRadius: "0.5rem",
            padding: "var(--cardPadding)",
            justifyContent: "space-between",
            flexWrap: "wrap",
            "& h3": {
                fontFamily: "Inter",
                fontWeight: 300,
                fontSize: "16px",
                marginBlock: 0,
            },
            "& p": {
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "16px",
                marginBlock: 0,
            }
        },
        "& .paystack-option": {
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #8A90DC",
            padding: "calc(var(--cardPadding)/2)",
            borderRadius: "0.5rem",
        },
        "& .legend-row": {
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.5rem",
            "& h3": {
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "normal",
            }
        },
        "& .payment-form": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap)/2)",
            overflow: "hidden",
        },
        "& .payment-form fieldset": {
            flex: 1
        },
        "& .payment-form fieldset>label": {
            fontSize: "20px",
            fontWeight: 500,
            color: "#646060",
            lineHeight: "3rem",
        },
        "& .payment-form fieldset>input": {
            padding: "calc(var(--cardPadding)/4)",
            border: "1px solid #8A90DC",
            borderRadius: "0.5rem",
            outline: "none",
        },
        "& .form-action-row": {
            padding: "calc(var(--cardPadding)/2) 0",
            "@media screen and (max-width: 768px)": {
                flexDirection: "column",
            }
        },
        "& .receipt-detail>p": {
            flex: 1,
        },
        "& .receipt-detail>p:nth-child(1)": {
            fontWeight: 700,
        },
        "& .receipt-title": {
            alignItems: "center",
        },
        "@media screen and (max-width: 1024px)": {
            "& .receipt-detail": {
                flexDirection: "column",
            },
            "& .receipt-detail>p": {
                marginBlock: 0,
            },
            "& .receipt-title": {
                alignItems: "flex-start",
            },
        },
    }
});

