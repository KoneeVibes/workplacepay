import { Prelim } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { H1, H3, P, Label, H2, Span } from "../../../components/typography/styled";
import { GetStartedWrapper, GetStartedWrapperRow } from "./styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { useState } from "react";

export const GetStarted = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  return (
    <GetStartedWrapper tocolumn={true}>
      {/* Newton and Awele, your html code should go under here */}
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
            <Label>Email Address:</Label>
            <GetStartedWrapperRow>
              <BaseInput
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={(e) => handleChange(e)}
              />
              <BaseButton
                type="submit"
                width={"fit-content"}
              >
                <Span>
                  Get Started
                </Span>
              </BaseButton>
            </GetStartedWrapperRow>
          </BaseFieldSet>
        </form>
      </div>
    </GetStartedWrapper>
  );
};
