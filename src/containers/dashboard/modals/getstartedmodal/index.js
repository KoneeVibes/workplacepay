import { useState, useContext, useEffect } from "react";
import { Context } from "../../../../context";
import { BaseModal } from "../../../../components/modal"
import { GetStartedModalWrapper } from "./styled"
import { H2, P, Span } from "../../../../components/typography/styled";
import { GreenTick } from "../../../../assets";
import { BaseButton } from "../../../../components/button/styled";
import { Column } from "../../../../components/flex/styled";

export const GetStartedSuccessModal = ({ setIsOTPEntered }) => {
    const [matches, setMatches] = useState(false);
    const { isGetStartedModalOpen, setIsGetStartedModalOpen } = useContext(Context);

    const handleCloseModal = () => {
        setIsGetStartedModalOpen(true);
    }

    const handleOTPSubmit = () => {
        // OTP submission logic should go in here
        setIsGetStartedModalOpen(false);
        setIsOTPEntered(true);
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
            open={isGetStartedModalOpen}
            onClose={handleCloseModal}
            className={"get-started-modal"}
            height={matches ? "auto" : "50%"}
            width={matches ? "auto" : "50%"}
        >
            <GetStartedModalWrapper>
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
                <div>
                    <BaseButton
                        type="submit"
                        backgroundcolor={"#D9D9D9"}
                        onClick={handleOTPSubmit}
                    >
                        <Span>
                            Go to Dashboard
                        </Span>
                    </BaseButton>
                </div>
            </GetStartedModalWrapper>
        </BaseModal >
    )
}