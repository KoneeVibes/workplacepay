import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Context } from "../../../context";
import { Layout } from "../../../containers/app/layout";
import { AddNewEmployeeWrapper } from "./styled";
import { H2, P, Label } from "../../../components/typography/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { AddNewEmployeeRow } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { Column } from "../../../components/flex/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { BaseTextArea } from "../../../components/form/textarea/styled";
import { AddEmployeeSuccessModal } from "../../../containers/app/modals/addemployeesuccessmodal";

export const AddNewEmployee = () => {
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
        jobPosition: "",
        dateHired: "",
        departmentName: "",
      },

      payrollSetup: {
        annualGrossPay: decimal,
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

  const [step, setStep] = useState(1);
  const [matches, setMatches] = useState(false);
  const [isFormReset, setIsFormReset] = useState(false);

  const { setIsAddEmployeeSuccessModalOpen } = useContext(Context);
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
    setIsAddEmployeeSuccessModalOpen(true);
  };

  const resetForm = useCallback(() => {
    setStep(1);
    setFormDetails(initialFormDetails);
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

  return (
    <Layout title={"Add new employee"}>
      <AddNewEmployeeWrapper>
        <Column className="employeeForm">
          {step === 1 && (
            <div className="formText">
              <H2>Personal Details</H2>
              <P>Add user by capturing all the details</P>
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
                  <Label>surname (System generated)</Label>
                  <BaseInput
                    type="text"
                    name="surname"
                    value={formDetails.personalInfo.surname}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </BaseFieldSet>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>First Name</Label>
                    <BaseInput
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={formDetails.personalInfo.firstName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Other Name</Label>
                    <BaseInput
                      type="text"
                      name="othername"
                      placeholder="Enter Other Name"
                      value={formDetails.personalInfo.othername}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>address</Label>
                    <BaseInput
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formDetails.personalInfo.address}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Date Of Birth</Label>
                    <BaseInput
                      type="date"
                      name="dateOfBirth"
                      value={formDetails.personalInfo.dateOfBirth}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Email</Label>
                    <BaseInput
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formDetails.personalInfo.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Phone Number</Label>
                    <BaseInput
                      type="tel"
                      name="phone"
                      placeholder="Enter PhoneNumber"
                      value={formDetails.personalInfo.phone}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                {/* <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Job Position</Label>
                    <BaseInput
                      type="text"
                      name="jobPosition"
                      placeholder="Enter Job Position"
                      value={formDetails.jobInfo.jobPosition}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Date Hired</Label>
                    <BaseInput
                      type="date"
                      name="dateHired"
                      placeholder="Enter Date Hired"
                      value={formDetails.jobInfo.dateHired}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow> */}
                <H2>Corporate Details</H2>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Department Name</Label>
                    <BaseInput
                      type="text"
                      name="departmentName"
                      placeholder="Enter Department Name"
                      value={formDetails.jobInfo.departmentName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Job Position</Label>
                    <BaseInput
                      type="text"
                      name="jobPosition"
                      placeholder="Enter Job Position"
                      value={formDetails.jobInfo.jobPosition}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <BaseFieldSet>
                  <Label>Date Hired</Label>
                  <BaseInput
                    type="date"
                    name="dateHired"
                    placeholder="Enter Date Hired"
                    value={formDetails.jobInfo.dateHired}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </BaseFieldSet>
                <H2>Payroll Setup</H2>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Annual Gross Pay</Label>
                    <BaseInput
                      type="text"
                      name="annualGrossPay"
                      value={formDetails.payrollSetup.annualGrossPay}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Salary Bank Name</Label>
                    <BaseSelect
                      name="saaryBankName"
                      value={formDetails.payrollSetup.salaryBankAccount}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="" hidden></option>
                      <option value="Bank A">Bank A</option>
                      <option value="Bank B">Bank B</option>
                    </BaseSelect>
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Salary Bank Account</Label>
                    <BaseInput
                      type="text"
                      name="salaryBankAccount"
                      value={formDetails.payrollSetup.salaryBankAccount}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Pension Firm Name</Label>
                    <BaseSelect
                      name="pensionFirmName"
                      value={formDetails.payrollSetup.pensionFirmName}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="" hidden></option>
                      <option value="Pension Firm A">Pension Firm A</option>
                      <option value="Pension Firm B">Pension Firm B</option>
                    </BaseSelect>
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Pension Account</Label>
                    <BaseInput
                      type="text"
                      name="pensionAccount"
                      value={formDetails.payrollSetup.pensionAccount}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Tax Identification Number</Label>
                    <BaseInput
                      type="text"
                      name="taxNumber"
                      value={formDetails.payrollSetup.taxNumber}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
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
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Next of Kin’s Title</Label>
                    <BaseSelect
                      name="title"
                      value={formDetails.nextofKinInfo.title}
                      onChange={(e) => handleChange(e)}
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
                      value={formDetails.nextofKinInfo.fullName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Relationship</Label>
                    <BaseInput
                      type="text"
                      name="relationship"
                      value={formDetails.nextofKinInfo.relationship}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                  <BaseFieldSet>
                    <Label>Phone Number</Label>
                    <BaseInput
                      type="tel"
                      name="phone"
                      value={formDetails.nextofKinInfo.phone}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <BaseFieldSet>
                  <Label>Contact Address</Label>
                  <BaseTextArea
                    className="address"
                    type="text"
                    name="address"
                    value={formDetails.nextofKinInfo.address}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </BaseFieldSet>
                <H2>Emergency Contacts</H2>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Contact’s Title</Label>
                    <BaseSelect
                      name="title"
                      value={formDetails.emergencyContactInfo.title}
                      onChange={(e) => handleChange(e)}
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
                      value={formDetails.emergencyContactInfo.fullName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <AddNewEmployeeRow>
                  <BaseFieldSet>
                    <Label>Relationship</Label>
                    <BaseSelect
                      name="relationship"
                      value={formDetails.emergencyContactInfo.relationship}
                      onChange={(e) => handleChange(e)}
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
                      value={formDetails.emergencyContactInfo.phone}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </BaseFieldSet>
                </AddNewEmployeeRow>
                <BaseFieldSet>
                  <Label>Contact Address</Label>
                  <BaseTextArea
                    className="address"
                    type="text"
                    name="address"
                    value={formDetails.emergencyContactInfo.address}
                    onChange={(e) => handleChange(e)}
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
                    Submit
                  </BaseButton>
                </Column>
              </Fragment>
            )}
          </form>
        </Column>
        <AddEmployeeSuccessModal
          width={"40%"}
          setIsFormReset={setIsFormReset}
        />
      </AddNewEmployeeWrapper>
    </Layout>
  );
};
