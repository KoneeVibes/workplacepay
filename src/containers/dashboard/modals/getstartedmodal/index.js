import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context";
import { BaseModal } from "../../../components/modal"
import { GetStartedModalWrapper } from "./styled"
import { H2, P, Span } from "../../../components/typography/styled";
import { GreenTick } from "../../../../assets";
import { Row } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const GetStartedSuccessModal = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState(false);
    const { isGetStartedModalOpen, setIsGetStartedModalOpen } = useContext(Context);

    const handleCloseModal = () => {
        setIsGetStartedModalOpen(false);
    }

    // const handleNavigateToDashboard = () => {
    //     setIsGetStartedModalOpen(false);
    //     navigate("/dashboard");
    // }

    // const handleNavigateToAddEmployee = () => {
    //     setIsGetStartedModalOpen(false);
    //     navigate("/addnewemployee");
    // }

    
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
            open={isGetStartedModalOpen}
            onClose={handleCloseModal}
            className={"get-started-modal"}
            height={matches ? "auto" : "50%"}
            width={matches ? "auto" : "50%"}
        >
            <GetStartedModalWrapper>
                <Fragment>
                    <Column
                        className="receipt-title"
                        >
                        <H2>Payment  Successfull!</H2>
                        <GreenTick />
                    </Column>
                    <div>
                        <P>
                            Please check your email.
                            We have sent an OTP to ibukunoladiporaji@gmail.com
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
            </GetStartedModalWrapper>
        </BaseModal>
    )
}