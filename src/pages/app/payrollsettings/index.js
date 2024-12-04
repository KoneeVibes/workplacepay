import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { InputRow, PayrollSettingsWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { BaseFlex, Row } from "../../../components/flex/styled";
import { setupPayrollService } from "../../../utils/apis/payroll/setupPayroll";
import Cookies from "universal-cookie";
import { DotLoader } from "react-spinners";
import { retrievePayrollSetup } from "../../../utils/apis/payroll/retrievePayrollSetup";

export const PayrollSettings = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.getAll().TOKEN;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    payrollSetupId: "",
    payrollVariables: [
      {
        setupVariableId: "",
        name: "basic",
        type: "Earnings",
        stake: "percent",
        value: "",
        isChecked: true
      },
      {
        setupVariableId: "",
        name: "housing",
        type: "Earnings",
        stake: "percent",
        value: "",
        isChecked: true
      },
      {
        setupVariableId: "",
        name: "transport",
        type: "Earnings",
        stake: "percent",
        value: "",
        isChecked: true
      },
      {
        setupVariableId: "",
        name: "overtime",
        type: "Earnings",
        stake: "money",
        value: "",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "bonus",
        type: "Earnings",
        stake: "money",
        value: "",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "other",
        type: "Earnings",
        stake: "money",
        value: "",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "employer pension contribution",
        type: "Deductions",
        stake: "percent",
        value: "10",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "employee pension contribution",
        type: "Deductions",
        stake: "percent",
        value: "8",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "PAYE",
        type: "Deductions",
        stake: "money",
        value: "",
        isChecked: false
      },
      {
        setupVariableId: "",
        name: "others",
        type: "Deductions",
        stake: "money",
        value: "",
        isChecked: false
      },
    ],
  });

  useEffect(() => {
    retrievePayrollSetup()
    
    console.log()
  }, [formDetails]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      payrollVariables: prev.payrollVariables.map((variable) =>
        variable.name === name
          ? { ...variable, isChecked: checked }
          : variable
      ),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      handleCheckboxChange(e);
    } else {
      setFormDetails((prev) => ({
        ...prev,
        payrollVariables: prev.payrollVariables.map((variable) =>
          variable.name === name
            ? { ...variable, value }
            : variable
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDetails);
    setError(null);
    setIsLoading(true);
    try {
      const response = await setupPayrollService(TOKEN, formDetails, "companyId");
      if (response.status) {
        setIsLoading(false);
        // handleOpenModal();
      } else {
        setIsLoading(false);
        setError('Payroll setup failed. Please check your credentials and try again.');
        console.error("Payroll setup failed. Please check your credentials and try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Payroll setup failed. ${error.message}`);
      console.error('Payroll setup failed:', error);
    }
  };

  return (
    <Layout
      id={"setup"}
      title={"Payroll Settings"}
    >
      <PayrollSettingsWrapper>
        <H2>Payroll Variables</H2>
        <P>Select the applicable variables for the user</P>
        <form onSubmit={handleSubmit}>
          <H3>Earning</H3>
          <BaseFlex className="field-row">
            <Label htmlFor="basic">Basic</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  id="basic"
                  type="number"
                  name="basic"
                  max={100}
                  value={
                    formDetails.payrollVariables.find((variable) => variable.name === "basic")?.value || ""
                  }
                  onChange={handleChange}
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="checkbox"
                checked
                readOnly
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row">
            <Label htmlFor="housing">Housing</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseSelect
                  id="housing"
                  name="housing"
                  required
                  value={
                    formDetails.payrollVariables.find((variable) => variable.name === "housing")?.value || ""
                  }
                  onChange={handleChange}
                >
                  <option value="" hidden></option>
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                </BaseSelect>
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="checkbox"
                checked
                readOnly
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row">
            <Label htmlFor="transport">Transport</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseSelect
                  id="transport"
                  name="transport"
                  required
                  value={
                    formDetails.payrollVariables.find((variable) => variable.name === "transport")?.value || ""
                  }
                  onChange={handleChange}
                >
                  <option value="" hidden></option>
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                </BaseSelect>
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="checkbox"
                checked
                readOnly
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="overtime">Overtime</Label>
            <BaseInput
              id="overtime"
              type="checkbox"
              name="overtime"
              checked={
                formDetails.payrollVariables.find((variable) => variable.name === "overtime")?.isChecked || ""
              }
              onChange={handleCheckboxChange}
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="bonus">Bonus</Label>
            <BaseInput
              id="bonus"
              type="checkbox"
              name="bonus"
              checked={
                formDetails.payrollVariables.find((variable) => variable.name === "bonus")?.isChecked || ""
              }
              onChange={handleCheckboxChange}
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="other">Other</Label>
            <BaseInput
              id="other"
              type="checkbox"
              name="other"
              checked={
                formDetails.payrollVariables.find((variable) => variable.name === "other")?.isChecked || ""
              }
              onChange={handleCheckboxChange}
            />
          </BaseFlex>
          <H3>Deductions</H3>
          <BaseFlex className="field-row">
            <Label htmlFor="pension">Employer Pension Contribution</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  type="number"
                  name="employer pension contribution"
                  value={
                    formDetails.payrollVariables.find((variable) => variable.name === "employer pension contribution")?.value || ""
                  }
                  readOnly
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                id="pension"
                type="checkbox"
                name="employer pension contribution"
                onChange={handleCheckboxChange}
                checked={
                  formDetails.payrollVariables.find((variable) => variable.name === "employer pension contribution")?.isChecked || ""
                }
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row">
            <Label htmlFor="contribution">Employee Pension Contribution</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  type="number"
                  name="employee pension contribution"
                  value={
                    formDetails.payrollVariables.find((variable) => variable.name === "employee pension contribution")?.value || ""
                  }
                  readOnly
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                id="contribution"
                type="checkbox"
                name="employee pension contribution"
                onChange={handleCheckboxChange}
                checked={
                  formDetails.payrollVariables.find((variable) => variable.name === "employee pension contribution")?.isChecked || ""
                }
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="PAYE">PAYE</Label>
            <BaseInput
              id="PAYE"
              type="checkbox"
              name="PAYE"
              onChange={handleCheckboxChange}
              checked={
                formDetails.payrollVariables.find((variable) => variable.name === "PAYE")?.isChecked || ""
              }
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="others">Others</Label>
            <BaseInput
              id="others"
              type="checkbox"
              name="others"
              onChange={handleCheckboxChange}
              checked={
                formDetails.payrollVariables.find((variable) => variable.name === "others")?.isChecked || ""
              }
            />
          </BaseFlex>
          <BaseButton
            type="submit"
            backgroundcolor={"#4E57BB"}
            width={"fit-content"}
          >
            {isLoading ?
              (<DotLoader
                size={20}
                color="white"
                className='dotLoader'
              />) : (
                <Span>
                  Save
                </Span>
              )}
          </BaseButton>
          {error && <P style={{ color: 'red' }}>{error}</P>}
        </form>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
