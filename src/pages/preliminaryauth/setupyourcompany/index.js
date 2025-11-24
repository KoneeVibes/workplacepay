import { useEffect, useState } from "react";
import { Logo, PrelimSetup } from "../../../assets";
import { BaseButton } from "../../../components/button/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { FieldSetRow, SetUpYourCompanyWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { setupCompanyService } from "../../../utils/apis/company/setupCompany";
import { DotLoader } from "react-spinners";
import { getAllPlans } from "../../../utils/apis/plansandpricing/getAllPlans";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/apis/user/getUser";

export const SetUpYourCompany = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [payrollPlans, setPayrollPlans] = useState([]);
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        surname: "",
        othername: "",
        companyName: "",
        companyPhone: "",
        companyEmail: "",
        companyPlan: ""
    });

    useEffect(() => {
        getAllPlans(TOKEN)
            .then((data) => {
                setPayrollPlans(data ?? [])
            })
            .catch((err) => {
                console.error("Failed to fetch payroll plans:", err);
            });
    }, [TOKEN]);
   
    useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getUser(TOKEN);
            if (userData && userData.fullName) {
                const nameParts = userData.fullName.trim().split(" ");
                const surname = nameParts[0] || "";
                const firstName = nameParts.length > 1 ? nameParts[1] : "";
                const othername = nameParts.length > 2 ? nameParts.slice(2).join(" ") : "";
                setFormDetails((prev) => ({
                    ...prev,
                    firstName,
                    surname,
                    othername,
                }));
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };
         if (TOKEN) {
            fetchUser();
        }
    }, [TOKEN]);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
         if (!formDetails.companyPlan) {
             setError("Please select a payroll plan");
             return; 
         }
        setIsLoading(true);
        try {
            const response = await setupCompanyService(TOKEN, formDetails);
            if (response.status) {
                setIsLoading(false);
                navigate("/login");
            } else {
                setIsLoading(false);
                setError('Setup failed. Please check your credentials and try again.');
                console.error("Setup failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Setup failed. ${error.message}`);
            console.error('Setup failed:', error);
        }
    };
    const isNamePrefilled = () => {
        return (
            formDetails.firstName.trim() !== "" ||
            formDetails.surname.trim() !== "" ||
            formDetails.othername.trim() !== ""
        );
    };
    return (
        <SetUpYourCompanyWrapper>
            <Row
                tocolumn={true}
                className="setup-main-area"
            >
                <div className="image-container">
                    <div className="logo-box-area">
                        <Logo />
                    </div>
                    <div>
                        <H3>The #1 Employee Payroll Solution for Small and Medium Businesses</H3>
                        <P>Seamless Payroll management for all your businesses in one place!</P>
                        <PrelimSetup style={{ width: "100%", height: "auto" }} />
                    </div>
                </div>
                <div className="form-container">
                    <H2>Set up your company</H2>
                    <P>Please  provide the following details to set up your company wih workPlacePAY</P>
                    <form
                        className="set-up-form"
                        onSubmit={handleSubmit}
                    >
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    First Name
                                </Label>
                                <BaseInput
                                    required
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={formDetails.firstName}
                                    onChange={(e) => handleChange(e)}
                                    readOnly={isNamePrefilled()}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Last Name
                                </Label>
                                <BaseInput
                                    required
                                    name="surname"
                                    placeholder="Enter Last Name"
                                    value={formDetails.surname}
                                    onChange={(e) => handleChange(e)}
                                    readOnly={isNamePrefilled()}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Other Name
                                </Label>
                                <BaseInput
                                    name="othername"
                                    placeholder="Enter Other Name"
                                    value={formDetails.othername}
                                    onChange={(e) => handleChange(e)}
                                    readOnly={isNamePrefilled()}
                                />
                            </BaseFieldSet>
                        </FieldSetRow>
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    Company Name
                                </Label>
                                <BaseInput
                                    required
                                    name="companyName"
                                    placeholder="Enter Company Name"
                                    value={formDetails.companyName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Company Phone Number
                                </Label>
                                <BaseInput
                                    required
                                    name="companyPhone"
                                    placeholder="Enter Company Phone Number"
                                    value={formDetails.companyPhone}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                        </FieldSetRow>
                        <FieldSetRow>
                            <BaseFieldSet>
                                <Label>
                                    Company Email
                                </Label>
                                <BaseInput
                                    required
                                    type="email"
                                    name="companyEmail"
                                    placeholder="Enter Company Email"
                                    value={formDetails.companyEmail}
                                    onChange={(e) => handleChange(e)}
                                />
                            </BaseFieldSet>
                            <BaseFieldSet>
                                <Label>
                                    Payroll Plan
                                </Label>
                                <BaseSelect
                                    name="companyPlan"
                                    value={formDetails?.companyPlan}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="">Select a Plan</option>
                                    {payrollPlans?.map((plan, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={plan?.title}
                                            >
                                                {plan?.title}
                                            </option>
                                        )
                                    })}
                                </BaseSelect>
                            </BaseFieldSet>
                        </FieldSetRow>
                        <div>
                            {error && <P style={{ color: 'red', marginBlockStart: 0 }}>{error}</P>}
                            <BaseButton
                                type="submit"
                                backgroundcolor={"#4E57BB"}
                            >
                                {isLoading ?
                                    (<DotLoader
                                        size={20}
                                        color="white"
                                        className='dotLoader'
                                    />) : (
                                        <Span>
                                            Submit
                                        </Span>
                                    )}
                            </BaseButton>
                        </div>
                    </form>
                </div>
            </Row>
        </SetUpYourCompanyWrapper >
    )
}