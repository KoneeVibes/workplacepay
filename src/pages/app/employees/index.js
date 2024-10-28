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
  const [employees, setEmployees] = useState({
    year: "",
    month: "",
  });

  const [filter, setFilter] = useState({
    username: "",
    department: "",
    jobTitle: "",
    status: "",
  });

  const handleChange = (e, target) => {
    const { name, value } = e.target;
    if (target === "employees") {
      setEmployees((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Layout title={"Employees"} location={"employees"}>
      <EmployeesWrapper className="employeesWrapper">
        <Row className="row" justifycontent={"space-between"}>
          <Span className="employeesList">Employee List</Span>
          <Span className="employeesList">See all</Span>
        </Row>
        <Row className="filter">
          <BaseFieldSet>
            <Label>Username</Label>
            <BaseSelect
              name="username"
              onChange={(e) => handleChange(e, "filter")}
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
              onChange={(e) => handleChange(e, "filter")}
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
              onChange={(e) => handleChange(e, "filter")}
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
              onChange={(e) => handleChange(e, "filter")}
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
