import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../containers/app/layout";
import { EmployerDashboard } from "./employer/index";
import { AdminDashboard } from "./admin";
import { EmployeeDashboard } from "./employee";
import { AddEmployeeModal } from "../../../containers/app/modals/addemployeemodal";
import { Fragment, useContext } from "react";
import { Context } from "../../../context";

export const Dashboard = () => {
  const cookie = new Cookies();
  const { ROLE } = cookie.getAll() ?? {};

  const navigate = useNavigate();
  const { setIsAddEmployeeModalOpen, setIsEmployeeBulkUploadModalOpen } = useContext(Context);

  const navigateToAddNewEmployee = (e) => {
    e.preventDefault();
    return navigate("/addnewemployee");
  };

  const handleAddEmployeeButtonClick = (e) => {
    e.stopPropagation();
    setIsAddEmployeeModalOpen(true);
  };

  const handleUploadActionItemClick = (e, action) => {
    e.stopPropagation();
    switch (action) {
      case "single-employee-upload":
        navigateToAddNewEmployee(e);
        break;
      case "bulk-upload":
        setIsAddEmployeeModalOpen(false);
        setIsEmployeeBulkUploadModalOpen(true);
        break;
      case "download-template":
        // window.open(
        //   "https://res.cloudinary.com/dqj8v4x2h/raw/upload/v1698236485/Employee_Upload_Template"
        // );
        break;
      default:
        return;
    };
  };

  return (
    <Layout
      id={"dashboard"}
      title={"Dashboard"}
      location={ROLE === "employer" ? "dashboard" : null}
      handleCallToActionClick={handleAddEmployeeButtonClick}
    >
      {ROLE === "employer" && (
        <Fragment>
          <EmployerDashboard
            addEmployeeModal={
              <AddEmployeeModal
                handleActionItemClick={handleUploadActionItemClick}
              />
            }
          />
        </Fragment>
      )}
      {ROLE === "admin" && <AdminDashboard />}
      {ROLE === "employee" && <EmployeeDashboard />}
    </Layout>
  );
};
