import React, { useState } from "react";
import { PasswordResetAreaWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { H2, Label, P } from "../../../components/typography/styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { Layout } from "../../../containers/app/layout";
import { passwordReset } from "../../../utils/apis/user/passwordreset";

export const PasswordResetArea = () => {
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  let token = cookie.TOKEN;

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await passwordReset(token, formDetails);
      if (response.status === "Success") {
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        setError("Submission failed. Please check your inputs and try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(`Submission failed. ${error.message}`);
      console.error("Submission failed:", error);
    }
  };

  return (
    <Layout id={"passwordReset"} title={"Password Reset"}>
      <PasswordResetAreaWrapper>
        <H2>RESET PASSWORD</H2>
        <form onSubmit={handleSubmit}>
          <BaseFieldSet>
            <Label>Enter Password</Label>
            <BaseInput
              name="oldPassword"
              placeholder="Enter Old Password"
              required
              value={formDetails.oldPassword}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Enter New Password</Label>
            <BaseInput
              name="newPassword"
              placeholder="Enter New Password"
              required
              value={formDetails.newPassword}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Confirm New Password</Label>
            <BaseInput
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              value={formDetails.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseButton type="submit">
            {loading ? (
              <DotLoader size={20} color="white" className="dotLoader" />
            ) : (
              "Continue"
            )}
          </BaseButton>
        </form>
        {error && <P style={{ color: "red" }}>{error}</P>}
      </PasswordResetAreaWrapper>
    </Layout>
  );
};
