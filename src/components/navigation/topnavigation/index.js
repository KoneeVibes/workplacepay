import { useContext } from "react";
import { Context } from "../../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "../../../assets";
import { BaseButton } from "../../button/styled";
import { Row } from "../../flex/styled";
import { H3, Span } from "../../typography/styled";
import { TopNavigationWrapper } from "./styled";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

export const TopNavigation = ({ title, location }) => {
    const { setIsSideNavigationOpen } = useContext(Context);
    return (
        <TopNavigationWrapper
            location={location}
        >
            <H3>{title}</H3>
            <Row
                className="call-to-action"
            >
                <Row className="call-to-action-buttons">
                    <BaseButton
                        className="add-employee-button"
                    >
                        <FontAwesomeIcon icon={faPlus} color="#448DEF" />
                        <Span>
                            Add Employee
                        </Span>
                    </BaseButton>
                    <BaseButton
                        className="hamburger"
                        onClick={() => setIsSideNavigationOpen(true)}
                    >
                        <FontAwesomeIcon icon={faBars} color="#FFFFFF" />
                    </BaseButton>
                </Row>
                <Avatar />
            </Row>
        </TopNavigationWrapper>
    )
}