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
import { passwordReset } from "../../../../utils/apis/passwordReset";

export const ResetPasswordModal = ({ height, width }) => {
  const { isResetPasswordModalOpen, setIsResetPasswordModalOpen } =
    useContext(Context);
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  let token = cookie.TOKEN;

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
              name="oldPassword"
              value={formDetails.oldPassword}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Enter New Password</Label>
            <BaseInput
              name="newPassword"
              value={formDetails.newPassword}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Confirm New Password</Label>
            <BaseInput
              name="confirmPassword"
              value={formDetails.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
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
