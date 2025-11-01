import React, { useState } from "react";
import { PasswordResetAreaWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { H2, Label, P } from "../../../../components/typography/styled";
import { BaseButton } from "../../../../components/button/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { Layout } from "../../../../containers/app/layout";
import { passwordReset } from "../../../../utils/apis/user/passwordreset";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";

export const PasswordResetArea = () => {
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  let token = cookie.TOKEN;
  const [showPasswordFields, setShowPasswordFields] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    return navigate("/login");
  };
  const validatePassword = (newPassword, confirmPassword) => {
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
  if (newPassword !== confirmPassword)
    return "Passwords do not match.";
  return null; 
};

  const handlePersistModal = () => {
    return setIsSuccessModalOpen(true);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
     const validationError = validatePassword(
    formDetails.newPassword,
    formDetails.confirmPassword
  );

  if (validationError) {
    setError(validationError);
    return; 
  }
    setLoading(true);
    try {
      const response = await passwordReset(token, formDetails);
      if (response.status === "Success") {
        setLoading(false);
        setIsSuccessModalOpen(true);
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

  const togglePasswordVisibility = (field) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Layout id={"passwordReset"} title={"Password Reset"}>
      <PasswordResetAreaWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"password-reset--success-modal"}
          title={"Success"}
          message={"password has been changed successfully"}
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <H2>RESET PASSWORD</H2>
        <form onSubmit={handleSubmit}>
          <BaseFieldSet style={{ position: "relative" }}>
            <Label>Enter Password</Label>
            <BaseInput
              type={showPasswordFields.old ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Old Password"
              required
              value={formDetails.oldPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("old")}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(20%)",
                cursor: "pointer",
                color: "#4E57BB",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {showPasswordFields.old ? "Hide" : "Show"}
            </span>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Enter New Password</Label>
            <BaseInput
              type={showPasswordFields.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              required
              value={formDetails.newPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("new")}
              style={{
                position: "absolute",
                right: "93px",
                transform: "translateY(100%)",
                cursor: "pointer",
                color: "#4E57BB",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {showPasswordFields.new ? "Hide" : "Show"}
            </span>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Confirm New Password</Label>
            <BaseInput
              type={showPasswordFields.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              value={formDetails.confirmPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("confirm")}
              style={{
                position: "absolute",
                right: "93px",
                transform: "translateY(100%)",
                cursor: "pointer",
                color: "#4E57BB",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {showPasswordFields.confirm ? "Hide" : "Show"}
            </span>
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
