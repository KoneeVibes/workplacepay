import { useContext } from "react";
import { Context } from "../../../context";
import { navLinks } from "../../../config/navlinks/dashboard";
import { BaseButton } from "../../button/styled";
import { P } from "../../typography/styled";
import { SideNavigationWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../../assets";
import { Column } from "../../flex/styled";
import { Link, useNavigate } from "react-router-dom";

export const SideNavigation = () => {
    const navigate = useNavigate();
    const { setIsSideNavigationOpen } = useContext(Context);
    const navigateToDashboard = (e) => {
        e.preventDefault();
        return navigate("/dashboard")
    }
    return (
        <SideNavigationWrapper>
            <div
                className="nav-logo"
            >
                <P onClick={navigateToDashboard}>workPlacePAY</P>
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
                        <Link
                            key={index}
                            to={navLink.url}
                        >
                            <P>{navLink.name}</P>
                        </Link>
                    )
                })}
            </Column>
            <div
                className="nav-avatar"
            >
                <Avatar />
            </div>
        </SideNavigationWrapper>
    )
}
