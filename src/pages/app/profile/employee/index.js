import { useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { EmployeeProfileWrapper } from "./styled";
import { H2, Label, P, Span } from "../../../../components/typography/styled";
import { Row } from "../../../../components/flex/styled";
import { ResetPasswordModal } from "../../../../containers/app/modals/resetpasswordmodal";
import { getUser } from "../../../../utils/apis/user/getUser";
import Cookies from "universal-cookie";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { updateBankDetailsService } from "../../../../utils/apis/user/updateBankDetails";
import { updateContactDetailsService } from "../../../../utils/apis/user/updateContactDetails";

export const EmployeeProfile = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.getAll().TOKEN;

    const [user, setUser] = useState({});
    const [matches, setMatches] = useState(false);
    const [error, setError] = useState(null);
    const [isContactSubmitLoading, setIsContactSubmitLoading] = useState(false);
    const [isBankDetailsSubmitLoading, setIsBankDetailsSubmitLoading] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        salaryBankName: "",
        salaryBankAccount: "",
        pensionFirmName: "",
        pensionAccount: ""
    });
    const [contactDetails, setContactDetails] = useState({
        fullName: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 425);
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
                console.log(data);
                setUser(data);
                setBankDetails((prev) => ({
                    ...prev,
                    salaryBankName: data.payrollSetupInformation?.salaryBankName,
                    salaryBankAccount: data.payrollSetupInformation?.salaryBankAccount,
                    pensionFirmName: data.payrollSetupInformation?.pensionFirmName,
                    pensionAccount: data.payrollSetupInformation?.pensionAccount
                }));
                setContactDetails((prev) => ({
                    ...prev,
                    fullName: data.emergencyContactInformation?.fullName,
                    address: data.emergencyContactInformation?.address,
                    phone: data.emergencyContactInformation?.phone
                }))
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN]);

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContactDetailsChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBankDetailsUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setIsBankDetailsSubmitLoading(true);
        try {
            const response = await updateBankDetailsService(
                TOKEN,
                bankDetails,
            );
            if (response.status) {
                setIsBankDetailsSubmitLoading(false);
            } else {
                setIsBankDetailsSubmitLoading(false);
                setError(
                    "Update bank details failed. Please check your credentials and try again."
                );
                console.error(
                    "Update bank details failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            setIsBankDetailsSubmitLoading(false);
            setError(`Update bank details failed. ${error.message}`);
            console.error("Update bank details failed:", error);
        }
    };

    const handleContactDetailsUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setIsContactSubmitLoading(true);
        try {
            const response = await updateContactDetailsService(
                TOKEN,
                contactDetails,
            );
            if (response.status) {
                setIsContactSubmitLoading(false);
            } else {
                setIsContactSubmitLoading(false);
                setError(
                    "Update contact failed. Please check your credentials and try again."
                );
                console.error(
                    "Update contact failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            setIsBankDetailsSubmitLoading(false);
            setError(`Update contact failed. ${error.message}`);
            console.error("Update contact failed:", error);
        }
    };

    return (
        <Layout
            id={"employee-profile"}
            title={"Your Profile"}
        >
            <EmployeeProfileWrapper>
                <div className="details">
                    <H2>Personal Details</H2>
                    <Row>
                        <P>First Name</P>
                        <P>{user?.fullName?.split(' ')[1] || ''}</P>
                    </Row>
                    <Row>
                        <P>Last Name</P>
                        <P>{user?.fullName?.split(' ')[0] || ''}</P>
                    </Row>
                    <Row>
                        <P>Address</P>
                        <P>{user?.address}</P>
                    </Row>
                    <Row>
                        <P>Phone</P>
                        <P>{user?.phone}</P>
                    </Row>
                    <Row>
                        <P>Date of Birth</P>
                        <P>{user?.dateOfBirth}</P>
                    </Row>
                </div>
                <div className="details">
                    <H2>Employment Details</H2>
                    <Row>
                        <P>Department</P>
                        <P>{user?.jobInformation?.department.replace(/\b\w/g, char => char.toUpperCase())}</P>
                    </Row>
                    <Row>
                        <P>Job Position</P>
                        <P>{user?.jobInformation?.jobPosition}</P>
                    </Row>
                    <Row>
                        <P>Hire Date</P>
                        <P>{user?.jobInformation?.dateHired}</P>
                    </Row>
                </div>
                <div className="details bank-details">
                    <H2>Bank Details</H2>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Bank Name</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="salaryBankName"
                                value={bankDetails.salaryBankName}
                                onChange={handleBankDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Account Number</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="salaryBankAccount"
                                value={bankDetails.salaryBankAccount}
                                onChange={handleBankDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Pension Firm Name</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="pensionFirmName"
                                value={bankDetails.pensionFirmName}
                                onChange={handleBankDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Pension Account</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="pensionAccount"
                                value={bankDetails.pensionAccount}
                                onChange={handleBankDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    {error && <P style={{ color: "red" }}>{error}</P>}
                    <div
                        className="edit-button-box"
                        style={{ width: matches ? "100%" : "calc(50% - 1rem)", marginLeft: matches ? "0" : "auto" }}
                    >
                        <BaseButton
                            backgroundcolor={"#4E57BB"}
                            width={"-webkit-fill-available"}
                            onClick={handleBankDetailsUpdate}
                        >
                            {isBankDetailsSubmitLoading ? (
                                <DotLoader size={20} color="white" className="dotLoader" />
                            ) : (
                                <Span>Update Bank Details</Span>
                            )}
                        </BaseButton>
                    </div>
                </div>
                <div className="details contact-details">
                    <H2>Contact Details</H2>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Contact Name</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="fullName"
                                value={contactDetails.fullName}
                                onChange={handleContactDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Contact Address</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="address"
                                value={contactDetails.address}
                                onChange={handleContactDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="detail-label"
                        >
                            <Label>Contact Phone</Label>
                        </div>
                        <div
                            className="detail-field"
                        >
                            <BaseInput
                                type="text"
                                name="phone"
                                value={contactDetails.phone}
                                onChange={handleContactDetailsChange}
                                required
                            />
                        </div>
                    </Row>
                    {error && <P style={{ color: "red" }}>{error}</P>}
                    <div
                        className="edit-button-box"
                        style={{ width: matches ? "100%" : "calc(50% - 1rem)", marginLeft: matches ? "0" : "auto" }}
                    >
                        <BaseButton
                            backgroundcolor={"#4E57BB"}
                            width={"-webkit-fill-available"}
                            onClick={handleContactDetailsUpdate}
                        >
                            {isContactSubmitLoading ? (
                                <DotLoader size={20} color="white" className="dotLoader" />
                            ) : (
                                <Span>Update Contact</Span>
                            )}
                        </BaseButton>
                    </div>
                </div>
                <ResetPasswordModal
                    width={"40%"}
                />
            </EmployeeProfileWrapper>
        </Layout>
    );
};