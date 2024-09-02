import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Logo } from "../../../assets";
import { navLinks } from "../../../config/navlinks/home";
import { NavbarWrapper, NavLinksWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Span } from "../../../components/typograpy/styled";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <NavbarWrapper>
            {/* Ofofon, you html should begin below this line */}
            <div className="logo-box-area">
                <Logo />
            </div>
            <NavLinksWrapper isMenuOpen={isMenuOpen}>
                {navLinks.map((navLink, index) => {
                    return (
                        <HashLink
                            key={index}
                            to={navLink.url}
                            smooth={true}
                        >
                            <Span>
                                {navLink.name}
                            </Span>
                        </HashLink>
                    )
                })}
            </NavLinksWrapper>
            <div className="hamburger-icon" onClick={handleHamburgerClick}>
                {isMenuOpen ? (
                    <FontAwesomeIcon icon={faXmark} />
                ) : (
                    <FontAwesomeIcon icon={faBars} />
                )}
            </div>
        </NavbarWrapper>
    )
}