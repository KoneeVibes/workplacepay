import { useState } from "react";
import { H1, H2, H3, P, Label } from "../../../components/typography/styled";
import { ReferYourEmployerWrapper, ReferYourEmployerRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";

export const ReferYourEmployer = () => {
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
                <form> 
                  <ReferYourEmployerRow>
                     <BaseFieldSet>
                        <Label>Firstname</Label>
                        <BaseInput
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        required
                        />
                     </BaseFieldSet>
                     <BaseFieldSet>
                        <Label>Lastname</Label>
                        <BaseInput
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
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
                        required
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Company Email</Label>
                        <BaseInput
                        type="email"
                        name="companyemail"
                        placeholder="Company Email"
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