import { useState, useContext, useEffect } from "react";
import { Context } from "../../../../context";
import { BaseModal } from "../../../../components/modal"
import { GetStartedModalWrapper } from "./styled"
import { H2, P, Span } from "../../../../components/typography/styled";
import { GreenTick } from "../../../../assets";
import { BaseButton } from "../../../../components/button/styled";
import { Column, Row } from "../../../../components/flex/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import React from 'react';

export const GetStartedSuccessModal = ({ setIsOTPEntered, height, width }) => {
    const [matches, setMatches] = useState(false);
    const { isGetStartedModalOpen, setIsGetStartedModalOpen } = useContext(Context);
    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleCloseModal = () => {
        setIsGetStartedModalOpen(true);
    };

    const handleOTPSubmit = () => {
        // OTP submission logic should go in here
        setIsGetStartedModalOpen(false);
        setIsOTPEntered(true);
        alert(`OTP Entered: ${otp.join('')}`);
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to the next input field
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

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
            height={matches ? "auto" : height || "50%"}
            width={matches ? "75%" : width || "50%"}
        >
            <GetStartedModalWrapper>
                <Column
                    gap={"0"}
                    className="receipt-title"
                >
                    <H2>Email Verification</H2>
                    <GreenTick />
                </Column>
                <div>
                    <P>
                        Please check your email.
                        We have sent an OTP to ibukunoladiporaji@gmail.com
                    </P>
                </div>
                <Row className="otp-container">
                    {otp.map((data, index) => (
                        <BaseInput
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            width={"25%"}
                            onChange={(e) => handleChange(e.target, index)}
                        />
                    ))}
                </Row>
                <div className="submit-button-box">
                    <BaseButton
                        type="submit"
                        color="#000000"
                        backgroundcolor={"#D9D9D9"}
                        onClick={handleOTPSubmit}
                    >
                        <Span>
                            Next
                        </Span>
                    </BaseButton>
                </div>
            </GetStartedModalWrapper>
        </BaseModal >
    )
}