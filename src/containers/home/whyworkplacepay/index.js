import { WhyWorkPlacePayWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import heroImage from "../../../assets/images/Managed-payroll-services .png";
import { H2, H3, P } from "../../../components/typography/styled";
import { Column } from "../../../components/flex/styled";

export const WhyWorkPlacePay = () => {
  return (
    <WhyWorkPlacePayWrapper tocolumn={true}>
      {/* Ibukun your html code should begin below this line */}
      <div className="hero-img">
        <img src={heroImage} alt="diplomatic agreement" />
      </div>
      <Column className="hero-text">
        <H2>why workPlacePay?</H2>
        <H3>Empower your business with seamless payroll management</H3>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          sem orci. Nunc a sagittis lacus. Nunc turpis augue, sodales quis
          fermentum vitae, vestibulum a orci. Donec vitae ultrices odio. Mauris
          condimentum id arcu sit amet venenatis. Quisque vitae nisi egestas,
          varius lorem eget, aliquam neque. Donec ornare egestas lacinia. Nulla
          pellentesque eleifend ullamcorper.
        </P>
        <BaseButton width={"fit-content"}>Get Started</BaseButton>
      </Column>
    </WhyWorkPlacePayWrapper>
  );
};
