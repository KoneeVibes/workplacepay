import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prelim } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { H1, H3, P, Label, H2, Span } from "../../../components/typography/styled";
import { GetStartedWrapper, GetStartedWrapperRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { authenticateUser } from "../../../utils/apis/authentication";
import { DotLoader } from "react-spinners";

export const GetStarted = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOTPModal = () => {
    // update modal to open below

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // logic to open modal here
      return handleOTPModal();
    }
    setError(null);
    setIsLoading(true);
    try {
      console.log(formDetails)
      const response = await authenticateUser("sign-up", formDetails);
      if (response.status) {
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        setError('Authentication failed. Please check your credentials and try again.');
        console.error("Authentication failed. Please check your credentials and try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Login failed. ${error.message}`);
      console.error('Login failed:', error);
    }
  };

  return (
    <GetStartedWrapper tocolumn={true}>
      <div className="first-section">
        <H1>WorkPlacePay</H1>
        <H3>A few clicks from creating your account </H3>
        <P>Seamless Payroll management for your business all in one place!</P>
        <Prelim />
      </div>
      <div className="emailAddress-page">
        <H2>Get started with workPlacePAY</H2>
        <P>
          Please provide the following details to set up your company with
          workPlacePAY
        </P>
        <form
          onSubmit={handleSubmit}
        >
          <BaseFieldSet>
            {(step === 1) ? (
              <Label>Email Address:</Label>
            ) : (
              <Label>Password:</Label>
            )}
            <GetStartedWrapperRow>
              {(step === 1) ? (
                <BaseInput
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required
                  value={formDetails.email}
                  onChange={(e) => handleChange(e)}
                />
              ) : (
                <BaseInput
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  value={formDetails.password}
                  onChange={(e) => handleChange(e)}
                />
              )}
              <BaseButton
                type="submit"
                width={"fit-content"}
              >
                {isLoading ?
                  (<DotLoader
                    size={48}
                    color="white"
                    className='dotLoader'
                  />) : (<Span>Get Started</Span>)
                }
              </BaseButton>
            </GetStartedWrapperRow>
            {error && <P style={{ color: 'red' }}>{error}</P>}
          </BaseFieldSet>
        </form>
      </div>
    </GetStartedWrapper >
  );
};
