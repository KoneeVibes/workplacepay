import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../../context";
import { Column } from "../../flex/styled";

export const SideNavigationWrapper = styled(Column)(({ USERROLE, location }) => {
    const { isSideNavigationOpen, setIsSideNavigationOpen } = useContext(Context);
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth >= 1024);
            setIsSideNavigationOpen(matches);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [matches, setIsSideNavigationOpen]);

    return {
        backgroundColor: "#4E57BB",
        color: "#FFFFFF",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        zIndex: 1,
        display: isSideNavigationOpen ? "flex" : "none",
        "& a": {
            textDecoration: "none",
            color: "#FFFFFF",
        },
        "& .side-navigation-upper-section": {
            borderBottom: "1px solid #FFFFFF",
            "& .switch-companies-box": {
                padding: "var(--cardPadding)",
                paddingTop: 0,
            },
            "& .nav-logo": {
                padding: "var(--cardPadding)",
                paddingBottom: USERROLE === "employer" ? 0 : "calc(var(--cardPadding) * 1.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--flexGap)",
                "& p": {
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "24px",
                    marginBlock: 0,
                    cursor: "pointer",
                },
                "& button": {
                    width: "fit-content",
                    borderRadius: "40px",
                },
                "@media screen and (max-width: 425px)": {
                    alignItems: "flex-start",
                    flexDirection: "column-reverse",
                    "& p": {
                        width: "100%",
                    }
                },
                "@media screen and (min-width: 1024px)": {
                    // minHeight: "var(--topNavHeight)",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    "& button": {
                        display: "none",
                    }
                }
            },
        },
        "& .nav-links": {
            padding: "var(--cardPadding)",
            gap: "calc(var(--flexGap)/1)",
            "& p": {
                cursor: "pointer",
                marginBlock: 0,
                "&:hover": {
                    color: "rgba(255, 255, 255, 0.57)",
                }
            }
        },
        "& .nav-avatar-area": {
            padding: "var(--cardPadding)",
            marginTop: "auto",
            borderTop: "1px solid #FFFFFF",
        },
        "& .sub-items": {
            marginBlock: 0,
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--flexGap)/3)",
            paddingInlineStart: "calc(var(--cardPadding))",
            "& p": {
                cursor: "pointer",
                marginBlock: 0,
                "&:hover": {
                    color: "rgba(255, 255, 255, 0.57)",
                }
            },
            "& .active-company": {
                color: "rgba(255, 255, 255, 0.57)"
            }
        },
        "& .user-companies-dropdown": {
            marginBlockStart: "calc(var(--flexGap)/3)",
        },
        "& .call-to-action-buttons": {
            padding: "0 calc(var(--cardPadding)/1)",
            "& span": {
                whiteSpace: "nowrap",
            },
            "& button": {
                width: "fit-content",
                borderRadius: "40px",
            },
            "& .add-employee-button": {
                display: "none",
                alignItems: "center",
                gap: "1rem",
                "& svg": {
                    padding: "0.5rem",
                    background: "#FFFFFF",
                    borderRadius: "50%",
                    flexShrink: 0,
                },
                "@media screen and (max-width: 768px)": {
                    display:
                        location === "dashboard" || location === "employees" || location === "departments" || location === "employer-profile" || location === "payroll" || location === "summary" || location === "variance" || location === "general-report" || location === "paye" || location === "pension" || location === "pricing"
                            ? "inline-flex"
                            : "none",
                },
            },
            "@media screen and (max-width: 450px)": {
                "& button": {
                    width: "-webkit-fill-available",
                },
            },
        },
        "& .logo-box-area": {
            maxWidth: "100%",
            "& svg": {
                width: "100%",
                height: "auto"
            }
        },
        "@media screen and (min-width: 1024px)": {
            left: "auto",
            right: "auto",
            width: "var(--sideNavWidth)",
        }
    }
})