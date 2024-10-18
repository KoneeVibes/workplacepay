import { useContext } from "react";
import { Context } from "../../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseButton } from "../../button/styled";
import { Row } from "../../flex/styled";
import { H2, Span } from "../../typography/styled";
import { TopNavigationWrapper } from "./styled";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

export const TopNavigation = ({ title, location }) => {
    const { setIsSideNavigationOpen } = useContext(Context);
    return (
        <TopNavigationWrapper
            location={location}
        >
            <H2>{title}</H2>
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
        </TopNavigationWrapper>
    )
}