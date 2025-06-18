import { Layout } from "../../../../containers/app/layout";
import { EditEmployeeWrapper } from "./styled";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { H2, P, Label, Span } from "../../../../components/typography/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseButton } from "../../../../components/button/styled";
import { Column } from "../../../../components/flex/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { BaseTextArea } from "../../../../components/form/textarea/styled";
import { AddEmployeeSuccessModal } from "../../../../containers/app/modals/addemployeesuccessmodal";
import { DotLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { formatDateToDDMMYYYY } from "../../../../config/app/dateFormatter";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { EditEmployeeRow } from "./styled";
import { getEmployee } from "../../../../utils/apis/employee/getEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployeeService } from "../../../../utils/apis/employee/updateEmployee";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { retrieveAllBanks } from "../../../../utils/external/fetchAllBanks";

export const EditEmployee = () => {
  const cookies = new Cookies();
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const TOKEN = cookies.getAll().TOKEN;
  const REACT_APP_PAYSTACK_SK = process.env.REACT_APP_PAYSTACK_SK;

  const { id } = useParams();

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
        optInForPension: true,
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

  const [employee, setEmployee] = useState(initialFormDetails);
  const [step, setStep] = useState(1);
  const Navigate = useNavigate();
  const [matches, setMatches] = useState(false);
  const [isFormReset, setIsFormReset] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [banks, setBanks] = useState([]);

  function formatDateForInput(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("/");
    if (parts.length !== 3) return "";
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
    getEmployee(TOKEN, id, COMPANY_ID)
      .then((data) => {
        // Parse the full name
        const nameParts = data.fullName.split(" ");
        const surname = nameParts[0] || "";
        const othername = nameParts[nameParts.length - 1] || "";
        const firstName =
          nameParts.length > 2
            ? nameParts.slice(1, nameParts.length - 1).join(" ")
            : "";

        // Map the API response to your state structure
        const mappedData = {
          personalInfo: {
            firstName: firstName,
            surname: surname,
            othername: othername,
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || "",
            dateOfBirth: formatDateForInput(data?.dateOfBirth) || "",
          },
          jobInfo: {
            jobPosition: data.jobInformation?.jobPosition || "",
            dateHired: formatDateForInput(data.jobInformation?.dateHired) || "",
            departmentName: data.jobInformation?.department || null,
          },
          payrollSetup: {
            annualGrossPay:
              data.payrollSetupInformation?.annualGrossPay?.toString() || "",
            salaryBankName: data.payrollSetupInformation?.salaryBankName || "",
            salaryBankAccount:
              data.payrollSetupInformation?.salaryBankAccount || "",
            pensionFirmName:
              data.payrollSetupInformation?.pensionFirmName || "",
            pensionAccount: data.payrollSetupInformation?.pensionAccount || "",
            taxNumber: data.payrollSetupInformation?.taxNumber || "",
            optInForPension: data.payrollSetupInformation?.optInForPension ?? true,
          },
          nextofKinInfo: {
            title: data.nextOfKinInformation?.title || "",
            fullName: data.nextOfKinInformation?.fullName || "",
            relationship: data.nextOfKinInformation?.relationship || "",
            phone: data.nextOfKinInformation?.phone || "",
            address: data.nextOfKinInformation?.address || "",
          },
          emergencyContactInfo: {
            title: data.emergencyContactInformation?.title || "",
            fullName: data.emergencyContactInformation?.fullName || "",
            relationship: data.emergencyContactInformation?.relationship || "",
            phone: data.emergencyContactInformation?.phone || "",
            address: data.emergencyContactInformation?.address || "",
          },
        };
        setEmployee(mappedData);
      })
      .catch((error) => console.error(error));
  }, [TOKEN, COMPANY_ID, id]);

  const resetForm = useCallback(() => {
    setStep(1);
    setEmployee(initialFormDetails);
  }, [initialFormDetails]);

  useEffect(() => {
    if (isFormReset) {
      resetForm();
      setIsFormReset(false);
    }
  }, [isFormReset, resetForm]);

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

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleClickPrevious = () => {
    setStep((prev) => {
      return prev - 1;
    });
  };

  const handleClickNext = async (e, step) => {
    if (step === 2) {
      return await handleSubmit(e);
    }
    // perform form validation here to ensure that all the fields
    // in step one have been entered
    setStep((prev) => {
      return prev + 1;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formattedFormDetails = {
      ...employee,
      jobInfo: {
        ...employee.jobInfo,
        dateHired: formatDateToDDMMYYYY(employee.jobInfo.dateHired),
      },
      personalInfo: {
        ...employee.personalInfo,
        dateOfBirth: formatDateToDDMMYYYY(employee.personalInfo.dateOfBirth),
      },
    };
    try {
      const response = await updateEmployeeService(
        TOKEN,
        COMPANY_ID,
        id,
        formattedFormDetails
      );
      if (response.status) {
        setIsLoading(false);
        setIsSuccessModalOpen(true);
      } else {
        setIsLoading(false);
        setError(
          "Update of employee failed. Please check your credentials and try again."
        );
        console.error(
          "Update of employee failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Update of employee failed. ${error.message}`);
      console.error("Update of employee failed:", error);
    }
  };

  return (
    <Layout id={"employees"} title={"Edit Employee"}>
      <EditEmployeeWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"edit-employee-success-modal"}
          title={"Success"}
          message={"Employee has been successfully edited"}
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <Column className="employeeForm">
          {step === 1 && (
            <div className="formText">
              <H2>Personal Details</H2>
              <P>Update employee by capturing all the details</P>
            </div>
          )}
          {step === 2 && (
            <div className="formText">
              <H2>Personal Info</H2>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Fragment>
                <BaseFieldSet>
                  <Label>Surname</Label>
                  <BaseInput
                    type="text"
                    name="surname"
                    value={employee.personalInfo.surname?.replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )}
                    onChange={(e) => handleChange(e, "personalInfo")}
                    required
                  />
                </BaseFieldSet>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>First Name</Label>
                    <BaseInput
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={employee.personalInfo.firstName?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
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
                      value={employee.personalInfo.othername?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Address</Label>
                    <BaseInput
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={employee.personalInfo.address?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Date Of Birth</Label>
                    <BaseInput
                      type="date"
                      name="dateOfBirth"
                      value={employee.personalInfo.dateOfBirth?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Email</Label>
                    <BaseInput
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={employee.personalInfo.email}
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
                      value={employee.personalInfo.phone}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <H2>Corporate Details</H2>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Department Name</Label>
                    <BaseSelect
                      required
                      name="departmentName"
                      value={employee.jobInfo.departmentName}
                      onChange={(e) => handleChange(e, "jobInfo")}
                    >
                      <option value={null}>Select Department</option>
                      {departments.map((department, index) => {
                        return (
                          <option key={index} value={department.name}>
                            {department.name?.replace(/\b\w/g, (char) =>
                              char.toUpperCase()
                            )}
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
                      value={employee.jobInfo.jobPosition?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "jobInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <BaseFieldSet>
                  <Label>Date Hired</Label>
                  <BaseInput
                    type="date"
                    name="dateHired"
                    placeholder="Enter Date Hired"
                    value={employee.jobInfo.dateHired}
                    onChange={(e) => handleChange(e, "jobInfo")}
                    required
                  />
                </BaseFieldSet>
                <H2>Payroll Setup</H2>
                <Column
                  className="switch-column"
                >
                  <Label>Opt In For Pension</Label>
                  <BaseFieldSet
                    style={{ flex: "unset" }}
                  >
                    <Label className="switch">
                      <BaseInput
                        type="checkbox"
                        className="pension-check"
                        name="optInForPension"
                        onChange={(e) => handleChange(e, "payrollSetup")}
                        checked={employee.payrollSetup.optInForPension}
                      />
                      <Span className="slider round"></Span>
                    </Label>
                  </BaseFieldSet>
                </Column>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Annual Gross Pay</Label>
                    <BaseInput
                      type="text"
                      name="annualGrossPay"
                      value={employee.payrollSetup.annualGrossPay}
                      onChange={(e) => handleChange(e, "payrollSetup")}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Salary Bank Name</Label>
                    <BaseSelect
                      name="salaryBankName"
                      value={employee.payrollSetup.salaryBankName}
                      onChange={(e) => handleChange(e, "payrollSetup")}
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
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Salary Bank Account</Label>
                    <BaseInput
                      type="text"
                      name="salaryBankAccount"
                      value={employee.payrollSetup.salaryBankAccount}
                      onChange={(e) => handleChange(e, "payrollSetup")}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Pension Firm Name</Label>
                    <BaseSelect
                      name="pensionFirmName"
                      value={employee.payrollSetup.pensionFirmName}
                      onChange={(e) => handleChange(e, "payrollSetup")}
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
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Pension Account</Label>
                    <BaseInput
                      type="text"
                      name="pensionAccount"
                      value={employee.payrollSetup.pensionAccount}
                      onChange={(e) => handleChange(e, "payrollSetup")}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Tax Identification Number</Label>
                    <BaseInput
                      type="text"
                      name="taxNumber"
                      value={employee.payrollSetup.taxNumber}
                      onChange={(e) => handleChange(e, "payrollSetup")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <BaseButton
                  backgroundcolor={"#4E57BB"}
                  width={"fit-content"}
                  onClick={(e) => handleClickNext(e, step)}
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  Next
                </BaseButton>
              </Fragment>
            )}
            {step === 2 && (
              <Fragment>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Next of Kin’s Title</Label>
                    <BaseSelect
                      name="title"
                      value={employee.nextofKinInfo.title?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
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
                      value={employee.nextofKinInfo.fullName?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "nextofKinInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Relationship</Label>
                    <BaseInput
                      type="text"
                      name="relationship"
                      value={employee.nextofKinInfo.relationship?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "nextofKinInfo")}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Phone Number</Label>
                    <BaseInput
                      type="tel"
                      name="phone"
                      value={employee.nextofKinInfo.phone}
                      onChange={(e) => handleChange(e, "nextofKinInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <BaseFieldSet>
                  <Label>Contact Address</Label>
                  <BaseTextArea
                    className="address"
                    type="text"
                    name="address"
                    value={employee.nextofKinInfo.address?.replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )}
                    onChange={(e) => handleChange(e, "nextofKinInfo")}
                    required
                  />
                </BaseFieldSet>
                <H2>Emergency Contacts</H2>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Contact’s Title</Label>
                    <BaseSelect
                      name="title"
                      value={employee.emergencyContactInfo.title?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
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
                      value={employee.emergencyContactInfo.fullName?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
                      onChange={(e) => handleChange(e, "emergencyContactInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <EditEmployeeRow>
                  <BaseFieldSet>
                    <Label>Relationship</Label>
                    <BaseSelect
                      name="relationship"
                      value={employee.emergencyContactInfo.relationship?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      )}
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
                      value={employee.emergencyContactInfo.phone}
                      onChange={(e) => handleChange(e, "emergencyContactInfo")}
                      required
                    />
                  </BaseFieldSet>
                </EditEmployeeRow>
                <BaseFieldSet>
                  <Label>Contact Address</Label>
                  <BaseTextArea
                    className="address"
                    type="text"
                    name="address"
                    value={employee.emergencyContactInfo.address?.replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )}
                    onChange={(e) => handleChange(e, "emergencyContactInfo")}
                    required
                  />
                </BaseFieldSet>
                <Column className="submit-column">
                  <BaseButton
                    backgroundcolor={"#4E57BB"}
                    width={matches ? "-webkit-fill-available" : "fit-content"}
                    onClick={(e) => handleClickPrevious(e, step)}
                  >
                    Previous
                  </BaseButton>
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
                </Column>
              </Fragment>
            )}
            {error && <P style={{ color: "red" }}>{error}</P>}
          </form>
        </Column>
        <AddEmployeeSuccessModal
          width={"40%"}
          setIsFormReset={setIsFormReset}
          surname={" " + employee.personalInfo.surname}
          firstName={employee.personalInfo.firstName}
        />
      </EditEmployeeWrapper>
    </Layout>
  );
};
