import { Fragment, useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../components/modal";
import { H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { PaymentModalWrapper } from "./styled";
import { Context } from "../../../context";
import { Column, Row } from "../../../components/flex/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { CreditCards, GreenTick, PaystackLogo } from "../../../assets";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseButton } from "../../../components/button/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const PaymentModal = () => {
    const navigate = useNavigate();
    const { isPaymentFormModalOpen, setIsPaymentFormModalOpen } = useContext(Context);
    const [matches, setMatches] = useState(false);
    const [isPaymentSuccessModal, setIsPaymentSuccessModal] = useState(false);
    const [formDetails, setFormDetails] = useState({
        fundWithPaystack: "",
        cardHolderName: "",
        cardNumber: "",
        expiryDate: "",
        CVV: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOpenPaymentSuccessModal = () => {
        setIsPaymentSuccessModal(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails);
        handleOpenPaymentSuccessModal(e);
    };

    const handleCloseModal = () => {
        setIsPaymentSuccessModal(false);
        setIsPaymentFormModalOpen(false);
    }

    const handleNavigateToLogin = () => {
        handleCloseModal();
        navigate("/login");
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
            open={isPaymentFormModalOpen}
            onClose={handleCloseModal}
            className={"payment-modal"}
            height={matches ? "auto" : "50%"}
            width={matches ? "auto" : "50%"}
        >
            <PaymentModalWrapper>
                {(!isPaymentSuccessModal) ? (
                    <Fragment>
                        <Row className="payment-modal-title">
                            <H2>Payment Information</H2>
                            <BaseButton
                                onClick={handleCloseModal}
                                backgroundcolor={"#800000"}
                            >
                                <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                            </BaseButton>
                        </Row>
                        <Row
                            className="payment-details"
                        >
                            <Column
                                style={{
                                    flex: 1,
                                    width: "100%",
                                }}
                            >
                                <H3>Payment Details</H3>
                                <P>Gold</P>
                                <P>70-100 Employees</P>
                            </Column>
                            <Column
                                style={{
                                    flex: 1,
                                    width: "100%",
                                }}
                            >
                                <H3>Amount</H3>
                                <P>N50,000</P>
                            </Column>
                        </Row>
                        <form
                            onSubmit={handleSubmit}
                            className="payment-form"
                        >
                            <Label
                                className="paystack-option"
                            >
                                <BaseInput
                                    type="checkbox"
                                    name="fundWithPaystack"
                                    checked={formDetails.fundWithPaystack}
                                    onChange={(e) => handleChange(e)}
                                    style={{
                                        width: "auto",
                                        flexShrink: 0
                                    }}
                                />
                                <PaystackLogo />
                            </Label>
                            <Row
                                className="legend-row"
                            >
                                <H3>Credit Card</H3>
                                <CreditCards />
                            </Row>
                            <Row
                                tocolumn={true}
                            >
                                <BaseFieldSet>
                                    <Label>Card Holder Name</Label>
                                    <BaseInput
                                        name="cardHolderName"
                                        value={formDetails.cardHolderName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Card Number</Label>
                                    <BaseInput
                                        name="cardNumber"
                                        value={formDetails.cardNumber}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </BaseFieldSet>
                            </Row>
                            <Row
                                tocolumn={true}
                            >
                                <BaseFieldSet>
                                    <Label>Expiry Date</Label>
                                    <BaseInput
                                        type="date"
                                        name="expiryDate"
                                        value={formDetails.expiryDate}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>CVV</Label>
                                    <BaseInput
                                        maxLength={3}
                                        name="CVV"
                                        value={formDetails.CVV}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </BaseFieldSet>
                            </Row>
                            <Row
                                className="form-action-row"
                            >
                                <BaseButton
                                    type="button"
                                    onClick={handleCloseModal}
                                >
                                    <Span>
                                        Cancel
                                    </Span>
                                </BaseButton>
                                <BaseButton
                                    type="submit"
                                    backgroundcolor={"#4E57BB"}
                                >
                                    <Span>
                                        Continue
                                    </Span>
                                </BaseButton>
                            </Row>
                        </form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Column
                            className="receipt-title"
                        >
                            <H2>Payment Information</H2>
                            <GreenTick />
                        </Column>
                        <Row
                            tocolumn={true}
                            className="receipt-detail"
                        >
                            <P>Payment Type</P>
                            <P>Net Banking</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="receipt-detail"
                        >
                            <P>Bank</P>
                            <P>First Bank</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="receipt-detail"
                        >
                            <P>Email</P>
                            <P>ofofonono.umoren@focusgroupng.com</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="receipt-detail"
                        >
                            <P>Amount</P>
                            <P>5000</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="receipt-detail"
                        >
                            <P>Transaction ID</P>
                            <P>125478965698</P>
                        </Row>
                        <Row
                            className="form-action-row"
                        >
                            <BaseButton>
                                <Span>
                                    Print
                                </Span>
                            </BaseButton>
                            <BaseButton
                                backgroundcolor={"#4E57BB"}
                                onClick={handleNavigateToLogin}
                            >
                                <Span>
                                    Proceed to Login
                                </Span>
                            </BaseButton>
                        </Row>
                    </Fragment>
                )}
            </PaymentModalWrapper>
        </BaseModal>
    )
}