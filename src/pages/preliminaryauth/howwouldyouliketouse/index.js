import { Prelim } from "../../../assets";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { H1, H3, P } from "../../../components/typography/styled";
import { HowWouldYouLikeToUseWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

export const HowWouldYouLikeToUse = () => {
  const navigate = useNavigate();
  return (
    <HowWouldYouLikeToUseWrapper tocolumn={true}>
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
          <BaseButton
            onClick={() => navigate("/getstarted")}
          >
            I am an Employer
          </BaseButton>
          <BaseButton
            onClick={() => navigate("/refer")}
          >
            I want to refer my Employer
          </BaseButton>
        </Column>
      </Column>
    </HowWouldYouLikeToUseWrapper>
  );
};
