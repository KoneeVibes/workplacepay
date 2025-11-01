import { useEffect, useRef, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { EmployeeProfileWrapper } from "./styled";
import { H2, Label, P, Span } from "../../../../components/typography/styled";
import { Column, Row } from "../../../../components/flex/styled";
import { ResetPasswordModal } from "../../../../containers/app/modals/resetpasswordmodal";
import { getUser } from "../../../../utils/apis/user/getUser";
import Cookies from "universal-cookie";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { updateBankDetailsService } from "../../../../utils/apis/user/updateBankDetails";
// import { updateContactDetailsService } from "../../../../utils/apis/user/updateContactDetails";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { useNavigate } from "react-router-dom";
import { BaseSelect } from "../../../../components/form/select/styled";
import { retrieveAllBanks } from "../../../../utils/external/fetchAllBanks";
import { EditIcon } from "../../../../assets";
import defaultHeadshot from "../../../../assets/images/profilebasefavicon.svg";
import { updateUserProfilePictureService } from "../../../../utils/apis/user/updateUserProfilePhoto";
import { updateEmergencyContactDetailsService } from "../../../../utils/apis/user/updateEmergencyContactDetails";

export const EmployeeProfile = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.getAll().TOKEN;
  const REACT_APP_PAYSTACK_SK = process.env.REACT_APP_PAYSTACK_SK;

  const headshotInputRef = useRef(null);

  const [user, setUser] = useState({});
  const [matches, setMatches] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isContactSubmitLoading, setIsContactSubmitLoading] = useState(false);
  const [isBankDetailsSubmitLoading, setIsBankDetailsSubmitLoading] =
    useState(false);
  const [bankDetails, setBankDetails] = useState({
    salaryBankName: "",
    salaryBankAccount: "",
    pensionFirmName: "",
    pensionAccount: "",
  });
  const [emergencyContactDetails, setEmergencyContactDetails] = useState({
    title: "",
    fullName: "",
    relationship:"",
    phone: "",
    address: "",
  });
  const [banks, setBanks] = useState([]);
  const [headshotPreview, setHeadshotPreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState({
    file: null,
  })
  const [employeeProfilePictureUpdateError, setEmployeeProfilePictureUpdateError] = useState(null);
  const [isEmployeeProfilePictureUpdateLoading, setIsEmployeeProfilePictureUpdateLoading] = useState(false);

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
        setUser(data);
        setBankDetails((prev) => ({
          ...prev,
          salaryBankName: data.payrollSetupInformation?.salaryBankName,
          salaryBankAccount: data.payrollSetupInformation?.salaryBankAccount,
          pensionFirmName: data.payrollSetupInformation?.pensionFirmName,
          pensionAccount: data.payrollSetupInformation?.pensionAccount,
        }));
        setEmergencyContactDetails((prev) => ({
          ...prev,
          title: data.emergencyContactInformation?.title,
          fullName: data.emergencyContactInformation?.fullName,
          relationship: data.emergencyContactInformation?.relationship,
          phone: data.emergencyContactInformation?.phone,
          address: data.emergencyContactInformation?.address,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [TOKEN]);

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

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    return Navigate(-1);
  };

  const handlePersistModal = () => {
    return setIsSuccessModalOpen(true);
  };

  const handleEmergencyContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleBankDetailsUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setIsBankDetailsSubmitLoading(true);
    try {
      const response = await updateBankDetailsService(TOKEN, bankDetails);
      if (response.status) {
        setIsBankDetailsSubmitLoading(false);
        setIsSuccessModalOpen(true);
        setLastUpdate("bank");   

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

  const handleEmployerProfilePictureUpdate = async (e) => {
    e.preventDefault();
    setIsEmployeeProfilePictureUpdateLoading(true);
    const formData = new FormData();
    Object.entries(profilePicture).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await updateUserProfilePictureService(TOKEN, formData);
      if (response.status) {
        setIsEmployeeProfilePictureUpdateLoading(false);
        setHeadshotPreview(null);
      } else {
        setIsEmployeeProfilePictureUpdateLoading(false);
        setEmployeeProfilePictureUpdateError("Profile picture update failed. Please try again.");
        console.error("Profile picture update failed. Please try again.");
      }
    } catch (error) {
      setIsEmployeeProfilePictureUpdateLoading(false);
      setEmployeeProfilePictureUpdateError(`Profile picture update failed. ${error.message}`);
      console.error("Profile picture update failed:", error);
    }
  };

  const handleEmergencyContactDetailsUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setIsContactSubmitLoading(true);
    try {
      const response = await updateEmergencyContactDetailsService(TOKEN, emergencyContactDetails);
      if (response.status) {
        setIsContactSubmitLoading(false);
        setIsSuccessModalOpen(true);
        setLastUpdate("contact");   
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
      setIsContactSubmitLoading(false);
      setError(`Update contact failed. ${error.message}`);
      console.error("Update contact failed:", error);
    }
  };

  return (
    <Layout id={"employee-profile"} title={"Your Profile"}>
      <EmployeeProfileWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"Update-contact-success-modal"}
          title={"Success"}
          message={
             lastUpdate === "bank"
             ? "Bank details updated successfully"
             : lastUpdate === "contact"
             ? "Contact details updated successfully"
              : ""
          }
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <div className="details">
          <H2>Personal Details</H2>
          <div
            className="employee-profile-image-area"
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
                    className="employee-headshot"
                  />
                ) : (
                  <img
                    src={user?.profilePictureUrl || defaultHeadshot}
                    alt="Employer Headshot"
                    className="employee-headshot"
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
                    {isEmployeeProfilePictureUpdateLoading ? (
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
            {employeeProfilePictureUpdateError &&
              <P style={{ color: "red", marginBlockEnd: 0 }}>                 
              {employeeProfilePictureUpdateError}
              </P>
            }
          </div>
          <Row>
            <P>First Name</P>
            <P>{user?.fullName?.split(" ")[1] || ""}</P>
          </Row>
          <Row>
            <P>Last Name</P>
            <P>{user?.fullName?.split(" ")[0] || ""}</P>
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
            <P>
              {user?.jobInformation?.department?.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              )}
            </P>
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
            <div className="detail-label">
              <Label>Bank Name</Label>
            </div>
            <div className="detail-field">
              <BaseSelect
                name="salaryBankName"
                value={bankDetails.salaryBankName}
                onChange={handleBankDetailsChange}
                required
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
            </div>
          </Row>
          <Row>
            <div className="detail-label">
              <Label>Account Number</Label>
            </div>
            <div className="detail-field">
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
            <div className="detail-label">
              <Label>Pension Firm Name</Label>
            </div>
            <div className="detail-field">
              <BaseSelect
                name="pensionFirmName"
                value={bankDetails.pensionFirmName}
                onChange={handleBankDetailsChange}
                required
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
            </div>
          </Row>
          <Row>
            <div className="detail-label">
              <Label>Pension Account</Label>
            </div>
            <div className="detail-field">
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
            style={{
              width: matches ? "100%" : "calc(50% - 1rem)",
              marginLeft: matches ? "0" : "auto",
            }}
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
          <H2>Emergency Contact Details</H2>
          <Row>
            <div className="detail-label">
              <Label>Title</Label>
            </div>
            <div className="detail-field">
               <BaseSelect
                  required
                  name="title"
                  value={emergencyContactDetails.title}
                  onChange={handleEmergencyContactDetailsChange}
              >
                  <option value="" hidden></option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Other">Other</option>
               </BaseSelect>
            </div>
          </Row>
          <Row>
            <div className="detail-label">
              <Label>Contact Name</Label>
            </div>
            <div className="detail-field">
              <BaseInput
                type="text"
                name="fullName"
                value={emergencyContactDetails.fullName}
                onChange={handleEmergencyContactDetailsChange}
                required
              />
            </div>
          </Row>
            <Row>
            <div className="detail-label">
              <Label>Relationship</Label>
            </div>
            <div className="detail-field">
              <BaseSelect
               required
               name="relationship"
               value={emergencyContactDetails.relationship}
               onChange={handleEmergencyContactDetailsChange}
              >
                  <option value="" hidden></option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Other">Other</option>
              </BaseSelect>
            </div>
          </Row>
          <Row>
            <div className="detail-label">
              <Label>Contact Address</Label>
            </div>
            <div className="detail-field">
              <BaseInput
                type="text"
                name="address"
                value={emergencyContactDetails.address}
                onChange={handleEmergencyContactDetailsChange}
                required
              />
            </div>
          </Row>
          <Row>
            <div className="detail-label">
              <Label>Contact Phone</Label>
            </div>
            <div className="detail-field">
              <BaseInput
                type="text"
                name="phone"
                value={emergencyContactDetails.phone}
                onChange={handleEmergencyContactDetailsChange}
                required
              />
            </div>
          </Row>
          {error && <P style={{ color: "red" }}>{error}</P>}
          <div
            className="edit-button-box"
            style={{
              width: matches ? "100%" : "calc(50% - 1rem)",
              marginLeft: matches ? "0" : "auto",
            }}
          >
            <BaseButton
              backgroundcolor={"#4E57BB"}
              width={"-webkit-fill-available"}
              onClick={handleEmergencyContactDetailsUpdate}
            >
              {isContactSubmitLoading ? (
                <DotLoader size={20} color="white" className="dotLoader" />
              ) : (
                <Span>Update Contact</Span>
              )}
            </BaseButton>
          </div>
        </div>
        <ResetPasswordModal width={"40%"} />
      </EmployeeProfileWrapper>
    </Layout>
  );
};
