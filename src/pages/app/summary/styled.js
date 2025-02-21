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
            minWidth: "200px",
        },
        "& td": {
            minWidth: "200px",
        },
    }
})