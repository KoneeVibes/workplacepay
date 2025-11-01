import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Login, LogoII } from "../../assets";
import { Row } from "../../components/flex/styled";
import { BaseInput } from "../../components/form/input/styled";
import { Label, P, Span } from "../../components/typography/styled";
import { AuthWrapper } from "./styled";
import { BaseButton } from "../../components/button/styled";
import { BaseFieldSet } from "../../components/form/fieldset/styled";
import { DotLoader } from "react-spinners";
import { signInUser } from "../../utils/apis/authentication/signin";
import { getCompanies } from "../../utils/apis/company/getCompanies";
import { SelectCompaniesModal } from "../../containers/app/modals/selectcompaniesmodal";
import { Context } from "../../context";

export const Auth = () => {
  const cookies = new Cookies();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsSelectCompaniesModalOpen } = useContext(Context);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserCompanies = async (token, role) => {
    if (role !== "employer") return;
    try {
      const response = await getCompanies(token);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await signInUser(formDetails);
      if (response.status) {
        setIsLoading(false);
        cookies.set("TOKEN", response.token, {
          path: "/",
          maxAge: 1000000,
        });
        cookies.set("ROLE", response.role, {
          path: "/",
          maxAge: 1000000,
        });
        if (response.status === "Success") {
          if (response.role === "employer") {
            const { ROLE, TOKEN, COMPANY_ID } = cookies.getAll() ?? {};
            const userCompanies = await fetchUserCompanies(TOKEN, ROLE);
            // Check if the employer does not have any company
            // If yes, redirect the employer to the setup company page.
            if (!userCompanies || userCompanies.length === 0) {
              return navigate("/setup");
            }
            // Check if the employer has a single company
            // If yes, set COMPANY_ID to the single company's id and
            // navigate the employer to the dashboard
            if (userCompanies.length === 1) {
              cookies.set("COMPANY_ID", userCompanies[0].companyId, {
                path: "/",
                maxAge: 1000000,
              });
            }
            // check for invalid companyId or employers with more than one company
            // If yes, pop-up modal for employer to select a single company
            // to access and set COMPANY_ID to the selected company's id and
            // navigate the employer to the dashboard
            if ((COMPANY_ID && !userCompanies.some((company) => company.companyId === COMPANY_ID)) || userCompanies.length > 1) {
              // Add your logic here for handling the conditions
              return setIsSelectCompaniesModalOpen(true);
            }
          }
          return navigate("/dashboard");
        }
      } else {
        setIsLoading(false);
        setError(
          "Authentication failed. Please check your credentials and try again."
        );
        console.error(
          "Authentication failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Login failed. ${error.message}`);
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthWrapper>
      <div className="logo-box-area">
        <LogoII />
      </div>
      <Row tocolumn={true} className="main-area">
        <div className="auth-img">
          <Login />
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <legend>Enter your email and password to continue</legend>
          <BaseFieldSet>
            <Label>Email*</Label>
            <BaseInput
              name="email"
              placeholder="Enter Email"
              value={formDetails.email}
              onChange={(e) => handleChange(e)}
            />
          </BaseFieldSet>
          <BaseFieldSet style={{ position: "relative" }}>
            <Label>Password*</Label>
            <BaseInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password" required
              value={formDetails.password}
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: "60px" }} // give space for the toggle text
            />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "50%",
                  transform: "translateY(80%)",
                  cursor: "pointer",
                  color: "#4E57BB",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {showPassword ? "Hide" : "Show"}
            </span>
          </BaseFieldSet>
                    <div style={{ width: "100%" }}>
            <Span
              style={{
              color: "#4E57BB",
              cursor: "pointer",
              textDecoration: "underline",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
           </Span>
          </div>
          <BaseButton type="submit" backgroundcolor={"#4E57BB"}>
            {isLoading ? (
              <DotLoader size={20} color="white" className="dotLoader" />
            ) : (
              <Span>Login</Span>
            )}
          </BaseButton>
          {error && <P style={{ color: "red" }}>{error}</P>}
        </form>
      </Row>
      <SelectCompaniesModal />
    </AuthWrapper>
  );
};