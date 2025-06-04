import styled from "styled-components";

export const EmployeeProfileWrapper = styled("div")(() => {
    return {
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        padding: "var(--cardPadding)",
        overflow: "hidden",
        "p": {
            flex: 1,
            color: "#000000",
        },
        "h2": {
            flex: 1,
        },
        "& .reset-password-modal": {
            padding: "var(--cardPadding)",
            background: "#FFFFFF",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        "& input, & select": {
            padding: "calc(var(--cardPadding) / 4) var(--cardPadding)",
            outline: "none",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontWeight: "400",
        },
        "& label": {
            fontFamily: "Poppins",
            fontWeight: 500,
            color: "#000000",
            marginBlockEnd: "calc(var(--sectionMargin)/2)"
        },
        "& .details": {
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--cardPadding) / 4)",
            "& .detail-label, & .detail-field": {
                flex: 1,
                overflow: "hidden",
            },
            "@media screen and (max-width: 425px)": {
                gap: "calc(var(--cardPadding) / 2)",
                "& div": {
                    flexDirection: "column",
                    gap: "calc(var(--cardPadding) / 4)",
                }
            }
        },
        "& .employee-headshot": {
            width: "100%",
            height: "auto",
            borderRadius: "50%",
            "@media screen and (min-width: 280px)": {
                width: "150px",
                height: "150px"
            },
        },
        "& .employee-profile-image-area": {
            padding: "0 0 var(--cardPadding) 0",
            margin: "0 0 var(--cardPadding) 0",
            borderBottom: "4px solid #CCCCCC",
            "& .employer-profile-image-action-area": {
                alignItems: "center",
                overflow: "hidden",
                "@media screen and (min-width: 768px)": {
                    flexDirection: "row"
                }
            },
        },
        "& .edit-icon": {
            position: "relative",
            top: "-3.5rem",
            left: "-1rem",
            cursor: "pointer",
        },
    };
});