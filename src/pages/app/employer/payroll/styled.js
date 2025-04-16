import styled from "styled-components";

export const PayrollWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        "& form": {
            display: "flex",
            alignItems: "flex-end",
            gap: "var(--flexGap)",
            justifyContent: "space-between",
            padding: "var(--cardPadding)",
            // marginBlockEnd: "calc(var(--sectionMargin) * 3)",
            "& select": {
                padding: "calc(var(--cardPadding)/4)",
                borderRadius: "10px",
            },
            "& fieldset": {
                flex: 1,
                overflow: "hidden",
            },
            "& .payroll-button-box": {
                position: "relative",
                "& button": {
                    overflow: "hidden",
                    padding: "calc(var(--cardPadding)/3.35) calc(var(--cardPadding)/2)",
                }
            },
            "@media screen and (max-width: 500px)": {
                alignItems: "stretch",
                flexDirection: "column",
            }
        },
        "& label": {
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 20,
            color: "#000000",
        },
        "& select": {
            padding: "calc(var(--cardPadding)/4)",
            borderRadius: "10px",
            border: "1px solid #000000",
        },
        "& .filter": {
            padding: "var(--cardPadding)",
            justifyContent: "space-between",
            // marginBlockEnd: "var(--sectionMargin)",
            "& select, & input": {
                padding: "calc(var(--cardPadding)/4)",
                borderRadius: "10px",
                border: "1px solid #000000",
                fontWeight: "400",
            },
            "& fieldset": {
                flex: 1,
                overflow: "hidden",
            },
            "@media screen and (max-width: 768px)": {
                flexDirection: "column",
            }
        },
        "& .payroll-table": {
            overflow: "auto",
        },
        "& th": {
            color: "#FFFFFF",
            background: "#4E57BB",
            minWidth: "200px",
        },
        "& td": {
            minWidth: "200px",
        },
        "& .error-text": {
            padding: "0 var(--cardPadding)"
        },
        "& .run-payroll-modal": {
            position: "absolute",
            marginTop: "calc(var(--cardPadding) / 4)",
            zIndex: 10,
            backgroundColor: "#FFFFFF",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
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
        "& .payroll-confirmation-modal > div:first-of-type": {
            maxWidth: "19.6rem"
        }
    }
})