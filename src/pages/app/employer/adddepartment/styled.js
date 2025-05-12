import styled from "styled-components";

export const AddDepartmentWrapper = styled("div")(() => {
    return {
        overflow: "hidden",
        padding: "var(--cardPadding)",
        backgroundColor: "#ffffff",
        borderRadius: "1rem",
        "& h2": {
            marginBlock: 0,
            fontSize: "24px",
        },
        "& p": {
            fontSize: "18px",
        },
        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap) * 1)",
            overflow: "hidden",
        },
        "& input, & select": {
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            border: "none",
            backgroundColor: "#F2F2F8",
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
            display: "flex",
            gap: "calc(var(--flexGap)/8)",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "@media screen and (min-width: 768px)": {
            padding: "calc(var(--cardPadding) * 2)",
        }
    };
});
