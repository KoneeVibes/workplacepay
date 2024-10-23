import { Layout } from "../layout";
import { AddNewEmployeeWrapper } from "./styled";
import { H2,P,Label } from "../../../components/typography/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { AddNewEmployeeRow } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { Column } from "../../../components/flex/styled";
import { BaseSelect} from "../../../components/form/select/styled";
import { BaseArea } from "../../../components/form/textArea/styled";
import { Fragment, useState } from "react";
//import { useNavigate } from "react-router-dom";

export const AddNewEmployee = () => {
    // const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [AddNewEmployee, setAddNewEmployee] = useState({
        userName:"",
        firstName:"",
        lastName:"",
        middleName:"",
        dob:"",
        email:"",
        phoneNumber:"",
        nin:"",
        address:"",
        hireDate:"",
        department:"",
        jobPosition:"",
        grossPay:"",
        bankName:"",
        bankAccount:"",
        pensionFirm:"",
        pensionAccount:"",
        taxNumber:"",
        nextOfKinTitle:"",
        nextOfKinName:"",
        nextOfKinRelationship:"",
        nextOfkinAddress:"",
        nextOfkinNumber:"",
        emergencyContactTitle:"",
        emergencyContactName:"",
        emergencyContactRelationship:"",
        emergencyContactNumber:"",
        emergencyContactAddress:"",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddNewEmployee((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(AddNewEmployee);
    }
    const handleClickNext = async (e, step) => {
        if (step === 2) {
            await handleSubmit(e);
        };
        setStep((prev) => {
            return prev + 1;
        });
    };

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
                                        value={AddNewEmployee.userName}
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
                                                value={AddNewEmployee.firstName}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>LAST NAME *</Label>
                                            <BaseInput
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter Last Name"
                                                value={AddNewEmployee.lastName}
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
                                                value={AddNewEmployee.middleName}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>DATE OF BIRTH *</Label>
                                            <BaseInput
                                                type="date"
                                                name="dob"
                                                value={AddNewEmployee.dob}
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
                                                value={AddNewEmployee.email}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>PHONE NUMBER *</Label>
                                            <BaseInput
                                                type="tel"
                                                name="phonenumber"
                                                placeholder="Enter PhoneNumber"
                                                value={AddNewEmployee.phoneNumber}
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
                                                value={AddNewEmployee.nin}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>ADDRESS *</Label>
                                            <BaseInput
                                                type="text"
                                                name="address"
                                                placeholder="Enter Address"
                                                value={AddNewEmployee.address}
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
                                                value={AddNewEmployee.department}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>HIRE DATE *</Label>
                                            <BaseInput
                                                type="date"
                                                name="hireDate"
                                                value={AddNewEmployee.hireDate}
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
                                            value={AddNewEmployee.jobPosition}
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
                                                value={AddNewEmployee.grossPay}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>SALARY BANK NAME</Label>
                                            <BaseSelect
                                                name="bankName"
                                                value={AddNewEmployee.bankName}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="A">Payroll A</option>
                                                <option value="B">Payroll B</option>
                                            </BaseSelect>
                                        </BaseFieldSet>
                                    </AddNewEmployeeRow>
                                    <AddNewEmployeeRow>
                                        <BaseFieldSet>
                                            <Label>SALARY BANK ACCOUNT</Label>
                                            <BaseInput
                                                type="text"
                                                name="bankAccount"
                                                value={AddNewEmployee.bankAccount}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>PENSION FIRM</Label>
                                            <BaseSelect
                                                name="pensionFirm"
                                                value={AddNewEmployee.pensionFirm}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="A">Payroll A</option>
                                                <option value="B">Payroll B</option>
                                            </BaseSelect>
                                        </BaseFieldSet>
                                    </AddNewEmployeeRow>
                                    <AddNewEmployeeRow>
                                        <BaseFieldSet>
                                            <Label>PENSION ACCOUNT</Label>
                                            <BaseInput
                                                type="text"
                                                name="pensionAccount"
                                                value={AddNewEmployee.pensionAccount}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>TAX IDENTIFICATION NUMBER</Label>
                                            <BaseInput
                                                type="text"
                                                name="taxNumber"
                                                value={AddNewEmployee.taxNumber}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                    </AddNewEmployeeRow>
                                    <BaseButton backgroundcolor={"#4E57BB"} width={"fit-content"} 
                                    onClick={(e) => handleClickNext(e, step)}
                                    className="submit-button">
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
                                                value={AddNewEmployee.nextOfKinTitle}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="A">Payroll A</option>
                                                <option value="B">Payroll B</option>
                                            </BaseSelect>
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>Next of Kin’s Name</Label>
                                            <BaseInput
                                                type="text"
                                                name="nextOfKinName"
                                                value={AddNewEmployee.nextOfKinName}
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
                                                value={AddNewEmployee.nextOfKinRelationship}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>Phone NUMBER</Label>
                                            <BaseInput
                                                type="tel"
                                                name="nextOfkinNumber"
                                                value={AddNewEmployee.nextOfkinNumber}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseFieldSet>
                                    <Label>Contact Address</Label>
                                    <BaseArea
                                        className="address"
                                        type="text"
                                        name="nextOfkinAddress"
                                        value={AddNewEmployee.nextOfkinAddress}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <H2>Emergency Contacts</H2>
                                <AddNewEmployeeRow>
                                        <BaseFieldSet>
                                            <Label>Contact’s Title</Label>
                                            <BaseSelect
                                                name="emergencyContactTitle"
                                                value={AddNewEmployee.emergencyContactTitle}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="A">Payroll A</option>
                                                <option value="B">Payroll B</option>
                                            </BaseSelect>
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>Contact’s Name</Label>
                                            <BaseInput
                                                type="text"
                                                name="emergencyContactName"
                                                value={AddNewEmployee.emergencyContactName}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <AddNewEmployeeRow>
                                        <BaseFieldSet>
                                            <Label>Relationship</Label>
                                            <BaseSelect
                                                name="emergencyContactRelationship"
                                                value={AddNewEmployee.emergencyContactRelationship}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="A">Payroll A</option>
                                                <option value="B">Payroll B</option>
                                            </BaseSelect>
                                        </BaseFieldSet>
                                        <BaseFieldSet>
                                            <Label>Phone Number</Label>
                                            <BaseInput
                                                type="tel"
                                                name="emergencyContactNumber"
                                                value={AddNewEmployee.emergencyContactNumber}
                                                onChange={(e) => handleChange(e)}
                                                required />
                                        </BaseFieldSet>
                                </AddNewEmployeeRow>
                                <BaseFieldSet>
                                    <Label>Contact Address</Label>
                                    <BaseArea
                                        className="address"
                                        type="text"
                                        name="emergencyContactAddress"
                                        value={AddNewEmployee.emergencyContactAddress}
                                        onChange={(e) => handleChange(e)}
                                        required />
                                </BaseFieldSet>
                                <BaseButton backgroundcolor={"#4E57BB"} width={"fit-content"} className="submit-button">
                                        Submit
                                </BaseButton>
                            </Fragment>
                        )}
                            
                    </form>
                </Column>
            </AddNewEmployeeWrapper>
        </Layout>
    )
}