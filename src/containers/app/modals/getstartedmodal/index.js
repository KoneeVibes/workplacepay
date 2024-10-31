import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { BaseModal } from "../../../../components/modal";
import { GetStartedModalWrapper } from "./styled";
import { H2, P, Span } from "../../../../components/typography/styled";
import { GreenTick } from "../../../../assets";
import { BaseButton } from "../../../../components/button/styled";
import { Column, Row } from "../../../../components/flex/styled";
import { BaseInput } from "../../../../components/form/input/styled";

export const GetStartedSuccessModal = forwardRef(({ setIsOTPEntered, width }, ref) => {
    const [matches, setMatches] = useState(false);
    const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
        getOtp: () => otp.join(''),
        clearOtp: () => setOtp(new Array(4).fill("")),
        openOtpModal: () => setIsGetStartedModalOpen(true),
    }));

    // Persist open on click out
    const handleCloseModal = () => {
        setIsGetStartedModalOpen(true);
    };

    const handleOTPSubmit = () => {
        // Check if OTP is complete
        if (otp.includes("")) {
            setError("Please enter the complete OTP.");
            return;
        }
        // OTP submission logic if OTP is complete
        setError(""); // Clear any previous errors
        setIsGetStartedModalOpen(false);
        setIsOTPEntered(true);
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to the next input field if the current one is filled
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "") {
                // Move to the previous input on click of backspace
                if (index > 0) {
                    e.target.previousSibling.focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
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
            height={"auto"}
            width={matches ? "75%" : width || "50%"}
        >
            <GetStartedModalWrapper>
                <Column gap={"0"} className="receipt-title">
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
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </Row>
                {error && <P style={{ color: "red", marginTop: "10px" }}>{error}</P>}
                <div className="submit-button-box">
                    <BaseButton
                        type="submit"
                        color="#000000"
                        backgroundcolor={"#D9D9D9"}
                        onClick={handleOTPSubmit}
                    >
                        <Span>Next</Span>
                    </BaseButton>
                </div>
            </GetStartedModalWrapper>
        </BaseModal>
    );
});
