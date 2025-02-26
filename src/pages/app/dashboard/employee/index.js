import { useEffect, useState } from "react";
import { EmployeeDashboardWrapper } from "./styled";
import { H1, H2, Label } from "../../../../components/typography/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Table } from "../../../../components/table";
import { ResetPasswordModal } from "../../../../containers/app/modals/resetpasswordmodal";
import Cookies from "universal-cookie";
import { getEmployeePayslips } from "../../../../utils/apis/payroll/getEmployeePayslips";
import { PayslipDetailsModal } from "../../../../containers/app/modals/payslipdetailsmodal";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../../helpers/retrieveAllMonths";

export const EmployeeDashboard = () => {
  const startDate = 1990;
  const endDate = 2025;

  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [payslips, setPayslips] = useState([]);

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const res = await getEmployeePayslips(TOKEN);
        return setPayslips(res?.data);
      } catch (err) {
        console.error("Failed to fetch employee payslips:", err);
      }
    };
    fetchPayslips();
  }, [TOKEN]);

  const [filter, setFilter] = useState({
    month: currentMonth,
    year: currentYear,
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
            onChange={(e) => handleChange(e, "payroll")}
            value={filter.month}
          >
            {months.map((month, index) => {
              return (
                <option
                  key={index}
                  value={index + 1}
                >
                  {month}
                </option>
              )
            })}
          </BaseSelect>
        </BaseFieldSet>
        <BaseFieldSet>
          <Label>Year</Label>
          <BaseSelect
            name="year"
            onChange={(e) => handleChange(e)}
            value={filter.year}
          >
            {getYearRange(startDate, endDate).map((year, index) => {
              return (
                <option
                  key={index}
                  value={year}
                >
                  {year}
                </option>
              )
            })}
          </BaseSelect>
        </BaseFieldSet>
      </Row>
      <div className="table">
        <Table
          location={"Employee Payslip Table"}
          columnTitles={[
            "Month",
            "Year",
            "View Payslip",
          ]}
          rowItems={payslips}
        />
      </div>
      <ResetPasswordModal
        width={"40%"}
        height={"60%"}
      />
      <PayslipDetailsModal
        width={"80%"}
      />
    </EmployeeDashboardWrapper>
  )
}