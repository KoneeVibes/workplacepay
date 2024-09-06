import { BaseButton } from "../../../components/buttons";
import { H1, P } from "../../../components/typograpy/styled";
import { HeroButtonRow, HeroWrapper } from "./styled";

export const Hero = () => {
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
        <BaseButton backgroundcolor={"#4E57BB"}>Get Started</BaseButton>
        <BaseButton>Login</BaseButton>
      </HeroButtonRow>
    </HeroWrapper>
  );
};
