import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prelim } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import {
  H1,
  H3,
  P,
  Label,
  H2,
  Span,
} from "../../../components/typography/styled";
import { GetStartedWrapper, GetStartedWrapperRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { DotLoader } from "react-spinners";
import { GetStartedSuccessModal } from "../../../containers/app/modals/getstartedmodal";
import Cookies from "universal-cookie";
import { verifyUserEmail } from "../../../utils/apis/authentication/employer/verifyEmail";
import { setUserPassword } from "../../../utils/apis/authentication/employer/setPassword";

export const GetStarted = () => {
  const cookies = new Cookies();
  const otpModalRef = useRef();
  const navigate = useNavigate();
  const [showPasswordFields, setShowPasswordFields] = useState({
    password: false,
    confirmPassword: false,
  });

  const [isOTPEntered, setIsOTPEntered] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  useEffect(() => {
    if (step === 1) {
      setFormDetails({ email: "" });
    } else if (step === 2) {
      setFormDetails({ password: "", confirmPassword: "" });
    }
  }, [step]);

  useEffect(() => {
    if (isOTPEntered) {
      setStep(2);
      otpModalRef.current.clearOtp();
    }
  }, [isOTPEntered]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOTPModal = () => {
    // update modal to open below
    otpModalRef.current.openOtpModal();
  };

  const handleVerifyEmail = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await verifyUserEmail(formDetails);
      if (response.status === "Success") {
        setToken(response.token);
        setIsLoading(false);
        setUserEmail(formDetails.email);
        setStep(2);
        handleOTPModal();
      } else {
        setIsLoading(false);
        setError(
          "Email verification failed. Please check your credentials and try again."
        );
        console.error(
          "Email verification failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Email verification failed. ${error.message}`);
      console.error("Email verification failed:", error);
    }
  };

  const handleSetPassword = async () => {
    try {
      const response = await setUserPassword(
        otpModalRef.current.retrieveGetStartedToken(),
        formDetails
      );
      if (response.status === "Success") {
        setIsLoading(false);
        cookies.set("token", response.token, {
          path: "/",
          maxAge: 1000000,
        });
        if (response.status === "Success") {
          navigate("/login");
        }
      } else {
        setIsLoading(false);
        setError(
          "Set password failed. Please check your credentials and try again."
        );
        console.error(
          "Set password failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Set password failed. ${error.message}`);
      console.error("Set password failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      return await handleVerifyEmail();
    }
    setError(null);
    setIsLoading(true);
    await handleSetPassword();
    return;
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <GetStartedWrapper tocolumn={true}>
      <div className="first-section">
        <H1>workPlacePAY</H1>
        <H3>A few clicks from creating your account </H3>
        <P>Easy Payroll management for your business all in one place!</P>
        <Prelim />
        <P className="foot">POWERED BY: FOCUS GROUP</P>
      </div>
      <div className="emailAddress-page">
        <H2>Get started with workPlacePAY</H2>
        <P>
          Please provide the following details to set up your company with
          workPlacePAY
        </P>
        <form onSubmit={handleSubmit}>
          <BaseFieldSet>
            {step === 1 ? (
              <Label>Email Address:</Label>
            ) : (
              <Label>Password:</Label>
            )}
            <GetStartedWrapperRow step={step}>
              {step === 1 ? (
                <BaseInput
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required
                  value={formDetails.email}
                  onChange={(e) => handleChange(e)}
                />
              ) : (
                <Fragment>
                  <div style={{ position: "relative" }}>
                    <BaseInput
                      type={showPasswordFields.password ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      required
                      value={formDetails.password}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingRight: "60px" }}
                      />
                      <span
                        onClick={() => togglePasswordVisibility("password")}
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#4E57BB",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {showPasswordFields.password ? "Hide" : "Show"}
                      </span>
                  </div>
                  <div style={{ position: "relative", marginTop: "1rem" }}>
                    <BaseInput
                      type={showPasswordFields.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
                      value={formDetails.confirmPassword}
                      onChange={(e) => handleChange(e)}
                      style={{ paddingRight: "60px" }}
                      />
                      <span
                        onClick={() => togglePasswordVisibility("confirmPassword")}
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#4E57BB",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {showPasswordFields.confirmPassword ? "Hide" : "Show"}
                      </span>
                  </div>
                </Fragment>
              )}
              <BaseButton type="submit" width={"fit-content"}>
                {isLoading ? (
                  <DotLoader size={20} color="white" className="dotLoader" />
                ) : (
                  <Span>Get Started</Span>
                )}
              </BaseButton>
            </GetStartedWrapperRow>
            {error && <P style={{ color: "red" }}>{error}</P>}
          </BaseFieldSet>
        </form>
      </div>
      <GetStartedSuccessModal
        ref={otpModalRef}
        width={"40%"}
        TOKEN={token}
        email={" " + userEmail}
        setIsOTPEntered={setIsOTPEntered}
      />
    </GetStartedWrapper>
  );
};
