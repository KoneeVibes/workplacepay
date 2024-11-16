import Cookies from "universal-cookie";
import { Layout } from "../../../containers/app/layout";
import { EmployerDashboard } from "./employer";
import { AdminDashboard } from "./admin";
import { EmployeeDashboard } from "./employee";

export const Dashboard = () => {
    const cookie = new Cookies();
    const { ROLE } = cookie.getAll() ?? {};

    return (
        <Layout
            id={"dashboard"}
            title={"Dashboard"}
            location={(ROLE === "employer") ? "dashboard" : null}
        >
            {(ROLE === "employer") && <EmployerDashboard />}
            {(ROLE === "admin") && <AdminDashboard />}
            {(ROLE === "employee") && <EmployeeDashboard />}
        </Layout >
    )
}
