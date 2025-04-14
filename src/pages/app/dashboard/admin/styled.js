import styled from "styled-components";

export const AdminDashboardWrapper = styled("div")(() => {
    return {
        borderRadius: "1rem",
        backgroundColor: "#FFFFFF",
        padding: "var(--cardPadding)",
        "& .filter": {
            display: "flex",
            marginBlockEnd: "var(--sectionMargin)",
            "& select": {
                padding: "calc(var(--cardPadding)/2)",
                borderRadius: "10px",
                fontWeight: "400",
            },
            "& label": {
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 20,
                color: "#000000",
            },
            "& fieldset": {
                overflow: "hidden",
            },
        },
        "& .pie-chart-row": {
            justifyContent: "space-between",
            "& .pie-chart-container": {
                flex: 1,
                overflow: "hidden",
                minHeight: "200px"
            },
            "@media screen and (max-width: 425px)": {
                flexDirection: "column",
            }
        }
    }
})