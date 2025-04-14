import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BaseButton } from "../../../../components/button/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { Layout } from "../../../../containers/app/layout";
import { EditDepartmentWrapper } from "./styled";
import { DotLoader } from "react-spinners";
import { updateDepartmentService } from "../../../../utils/apis/department/updateDepartment";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartment } from "../../../../utils/apis/department/getDepartment";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";

export const EditDepartment = () => {
  const cookies = new Cookies();
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const TOKEN = cookies.getAll().TOKEN;

  const { id } = useParams();

  const [matches, setMatches] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
     const Navigate = useNavigate();
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
    return Navigate(-1);
  };

  const handlePersistModal = () => {
    return setIsSuccessModalOpen(true);
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await getDepartment(TOKEN, COMPANY_ID, id);
      return setFormDetails(response);
    };
    fetchDepartment();
  }, [TOKEN, COMPANY_ID, id]);

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
      const response = await updateDepartmentService(
        TOKEN,
        COMPANY_ID,
        formDetails
      );
      if (response.status === "Success") {
        setIsLoading(false);
        setIsSuccessModalOpen(true);
      } else {
        setIsLoading(false);
        setError(
          "Update of department failed. Please check your credentials and try again."
        );
        console.error(
          "Update of department failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Update of department failed. ${error.message}`);
      console.error("Update of department failed:", error);
    }
  };

  return (
    <Layout id={"departments"} title={"Edit Department"}>
      <EditDepartmentWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"edit-department-success-modal"}
          title={"Success"}
          message={"Department has been successfully edited"}
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <div className="formText">
          <P>Update department by capturing all the details:</P>
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
      </EditDepartmentWrapper>
    </Layout>
  );
};
