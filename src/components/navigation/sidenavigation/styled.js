import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../../context";
import { Column } from "../../flex/styled";

export const SideNavigationWrapper = styled(Column)(() => {
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
        display: isSideNavigationOpen ? "flex" : "none",
        "& .nav-logo": {
            padding: "var(--cardPadding)",
            borderBottom: "1px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--flexGap)",
            "& p": {
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "24px",
                marginBlock: 0,
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
                height: "var(--topNavHeight)",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                "& button": {
                    display: "none",
                }
            }
        },
        "& .nav-links": {
            padding: "var(--cardPadding)",
            "& p": {
                cursor: "pointer",
            }
        },
        "& .nav-avatar": {
            padding: "var(--cardPadding)",
            marginTop: "auto",
        },
        "@media screen and (min-width: 1024px)": {
            left: "auto",
            right: "auto",
            width: "var(--sideNavWidth)",
        }
    }
})