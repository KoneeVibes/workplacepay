import { H1 } from "../../components/typography/styled";
import loginImage from "../../assets/images/Rectangle 90.png";
import { AuthWrapper } from "./styled";

export const Auth = () => {
  return (
    <AuthWrapper>
      {/* Newton and Awele, your html code should go under here */}
      <H1>workPlacePay</H1>
      <div className="logo-img">
        <img src={loginImage} alt="diplomatic agreement" />
      </div>
      <div></div>
    </AuthWrapper>
  );
};
