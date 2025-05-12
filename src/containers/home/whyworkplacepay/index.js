import { WhyWorkPlacePayWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import heroImage from "../../../assets/images/Managed-payroll-services .png";
import { H2, H3, P } from "../../../components/typography/styled";
import { Column } from "../../../components/flex/styled";
import { useNavigate } from "react-router-dom";

export const WhyWorkPlacePay = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, destination) => {
    e.preventDefault();
    e.stopPropagation();
    return navigate(destination);
  };

  return (
    <WhyWorkPlacePayWrapper
      id="why"
      tocolumn={true}
    >
      {/* Ibukun your html code should begin below this line */}
      <div className="hero-img">
        <img src={heroImage} alt="diplomatic agreement" />
      </div>
      <Column className="hero-text">
        <H2>Why workPlacePAY?</H2>
        <H3>Empower your business with our hassle-free payroll management solution</H3>
        <P>
          workPlacePay is a comprehensive payroll management solution that automates salary calculations and tax deductions in compliance with local regulations. It features a self-service portal where employees can access payslips, retrieve tax documents, and manage their bank information. With support for direct bank payments and detailed reporting, workPlacePay simplifies payroll processes, improves accuracy, and saves valuable time.
        </P>
        <BaseButton
          width={"fit-content"}
          onClick={(e) => handleNavigation(e, "/how")}
        >
          Get Started
        </BaseButton>
      </Column>
    </WhyWorkPlacePayWrapper>
  );
};
