import { Fragment, useContext, useState } from "react";
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

export const SideNavigation = () => {
    const navigate = useNavigate();
    const { setIsSideNavigationOpen } = useContext(Context);

    const [isSubItemsOpen, setIsSubItemsOpen] = useState(true);

    const handleLogoClick = (e) => {
        e.preventDefault();
        return navigate("/dashboard")
    }

    const handleSideNavItemClick = (e, destination) => {
        e.preventDefault();
        if (destination === "/reportsummary") {
            return setIsSubItemsOpen(!isSubItemsOpen);
        }
        return navigate(destination);
    }

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
                {navLinks.map((navLink, index) => {
                    return (
                        <Fragment
                            key={index}
                        >
                            <Link
                                className={(navLink.name === "Setup") && "setup"}
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
