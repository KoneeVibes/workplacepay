import { useState } from "react";
import { Layout } from "../layout";
import { InputRow, PayrollSettingsWrapper } from "./styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { H2, H3, Label, P, Span } from "../../../components/typography/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { BaseFlex, Row } from "../../../components/flex/styled";

export const PayrollSettings = () => {
  const [formDetails, setFormDetails] = useState({
    basic: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value
    }));
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
        <form
          onSubmit={handleSubmit}
        >
          <H3>Earning</H3>
          <BaseFlex
            className="field-row"
          >
            <Label>Basic</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  name="basic"
                  maxLength={3}
                  value={formDetails.basic}
                  onChange={handleChange}
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                id="option1"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
          >
            <Label>Housing</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseSelect>
                  <option value="" hidden></option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </BaseSelect>
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
          >
            <Label>Transport</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseSelect>
                  <option value="" hidden></option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </BaseSelect>
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
          >
            <Label>Housing</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseSelect>
                  <option value="" hidden></option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </BaseSelect>
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
            justifycontent={"space-between"}
          >
            <Label>Overtime</Label>
            <BaseInput
              type="radio"
              name="option"
              value="option1"
              checked
            />
          </BaseFlex>
          <BaseFlex
            className="field-row"
            justifycontent={"space-between"}
          >
            <Label>Bonus</Label>
            <BaseInput
              type="radio"
              name="option"
              value="option1"
              checked
            />
          </BaseFlex>
          <BaseFlex
            className="field-row"
            justifycontent={"space-between"}
          >
            <Label>Other</Label>
            <BaseInput
              type="radio"
              name="option"
              value="option1"
              checked
            />
          </BaseFlex>
          <H3>Deductions</H3>
          <BaseFlex
            className="field-row"
          >
            <Label>Employer Pension Contribution</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  type="number"
                  defaultValue="10"
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
          >
            <Label>Employee Pension Contribution</Label>
            <Row
              flex={0.6}
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <InputRow>
                <BaseInput
                  type="number"
                  defaultValue="8"
                />
                <Span>%</Span>
              </InputRow>
              <BaseInput
                type="radio"
                name="option"
                value="option1"
                checked
              />
            </Row>
          </BaseFlex>
          <BaseFlex
            className="field-row"
            justifycontent={"space-between"}
          >
            <Label>PAYE</Label>
            <BaseInput
              type="radio"
              name="option"
              value="option1"
              checked
            />
          </BaseFlex>
          <BaseFlex
            className="field-row"
            justifycontent={"space-between"}
          >
            <Label>Others</Label>
            <BaseInput
              type="radio"
              name="option"
              value="option1"
              checked
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
      </PayrollSettingsWrapper >
    </Layout >
  );
};
