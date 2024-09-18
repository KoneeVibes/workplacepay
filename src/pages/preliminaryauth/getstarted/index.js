import { Prelim } from "../../../assets";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { H1, H3, P, Label } from "../../../components/typography/styled";
import { GetStartedWrapper, GetStartedWrapperRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";

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
        <form>
          <GetStartedWrapperRow>
            <BaseFieldSet>
              <Label>Email Address:</Label>
              <BaseInput
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
            </BaseFieldSet>
          </GetStartedWrapperRow>
          <BaseButton>Get Started</BaseButton>
        </form>
      </Column>
    </GetStartedWrapper>
  );
};
