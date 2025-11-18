import { useContext, useEffect, useState } from "react";
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
import { getUser } from "../../../../utils/apis/user/getUser";
import { Context } from "../../../../context";

export const EmployeeDashboard = () => {
  const startDate = 2020;
  const endDate = new Date().getFullYear();

  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } =
    useContext(Context);

  const [payslips, setPayslips] = useState([]);
  const [selectedPayslipId, setSelectedPayslipId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [filter, setFilter] = useState({
    month: 0,
    year: currentYear,
  });

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const res = await getEmployeePayslips(TOKEN);
        let filteredPayslips = res?.data || [];
        filteredPayslips = filteredPayslips.filter((payslip) => {
          const matchMonth = filter.month ? payslip.month === Number(filter.month) : true;
          const matchYear = filter.year ? payslip.year === Number(filter.year) : true;
          return matchMonth && matchYear;
        });
        setPayslips(filteredPayslips);
      } catch (err) {
        console.error("Failed to fetch employee payslips:", err);
      }
    };
    fetchPayslips();
  }, [TOKEN, filter]);

  useEffect(() => {
    getUser(TOKEN)
      .then((data) => {
        setLoggedInUser(data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [TOKEN])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleOpenPayslipModal = async (e, payslipId) => {
    e.stopPropagation();
    if (!String(payslipId).trim()) return;
    setSelectedPayslipId(payslipId);
    return !isPayslipDetailsModalOpen && setIsPayslipDetailsModalOpen(true)
  }

  return (
    <EmployeeDashboardWrapper>
      <div className="title-heading">
        <H1>Welcome {loggedInUser?.fullName?.split(' ')[1]},</H1>
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
            <option value={0}>Select Month</option>
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
          handleRowItemClick={handleOpenPayslipModal}
        />
      </div>
      <ResetPasswordModal
        width={"40%"}
        height={"60%"}
      />
      <PayslipDetailsModal
        width={"60%"}
        height={"500px"}
        payslipId={selectedPayslipId}
        
      />
    </EmployeeDashboardWrapper>
  )
}