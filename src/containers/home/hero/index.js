import { BaseButton } from "../../../components/buttons";
import { HeroWrapper } from "./styled";
// import { HeroBaseButton } from "./styled";

export const Hero = () => {
  return (
    <HeroWrapper>
      {/* Newton your html should begin below this line */}
    </HeroWrapper>
  );
};

    return (
        <HeroWrapper>
            {/* Newton your html should begin below this line */}
            <div className="container">
                <h1>Revolutionize Payroll Management With workPlacePAY</h1>
                <p>Welcome to workPlacePAY, where managing payroll is no longer a chore. Our Payroll Management System is your key to streamlined, error-free payroll processing. Set it up once, and experience the ease of payroll management forever.</p>
                <div className="hero-button">
                    <BaseButton backgroundColor={"#4E57BB"}>Get Started</BaseButton>
                    <BaseButton>Login</BaseButton>
                </div>
            </div>

        </HeroWrapper>
    )
}