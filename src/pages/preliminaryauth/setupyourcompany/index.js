import { useContext, useEffect, useState } from "react";
import { PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { H1, H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { FieldSetRow, SetUpYourCompanyWrapper } from "./styled";
import { PaymentModal } from "../../../containers/app/modals/paymentmodal";
import { Context } from "../../../context";
import { Row } from "../../../components/flex/styled";
import { setupCompanyService } from "../../../utils/apis/company/setupCompany";
import { DotLoader } from "react-spinners";
import { getPayrollPlans } from "../../../utils/apis/payroll/getPayrollPlans";
import Cookies from "universal-cookie";

export const SetUpYourCompany = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const { setIsPaymentFormModalOpen } = useContext(Context);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [payrollPlans, setPayrollPlans] = useState([]);
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        surname: "",
        othername: "",
        companyName: "",
        companyPhone: "",
        companyEmail: "",
        companyPlan: ""
    });

    useEffect(() => {
        getPayrollPlans(TOKEN)
            .then((data) => {
                setPayrollPlans(data ?? [])
            })
            .catch((err) => {
                console.error("Failed to fetch payroll plans:", err);
            });
    }, [TOKEN])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenModal = () => {
        setIsPaymentFormModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await setupCompanyService(TOKEN, formDetails);
            if (response.status) {
                setIsLoading(false);
                handleOpenModal();
            } else {
                setIsLoading(false);
                setError('Setup failed. Please check your credentials and try again.');
                console.error("Setup failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Setup failed. ${error.message}`);
            console.error('Setup failed:', error);
        }
    };

    return (
        <SetUpYourCompanyWrapper>
            <Row
                tocolumn={true}
                className="setup-main-area"
            >
                <div className="image-container">
                    <H1>workPlacePAY</H1>
                    <H3>The #1 Employee Payroll Solution for Small and medium Businesses</H3>
                    <P>Seamless Payroll management for your buisnessall in one place!</P>
                    <PrelimSetup />
                </div>
                <div className="form-container">
                    <H2>Set up your company</H2>
                    <P>Please  provide the following details to set up your company wih workPlacePAY</P>
                    <form
                        className="set-up-form"
                        onSubmit={handleSubmit}
                    >
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    First Name
                                </Label>
                                <BaseInput
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={formDetails.firstName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Last Name
                                </Label>
                                <BaseInput
                                    name="surname"
                                    placeholder="Enter Last Name"
                                    value={formDetails.lastName}
                                    onChange={(e) => handleChange(e)}

                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Other Name
                                </Label>
                                <BaseInput
                                    name="othername"
                                    placeholder="Enter Other Name"
                                    value={formDetails.othername}
                                    onChange={(e) => handleChange(e)}

                                />
                            </BaseFieldSet>
                        </FieldSetRow>
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    Company Name
                                </Label>
                                <BaseInput
                                    name="companyName"
                                    placeholder="Enter Company Name"
                                    value={formDetails.companyName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Phone Number
                                </Label>
                                <BaseInput
                                    name="companyPhone"
                                    placeholder="Enter Company Phone Number"
                                    value={formDetails.companyPhone}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                        </FieldSetRow>
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    Company Email
                                </Label>
                                <BaseInput
                                    type="email"
                                    name="companyEmail"
                                    placeholder="Enter Company Email"
                                    value={formDetails.companyEmail}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Payroll Plan
                                </Label>
                                <BaseSelect
                                    name="companyPlan"
                                    value={formDetails?.companyPlan}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="">Select a Plan</option>
                                    {payrollPlans?.map((plan, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={plan?.title}
                                            >
                                                {plan?.title}
                                            </option>
                                        )
                                    })}
                                </BaseSelect>
                            </BaseFieldSet>
                        </FieldSetRow>
                        <div>
                            {error && <P style={{ color: 'red', marginBlockStart: 0 }}>{error}</P>}
                            <BaseButton
                                type="submit"
                                backgroundcolor={"#4E57BB"}
                            >
                                {isLoading ?
                                    (<DotLoader
                                        size={20}
                                        color="white"
                                        className='dotLoader'
                                    />) : (
                                        <Span>
                                            Submit
                                        </Span>
                                    )}
                            </BaseButton>
                        </div>
                    </form>
                </div>
            </Row>
            <PaymentModal />
        </SetUpYourCompanyWrapper >
    )
}