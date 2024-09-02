import { WhyWorkPlacePayWrapper } from "./styled";
import { BaseButton } from "../../../components/buttons";
import heroImage from "../../../assets/images/Managed-payroll-services.png";

export const WhyWorkPlacePay = () => {
  return (
    <WhyWorkPlacePayWrapper>
      {/* Ibukun your html code should begin below this line */}
      <div className="second-hero">
        <img src={heroImage} alt="diplomatic agreement" />
        <div className="second-hero-text-section">
          <h4>why workPlacePay?</h4>
          <p className="hero-paragraph">
            Empower your business with seamless payroll management
          </p>
          <p className="second-hero-paragraph">
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
    </WhyWorkPlacePayWrapper>
  );
};
