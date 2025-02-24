import { Fragment, useContext } from "react";
import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";
import { BaseInput } from "../form/input/styled";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

export const Table = ({ columnTitles, rowItems, location }) => {
  const navigate = useNavigate();
  const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } =
    useContext(Context);

  return (
    <TableWrapper>
      <thead>
        <tr>
          {columnTitles.map((columnTitle, index) => {
            return <Th key={index}>{columnTitle}</Th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rowItems.map((rowItem, index) => {
          return (
            <tr key={index}>
              {location === "Employee Table" && (
                <Fragment>
                  <Td>{rowItem.fullName || ""}</Td>
                  <Td>{rowItem.jobInformation.department ?? "Not Assigned"}</Td>
                  <Td>{rowItem.salary || ""}</Td>
                  <Td>{rowItem.jobInformation.dateHired || ""}</Td>
                  <Td>{rowItem.jobInformation.jobPosition || ""}</Td>
                  <Td>{rowItem.status || ""}</Td>
                </Fragment>
              )}
              {location === "Payroll Table" && (
                <Fragment>
                  <Td>{rowItem.fullName || ""}</Td>
                  <Td>{rowItem.department || ""}</Td>
                  <Td>{rowItem.monthlySalary || ""}</Td>
                  <Td>
                    <BaseInput
                      type="checkbox"
                      checked={rowItem.isExempted}
                      style={{
                        width: "auto",
                        flexShrink: 0,
                      }}
                    />
                  </Td>
                  {rowItem.payrollVariables.map((variable, index) => (
                    <Td key={index}>{variable.value}</Td>
                  ))}
                </Fragment>
              )}
              {location === "Summary Table" && (
                <Fragment>
                  <Td>{rowItem.fullName || ""}</Td>
                  <Td>{rowItem.totalEarnings || ""}</Td>
                  <Td>{rowItem.totalDeductions || ""}</Td>
                  <Td>{rowItem.netSalary || ""}</Td>
                  <Td
                    onClick={() =>
                      navigate(`/reportsummary/summary/${rowItem.payslipId}`)
                    }
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {location === "Employee Payslip Table" && (
                <Fragment>
                  <Td>{rowItem.month || ""}</Td>
                  <Td>{rowItem.year || ""}</Td>
                  <Td
                    onClick={() =>
                      !isPayslipDetailsModalOpen &&
                      setIsPayslipDetailsModalOpen(true)
                    }
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {location === "User Summary Table" && (
                <Fragment>
                  <Td>{rowItem.name || ""}</Td>
                  <Td>{rowItem.value || ""}</Td>
                </Fragment>
              )}
              {location === "Variance Table" && (
                <Fragment>
                  <Td>{rowItem.employeeFullName || ""}</Td>
                  <Td>{rowItem.firstMonthValue || ""}</Td>
                  <Td>{rowItem.secondMonthValue || ""}</Td>
                  <Td>{rowItem.variance || ""}</Td>
                  <Td>{rowItem.percentage || ""}</Td>
                </Fragment>
              )}
              {location === "General Table" && (
                <Fragment>
                  <Td>{rowItem.employeeFullName || ""}</Td>
                  <Td>{rowItem.department || ""}</Td>
                  <Td>{rowItem.month || ""}</Td>
                  <Td>{rowItem.year || ""}</Td>
                  <Td>{rowItem.salaryBankName || ""}</Td>
                  <Td>{rowItem.salaryBankAccount || ""}</Td>
                  <Td>{rowItem.pensionFirmName || ""}</Td>
                  <Td>{rowItem.pensionAccount || ""}</Td>
                  {['basic', 'housing', 'transport', 'overtime', 'bonus'].map(expectedName => {
                    const foundEarning = rowItem.earnings.find(
                      variable => variable.name.toLowerCase() === expectedName.toLowerCase()
                    );
                    return (
                      <Td key={expectedName}>
                        {foundEarning ? foundEarning.value : ''}
                      </Td>
                    );
                  })}
                  {['paye', 'employer pension contribution', 'employee pension contribution'].map(expectedName => {
                    const foundDeduction = rowItem.deductions.find(
                      variable => variable.name.toLowerCase() === expectedName.toLowerCase()
                    );
                    return (
                      <Td key={expectedName}>
                        {foundDeduction ? foundDeduction.value : ''}
                      </Td>
                    );
                  })}
                  <Td>{rowItem.totalEarnings || ""}</Td>
                  <Td>{rowItem.totalDeductions || ""}</Td>
                  <Td>{rowItem.grossPay || ""}</Td>
                  <Td>{rowItem.netPay || ""}</Td>
                </Fragment>
              )}
              {location === "Pension Table" && (
                <Fragment>
                  <Td>{rowItem.employeeFullName || ""}</Td>
                  <Td>{rowItem.month || ""}</Td>
                  <Td>{rowItem.year || ""}</Td>
                  <Td>{rowItem.pensionFirmName || ""}</Td>
                  <Td>{rowItem.pensionAccount || ""}</Td>
                </Fragment>
              )}
              {location === "Paye Table" && (
                <Fragment>
                  <Td>{rowItem.employeeFullName || ""}</Td>
                  <Td>{rowItem.taxNumber || ""}</Td>
                  <Td>{rowItem.month || ""}</Td>
                  <Td>{rowItem.year || ""}</Td>
                  <Td>{rowItem.grossPay || ""}</Td>
                  <Td>{rowItem.payeValue || ""}</Td>
                </Fragment>
              )}
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};
