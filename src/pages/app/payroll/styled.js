import styled from "styled-components";

export const PayrollWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
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
            },
            "& fieldset": {
                flex: 1,
                overflow: "hidden",
            },
            "& .payroll-button-box": {
                overflow: "hidden",
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
        "& .filter": {
            padding: "var(--cardPadding)",
            justifyContent: "space-between",
            // marginBlockEnd: "var(--sectionMargin)",
            "& select": {
                padding: "calc(var(--cardPadding)/2)",
                borderRadius: "10px",
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
        }
    }
})