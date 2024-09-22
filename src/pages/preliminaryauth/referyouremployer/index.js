import { useState } from "react";
import { H1, H2, H3, P, Label } from "../../../components/typography/styled";
import { ReferYourEmployerWrapper, ReferYourEmployerRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";

export const ReferYourEmployer = () => {
    const [referForm, setReferForm] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        companyEmail: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReferForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(referForm);
    }
    return (
        <ReferYourEmployerWrapper tocolumn={true}>
            {/* IBK, your HTML should go under here */}
            <div className="refer-text">
                <H2>workPlacePAY</H2>
                <H3>The #1 Employee 
                    Payroll Solution for
                    Small and medium Businesses
                </H3>
                <P>Seamless Payroll management for your buisnessall in one place!</P>
                <PrelimSetup />
            </div>
            <div className="refer-form">
                <H1>Refer your Employer </H1>
                <P>Please  provide the following details to refer your employer to workPlacePAY</P>
                <form onSubmit={handleSubmit}> 
                <ReferYourEmployerRow>
                     <BaseFieldSet>
                        <Label>Firstname</Label>
                        <BaseInput
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        value={referForm.firstName}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                     </BaseFieldSet>
                     <BaseFieldSet>
                        <Label>Lastname</Label>
                        <BaseInput
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        value={referForm.lastName}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </BaseFieldSet>
                </ReferYourEmployerRow>
                <ReferYourEmployerRow>
                    <BaseFieldSet>
                        <Label color="">Company name*</Label>
                        <BaseInput
                        type="text"
                        name="companyname"
                        placeholder="Company Name"
                        value={referForm.companyName}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Company Email</Label>
                        <BaseInput
                        type="email"
                        name="companyemail"
                        placeholder="Company Email"
                        value={referForm.companyEmail}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </BaseFieldSet>
                </ReferYourEmployerRow>
                <BaseButton backgroundcolor={"#4E57BB"} width={"fit-content"} className="submit-button">
                   Submit
                </BaseButton>
            </form>    
            </div>
        </ReferYourEmployerWrapper>
    )
}