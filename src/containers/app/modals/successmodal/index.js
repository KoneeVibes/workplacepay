import { useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { SuccessModalWrapper } from "./styled";
import { H1, P, Span } from "../../../../components/typography/styled";
import { BaseButton } from "../../../../components/button/styled";
import { GreenTick } from "../../../../assets";

export const SuccessModal = ({ open, handleClickOutside, className, title, message, callToAction, handleCallToActionClick }) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 425);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <BaseModal
            open={open}
            onClose={handleClickOutside}
            className={className}
            height={"auto"}
            width={matches ? "60%" : "50%"}
        >
            <SuccessModalWrapper>
                <div
                    className="icon-box"
                >
                    <GreenTick />
                </div>
                <div
                    className="title-box"
                >
                    <H1>{title}</H1>
                </div>
                {message && (
                    <div
                        className="message-box"
                    >
                        <P>{message}</P>
                    </div>
                )}
                <div
                    className="call-to-action-button-box"
                >
                    <BaseButton
                        onClick={handleCallToActionClick}
                    >
                        <Span>{callToAction}</Span>
                    </BaseButton>
                </div>
            </SuccessModalWrapper>
        </BaseModal>
    )
}