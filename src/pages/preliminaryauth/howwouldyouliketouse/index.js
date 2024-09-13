import { Prelim } from "../../../assets";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/buttons";
import { H1, H3, P } from "../../../components/typography/styled";
import { HowWouldYouLikeToUseWrapper } from "./styled";

export const HowWouldYouLikeToUse = () => {
  return (
    <HowWouldYouLikeToUseWrapper tocolumn={true}>
      {/* Mirabel, your HTML should go under here */}
      <div className="image-page">
        <H1>WorkPlacePay</H1>
        <H3>A few clicks from creating your account </H3>
        <P>Seamless Payroll management for your business all in one place!</P>
        <Prelim />
      </div>
      <Column className="basebutton-page">
        <P>
          How would you like to use workPlacePAY You can create your company
          account right away if you're an employer or refer your employer if
          you're an employee.
        </P>
        <Column className="basebutton">
        <BaseButton>I am an Employer</BaseButton>

          <BaseButton>I want to refer my Employer</BaseButton>
          </Column>
      </Column>
    </HowWouldYouLikeToUseWrapper>
  );
};
