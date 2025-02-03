import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../containers/app/layout";
import { EmployerDashboard } from "./employer/index";
import { AdminDashboard } from "./admin";
import { EmployeeDashboard } from "./employee";

export const Dashboard = () => {
  const cookie = new Cookies();
  const { ROLE } = cookie.getAll() ?? {};

  const navigate = useNavigate();

  const navigateToAddNewEmployee = (e) => {
    e.preventDefault();
    return navigate("/addnewemployee");
  }

  return (
    <Layout
      id={"dashboard"}
      title={"Dashboard"}
      location={ROLE === "employer" ? "dashboard" : null}
      handleCallToActionClick={navigateToAddNewEmployee}
    >
      {ROLE === "employer" && <EmployerDashboard />}
      {ROLE === "admin" && <AdminDashboard />}
      {ROLE === "employee" && <EmployeeDashboard />}
    </Layout>
  );
};
