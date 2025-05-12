import { Logo, Prelim } from "../../../assets";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { H3, P } from "../../../components/typography/styled";
import { HowWouldYouLikeToUseWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

export const HowWouldYouLikeToUse = () => {
  const navigate = useNavigate();
  return (
    <HowWouldYouLikeToUseWrapper tocolumn={true}>
      <div className="image-page">
        <div className="logo-box-area">
          <Logo />
        </div>
        <div>
          <H3>A few clicks from creating your account </H3>
          <P>Simple payroll management for your business, all within one platform!</P>
          <Prelim style={{ width: "100%", height: "auto" }} />
          <P className="foot">POWERED BY: FOCUS GROUP</P>
        </div>
      </div>
      <Column className="basebutton-page">
        <P>
          How would you like to use workPlacePAY? You can create your company
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
