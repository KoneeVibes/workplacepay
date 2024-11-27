import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import { navLinks } from "../../../config/navlinks/dashboard";
import { BaseButton } from "../../button/styled";
import { P } from "../../typography/styled";
import { SideNavigationWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../../assets";
import { Column, Row } from "../../flex/styled";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const SideNavigation = () => {
    const cookie = new Cookies();
    const { ROLE } = cookie.getAll() ?? {};

    const navigate = useNavigate();
    const { setIsSideNavigationOpen, setIsResetPasswordModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [isSubItemsOpen, setIsSubItemsOpen] = useState(true);

    const handleLogoClick = (e) => {
        e.preventDefault();
        return navigate("/dashboard");
    }

    const handleSideNavItemClick = (e, destination) => {
        e.preventDefault();
        e.stopPropagation();
        if (destination === "/reportsummary") {
            return setIsSubItemsOpen(!isSubItemsOpen);
        };
        if (destination === "/resetpassword") {
            matches && setIsSideNavigationOpen(false);
            return setIsResetPasswordModalOpen(true);
        }
        return navigate(destination);
    };

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <SideNavigationWrapper>
            <div
                className="nav-logo"
            >
                <P onClick={handleLogoClick}>workPlacePAY</P>
                <BaseButton
                    onClick={() => setIsSideNavigationOpen(false)}
                >
                    <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                </BaseButton>
            </div>
            <Column
                className="nav-links"
            >
                {navLinks[ROLE]?.map((navLink, index) => {
                    return (
                        <Fragment
                            key={index}
                        >
                            <Link
                                className={(navLink.name === "Setup") ? "setup" : null}
                                onClick={(e) => handleSideNavItemClick(e, navLink.url)}
                            >
                                {(navLink.name === "Report Summary") ?
                                    <Row
                                        alignitems={"center"}
                                        justifycontent={"space-between"}
                                    >
                                        <P>{navLink.name}</P>
                                        <FontAwesomeIcon icon={isSubItemsOpen ? faCaretDown : faCaretRight} />
                                    </Row> :
                                    <P>{navLink.name}</P>
                                }
                            </Link>
                            {(navLink.name === "Report Summary" && isSubItemsOpen) && (
                                <ul
                                    className="sub-item"
                                >
                                    {navLink.subItems.map((subItem, index) => {
                                        return (
                                            <li
                                                key={index}
                                            >
                                                <Link
                                                    to={subItem.url}
                                                >
                                                    <P>{subItem.name}</P>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </Fragment>
                    )
                })}
            </Column>
            <div
                className="nav-avatar"
            >
                <Avatar />
            </div>
        </SideNavigationWrapper >
    )
}
