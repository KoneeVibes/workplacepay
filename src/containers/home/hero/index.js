import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../../components/button/styled";
import { H1, P } from "../../../components/typography/styled";
import { HeroButtonRow, HeroWrapper } from "./styled";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <HeroWrapper>
      {/* Newton your html should begin below this line */}
      <H1>Revolutionize Payroll Management With workPlacePAY</H1>
      <P>
        Welcome to workPlacePAY, where managing payroll is no longer a chore.
        Our Payroll Management System is your key to streamlined, error-free
        payroll processing. Set it up once, and experience the ease of payroll
        management forever.
      </P>
      <HeroButtonRow>
        <BaseButton
          backgroundcolor={"#4E57BB"}
          width={"fit-content"}
          onClick={() => navigate("/how")}
        >
          Get Started
        </BaseButton>
        <BaseButton width={"fit-content"}>Login</BaseButton>
      </HeroButtonRow>
    </HeroWrapper>
  );
};
