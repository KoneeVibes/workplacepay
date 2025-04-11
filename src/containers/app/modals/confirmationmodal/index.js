import { useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { ConfirmationModalWrapper } from "./styled";
import { H1, Span } from "../../../../components/typography/styled";
import { BaseButton } from "../../../../components/button/styled";
import { AreYouSure } from "../../../../assets";
import { DotLoader } from "react-spinners";

export const ConfirmationModal = ({ open, handleClickOutside, className, title, message, callToAction, isLoading, handleCallToActionClick }) => {
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
            <ConfirmationModalWrapper>
                <div
                    className="icon-box"
                >
                    <AreYouSure />
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
                        {message}
                    </div>
                )}
                <div
                    className="call-to-action-button-box"
                >
                    <BaseButton
                        onClick={handleCallToActionClick}
                    >
                        {isLoading ?
                            (<DotLoader
                                size={20}
                                color="white"
                                className='dotLoader'
                            />) : (
                                <Span>{callToAction}</Span>
                            )}
                    </BaseButton>
                </div>
            </ConfirmationModalWrapper>
        </BaseModal>
    )
}