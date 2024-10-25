import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context";
import { BaseModal } from "../../../components/modal"
import { AddEmployeeSuccessModalWrapper } from "./styled"
import { H2, P, Span } from "../../../components/typography/styled";
import { Row } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const AddEmployeeSuccessModal = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState(false);
    const { isAddEmployeeSuccessModalOpen, setIsAddEmployeeSuccessModalOpen } = useContext(Context);

    const handleCloseModal = () => {
        setIsAddEmployeeSuccessModalOpen(false);
    }

    const handleNavigateToDashboard = () => {
        setIsAddEmployeeSuccessModalOpen(false);
        navigate("/dashboard");
    }

    const handleNavigateToAddEmployee = () => {
        setIsAddEmployeeSuccessModalOpen(false);
        navigate("/addnewemployee");
    }

    
    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 425);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BaseModal
            open={isAddEmployeeSuccessModalOpen}
            onClose={handleCloseModal}
            className={"add-new-employee-modal"}
            height={matches ? "auto" : "50%"}
            width={matches ? "auto" : "50%"}
        >
            <AddEmployeeSuccessModalWrapper>
                <Fragment>
                    <Row className="payment-modal-title">
                        <H2>Congratulations</H2>
                        <BaseButton
                            onClick={handleCloseModal}
                            backgroundcolor={"#800000"}
                        >
                            <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                        </BaseButton>
                    </Row>
                    <div>
                        <P>
                            You have added a new Employee.
                            John Doe will receive  an onboarding mail with  an email
                            and password to  Login to workplaceplay
                        </P>
                    </div>
                    <div>
                        <P>
                            What would you like to do next?
                        </P>
                    </div>
                    <Row
                        className="form-action-row"
                    >
                        <BaseButton
                            type="button"
                            backgroundcolor={"#D9D9D9"}
                            onClick={handleNavigateToDashboard}
                        >
                            <Span>
                                Go to Dashboard
                            </Span>
                        </BaseButton>
                        <BaseButton
                            type="button"
                            backgroundcolor={"#D9D9D9"}
                            onClick={handleNavigateToAddEmployee}
                        >
                            <Span>
                                Add another Employee
                            </Span>
                        </BaseButton>
                    </Row>
                </Fragment>
            </AddEmployeeSuccessModalWrapper>
        </BaseModal>
    )
}