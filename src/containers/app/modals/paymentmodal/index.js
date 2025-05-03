import { Fragment, useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { H2, H3, Label, P, Span } from "../../../../components/typography/styled";
import { PaymentModalWrapper } from "./styled";
import { Context } from "../../../../context";
import { Column, Row } from "../../../../components/flex/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { CreditCards, GreenTick, PaystackLogo } from "../../../../assets";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseButton } from "../../../../components/button/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getCompanies } from "../../../../utils/apis/company/getCompanies";
import Cookies from "universal-cookie";
import { BaseSelect } from "../../../../components/form/select/styled";
import { purchaseRequestService } from "../../../../utils/apis/credit/purchaseRequest";
import { DotLoader } from "react-spinners";
import { PaystackButton } from 'react-paystack';
import { verifyPurchaseService } from "../../../../utils/apis/credit/verfiyPurchase";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../utils/apis/user/getUser";

export const PaymentModal = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const PK = process.env.REACT_APP_PAYSTACK_PK;

    const navigate = useNavigate();

    const { isPaymentFormModalOpen, setIsPaymentFormModalOpen } = useContext(Context);
    const [matches, setMatches] = useState(false);
    const [isPaymentSuccessModal, setIsPaymentSuccessModal] = useState(false);
    const [formDetails, setFormDetails] = useState({
        companyId: "",
        creditAmount: ""
    });
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedInvoice, setGeneratedInvoice] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompanies(TOKEN);
                return setCompanies(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCompanies();
    }, [TOKEN, isPaymentFormModalOpen]);

    useEffect(() => {
        getUser(TOKEN)
            .then((data) => {
                setLoggedInUser(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN])

    const handlePaystackSuccessCredit = async (reference) => {
        const payload = { reference: String(reference?.reference) };
        try {
            const response = await verifyPurchaseService(
                TOKEN,
                payload
            );
            if (response?.status === "Success") {
                // console.log("credited successfully", response);
                navigate("/dashboard");
            } else {
                console.error("Server failed to verify purchase. Please contact support.");
            }
        } catch (error) {
            console.error("Purchase verification failed:", error);
        }
    };

    const handlePaystackCloseAction = () => {
        // console.log('closed')
    };

    const config = {
        reference: (new Date()).getTime().toString(),
        email: loggedInUser?.email,
        amount: `${generatedInvoice?.totalCreditCost}00`,
        publicKey: PK,
        metadata: {
            invoiceId: generatedInvoice?.invoiceId,
            creditAmount: generatedInvoice?.creditAmount,
            companyName: generatedInvoice?.companyName,
            payrollPlanName: generatedInvoice?.payrollPlanName,
            costPerCredit: generatedInvoice?.costPerCredit,
            totalCreditCost: generatedInvoice?.totalCreditCost,
            dateInitiated: generatedInvoice?.dateInitiated,
        }
    };

    const componentProps = {
        ...config,
        text: 'Proceed to Pay',
        onSuccess: (reference) => handlePaystackSuccessCredit(reference),
        onClose: handlePaystackCloseAction,
    };

    const handleIsPaystackPaymentModalOpen = (e) => {
        e.stopPropagation();
        return handleCloseModal();
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOpenPaymentSuccessModal = () => {
        setIsPaymentSuccessModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await purchaseRequestService(
                TOKEN,
                formDetails
            );
            setGeneratedInvoice(response?.result?.data);
            if (response?.result?.status === "Success") {
                setIsLoading(false);
                handleOpenPaymentSuccessModal(e);
            } else {
                setIsLoading(false);
                setError(
                    "Server failed to raise request. Please contact support."
                );
                console.error(
                    "Server failed to raise request. Please contact support."
                );
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Purchase request failed. ${error.message}`);
            console.error("Purchase request failed:", error);
        }
    };

    const handleCloseModal = () => {
        setIsPaymentSuccessModal(false);
        setIsPaymentFormModalOpen(false);
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
                                    checked={true}
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
                                    <Label>Select Company</Label>
                                    <BaseSelect
                                        name="companyId"
                                        value={formDetails.companyId}
                                        onChange={handleChange}
                                    >
                                        <option
                                            value=""
                                            hidden
                                        >
                                            Select Company
                                        </option>
                                        {companies?.map((company, index) => (
                                            <option
                                                key={index}
                                                value={company.companyId}
                                            >
                                                {company.name}
                                            </option>
                                        ))}
                                    </BaseSelect>
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Wallet Amount</Label>
                                    <BaseInput
                                        name="creditAmount"
                                        value={formDetails.creditAmount}
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
                                    {isLoading ? (
                                        <DotLoader
                                            size={20}
                                            color="white"
                                            className="dotLoader"
                                        />
                                    ) : (
                                        <Span>
                                            Continue
                                        </Span>
                                    )}
                                </BaseButton>
                            </Row>
                            {error && <P style={{ color: "red" }}>{error}</P>}
                        </form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Column
                            className="confirm-invoice-title"
                        >
                            <H2>Confirm Details</H2>
                            <GreenTick />
                        </Column>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Invoice Id</P>
                            <P>{generatedInvoice?.invoiceId}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Wallet Amount</P>
                            <P>{generatedInvoice?.creditAmount}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Cost per credit</P>
                            <P>{generatedInvoice?.costPerCredit}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Total credit cost</P>
                            <P>{generatedInvoice?.totalCreditCost}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Payroll Plan Name</P>
                            <P>{generatedInvoice?.payrollPlanName}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Date Initiated</P>
                            <P>{generatedInvoice?.dateInitiated}</P>
                        </Row>
                        <Row
                            tocolumn={true}
                            className="confirm-invoice-details"
                        >
                            <P>Invoice Status</P>
                            <P>{generatedInvoice?.status}</P>
                        </Row>
                        <Row
                            className="form-action-row"
                        >
                            <BaseButton
                                onClick={handleCloseModal}
                            >
                                <Span>
                                    Cancel
                                </Span>
                            </BaseButton>
                            <div
                                className="paystack-button-wrapper"
                                onClick={handleIsPaystackPaymentModalOpen}
                            >
                                <PaystackButton
                                    {...componentProps}
                                    className="paystack-button"
                                />
                            </div>
                        </Row>
                    </Fragment>
                )}
            </PaymentModalWrapper>
        </BaseModal>
    )
}