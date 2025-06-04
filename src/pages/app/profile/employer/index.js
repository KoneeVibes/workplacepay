import Cookies from "universal-cookie";
import { Layout } from "../../../../containers/app/layout"
import { EmployerProfileWrapper, ProfileRow } from "./styled"
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { Column, Row } from "../../../../components/flex/styled";
import defaultLogo from "../../../../assets/images/profilebasefavicon.svg";
import defaultHeadshot from "../../../../assets/images/profilebasefavicon.svg";
import { getAllPlans } from "../../../../utils/apis/plansandpricing/getAllPlans";
import { EditIcon } from "../../../../assets";
import { updateCompanyService } from "../../../../utils/apis/company/updateCompany";
import { updateEmployerProfilePictureService } from "../../../../utils/apis/employer/updateEmployerProfilePicture";

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
                departmentName: "",
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
        name: "",
        email: "",
        phone: "",
        companyLogo: null,
        companyPayrollPlan: " ",
    }), []);
    const { setIsPaymentFormModalOpen } = useContext(Context);
    const logoInputRef = useRef(null);
    const headshotInputRef = useRef(null);

    const [employerProfile, setEmployerProfile] = useState(initialEmployeeProfileFormDetails);
    const [companyProfile, setCompanyProfile] = useState(initialCompanyProfileFormDetails);
    const [departments, setDepartments] = useState([]);
    const [matches, setMatches] = useState(false);
    const [isEmployerProfileSubmitLoading, setIsEmployerProfileSubmitLoading] = useState(false);
    const [isCompanyProfileSubmitLoading, setIsCompanyProfileSubmitLoading] = useState(false);
    const [employerProfileSubmitError, setEmployerProfileSubmitError] = useState(null);
    const [companyProfileSubmitError, setCompanyProfileSubmitError] = useState(null);
    const [employerProfilePictureUpdateError, setEmployerProfilePictureUpdateError] = useState(null);
    const [isEmployerProfilePictureUpdateLoading, setIsEmployerProfilePictureUpdateLoading] = useState(false);
    const Navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [company, setCompany] = useState({});
    const [banks, setBanks] = useState([]);
    const [activeTab, setActiveTab] = useState("personal");
    const [payrollPlans, setPayrollPlans] = useState([]);
    const [creditInfo, setCreditInfo] = useState({
        availableCredits: "",
        creditCostPerEmployee: "",
        creditNairaValue: "",
    });
    const [logoPreview, setLogoPreview] = useState(null);
    const [headshotPreview, setHeadshotPreview] = useState(null);
    const [profilePicture, setProfilePicture] = useState({
        file: null,
    });

    useEffect(() => {
        getAllPlans(TOKEN)
            .then((data) => {
                setPayrollPlans(data ?? []);
            })
            .catch((err) => {
                console.error("Failed to fetch payroll plans:", err);
            });
    }, [TOKEN]);

    useEffect(() => {
        getCompanyDetails(TOKEN, COMPANY_ID)
            .then((res) => {
                setCompanyProfile({
                    name: res?.data?.name || "",
                    email: res?.data?.email || "",
                    phone: res?.data?.phone || "",
                    companyLogo: res?.data?.companyLogoImageUrl || null,
                    companyPayrollPlan: res?.data?.payrollPlan?.toLowerCase() || "",
                });
                setCreditInfo({
                    availableCredits: res?.data?.creditBalance || "",
                    creditCostPerEmployee: res?.data?.creditCostPerEmployee || "",
                    creditNairaValue: res?.data?.creditNairaValue || "",
                })
            })
            .catch((err) => {
                console.error("Failed to fetch company profile:", err);
            });
    }, [TOKEN, COMPANY_ID]);

    const handleLogoUploadClick = (e) => {
        e.stopPropagation()
        if (logoInputRef.current) {
            logoInputRef.current.click();
        }
    };

    const handleLogoFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setLogoPreview(e.target.result);
                    setCompanyProfile((prev) => ({
                        ...prev,
                        companyLogo: file
                    }))
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHeadshotUploadClick = (e) => {
        e.stopPropagation()
        if (headshotInputRef.current) {
            headshotInputRef.current.click();
        }
    };

    const handleHeadshotFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setHeadshotPreview(e.target.result);
                    setProfilePicture((prev) => ({
                        ...prev,
                        file
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

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
                    profilePicture: data.profilePictureUrl || null,
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

    const handleEmployerProfilePictureUpdate = async (e) => {
        e.preventDefault();
        setIsEmployerProfilePictureUpdateLoading(true);
        const formData = new FormData();
        Object.entries(profilePicture).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            const response = await updateEmployerProfilePictureService(
                TOKEN,
                COMPANY_ID,
                formData,
            );
            if (response.status) {
                setIsEmployerProfilePictureUpdateLoading(false);
                setHeadshotPreview(null);
            } else {
                setIsEmployerProfilePictureUpdateLoading(false);
                setEmployerProfilePictureUpdateError("Profile picture update failed. Please try again.");
                console.error("Profile picture update failed. Please try again.");
            }
        } catch (error) {
            setIsEmployerProfilePictureUpdateLoading(false);
            setEmployerProfilePictureUpdateError(`Profile picture update failed. ${error.message}`);
            console.error("Profile picture update failed:", error);
        }
    };

    const handleEmployerProfileSubmit = async (e) => {
        e.preventDefault();
        setEmployerProfileSubmitError(null);
        setIsEmployerProfileSubmitLoading(true);
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
                setIsEmployerProfileSubmitLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsEmployerProfileSubmitLoading(false);
                setEmployerProfileSubmitError(
                    "Profile update failed. Please check your credentials and try again."
                );
                console.error(
                    "Profile update failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            setIsEmployerProfileSubmitLoading(false);
            setEmployerProfileSubmitError(`Profile update failed. ${error.message}`);
            console.error("Profile update failed:", error);
        }
    };

    const handleCompanyProfileSubmit = async (e) => {
        e.preventDefault();
        setCompanyProfileSubmitError(null);
        setIsCompanyProfileSubmitLoading(true);
        const formData = new FormData();
        Object.entries(companyProfile).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            const response = await updateCompanyService(
                TOKEN,
                COMPANY_ID,
                formData,
            );
            if (response.status) {
                setIsCompanyProfileSubmitLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsCompanyProfileSubmitLoading(false);
                setCompanyProfileSubmitError(
                    "Profile update failed. Please check your credentials and try again."
                );
                console.error(
                    "Profile update failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            setIsCompanyProfileSubmitLoading(false);
            setCompanyProfileSubmitError(`Profile update failed. ${error.message}`);
            console.error("Profile update failed:", error);
        }
    };

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
                    message={`${(activeTab === "company") ? "Company" : "Employer"} profile has been successfully updated`}
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
                        <div
                            className="employer-profile-image-area"
                        >
                            <Column
                                torow
                                className="employer-profile-image-action-area"
                            >
                                <div>
                                    {headshotPreview ? (
                                        <img
                                            src={headshotPreview}
                                            alt="Employer Headshot"
                                            className="employer-headshot"
                                        />
                                    ) : (
                                        <img
                                            src={employerProfile?.profilePicture || defaultHeadshot}
                                            alt="Employer Headshot"
                                            className="employer-headshot"
                                        />
                                    )}
                                    <BaseInput
                                        type="file"
                                        name={"profilePicture"}
                                        ref={headshotInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleHeadshotFileChange}
                                    />
                                    <EditIcon
                                        className="edit-icon"
                                        onClick={(e) => handleHeadshotUploadClick(e)}
                                    />
                                </div>
                                {headshotPreview && (
                                    <div>
                                        <BaseButton
                                            type="button"
                                            backgroundcolor={"#4E57BB"}
                                            width={matches ? "-webkit-fill-available" : "fit-content"}
                                            onClick={handleEmployerProfilePictureUpdate}
                                        >
                                            {isEmployerProfilePictureUpdateLoading ? (
                                                <DotLoader
                                                    size={20}
                                                    color="white"
                                                    className="dotLoader"
                                                />
                                            ) : (
                                                <Span>Save Change</Span>
                                            )}
                                        </BaseButton>
                                    </div>
                                )}
                            </Column>
                            {employerProfilePictureUpdateError &&
                                <P style={{ color: "red", marginBlockEnd: 0 }}>                 {employerProfilePictureUpdateError}
                                </P>
                            }
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
                                className="employer-profile-submit-button-box"
                            >
                                <BaseButton
                                    type="submit"
                                    backgroundcolor={"#4E57BB"}
                                    width={matches ? "-webkit-fill-available" : "fit-content"}
                                >
                                    {isEmployerProfileSubmitLoading ? (
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
                            {employerProfileSubmitError && <P style={{ color: "red" }}>{employerProfileSubmitError}</P>}
                        </form>
                    </Fragment>
                )}
                {activeTab === "company" && (
                    <Fragment>
                        <div
                            className="upper-section-company-details"
                        >
                            <Row className="payroll-plan">
                                <P>Payroll Plan:</P>
                                <BaseSelect
                                    name="companyPayrollPlan"
                                    className="small-select"
                                    value={companyProfile.companyPayrollPlan}
                                    onChange={(e) => handleCompanyProfileUpdate(e)}
                                >
                                    <option value="" hidden>Select a Plan</option>
                                    {payrollPlans?.map((plan, index) => {
                                        return (
                                            <option key={index} value={plan?.title}>
                                                {plan?.title}
                                            </option>
                                        );
                                    })}
                                </BaseSelect>
                            </Row>
                            <form>
                                <Fragment>
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Company Logo"
                                            className="company-logo"
                                        />
                                    ) : (
                                        <img
                                            src={companyProfile?.companyLogo || defaultLogo}
                                            alt="Company Logo"
                                            className="company-logo"
                                        />
                                    )}
                                    <BaseInput
                                        type="file"
                                        name={"companyLogo"}
                                        ref={logoInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleLogoFileChange}
                                    />
                                    <EditIcon
                                        className="edit-icon"
                                        onClick={(e) => handleLogoUploadClick(e)}
                                    />
                                </Fragment>
                                <BaseFieldSet>
                                    <Label>Company Name</Label>
                                    <BaseInput
                                        type="text"
                                        name="name"
                                        value={companyProfile.name}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Company Email</Label>
                                    <BaseInput
                                        type="email"
                                        name="email"
                                        value={companyProfile.email}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                                <BaseFieldSet>
                                    <Label>Company Phone</Label>
                                    <BaseInput
                                        type="text"
                                        name="phone"
                                        value={companyProfile.phone}
                                        onChange={(e) => handleCompanyProfileUpdate(e)}
                                        required
                                    />
                                </BaseFieldSet>
                            </form>
                            <Row>
                                <div
                                    className="company-profile-submit-button-box"
                                >
                                    <BaseButton
                                        type="button"
                                        backgroundcolor={"#4E57BB"}
                                        width={matches ? "-webkit-fill-available" : "fit-content"}
                                        onClick={handleCompanyProfileSubmit}
                                    >
                                        {isCompanyProfileSubmitLoading ? (
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
                                {companyProfileSubmitError && <P style={{ color: "red" }}>{companyProfileSubmitError}</P>}
                            </Row>
                        </div>
                        <div
                            className="lower-section-company-details"
                        >
                            <H2>Credit Information</H2>
                            <Row
                                tocolumn
                                className="cardRow"
                                justifycontent={"space-between"}
                            >
                                <Span>Available Credits</Span>
                                <Span>{creditInfo.availableCredits} credits</Span>
                            </Row>
                            <Row
                                tocolumn
                                className="cardRow"
                                justifycontent={"space-between"}
                            >
                                <Span>Credit Cost per Employee</Span>
                                <Span>{creditInfo.creditCostPerEmployee} credits</Span>
                            </Row>
                            <Row
                                tocolumn
                                className="cardRow"
                                justifycontent={"space-between"}
                            >
                                <Span>Credit Naira Value</Span>
                                <Span>{creditInfo?.creditNairaValue?.toLocaleString()}</Span>
                            </Row>
                        </div>
                    </Fragment>
                )}
                <PaymentModal />
            </EmployerProfileWrapper>
        </Layout>
    )
}