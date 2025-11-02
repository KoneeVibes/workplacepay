import {  useLocation} from "react-router-dom";
import { setNewPassword } from "../../utils/apis/user/setNewPassword";
import { Row } from "../../components/flex/styled";
import { Login, LogoII } from "../../assets";
import { BaseFieldSet } from "../../components/form/fieldset/styled";
import { BaseInput } from "../../components/form/input/styled";
import { Label, Span } from "../../components/typography/styled";
import { SetNewPasswordWrapper } from "./styled";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../components/button/styled";
// import Cookies from "universal-cookie";

export const SetNewPassword = () => {
  //  const cookies = new Cookies();
  //  const cookie = cookies.getAll();
  //  let token = cookie.TOKEN;


  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [queryToken, setQueryToken] = useState(undefined);
  const [payload, setPayload] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

   useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('token');
        setQueryToken(query);
    }, [location.search]);



   const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validatePassword = (newPassword, confirmNewPassword) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  if (newPassword.length < minLength)
    return "Password must be at least 8 characters long.";
  if (!hasUppercase)
    return "Password must contain at least one uppercase letter.";
  if (!hasLowercase)
    return "Password must contain at least one lowercase letter.";
  if (!hasNumber)
    return "Password must contain at least one number.";
  if (newPassword !== confirmNewPassword)
    return "Passwords do not match.";
  return null; 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validatePassword(
    payload.newPassword,
    payload.confirmNewPassword
  );

  if (validationError) {
    setError(validationError);
    return; 
  }
    setIsLoading(true);
    const finalToken = queryToken ;
       if (!finalToken) {
      setError("No token provided. Please check your reset link.");
      setIsLoading(false);
      return;
        };
    try {
      const response = await setNewPassword(finalToken, payload.newPassword, payload.confirmNewPassword);
        setSuccess(response.message || "Password reset succesfully!");
        setPayload({ newPassword: "", confirmNewPassword: "" });
        } catch (error) {
            const message =
    error?.response?.data?.message || 
    error?.message || 
    "Password reset failed. Please try again.";
  setError(message);
        }finally {
          setIsLoading(false);
        }
  };

  return (
    <SetNewPasswordWrapper>
     <div className="logo-box-area">
        <LogoII/>
        </div>
          <Row tocolumn={true} className="main-area">
              <div className="auth-img">
                <Login/>
              </div>
              <form className="auth-form" onSubmit={handleSubmit}>
                <legend>Enter your new password </legend>
                <BaseFieldSet style={{ position: "relative" }}>
                    <Label>New Password*</Label>
                    <BaseInput
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter New Password" required
                      value={payload.newPassword}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingRight: "60px" }} 
                      disabled={isLoading}
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "50%",
                        transform: "translateY(80%)",
                        cursor: "pointer",
                        color: "#4E57BB",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                   >
                      {showPassword ? "Hide" : "Show"}
                   </span>
                </BaseFieldSet>
                <BaseFieldSet style={{ position: "relative" }}>
                    <Label>Confirm New Password*</Label>
                    <BaseInput
                      type={showPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      placeholder="Enter Password" required
                      value={payload.confirmNewPassword}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingRight: "60px" }} 
                      disabled={isLoading}
                    />
                   <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "50%",
                        transform: "translateY(80%)",
                        cursor: "pointer",
                        color: "#4E57BB",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                   >
                      {showPassword ? "Hide" : "Show"}
                   </span>
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
    </SetNewPasswordWrapper>
  );
};

