import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { useNavigate } from "react-router-dom";
import { ResetPasswordModalWrapper } from "./styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { Context } from "../../../../context";
import Cookies from "universal-cookie";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { passwordReset } from "../../../../utils/apis/user/passwordreset";

export const ResetPasswordModal = ({ height, width }) => {
  const { isResetPasswordModalOpen, setIsResetPasswordModalOpen } =
    useContext(Context);
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
  const [matches, setMatches] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleCloseModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        setIsResetPasswordModalOpen(false);
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

  const togglePasswordVisibility = (field) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.screen.availWidth < 425);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BaseModal
      open={isResetPasswordModalOpen}
      onClose={handleCloseModal}
      className={"reset-password-modal"}
      height={height || "auto"}
      width={matches ? "60%" : width || "50%"}
    >
      <ResetPasswordModalWrapper>
        <form onSubmit={handleSubmit}>
          <legend>CHANGE PASSWORD</legend>
          <BaseFieldSet>
            <Label>Enter Password</Label>
            <BaseInput
              type={showPasswordFields.old ? "text" : "password"}
              name="oldPassword"
              value={formDetails.oldPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("old")}
              style={{
                position: "absolute",
                right: "93px",
                transform: "translateY(60%)",
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
              value={formDetails.newPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("new")}
              style={{
                position: "absolute",
                right: "93px",
                transform: "translateY(60%)",
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
              value={formDetails.confirmPassword}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
            <span
              onClick={() => togglePasswordVisibility("confirm")}
              style={{
                position: "absolute",
                right: "93px",
                transform: "translateY(60%)",
                cursor: "pointer",
                color: "#4E57BB",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {showPasswordFields.confirm ? "Hide" : "Show"}
            </span>
          </BaseFieldSet>
          <BaseButton type="submit" backgroundcolor={"#4E57BB"}>
            {loading ? (
              <DotLoader size={20} color="white" className="dotLoader" />
            ) : (
              <Span>Save</Span>
            )}
          </BaseButton>
          {error && <P style={{ color: "red" }}>{error}</P>}
        </form>
      </ResetPasswordModalWrapper>
    </BaseModal>
  );
};
