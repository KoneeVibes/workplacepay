import Cookies from "universal-cookie";
import { Layout } from "../../../../containers/app/layout"
import { EmployerProfileWrapper, ProfileRow } from "./styled"
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { getUser } from "../../../../utils/apis/user/getUser";
import { H2, Label, P, Span } from "../../../../components/typography/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { BaseTextArea } from "../../../../components/form/textarea/styled";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../../../components/button/styled";
import { formatDateToDDMMYYYY } from "../../../../config/app/dateFormatter";
import { updateEmployerProfileService } from "../../../../utils/apis/user/updateEmployer";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { Context } from "../../../../context";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { useNavigate } from "react-router-dom";
import { retrieveAllBanks } from "../../../../utils/external/fetchAllBanks";
import { Row } from "../../../../components/flex/styled";

export const EmployerProfile = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;
    const COMPANY_ID = cookies.get("COMPANY_ID");
    const REACT_APP_PAYSTACK_SK = process.env.REACT_APP_PAYSTACK_SK;

    const initialEmployeeProfileFormDetails = useMemo(
        () => ({
            personalInfo: {
                firstName: "",
                surname: "",
                othername: "",
                address: "",
                phone: "",
                email: "",
                dateOfBirth: "",
            },
            jobInfo: {
                jobPosition: "",
                dateHired: "",
                departmentName: null,
            },
            payrollSetup: {
                annualGrossPay: "",
                salaryBankName: "",
                salaryBankAccount: "",
                pensionFirmName: "",
                pensionAccount: "",
                taxNumber: "",
            },
            nextofKinInfo: {
                title: "",
                fullName: "",
                relationship: "",
                phone: "",
                address: "",
            },
            emergencyContactInfo: {
                title: "",
                fullName: "",
                relationship: "",
                phone: "",
                address: "",
            },
        }),
        []
    );
    const initialCompanyProfileFormDetails = useMemo(() => ({
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyLogo: "",
    }), []);
    const { setIsPaymentFormModalOpen } = useContext(Context);

    const [employerProfile, setEmployerProfile] = useState(initialEmployeeProfileFormDetails);
    const [companyProfile, setCompanyProfile] = useState(initialCompanyProfileFormDetails);
    const [departments, setDepartments] = useState([]);
    const [matches, setMatches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [company, setCompany] = useState({});
    const [banks, setBanks] = useState([]);
    const [activeTab, setActiveTab] = useState("personal");

    useEffect(() => console.log(activeTab), [activeTab]);

    function formatDateForInput(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length !== 3) return '';
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        return Navigate(-1);
    };

    const handlePersistModal = () => {
        return setIsSuccessModalOpen(true);
    };

    const handleTabChange = (e, tab) => {
        e.preventDefault();
        e.stopPropagation();
        if (tab === activeTab) return;
        return setActiveTab(tab);
    }

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

    useEffect(() => {
        getUser(TOKEN)
            .then((data) => {
                // Parse the full name
                const nameParts = data.fullName.split(' ');
                const surname = nameParts[0] || '';
                const othername = nameParts[nameParts.length - 1] || '';
                const firstName = nameParts.length > 2 ?
                    nameParts.slice(1, nameParts.length - 1).join(' ') : '';

                // Map the API response to your state structure
                const mappedData = {
                    personalInfo: {
                        firstName: firstName,
                        surname: surname,
                        othername: othername,
                        address: data.address || '',
                        phone: data.phone || '',
                        email: data.email || '',
                        dateOfBirth: formatDateForInput(data?.dateOfBirth) || '',
                    },
                    jobInfo: {
                        jobPosition: data.jobInformation?.jobPosition || '',
                        dateHired: formatDateForInput(data.jobInformation?.dateHired) || '',
                        departmentName: data.jobInformation?.department || null,
                    },
                    payrollSetup: {
                        annualGrossPay: data.payrollSetupInformation?.annualGrossPay?.toString() || '',
                        salaryBankName: data.payrollSetupInformation?.salaryBankName || '',
                        salaryBankAccount: data.payrollSetupInformation?.salaryBankAccount || '',
                        pensionFirmName: data.payrollSetupInformation?.pensionFirmName || '',
                        pensionAccount: data.payrollSetupInformation?.pensionAccount || '',
                        taxNumber: data.payrollSetupInformation?.taxNumber || '',
                    },
                    nextofKinInfo: {
                        title: data.nextOfKinInformation?.title || '',
                        fullName: data.nextOfKinInformation?.fullName || '',
                        relationship: data.nextOfKinInformation?.relationship || '',
                        phone: data.nextOfKinInformation?.phone || '',
                        address: data.nextOfKinInformation?.address || '',
                    },
                    emergencyContactInfo: {
                        title: data.emergencyContactInformation?.title || '',
                        fullName: data.emergencyContactInformation?.fullName || '',
                        relationship: data.emergencyContactInformation?.relationship || '',
                        phone: data.emergencyContactInformation?.phone || '',
                        address: data.emergencyContactInformation?.address || '',
                    },
                };
                setEmployerProfile(mappedData);
            })
            .catch((error) => console.error(error));
    }, [TOKEN]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments(TOKEN, COMPANY_ID);
                return setDepartments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDepartments();
    }, [TOKEN, COMPANY_ID]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const res = await getCompanyDetails(TOKEN, COMPANY_ID);
                return setCompany(res?.data);
            } catch (err) {
                console.error("Failed to fetch company details:", err);
            }
        };
        fetchCompanyDetails();
    }, [TOKEN, COMPANY_ID]);

    useEffect(() => {
        const fetchAllBanks = async () => {
            try {
                const response = await retrieveAllBanks(REACT_APP_PAYSTACK_SK);
                return setBanks(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllBanks();
    }, [REACT_APP_PAYSTACK_SK]);

    const handleEmployerProfileUpdate = (e, section) => {
        const { name, value } = e.target;
        setEmployerProfile((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    const handleCompanyProfileUpdate = (e) => {
        const { name, value } = e.target;
        setCompanyProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOpenCreditPurchaseModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPaymentFormModalOpen(true);
    };

    const handleEmployerProfileSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const formattedFormDetails = {
            ...employerProfile,
            jobInfo: {
                ...employerProfile.jobInfo,
                dateHired: formatDateToDDMMYYYY(employerProfile.jobInfo.dateHired),
            },
            personalInfo: {
                ...employerProfile.personalInfo,
                dateOfBirth: formatDateToDDMMYYYY(employerProfile.personalInfo.dateOfBirth),
            },
        };
        try {
            const response = await updateEmployerProfileService(
                TOKEN,
                COMPANY_ID,
                formattedFormDetails,
            );
            if (response.status) {
                setIsLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsLoading(false);
                setError(
                    "Profile update failed. Please check your credentials and try again."
                );
                console.error(
                    "Profile update failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Profile update failed. ${error.message}`);
            console.error("Profile update failed:", error);
        }
    }

    return (
        <Layout
            id={"employer-profile"}
            title={"Profile"}
            location={"employer-profile"}
            callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
            handleCallToActionClick={handleOpenCreditPurchaseModal}
        >
            <EmployerProfileWrapper>
                <SuccessModal
                    open={isSuccessModalOpen}
                    handleClickOutside={handlePersistModal}
                    className={"employer-profile-deparrtment-success-modal"}
                    title={"Success"}
                    message={"Employer profile has been successfully updated"}
                    callToAction={"Close"}
                    handleCallToActionClick={handleCloseSuccessModal}
                />
                <Row
                    className="tab-area"
                >
                    <div
                        className="tab"
                        style={{
                            backgroundColor: activeTab === "personal" ? "#F2F2F8" : "transparent",
                            boxShadow: activeTab === "personal" ? "0px 4px 4px 4px rgba(0, 0, 0, 0.25)" : "none",
                            borderRadius: "5px",
                        }}
                        onClick={(e) => handleTabChange(e, "personal")}
                    >
                        <H2>Personal</H2>
                    </div>
                    <div
                        className="tab"
                        style={{
                            backgroundColor: activeTab === "company" ? "#F2F2F8" : "transparent",
                            boxShadow: activeTab === "company" ? "0px 4px 4px 4px rgba(0, 0, 0, 0.25)" : "none",
                            borderRadius: "5px",
                        }}
                        onClick={(e) => handleTabChange(e, "company")}
                    >
                        <H2>Company</H2>
                    </div>
                </Row>
                {activeTab === "personal" && (
                    <Fragment>
                        <div>
                            <H2>Personal Details</H2>
                            <P>Update user details</P>
                        </div>
                        <form onSubmit={handleEmployerProfileSubmit}>
                            <BaseFieldSet>
                                <Label>Surname</Label>
                                <BaseInput
                                    type="text"
                                    name="surname"
                                    value={employerProfile.personalInfo.surname?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                    required
                                />
                            </BaseFieldSet>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>First Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter First Name"
                                        value={employerProfile.personalInfo.firstName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Other Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="othername"
                                        placeholder="Enter Other Name"
                                        value={employerProfile.personalInfo.othername?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Address</Label>
                                    <BaseInput
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={employerProfile.personalInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Date Of Birth</Label>
                                    <BaseInput
                                        type="date"
                                        name="dateOfBirth"
                                        value={employerProfile.personalInfo.dateOfBirth?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Email</Label>
                                    <BaseInput
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={employerProfile.personalInfo.email}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Phone Number</Label>
                                    <BaseInput
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter PhoneNumber"
                                        value={employerProfile.personalInfo.phone}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "personalInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <H2>Corporate Details</H2>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Department Name</Label>
                                    <BaseSelect
                                        required
                                        name="departmentName"
                                        value={employerProfile.jobInfo.departmentName}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "jobInfo")}
                                    >
                                        <option value={null}>Select Department</option>
                                        {departments.map((department, index) => {
                                            return (
                                                <option key={index} value={department.name}>
                                                    {department.name?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                                </option>
                                            );
                                        })}
                                    </BaseSelect>
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Job Position</Label>
                                    <BaseInput
                                        type="text"
                                        name="jobPosition"
                                        placeholder="Enter Job Position"
                                        value={employerProfile.jobInfo.jobPosition?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "jobInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <BaseFieldSet>
                                <Label>Date Hired</Label>
                                <BaseInput
                                    type="date"
                                    name="dateHired"
                                    placeholder="Enter Date Hired"
                                    value={employerProfile.jobInfo.dateHired}
                                    onChange={(e) => handleEmployerProfileUpdate(e, "jobInfo")}
                                    required
                                />
                            </BaseFieldSet>
                            <H2>Payroll Setup</H2>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Annual Gross Pay</Label>
                                    <BaseInput
                                        type="text"
                                        name="annualGrossPay"
                                        value={employerProfile.payrollSetup.annualGrossPay}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Salary Bank Name</Label>
                                    <BaseSelect
                                        name="salaryBankName"
                                        value={employerProfile.payrollSetup.salaryBankName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                    >
                                        <option value="">Select Bank</option>
                                        {banks?.map((bank, index) => (
                                            <option
                                                key={index}
                                                value={bank.name}
                                            >
                                                {bank.name}
                                            </option>
                                        ))}
                                    </BaseSelect>
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Salary Bank Account</Label>
                                    <BaseInput
                                        type="text"
                                        name="salaryBankAccount"
                                        value={employerProfile.payrollSetup.salaryBankAccount}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Pension Firm Name</Label>
                                    <BaseSelect
                                        name="pensionFirmName"
                                        value={employerProfile.payrollSetup.pensionFirmName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                    >
                                        <option value="">Select Bank</option>
                                        {banks?.map((bank, index) => (
                                            <option
                                                key={index}
                                                value={bank.name}
                                            >
                                                {bank.name}
                                            </option>
                                        ))}
                                    </BaseSelect>
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Pension Account</Label>
                                    <BaseInput
                                        type="text"
                                        name="pensionAccount"
                                        value={employerProfile.payrollSetup.pensionAccount}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Tax Identification Number</Label>
                                    <BaseInput
                                        type="text"
                                        name="taxNumber"
                                        value={employerProfile.payrollSetup.taxNumber}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "payrollSetup")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <H2>Next of Kin</H2>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Next of Kin’s Title</Label>
                                    <BaseSelect
                                        name="title"
                                        value={employerProfile.nextofKinInfo.title?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "nextofKinInfo")}
                                    >
                                        <option value="" hidden></option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Other">Other</option>
                                    </BaseSelect>
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Next of Kin’s Full Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="fullName"
                                        value={employerProfile.nextofKinInfo.fullName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "nextofKinInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Relationship</Label>
                                    <BaseInput
                                        type="text"
                                        name="relationship"
                                        value={employerProfile.nextofKinInfo.relationship?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "nextofKinInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Phone Number</Label>
                                    <BaseInput
                                        type="tel"
                                        name="phone"
                                        value={employerProfile.nextofKinInfo.phone}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "nextofKinInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <BaseFieldSet>
                                <Label>Contact Address</Label>
                                <BaseTextArea
                                    className="address"
                                    type="text"
                                    name="address"
                                    value={employerProfile.nextofKinInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    onChange={(e) => handleEmployerProfileUpdate(e, "nextofKinInfo")}
                                    required
                                />
                            </BaseFieldSet>
                            <H2>Emergency Contacts</H2>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Contact’s Title</Label>
                                    <BaseSelect
                                        name="title"
                                        value={employerProfile.emergencyContactInfo.title?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "emergencyContactInfo")}
                                    >
                                        <option value="" hidden></option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Other">Other</option>
                                    </BaseSelect>
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Contact’s Full Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="fullName"
                                        value={employerProfile.emergencyContactInfo.fullName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "emergencyContactInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <ProfileRow>
                                <BaseFieldSet>
                                    <Label>Relationship</Label>
                                    <BaseSelect
                                        name="relationship"
                                        value={employerProfile.emergencyContactInfo.relationship?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "emergencyContactInfo")}
                                    >
                                        <option value="" hidden></option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Other">Other</option>
                                    </BaseSelect>
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Phone Number</Label>
                                    <BaseInput
                                        type="tel"
                                        name="phone"
                                        value={employerProfile.emergencyContactInfo.phone}
                                        onChange={(e) => handleEmployerProfileUpdate(e, "emergencyContactInfo")}
                                        required
                                    />
                                </BaseFieldSet>
                            </ProfileRow>
                            <BaseFieldSet>
                                <Label>Contact Address</Label>
                                <BaseTextArea
                                    className="address"
                                    type="text"
                                    name="address"
                                    value={employerProfile.emergencyContactInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    onChange={(e) => handleEmployerProfileUpdate(e, "emergencyContactInfo")}
                                    required
                                />
                            </BaseFieldSet>
                            <div
                                className="submit-button-box"
                            >
                                <BaseButton
                                    type="submit"
                                    backgroundcolor={"#4E57BB"}
                                    width={matches ? "-webkit-fill-available" : "fit-content"}
                                >
                                    {isLoading ? (
                                        <DotLoader
                                            size={20}
                                            color="white"
                                            className="dotLoader"
                                        />
                                    ) : (
                                        <Span>Submit</Span>
                                    )}
                                </BaseButton>
                            </div>
                            {error && <P style={{ color: "red" }}>{error}</P>}
                        </form>
                    </Fragment>
                )}
                {activeTab === "company" && (
                    <Fragment>
                        <div
                            className="upper-section-company-details"
                        >
                            <form>
                                {/* add picture */}
                                <BaseFieldSet>
                                    <Label>Company Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="companyName"
                                        value={companyProfile.companyName}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Company Email</Label>
                                    <BaseInput
                                        type="text"
                                        name="companyEmail"
                                        value={companyProfile.companyEmail}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Company Phone</Label>
                                    <BaseInput
                                        type="text"
                                        name="companyPhone"
                                        value={companyProfile.companyPhone}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                            </form>
                            {/* add payroll plan dropdown here */}
                        </div>
                        <div
                            className="upper-section-company-details"
                        >

                        </div>
                    </Fragment>
                )}
                <PaymentModal />
            </EmployerProfileWrapper>
        </Layout>
    )
}