import { useState, useContext, useEffect } from "react";
import { Context } from "../../../../context";
import { BaseModal } from "../../../../components/modal"
import { GetStartedModalWrapper } from "./styled"
import { H2, P, Span } from "../../../../components/typography/styled";
import { GreenTick } from "../../../../assets";
import { BaseButton } from "../../../../components/button/styled";
import { Column } from "../../../../components/flex/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import React from 'react';

export const GetStartedSuccessModal = ({ setIsOTPEntered }) => {
    const [matches, setMatches] = useState(false);
    const { isGetStartedModalOpen, setIsGetStartedModalOpen } = useContext(Context);
    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleCloseModal = () => {
        setIsGetStartedModalOpen(false);
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
            height={matches ? "auto" : "50%"}
            width={matches ? "auto" : "50%"}
        >
            <GetStartedModalWrapper>
                <Column
                    className="receipt-title"
                >
                    <H2>Email Verified!</H2>
                    <GreenTick />
                </Column>
                <div>
                    <P>
                        Please check your email.
                        We have sent an OTP to ibukunoladiporaji@gmail.com
                    </P>
                </div>
            <div className="otp-container">
                {otp.map((data, index) => (
                    <BaseInput
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                    />
                ))}
            </div>
                <div>
                    <BaseButton
                        type="submit"
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