import { Layout } from "../../../containers/dashboard/layout";
import { EmployeesWrapper } from "./styled";
import { useState } from "react";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Span } from "../../../components/typography/styled";
import { Table } from "../../../components/table";

export const Employees = () => {
  const [filter, setFilter] = useState({
    username: "",
    department: "",
    jobTitle: "",
    status: "",
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
      id={"employees"}
      title={"Employees"}
      location={"employees"}
    >
      <EmployeesWrapper>
        <Row
          className="heading-row"
          justifycontent={"space-between"}
        >
          <Span>Employee List</Span>
          <Span>See all</Span>
        </Row>
        <Row className="filter">
          <BaseFieldSet>
            <Label>Username</Label>
            <BaseSelect
              name="username"
              onChange={handleChange}
              value={filter.username}
            >
              <option value="" hidden></option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Department</Label>
            <BaseSelect
              name="department"
              onChange={handleChange}
              value={filter.department}
            >
              <option value="" hidden></option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Job Title</Label>
            <BaseSelect
              name="jobTitle"
              onChange={handleChange}
              value={filter.jobTitle}
            >
              <option value="" hidden></option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Status</Label>
            <BaseSelect
              name="status"
              onChange={handleChange}
              value={filter.status}
            >
              <option value="" hidden></option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="employees-table">
          <Table
            columnTitles={[
              "Employee",
              "Department",
              "Salary",
              "Hire Date",
              "Role",
              "status",
            ]}
            rowItems={[]}
          />
        </div>
      </EmployeesWrapper>
    </Layout>
  );
};
