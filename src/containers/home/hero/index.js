import { BaseButton } from "../../../components/buttons";
import { HeroWrapper } from "./styled";
// import { HeroBaseButton } from "./styled";
import heroImage from "../../../assets/images/heroImage.jpeg";

export const Hero = () => {
  return (
    <HeroWrapper>
      {/* Newton your html should begin below this line */}
      <div className="container">
        <h1>Revolutionize Payroll Management With workPlacePAY</h1>
        <p>
          Welcome to workPlacePAY, where managing payroll is no longer a chore.
          Our Payroll Management System is your key to streamlined, error-free
          payroll processing. Set it up once, and experience the ease of payroll
          management forever.
        </p>
        <div className="hero-button">
          <BaseButton backgroundColor={"#4E57BB"}>Get Started</BaseButton>
          <BaseButton>Login</BaseButton>
        </div>
      </div>

      <div className="second-hero">
        <img
          src={heroImage}
          alt="a picture representing diplomatic agreement"
        />
        <div className="second-hero-text-section">
          <h2>why workPlacePay?</h2>
          <h3>Empower your business with seamless payroll management</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
            sem orci. Nunc a sagittis lacus. Nunc turpis augue, sodales quis
            fermentum vitae, vestibulum a orci. Donec vitae ultrices odio.
            Mauris condimentum id arcu sit amet venenatis. Quisque vitae nisi
            egestas, varius lorem eget, aliquam neque. Donec ornare egestas
            lacinia. Nulla pellentesque eleifend ullamcorper.
          </p>
          <BaseButton>Get Started</BaseButton>
        </div>
      </div>
    </HeroWrapper>
  );
};
