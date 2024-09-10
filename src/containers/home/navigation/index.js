import { useContext } from "react";
import { Context } from "../../../context/index";
import { HashLink } from "react-router-hash-link";
import { Logo } from "../../../assets";
import { navLinks } from "../../../config/navlinks/home";
import { NavbarWrapper, NavLinksWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Span } from "../../../components/typography/styled";

export const Navbar = () => {
    const { isMenuOpen, setIsMenuOpen } = useContext(Context);
    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <NavbarWrapper>
            {/* Ofofon, you html should begin below this line */}
            <div className="logo-box-area">
                <Logo />
            </div>
            <NavLinksWrapper>
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