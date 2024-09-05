import styled from "styled-components";
import { BaseFlex } from "../../../components/flex/styled";

export const NavbarWrapper = styled(BaseFlex)(() => {
    return {
        // ofofon you css styling should begin below this line
        alignItems: "center",
        justifyContent: "space-between",
        margin: "calc(var(--sectionMargin)) var(--pagePadding)",
        "& .hamburger-icon": {
            overflow: "hidden",
        },
        "@media screen and (max-width: 1024px)": {
            "& .logo-box-area": {
                maxWidth: "50%",
                "& svg": {
                    width: "100%",
                }
            }
        },
        "@media screen and (min-width: 1025px)": {
            "& .hamburger-icon": {
                display: "none",
            }
        }
    }
});

export const NavLinksWrapper = styled(BaseFlex)(({ isMenuOpen }) => {
    return {
        justifyContent: "space-between",
        "& a": {
            textDecoration: "none",
            color: "#040507",
        },
        "@media screen and (max-width: 1024px)": {
            display: isMenuOpen ? "flex" : "none",
            flexDirection: "column",
            position: "absolute",
            top: "var(--navHeight)",
            left: "var(--pagePadding)",
            right: "var(--pagePadding)",
            overflow: "hidden",
            zIndex: 1,
            "& span": {
                display: "block",
            }
        }
    }
})