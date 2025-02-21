import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../context";
import { BaseModal } from "../../../../components/modal";
import { AddEmployeeSuccessModalWrapper } from "./styled";
import { H2, P, Span } from "../../../../components/typography/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseButton } from "../../../../components/button/styled";

export const AddEmployeeSuccessModal = ({
  height,
  width,
  setIsFormReset,
  firstName,
  surname,
}) => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(false);
  const { isAddEmployeeSuccessModalOpen, setIsAddEmployeeSuccessModalOpen } =
    useContext(Context);

  const handleCloseModal = () => {
    setIsAddEmployeeSuccessModalOpen(true);
  };

  const handleNavigateToDashboard = () => {
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
    setIsAddEmployeeSuccessModalOpen(false);
    navigate("/dashboard");
  };

  const handleNavigateToAddEmployee = () => {
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
    setIsAddEmployeeSuccessModalOpen(false);
    setIsFormReset(true);
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
      open={isAddEmployeeSuccessModalOpen}
      onClose={handleCloseModal}
      className={"add-new-employee-modal"}
      height={matches ? "auto" : height || "auto"}
      width={matches ? "60%" : width || "50%"}
    >
      <AddEmployeeSuccessModalWrapper>
        <Fragment>
          <div className="confirmation-modal-title">
            <H2>Congratulations</H2>
          </div>
          <div>
            <P>
              You have added a new Employee.
              {surname} {firstName} will receive an onboarding mail with an
              email and password to Login to workplaceplay
            </P>
          </div>
          <div>
            <P>What would you like to do next?</P>
          </div>
          <Row tocolumn={true} className="form-cta-row">
            <BaseButton
              type="button"
              color="#000000"
              backgroundcolor={"#D9D9D9"}
              onClick={handleNavigateToDashboard}
            >
              <Span>Go to Dashboard</Span>
            </BaseButton>
            <BaseButton
              type="button"
              color="#000000"
              backgroundcolor={"#D9D9D9"}
              onClick={handleNavigateToAddEmployee}
            >
              <Span>Add another Employee</Span>
            </BaseButton>
          </Row>
        </Fragment>
      </AddEmployeeSuccessModalWrapper>
    </BaseModal>
  );
};
