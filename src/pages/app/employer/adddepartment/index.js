import { useEffect, useState } from "react";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { H2, Label, P, Span } from "../../../../components/typography/styled";
import { Layout } from "../../../../containers/app/layout";
import { AddDepartmentWrapper } from "./styled";
import Cookies from "universal-cookie";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../../../components/button/styled";
import { addDepartmentService } from "../../../../utils/apis/department/addDepartment";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { useNavigate } from "react-router-dom";

export const AddDepartment = () => {
  const cookies = new Cookies();
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const TOKEN = cookies.getAll().TOKEN;

  const [matches, setMatches] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
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
    return navigate(-1);
  };

  const handlePersistModal = () => {
    return setIsSuccessModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.screen.availWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await addDepartmentService(
        TOKEN,
        COMPANY_ID,
        formDetails
      );
      if (response.status) {
        setIsLoading(false);
        setIsSuccessModalOpen(true);
      } else {
        setIsLoading(false);
        setError(
          "Addition of department failed. Please check your credentials and try again."
        );
        console.error(
          "Addition of department failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Addition of department failed. ${error.message}`);
      console.error("Addition of department failed:", error);
    }
  };

  return (
    <Layout id={"departments"} title={"Add Department"}>
      <AddDepartmentWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"add-department-success-modal"}
          title={"Success"}
          message={"Department has been successfully added"}
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <div className="formText">
          <H2>Department Details</H2>
          <P>Add department by capturing all the details</P>
        </div>
        <form onSubmit={handleSubmit}>
          <BaseFieldSet>
            <Label>Department Name</Label>
            <BaseInput
              type="text"
              name="name"
              value={formDetails.name}
              onChange={handleChange}
              required
            />
          </BaseFieldSet>
          {error && <P style={{ color: "red" }}>{error}</P>}
          <div className="submit-button-area">
            <BaseButton
              type="submit"
              backgroundcolor={"#4E57BB"}
              width={matches ? "-webkit-fill-available" : "fit-content"}
            >
              {isLoading ? (
                <DotLoader size={20} color="white" className="dotLoader" />
              ) : (
                <Span>Submit</Span>
              )}
            </BaseButton>
          </div>
        </form>
      </AddDepartmentWrapper>
    </Layout>
  );
};
