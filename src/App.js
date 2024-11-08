import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { HowWouldYouLikeToUse } from "./pages/preliminaryauth/howwouldyouliketouse";
import { ReferYourEmployer } from "./pages/preliminaryauth/referyouremployer";
import { SetUpYourCompany } from "./pages/preliminaryauth/setupyourcompany";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/app/dashboard";
import { AddNewEmployee } from "./pages/app/addnewemployee";
import { PayrollSettings } from "./pages/app/payrollsettings";
import { Payroll } from "./pages/app/payroll";
import { Employees } from "./pages/app/employees";
import { GetStarted } from "./pages/preliminaryauth/getstarted";
import { Variance } from "./pages/app/variancereport";
import { GeneralReport } from "./pages/app/generalreport";
import { Paye } from "./pages/app/paye";
import { Pension } from "./pages/app/pension";
import { Summary } from "./pages/app/summary";
import { UserSummary } from "./pages/app/usersummary";
import { Admincompanies } from "./pages/app/admincompanies";
import { Profile } from "./pages/app/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/how" element={<HowWouldYouLikeToUse />} />
        <Route path="/refer" element={<ReferYourEmployer />} />
        <Route path="/setup" element={<SetUpYourCompany />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/addnewemployee" element={<AddNewEmployee />} />
        <Route path="/payrollsettings" element={<PayrollSettings />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/reportsummary/variance" element={<Variance />} />
        <Route path="/reportsummary/general" element={<GeneralReport />} />
        <Route path="/reportsummary/payeoutput" element={<Paye />} />
        <Route path="/reportsummary/pensionoutput" element={<Pension />} />
        <Route path="/reportsummary/summary" element={<Summary />} />
        <Route path="/reportsummary/summary/:id" element={<UserSummary />} />
        <Route path="/admin/companies/" element={<Admincompanies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
