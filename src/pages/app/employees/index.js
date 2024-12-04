import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { EmployeesWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Span } from "../../../components/typography/styled";
import { Table } from "../../../components/table";
import { getAllEmployees } from "../../../utils/apis/employee/getAllEmployees";
import Cookies from "universal-cookie";

export const Employees = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState({
    username: "",
    department: "",
    jobTitle: "",
    status: "",
  });

  useEffect(() => {
    getAllEmployees(TOKEN, COMPANY_ID)
      .then((data) => setEmployees(data))
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
      });
  }, [TOKEN, COMPANY_ID])

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
            rowItems={employees}
          />
        </div>
      </EmployeesWrapper>
    </Layout>
  );
};
