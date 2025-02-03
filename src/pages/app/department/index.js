import { useNavigate } from "react-router-dom";
import { Layout } from "../../../containers/app/layout";
import { DepartmentWrapper } from "./styled";

export const Department = () => {
  const navigate = useNavigate();

  const navigateToAddNewDepartment = (e) => {
    e.preventDefault();
    return navigate("/adddepartment");
  };
  return (
    <Layout
      id={"departments"}
      title={"Departments"}
      location={"departments"}
      callToAction={"Add Department"}
      handleCallToActionClick={navigateToAddNewDepartment}
    >
      <DepartmentWrapper></DepartmentWrapper>
    </Layout>
  );
};
