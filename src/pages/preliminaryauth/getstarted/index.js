import { Prelim } from "../../../assets";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { H1, H3, P } from "../../../components/typography/styled";
import { GetStartedWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  return (
    <GetStartedWrapper tocolumn={true}>
      {/* Newton and Awele, your html code should go under here */}
      <div className="first-section">
        <H1>WorkPlacePay</H1>
        <H3>A few clicks from creating your account </H3>
        <P>Seamless Payroll management for your business all in one place!</P>
        <Prelim />
      </div>
      <Column className="emainAddress-page">
        <H1>Get started with workPlacePAY</H1>
        <P>
          Please provide the following details to set up your company with
          workPlacePAY
        </P>
        <ReferYourEmployerRow>
          <BaseFieldSet>
            <Label>Email Address:</Label>
            <BaseInput
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
             
          </BaseFieldSet>
        </ReferYourEmployerRow>
        <Column className="basebutton">
          <BaseButton onClick={() => navigate("/login")}>
            Get Started
          </BaseButton>
        </Column>
      </Column>
    </GetStartedWrapper>
  );
};
