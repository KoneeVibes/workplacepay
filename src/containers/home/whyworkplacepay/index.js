import { WhyWorkPlacePayWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import heroImage from "../../../assets/images/Managed-payroll-services .png";
import { H2, H3, P } from "../../../components/typography/styled";
import { Column } from "../../../components/flex/styled";

export const WhyWorkPlacePay = () => {
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
        <H2>why workPlacePay?</H2>
        <H3>Empower your business with seamless payroll management</H3>
        <P>
          WorkPlacePay is a comprehensive payroll management solution that automates salary calculations,
          tax deductions, and compliance tracking. Designed for global operations, it supports multiple
          currencies and local tax regulations. Employees can access payslips, tax documents, and leave
          requests via a self-service portal, reducing HR workload. With direct bank payments and detailed
          reporting, WorkPlacePay streamlines payroll processes, enhances accuracy, and saves time.
        </P>
        <BaseButton width={"fit-content"}>Get Started</BaseButton>
      </Column>
    </WhyWorkPlacePayWrapper>
  );
};
