import { useState } from "react";
import { Layout } from "../layout";
import { InputRow, PayrollSettingsWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { BaseFlex, Row } from "../../../components/flex/styled";

export const PayrollSettings = () => {
  const pensionPercentage = "10";
  const contributionPercentage = "8";
  const [formDetails, setFormDetails] = useState({
    basic: "",
    housing: "",
    transport: "",
    overtime: false,
    bonus: false,
    other: false,
    pension: "",
    isPension: false,
    contribution: "",
    isContribution: false,
    PAYE: false,
    others: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "isPension") {
      setFormDetails((prev) => ({
        ...prev,
        pension: checked ? pensionPercentage : "",
        isPension: checked,
      }));
    } else if (name === "isContribution") {
      setFormDetails((prev) => ({
        ...prev,
        contribution: checked ? contributionPercentage : "",
        isContribution: checked,
      }));
    } else {
      setFormDetails((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      handleCheckboxChange(e);
    } else {
      console.log(value);
      setFormDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  return (
    <Layout title={"Payroll Settings"}>
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
                  value={formDetails.basic}
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
                  value={formDetails.housing}
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
                  value={formDetails.transport}
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
              checked={formDetails.overtime}
              onChange={handleChange}
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="bonus">Bonus</Label>
            <BaseInput
              id="bonus"
              type="checkbox"
              name="bonus"
              checked={formDetails.bonus}
              onChange={handleChange}
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="other">Other</Label>
            <BaseInput
              id="other"
              type="checkbox"
              name="other"
              checked={formDetails.other}
              onChange={handleChange}
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
                  name="pension"
                  value={pensionPercentage}
                  readOnly
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                id="pension"
                type="checkbox"
                name="isPension"
                onChange={handleChange}
                checked={formDetails.isPension}
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
                  name="contribution"
                  value={contributionPercentage}
                  readOnly
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                id="contribution"
                type="checkbox"
                name="isContribution"
                onChange={handleChange}
                checked={formDetails.isContribution}
              />
            </Row>
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="PAYE">PAYE</Label>
            <BaseInput
              id="PAYE"
              type="checkbox"
              name="PAYE"
              onChange={handleChange}
              checked={formDetails.PAYE}
            />
          </BaseFlex>
          <BaseFlex className="field-row" justifycontent={"space-between"}>
            <Label htmlFor="others">Others</Label>
            <BaseInput
              id="others"
              type="checkbox"
              name="others"
              onChange={handleChange}
              checked={formDetails.others}
            />
          </BaseFlex>
          <BaseButton
            type="submit"
            backgroundcolor={"#4E57BB"}
            width={"fit-content"}
          >
            Save
          </BaseButton>
        </form>
      </PayrollSettingsWrapper>
    </Layout>
  );
};
