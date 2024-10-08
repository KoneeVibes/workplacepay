import { Layout } from "../layout";
import { AddNewEmployeeWrapper } from "./styled";
import { H1,P,Label } from "../../../components/typography/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { AddNewEmployeeRow } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { Column } from "../../../components/flex/styled";
import { BaseSelect} from "../../../components/form/select/styled";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AddNewEmployee = () => {
    
    const [AddNewEmployee, setAddNewEmployee] = useState({
        username:"",
        firstname:"",
        lastname:"",
        dob:"",
        email:"",
        phonenumber:"",
        nin:"",
        address:"",
        hiredate:"",
        department:"",
        jobpost:"",
        grosspay:"",
        bankname:"",
        bankacc:"",
        pension:"",
        pensionacc:"",
        taxnum:"",
        
        
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
    return (
        <Layout
            title={"Add new employee"}
        >
            <AddNewEmployeeWrapper>
                {/* IBK your HTML should go in below this line */}
                <Column className="employeeForm">
                    <div>
                        <H1>Personal Details</H1>
                        <P>Add user by capturing all the details</P>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <BaseFieldSet>
                            <Label>USERNAME (System generated)</Label>
                            <BaseInput
                                type="text"
                                name="username"
                                 value={AddNewEmployee.username}
                                 onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <AddNewEmployeeRow>
                        <BaseFieldSet>
                            <Label>FIRST NAME *</Label>
                            <BaseInput
                                type="text"
                                name="firstname"
                                placeholder="Enter First Name"
                                 value={AddNewEmployee.firstname}
                                 onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>LAST NAME *</Label>
                            <BaseInput
                                type="text"
                                name="lastname"
                                placeholder="Enter Last Name"
                                value={AddNewEmployee.lastname}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        </AddNewEmployeeRow>
                        <AddNewEmployeeRow>
                        <BaseFieldSet>
                            <Label>MIDDLE NAME </Label>
                            <BaseInput
                                type="text"
                                name="middlename"
                                placeholder="Enter Middle Name"
                                value={AddNewEmployee.middlename}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>DATE OF BIRTH *</Label>
                            <BaseInput
                                type="date"
                                name="dob"
                                value={AddNewEmployee.dob}
                                onChange={(e) => handleChange(e)}
                                required
                                />
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
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>PHONE NUMBER *</Label>
                            <BaseInput
                                type="tel"
                                name="phonenumber"
                                placeholder="Enter Phonenumber"
                                value={AddNewEmployee.phonenumber}
                                onChange={(e) => handleChange(e)}
                                required
                                />
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
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>ADDRESS *</Label>
                            <BaseInput
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={AddNewEmployee.address}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        </AddNewEmployeeRow>
                        <H1>Corporate Details</H1>
                        <AddNewEmployeeRow>
                        <BaseFieldSet>
                            <Label>DEPARTMENT *</Label>
                            <BaseInput
                                type="text"
                                name="department"
                                placeholder="Enter Department"
                                value={AddNewEmployee.department}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>HIRE DATE *</Label>
                            <BaseInput
                                type="date"
                                name="hiredate"
                                value={AddNewEmployee.hiredate}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        </AddNewEmployeeRow>
                        <BaseFieldSet>
                            <Label>JOB POSITION*</Label>
                            <BaseInput
                                type="text"
                                name="jobpost"
                                placeholder="Enter Job Position"
                                value={AddNewEmployee.jobpost}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <H1>Payroll Setup</H1>
                        <AddNewEmployeeRow>
                            <BaseFieldSet>
                                <Label>Annual GROSS PAY*</Label>
                                <BaseInput
                                    type="text"
                                    name="grosspay"
                                    value={AddNewEmployee.grosspay}
                                    onChange={(e) => handleChange(e)}
                                    required
                                    />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>SALARY BANK NAME</Label>
                                <BaseSelect
                                        name="bankname"
                                        value={AddNewEmployee.bankname}
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
                                name="bankacc"
                                value={AddNewEmployee.bankacc}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>PENSION FIRM</Label>
                            <BaseSelect
                                    name="pension"
                                    value={AddNewEmployee.pension}
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
                                name="pensionacc"
                                value={AddNewEmployee.pension}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>TAX IDENTIFICATION NUMBER</Label>
                            <BaseInput
                                type="text"
                                name="taxnum"
                                value={AddNewEmployee.taxnum}
                                onChange={(e) => handleChange(e)}
                                required
                                />
                        </BaseFieldSet>
                        </AddNewEmployeeRow>
                        <BaseButton backgroundcolor={"#4E57BB"} width={"fit-content"} className="submit-button">
                            Submit
                    </BaseButton>
                            
                    </form>
                </Column>
            </AddNewEmployeeWrapper>
        </Layout>
    )
}