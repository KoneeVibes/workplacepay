import { Fragment, useEffect, useState } from "react";
import { Column } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { H2, Label, P, Span } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { AddDepartmentWrapper } from "./styled";
import Cookies from "universal-cookie";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../../components/button/styled";
import { addDepartmentService } from "../../../utils/apis/department/addDepartment";

export const AddDepartment = () => {
  const cookies = new Cookies();
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const TOKEN = cookies.getAll().TOKEN;

  const [matches, setMatches] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formDetails, setFormDetails] = useState({
    name: "",
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <Layout id={"departments"} title={"Add Departments"}>
      <AddDepartmentWrapper>
        <Column className="departmentForm">
          <div className="formText">
            <H2>Department Details</H2>
            <P>Add department by capturing all the details</P>
          </div>
          <form onSubmit={handleSubmit}>
            <Fragment>
              <BaseFieldSet>
                <Label>Name Of Department (System generated)</Label>
                <BaseInput
                  type="text"
                  name="name"
                  value={formDetails.name}
                  onChange={handleChange}
                  required
                />
              </BaseFieldSet>
              <div className="submit-column">
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
            </Fragment>
            {error && <P style={{ color: "red" }}>{error}</P>}
          </form>
        </Column>
      </AddDepartmentWrapper>
    </Layout>
  );
};
