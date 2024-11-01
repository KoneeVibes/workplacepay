import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { GeneralReportWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
//import { H3 } from "../../../components/typography/styled";
//import { Span } from "../../../components/typography/styled";
import { Table } from "../../../components/table";

export const GeneralReport = () => {
  const [filter, setFilter] = useState({
    year: "",
    month:"",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout
      id={"Variance"}
      title={"GENERAL REPORT"}
    >
      <GeneralReportWrapper>
        <Row className="filter">
          <BaseFieldSet>
            <BaseSelect
              name="year"
              onChange={handleChange}
              value={filter.year}
            >
              <option value="">Select Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <BaseSelect
              name="month"
              onChange={handleChange}
              value={filter.month}
            >
              <option value="" hidden>Select Month</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <BaseSelect
              name="department"
              onChange={handleChange}
              value={filter.department}
            >
              <option value="" hidden>Select Department</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="general-report-table">
          <Table
            columnTitles={[
              "NAME",
              "DEPARTMENT",
              "MONTH",
              "YEAR",
              "BANK",
              "BANK ACCOUNT",
              "PFA",
              "PFA ACCOUNT",
              "BASIC",
              "HOUSING",
              "TRANSPORT",
              "OVERTIME",
              "BONUS",
              "PAYE",
              "PENSION",
              "OTHER ADDITION",
              "OTHER DEDUCTION",
              "GROSS",
              "NET PAY",
            ]}
            rowItems={[]}
          />
        </div>
      </GeneralReportWrapper>
    </Layout>
  );
};
