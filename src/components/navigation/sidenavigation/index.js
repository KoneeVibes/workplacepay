import { useContext } from "react";
import { Context } from "../../../context";
import { navLinks } from "../../../config/navlinks/dashboard";
import { BaseButton } from "../../button/styled";
import { P } from "../../typography/styled";
import { SideNavigationWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const SideNavigation = () => {
    const { setIsSideNavigationOpen } = useContext(Context);
    return (
        <SideNavigationWrapper>
            <div
                className="nav-logo"
            >
                <P>workPlacePAY</P>
                <BaseButton
                    onClick={() => setIsSideNavigationOpen(false)}
                >
                    <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                </BaseButton>
            </div>
            <div
                className="nav-links"
            >
                {navLinks.map((navLink, index) => {
                    return (
                        <P key={index}>{navLink.name}</P>
                    )
                })}
            </div>
        </SideNavigationWrapper>
    )
}
