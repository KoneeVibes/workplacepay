import styled from "styled-components";
import { Row } from "../../flex/styled";

export const TopNavigationWrapper = styled(Row)(({ location }) => {
    return {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "var(--cardPadding)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
        "& h3": {
            marginBlock: 0,
        },
        "& .call-to-action": {
            justifyContent: "space-between",
            "& span": {
                whiteSpace: "nowrap",
            },
            "& svg": {
                flexShrink: 0,
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
                }
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
                "& svg": {
                    order: -1,
                }
            },
        },
        "@media screen and (min-width: 768px)": {
            flexDirection: "row"
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