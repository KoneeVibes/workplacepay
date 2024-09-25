import { useContext, useState } from "react";
import { PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { H1, H2, H3, Label, P } from "../../../components/typography/styled";
import { FieldSetRow, SetUpYourCompanyWrapper } from "./styled";
import { PaymentModal } from "../../../containers/dashboard/paymentmodal";
import { Context } from "../../../context";
import { Row } from "../../../components/flex/styled";

export const SetUpYourCompany = () => {
    const { setIsPaymentFormModalOpen } = useContext(Context);
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        companyEmail: "",
        plan: ""
    });

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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails);
        // form submission logic goes under here

        // open payment modal based only when the form is successfully submitted
        handleOpenModal();
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
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={formDetails.lastName}
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
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    value={formDetails.phone}
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
                                    name="plan"
                                    value={formDetails.plan}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="A">Payroll A</option>
                                    <option value="B">Payroll B</option>
                                </BaseSelect>
                            </BaseFieldSet>
                        </FieldSetRow>
                        <BaseButton
                            type="submit"
                            backgroundcolor={"#4E57BB"}
                        >
                            Submit
                        </BaseButton>
                    </form>
                </div>
            </Row>
            <PaymentModal />
        </SetUpYourCompanyWrapper >
    )
}