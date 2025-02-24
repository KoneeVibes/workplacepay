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
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../../../components/form/input/styled";
import { getDepartments } from "../../../utils/apis/department/getDepartments";

export const Employees = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({
    username: "",
    departmentId: "",
    jobTitle: "",
    status: "",
  });

  useEffect(() => {
    getAllEmployees(TOKEN, COMPANY_ID, filter)
      .then((data) => setEmployees(data))
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
      });
  }, [TOKEN, COMPANY_ID, filter]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigateToAddNewEmployee = (e) => {
    e.preventDefault();
    return navigate("/addnewemployee");
  };

  return (
    <Layout
      id={"employees"}
      title={"Employees"}
      location={"employees"}
      handleCallToActionClick={navigateToAddNewEmployee}
    >
      <EmployeesWrapper>
        <Row className="heading-row" justifycontent={"space-between"}>
          <Span>Employee List</Span>
          <Span>See all</Span>
        </Row>
        <Row className="filter">
          <BaseFieldSet>
            <Label>Employee</Label>
            <BaseInput
              type="text"
              name="username"
              placeholder="Search by Employee"
              value={filter.username}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Department</Label>
            <BaseSelect
              name="departmentId"
              onChange={handleChange}
              value={filter.departmentId}
            >
              <option value="" hidden>Select Department</option>
              {departments.map((department, index) => (
                <option
                  key={index}
                  value={department.id}
                >
                  {department.name.replace(/\b\w/g, char => char.toUpperCase())}
                </option>
              ))}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Job Title</Label>
            <BaseInput
              type="text"
              name="jobTitle"
              placeholder="Search by jobtitle"
              value={filter.jobTitle}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Status</Label>
            <BaseSelect
              name="status"
              onChange={handleChange}
              value={filter.status}
            >
              <option value="" hidden>Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
              "Status",
            ]}
            rowItems={employees}
            location={"Employee Table"}
          />
        </div>
      </EmployeesWrapper>
    </Layout>
  );
};
