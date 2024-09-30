import styled from "styled-components";
import { Row } from "../../flex/styled";

export const TopNavigationWrapper = styled(Row)(({ location }) => {
    return {
        justifyContent: "space-between",
        padding: "var(--cardPadding)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
        "& h2": {
            marginBlock: 0,
            fontSize: "32px",
        },
        "& .call-to-action-buttons": {
            justifyContent: "space-between",
            "& span": {
                whiteSpace: "nowrap",
            },
            "& button": {
                width: "fit-content",
                borderRadius: "40px",
            },
            "& .add-employee-button": {
                display: (location === "dashboard") ? "inline-flex" : "none",
                alignItems: "center",
                gap: "1rem",
                "& svg": {
                    padding: "0.5rem",
                    background: "#FFFFFF",
                    borderRadius: "50%",
                    flexShrink: 0,
                },
                "@media screen and (max-width: 768px)": {
                    display: "none",
                },
            },
            "@media screen and (max-width: 450px)": {
                flexDirection: "column",
                overflow: "hidden",
                "& .call-to-action-buttons": {
                    flexWrap: "wrap",
                    "& .hamburger": {
                        order: -1,
                    }
                },
            },
        },
        "@media screen and (min-width: 1024px)": {
            position: "absolute",
            left: "var(--sideNavWidth)",
            right: 0,
            "& .hamburger": {
                display: "none",
            }
        }
    }
})