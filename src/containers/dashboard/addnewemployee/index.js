import { Fragment, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Layout } from "../layout";
import { AddNewEmployeeWrapper } from "./styled";
import { H2, P, Label } from "../../../components/typography/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { AddNewEmployeeRow } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { Column } from "../../../components/flex/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { BaseTextArea } from "../../../components/form/textarea/styled";

export const AddNewEmployee = () => {
    // const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [matches, setMatches] = useState(false);
    const [formDetails, setFormDetails] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        middleName: "",
        dob: "",
        email: "",
        phoneNumber: "",
        nin: "",
        address: "",
        hireDate: "",
        department: "",
        jobPosition: "",
        grossPay: "",
        bankName: "",
        bankAccount: "",
        pensionFirm: "",
        pensionAccount: "",
        taxNumber: "",
        nextOfKinTitle: "",
        nextOfKinName: "",
        nextOfKinRelationship: "",
        nextOfKinAddress: "",
        nextOfKinNumber: "",
        emergencyContactTitle: "",
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactNumber: "",
        emergencyContactAddress: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClickPrevious = () => {
        setStep((prev) => {
            return prev - 1;
        })
    };

    const handleClickNext = async (e, step) => {
        if (step === 2) {
            return await handleSubmit(e);
        };
        // perform form validation here to ensure that all the field
        // in step one have been entered
        setStep((prev) => {
            return prev + 1;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails);
    };

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout
            title={"Add new employee"}
        >
            <AddNewEmployeeWrapper>
                <Column className="employeeForm">
                    {step === 1 && (
                        <div className="formText">
                            <H2>Personal Details</H2>
                            <P>Add user by capturing all the details</P>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="formText">
                            <H2>Next of Kin</H2>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <Fragment>
                                <BaseFieldSet>
                                    <Label>USERNAME (System generated)</Label>
                                    <BaseInput
                                        type="text"
                                        name="userName"
                                        value={formDetails.userName}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>FIRST NAME *</Label>
                                        <BaseInput
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter First Name"
                                            value={formDetails.firstName}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>LAST NAME *</Label>
                                        <BaseInput
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter Last Name"
                                            value={formDetails.lastName}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>MIDDLE NAME </Label>
                                        <BaseInput
                                            type="text"
                                            name="middleName"
                                            placeholder="Enter Middle Name"
                                            value={formDetails.middleName}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>DATE OF BIRTH *</Label>
                                        <BaseInput
                                            type="date"
                                            name="dob"
                                            value={formDetails.dob}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>EMAIL *</Label>
                                        <BaseInput
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            value={formDetails.email}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>PHONE NUMBER *</Label>
                                        <BaseInput
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Enter PhoneNumber"
                                            value={formDetails.phoneNumber}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>NATIONAL ID NO (NIN) *</Label>
                                        <BaseInput
                                            type="text"
                                            name="nin"
                                            placeholder="Enter NIN"
                                            value={formDetails.nin}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>ADDRESS *</Label>
                                        <BaseInput
                                            type="text"
                                            name="address"
                                            placeholder="Enter Address"
                                            value={formDetails.address}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <H2>Corporate Details</H2>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>DEPARTMENT *</Label>
                                        <BaseInput
                                            type="text"
                                            name="department"
                                            placeholder="Enter Department"
                                            value={formDetails.department}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>HIRE DATE *</Label>
                                        <BaseInput
                                            type="date"
                                            name="hireDate"
                                            value={formDetails.hireDate}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseFieldSet>
                                    <Label>JOB POSITION*</Label>
                                    <BaseInput
                                        type="text"
                                        name="jobPosition"
                                        placeholder="Enter Job Position"
                                        value={formDetails.jobPosition}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <H2>Payroll Setup</H2>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>Annual GROSS PAY*</Label>
                                        <BaseInput
                                            type="text"
                                            name="grossPay"
                                            value={formDetails.grossPay}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>SALARY BANK NAME</Label>
                                        <BaseSelect
                                            name="bankName"
                                            value={formDetails.bankName}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Bank A">Bank A</option>
                                            <option value="Bank B">Bank B</option>
                                        </BaseSelect>
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>SALARY BANK ACCOUNT</Label>
                                        <BaseInput
                                            type="text"
                                            name="bankAccount"
                                            value={formDetails.bankAccount}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>PENSION FIRM</Label>
                                        <BaseSelect
                                            name="pensionFirm"
                                            value={formDetails.pensionFirm}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Pension Firm A">Pension Firm A</option>
                                            <option value="Pension Firm B">Pension Firm B</option>
                                        </BaseSelect>
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>PENSION ACCOUNT</Label>
                                        <BaseInput
                                            type="text"
                                            name="pensionAccount"
                                            value={formDetails.pensionAccount}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>TAX IDENTIFICATION NUMBER</Label>
                                        <BaseInput
                                            type="text"
                                            name="taxNumber"
                                            value={formDetails.taxNumber}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseButton
                                    backgroundcolor={"#4E57BB"}
                                    width={"fit-content"}
                                    onClick={(e) => handleClickNext(e, step)}
                                >
                                    Next
                                </BaseButton>
                            </Fragment>
                        )}
                        {step === 2 && (
                            <Fragment>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>Next of Kin’s Title</Label>
                                        <BaseSelect
                                            name="nextOfKinTitle"
                                            value={formDetails.nextOfKinTitle}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Other">Other</option>
                                        </BaseSelect>
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>Next of Kin’s Name</Label>
                                        <BaseInput
                                            type="text"
                                            name="nextOfKinName"
                                            value={formDetails.nextOfKinName}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>Relationship</Label>
                                        <BaseInput
                                            type="text"
                                            name="nextOfKinRelationship"
                                            value={formDetails.nextOfKinRelationship}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>Phone NUMBER</Label>
                                        <BaseInput
                                            type="tel"
                                            name="nextOfKinNumber"
                                            value={formDetails.nextOfKinNumber}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseFieldSet>
                                    <Label>Contact Address</Label>
                                    <BaseTextArea
                                        className="address"
                                        type="text"
                                        name="nextOfKinAddress"
                                        value={formDetails.nextOfKinAddress}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <H2>Emergency Contacts</H2>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>Contact’s Title</Label>
                                        <BaseSelect
                                            name="emergencyContactTitle"
                                            value={formDetails.emergencyContactTitle}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Other">Other</option>
                                        </BaseSelect>
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>Contact’s Name</Label>
                                        <BaseInput
                                            type="text"
                                            name="emergencyContactName"
                                            value={formDetails.emergencyContactName}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                    <BaseFieldSet>
                                        <Label>Relationship</Label>
                                        <BaseSelect
                                            name="emergencyContactRelationship"
                                            value={formDetails.emergencyContactRelationship}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Father">Father</option>
                                            <option value="Mother">Mother</option>
                                            <option value="Other">Other</option>
                                        </BaseSelect>
                                    </BaseFieldSet>
                                    <BaseFieldSet>
                                        <Label>Phone Number</Label>
                                        <BaseInput
                                            type="tel"
                                            name="emergencyContactNumber"
                                            value={formDetails.emergencyContactNumber}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseFieldSet>
                                    <Label>Contact Address</Label>
                                    <BaseTextArea
                                        className="address"
                                        type="text"
                                        name="emergencyContactAddress"
                                        value={formDetails.emergencyContactAddress}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <Column
                                    className="submit-column"
                                >
                                    <BaseButton
                                        backgroundcolor={"#4E57BB"}
                                        width={matches ? "-webkit-fill-available" : "fit-content"}
                                        onClick={(e) => handleClickPrevious(e, step)}
                                    >
                                        Previous
                                    </BaseButton>
                                    <BaseButton
                                        type="submit"
                                        backgroundcolor={"#4E57BB"}
                                        width={matches ? "-webkit-fill-available" : "fit-content"}
                                    >
                                        Submit
                                    </BaseButton>
                                </Column>
                            </Fragment>
                        )}
                    </form>
                </Column>
            </AddNewEmployeeWrapper>
        </Layout>
    )
}