import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { GetStarted } from "./pages/preliminaryauth/getstarted";
import { HowWouldYouLikeToUse } from "./pages/preliminaryauth/howwouldyouliketouse";
import { ReferYourEmployer } from "./pages/preliminaryauth/referyouremployer";
import { SetUpYourCompany } from "./pages/preliminaryauth/setupyourcompany";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { AddNewEmployee } from "./containers/dashboard/addnewemployee";
import { PayrollSettings } from "./containers/dashboard/payrollsettings";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addnewemployee" element={<AddNewEmployee />} />
        <Route path="/payrollsettings" element={<PayrollSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
