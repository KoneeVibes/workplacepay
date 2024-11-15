import { useState } from "react";
import { EmployeeDashboardWrapper } from "./styled";
import { H1, H2, Label } from "../../../../components/typography/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Table } from "../../../../components/table";

export const EmployeeDashboard = () => {
  const [filter, setFilter] = useState({
    year: "",
    month: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <EmployeeDashboardWrapper>
      <div className="title-heading">
        <H1>Welcome Olumide,</H1>
        <H2>Payslip List</H2>
      </div>
      <Row className="filter">
        <BaseFieldSet>
          <Label>Month</Label>
          <BaseSelect
            name="month"
            onChange={handleChange}
            value={filter.month}
          >
            <option value="">Select Month</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
          </BaseSelect>
        </BaseFieldSet>
        <BaseFieldSet>
          <Label>Year</Label>
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
      </Row>
      <div className="table">
        <Table
          columnTitles={[
            "Month",
            "Year",
            "View Payslip",
          ]}
          rowItems={[]}
        />
      </div>
    </EmployeeDashboardWrapper>
  )
}