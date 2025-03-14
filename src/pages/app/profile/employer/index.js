import Cookies from "universal-cookie";
import { Layout } from "../../../../containers/app/layout"
import { EmployerProfileWrapper, ProfileRow } from "./styled"
import { useEffect, useMemo, useState } from "react";
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
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { useNavigate } from "react-router-dom";

export const EmployerProfile = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const initialFormDetails = useMemo(
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
    const [profile, setProfile] = useState(initialFormDetails);
    const [departments, setDepartments] = useState([]);
    const [matches, setMatches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
        const Navigate = useNavigate();
      const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [company, setCompany] = useState({});

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
                setProfile(mappedData);
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

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    const handleOpenCreditPurchaseModal = (e) => {
        e.preventDefault();
        console.log("I am clicked");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const formattedFormDetails = {
            ...profile,
            jobInfo: {
                ...profile.jobInfo,
                dateHired: formatDateToDDMMYYYY(profile.jobInfo.dateHired),
            },
            personalInfo: {
                ...profile.personalInfo,
                dateOfBirth: formatDateToDDMMYYYY(profile.personalInfo.dateOfBirth),
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
            title={"Your Profile"}
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
                <div>
                    <H2>Personal Details</H2>
                    <P>Update user details</P>
                </div>
                <form onSubmit={handleSubmit}>
                    <BaseFieldSet>
                        <Label>Surname</Label>
                        <BaseInput
                            type="text"
                            name="surname"
                            value={profile.personalInfo.surname?.replace(/\b\w/g, (char) => char.toUpperCase())}
                            onChange={(e) => handleChange(e, "personalInfo")}
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
                                value={profile.personalInfo.firstName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "personalInfo")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Other Name</Label>
                            <BaseInput
                                type="text"
                                name="othername"
                                placeholder="Enter Other Name"
                                value={profile.personalInfo.othername?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "personalInfo")}
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
                                value={profile.personalInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "personalInfo")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Date Of Birth</Label>
                            <BaseInput
                                type="date"
                                name="dateOfBirth"
                                value={profile.personalInfo.dateOfBirth?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "personalInfo")}
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
                                value={profile.personalInfo.email}
                                onChange={(e) => handleChange(e, "personalInfo")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Phone Number</Label>
                            <BaseInput
                                type="tel"
                                name="phone"
                                placeholder="Enter PhoneNumber"
                                value={profile.personalInfo.phone}
                                onChange={(e) => handleChange(e, "personalInfo")}
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
                                value={profile.jobInfo.departmentName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "jobInfo")}
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
                                value={profile.jobInfo.jobPosition?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "jobInfo")}
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
                            value={profile.jobInfo.dateHired}
                            onChange={(e) => handleChange(e, "jobInfo")}
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
                                value={profile.payrollSetup.annualGrossPay}
                                onChange={(e) => handleChange(e, "payrollSetup")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Salary Bank Name</Label>
                            <BaseSelect
                                name="salaryBankName"
                                value={profile.payrollSetup.salaryBankName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "payrollSetup")}
                            >
                                <option value="" hidden></option>
                                <option value="Bank A">Bank A</option>
                                <option value="Bank B">Bank B</option>
                            </BaseSelect>
                        </BaseFieldSet>
                    </ProfileRow>
                    <ProfileRow>
                        <BaseFieldSet>
                            <Label>Salary Bank Account</Label>
                            <BaseInput
                                type="text"
                                name="salaryBankAccount"
                                value={profile.payrollSetup.salaryBankAccount}
                                onChange={(e) => handleChange(e, "payrollSetup")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Pension Firm Name</Label>
                            <BaseSelect
                                name="pensionFirmName"
                                value={profile.payrollSetup.pensionFirmName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "payrollSetup")}
                            >
                                <option value="" hidden></option>
                                <option value="Pension Firm A">Pension Firm A</option>
                                <option value="Pension Firm B">Pension Firm B</option>
                            </BaseSelect>
                        </BaseFieldSet>
                    </ProfileRow>
                    <ProfileRow>
                        <BaseFieldSet>
                            <Label>Pension Account</Label>
                            <BaseInput
                                type="text"
                                name="pensionAccount"
                                value={profile.payrollSetup.pensionAccount}
                                onChange={(e) => handleChange(e, "payrollSetup")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Tax Identification Number</Label>
                            <BaseInput
                                type="text"
                                name="taxNumber"
                                value={profile.payrollSetup.taxNumber}
                                onChange={(e) => handleChange(e, "payrollSetup")}
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
                                value={profile.nextofKinInfo.title?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "nextofKinInfo")}
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
                                value={profile.nextofKinInfo.fullName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "nextofKinInfo")}
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
                                value={profile.nextofKinInfo.relationship?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "nextofKinInfo")}
                                required
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <Label>Phone Number</Label>
                            <BaseInput
                                type="tel"
                                name="phone"
                                value={profile.nextofKinInfo.phone}
                                onChange={(e) => handleChange(e, "nextofKinInfo")}
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
                            value={profile.nextofKinInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                            onChange={(e) => handleChange(e, "nextofKinInfo")}
                            required
                        />
                    </BaseFieldSet>
                    <H2>Emergency Contacts</H2>
                    <ProfileRow>
                        <BaseFieldSet>
                            <Label>Contact’s Title</Label>
                            <BaseSelect
                                name="title"
                                value={profile.emergencyContactInfo.title?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "emergencyContactInfo")}
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
                                value={profile.emergencyContactInfo.fullName?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "emergencyContactInfo")}
                                required
                            />
                        </BaseFieldSet>
                    </ProfileRow>
                    <ProfileRow>
                        <BaseFieldSet>
                            <Label>Relationship</Label>
                            <BaseSelect
                                name="relationship"
                                value={profile.emergencyContactInfo.relationship?.replace(/\b\w/g, (char) => char.toUpperCase())}
                                onChange={(e) => handleChange(e, "emergencyContactInfo")}
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
                                value={profile.emergencyContactInfo.phone}
                                onChange={(e) => handleChange(e, "emergencyContactInfo")}
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
                            value={profile.emergencyContactInfo.address?.replace(/\b\w/g, (char) => char.toUpperCase())}
                            onChange={(e) => handleChange(e, "emergencyContactInfo")}
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
            </EmployerProfileWrapper>
        </Layout>
    )
}