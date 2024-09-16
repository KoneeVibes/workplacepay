import { Column } from "../../../components/flex/styled";
import { H1, H2, H3, P, Label } from "../../../components/typography/styled";
import { ReferYourEmployerWrapper, ReferYourEmployerRow } from "./styled";
import { BaseInput } from "../../../components/form/input/styled";
import refereImg from "../../../assets/images/refereImg.png" ;

export const ReferYourEmployer = () => {
    return (
        <ReferYourEmployerWrapper tocolumn={true}>
            {/* IBK, your HTML should go under here */}
            <Column className="refer-text">
            <H2>workPlacePAY</H2>
            <H3>The #1 Employee 
            Payroll Solution for
            Small and medium Businesses</H3>
            <P>Seamless Payroll management for your buisnessall in one place!</P>
            <img src={refereImg} alt="Refere Images" className="refere-img"/>
            </Column>
            <div className="refer-form">
                <H1>Refer your Employer </H1>
                <P>Please  provide the following details to refer your employer to workPlacePAY</P>
                <ReferYourEmployerRow
                  tocolumn={true}
                >
                    <div>
                        <Label>Firstname</Label>
                        <BaseInput
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        required
                        />
                    </div>
                    <div>
                        <Label>Lastname</Label>
                        <BaseInput
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        required
                        />
                    </div>
                </ReferYourEmployerRow>
                <ReferYourEmployerRow
                  tocolumn={true}
                >
                    <div>
                        <Label color="">Company name*</Label>
                        <BaseInput
                        type="text"
                        name="companyname"
                        placeholder="Company Name"
                        required
                        />
                    </div>
                    <div>
                        <Label>Company Email</Label>
                        <BaseInput
                        type="email"
                        name="companyemail"
                        placeholder="Company Email"
                        required
                        />
                    </div>
                </ReferYourEmployerRow>
            </div>
        </ReferYourEmployerWrapper>
    )
}