import { ForgotPasswordWrapper } from "./styled";
import { Login, LogoII } from "../../assets";
import { Row } from "../../components/flex/styled";
import { BaseFieldSet } from "../../components/form/fieldset/styled";
import { BaseInput } from "../../components/form/input/styled";
import { Label, Span } from "../../components/typography/styled";
import { BaseButton } from "../../components/button/styled";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import { forgotPassword } from "../../utils/apis/user/forgotPassword";


export const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [payload, setPayload] = useState({
    Email: "",
  })
  
   const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (!payload.Email) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(payload.Email);
      setSuccess(response.message || "Password reset link sent succesfully!");
        setPayload({ Email: "" });
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
        }finally {
          setIsLoading(false);
        }
  };



  return (
    <ForgotPasswordWrapper>
       <div className="logo-box-area">
              <LogoII/>
            </div>
            <Row tocolumn={true} className="main-area">
              <div className="auth-img">
                <Login/>
              </div>
              <form className="auth-form" onSubmit={handleSubmit}>
                <legend>Enter your email to reset your password</legend>
                <BaseFieldSet>
                  <Label>Email*</Label>
                  <BaseInput
                  type="email"
                    name="Email"
                    placeholder="Enter Email"
                     value={payload.Email}
                     onChange={(e) => handleChange(e)}
                      disabled={isLoading}
                  />
                </BaseFieldSet>
                {error && <Span style={{ color: "red", marginBottom: "10px" }}>{error}</Span>}
          {success && <Span style={{ color: "green", marginBottom: "10px" }}>{success}</Span>}

                <BaseButton type="submit" backgroundcolor={"#4E57BB"} disabled={isLoading}>
                   {isLoading ? (
                                <DotLoader size={20} color="white" className="dotLoader" />
                              ) : (
                                <Span>Submit</Span>
                              )}
          
                </BaseButton>
              </form>
            </Row>
    </ForgotPasswordWrapper>
      
  );
}
