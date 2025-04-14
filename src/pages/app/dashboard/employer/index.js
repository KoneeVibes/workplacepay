import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SalaryAmount, SalaryDate } from "../../../../assets";
import { Card } from "../../../../components/card";
import { Row } from "../../../../components/flex/styled";
import { H3, Label, P } from "../../../../components/typography/styled";
import { EmployerDashboardWrapper } from "./styled";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { LineGraph } from "../../../../components/linegraph";
import { BaseInput } from "../../../../components/form/input/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { Table } from "../../../../components/table";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { getAllEmployees } from "../../../../utils/apis/employee/getAllEmployees";

export const EmployerDashboard = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({
    username: "",
    department: "",
    jobTitle: "",
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

  return (
    <EmployerDashboardWrapper>
      <Row className="cards-group">
        <Card className={"upcoming-salary-date-card"}>
          <Row className="card-title">
            <SalaryDate />
            <H3>Upcoming Salary Date</H3>
          </Row>
          <div className="card-body">
            <P>Fill employee Details</P>
            <FontAwesomeIcon icon={faChartSimple} style={{ float: "right" }} />
          </div>
        </Card>
        <Card className={"upcoming-salary-amount-card"}>
          <Row className="card-title">
            <SalaryAmount />
            <H3>Upcoming Salary Amount</H3>
          </Row>
          <div className="card-body">
            <P>N0.00</P>
            <P>0 employees</P>
          </div>
        </Card>
      </Row>
      <LineGraph title={"Payment History"} labels={[]} datasets={[]} />
      <Card className={"employee-table-card"}>
        <Row className="card-title">
          <H3>Employee List</H3>
          <H3>See all</H3>
        </Row>
        <Row className="card-table-filter">
          <BaseFieldSet>
            <Label>Username</Label>
            <BaseInput
              type="text"
              name="username"
              placeholder="Search by username"
              value={filter.username}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Department</Label>
            <BaseSelect
              name="department"
              onChange={handleChange}
              value={filter.department}
            >
              <option value="" hidden>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department.id}>
                  {department.name}
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
        </Row>
        <div className="card-table">
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
            location={"Dashboard Employee Table"}
          />
        </div>
      </Card>
    </EmployerDashboardWrapper>
  );
};
