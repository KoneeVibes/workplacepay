import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../containers/app/layout";
import { EmployerDashboard } from "./employer/index";
import { AdminDashboard } from "./admin";
import { EmployeeDashboard } from "./employee";
import { AddEmployeeModal } from "../../../containers/app/modals/addemployeemodal";
import { Fragment, useContext } from "react";
import { Context } from "../../../context";
import { getBulkEmployeeUploadTemplate } from "../../../utils/apis/employee/bulkUploadTemplate";

export const Dashboard = () => {
  const cookie = new Cookies();
  const { ROLE, TOKEN } = cookie.getAll() ?? {};

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

  const handleDownloadBulkEmployeeTemplate = async () => {
    try {
      const blob = await getBulkEmployeeUploadTemplate(TOKEN);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employee-upload-template.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download template:", error);
    }
  };

  const handleUploadActionItemClick = async (e, action) => {
    e.stopPropagation();
    switch (action) {
      case "single-employee-upload":
        navigateToAddNewEmployee(e);
        break;
      case "bulk-upload":
        setIsEmployeeBulkUploadModalOpen(true);
        break;
      case "download-template":
        await handleDownloadBulkEmployeeTemplate();
        break;
      default:
        return;
    };
    setIsAddEmployeeModalOpen(false);
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
