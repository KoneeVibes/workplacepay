import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SalaryAmount, SalaryDate } from "../../../../assets";
import { Card } from "../../../../components/card";
import { Column, Row } from "../../../../components/flex/styled";
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
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { EmployeeBulkUploadModal } from "../../../../containers/app/modals/employeebulkuploadmodal";
import { getDashboard } from "../../../../utils/apis/dashboard/getDashboard";


export const EmployerDashboard = ({ addEmployeeModal }) => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({
    employeeName: "",
    departmentId: "",
    jobTitle: "",
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [overview, setOverview] = useState({});

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const sortedPayrollSalaries = [...overview?.payrollSalaries || []]
    .sort((a, b) => a.month - b.month)
    .map(item => ({
      ...item,
      month: monthNames[item.month - 1]
    }));

  useEffect(() => {
    getAllEmployees(TOKEN, COMPANY_ID, filter)
      .then((data) => setEmployees(data))
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
      });
  }, [TOKEN, COMPANY_ID, filter]);

  useEffect(() => {
    getDashboard(TOKEN, COMPANY_ID)
      .then((data) => setOverview(data))
      .catch((err) => {
        console.error("Failed to fetch overview:", err);
      });
  }, [TOKEN, COMPANY_ID]);

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

  const handleCloseSuccessModal = () => {
    return setIsSuccessModalOpen(false);
  };

  const handlePersistModal = () => {
    setIsSuccessModalOpen(true);
  };

  return (
    <EmployerDashboardWrapper>
      <SuccessModal
        open={isSuccessModalOpen}
        handleClickOutside={handlePersistModal}
        className={"delete-employee-success-modal"}
        title={"Success"}
        message={`Employee has been successfully added`}
        callToAction={"Close"}
        handleCallToActionClick={handleCloseSuccessModal}
      />
      {addEmployeeModal}
      <EmployeeBulkUploadModal
        width={"40%"}
        height={"350px"}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
      />
      <Row className="cards-group">
        <Card className={"company-streak-card"}>
          <Row className="card-title">
            <SalaryDate />
            <H3>Company Streak</H3>
          </Row>
          <Column className="card-body">
            <Row
              alignitems={"center"}
              justifycontent={"space-between"}
              className="card-body-introduction"
            >
              <P>Details</P>
              <FontAwesomeIcon icon={faChartSimple} />
            </Row>
            <ul
              className="card-body-list"
            >
              <li>Total employee count of {overview?.totalEmployees}</li>
              <li>Processed {overview?.totalPayrollSalary?.toLocaleString()} in {overview.totalPayrollCount} saved runs till date</li>
            </ul>
          </Column>
        </Card>
        <Card className={"last-payroll-card"}>
          <Row className="card-title">
            <SalaryAmount />
            <H3>Last Payroll Ran</H3>
          </Row>
          <div className="card-body">
            <P>{"" + (overview?.lastPayrollSalary?.toLocaleString()) || 0}</P>
            <Row
              alignitems={"center"}
              justifycontent={"space-between"}
            >
              <P>{overview?.lastPayrollEmployees} employees</P>
              <P>{overview?.lastPayrollDate}</P>
            </Row>
          </div>
        </Card>
      </Row>
      <LineGraph
        title={"Payment History"}
        labels={sortedPayrollSalaries.map(salary => salary.month)}
        datasets={[
          {
            label: "Payroll Run",
            data: sortedPayrollSalaries.map(salary => salary.value),
          },
        ]}
      />
      <Card className={"employee-table-card"}>
        <Row className="card-title">
          <H3>Employee List</H3>
          {/* <H3>Show all</H3> */}
        </Row>
        <Row className="card-table-filter">
          <BaseFieldSet>
            <Label>Employee Name</Label>
            <BaseInput
              type="text"
              name="employeeName"
              placeholder="Search by Employee Name"
              value={filter.employeeName}
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
              <option value="" hidden>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department.departmentId}>
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
            ]}
            rowItems={employees}
            location={"Dashboard Employee Table"}
          />
        </div>
      </Card>
    </EmployerDashboardWrapper >
  );
};
