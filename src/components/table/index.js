import { Fragment } from "react";
import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";
import { BaseInput } from "../form/input/styled";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export const Table = ({
  columnTitles,
  rowItems,
  location,
  activeRowId,
  handleRowItemClick,
  handleRowItemActionClick,
  handleChange,
  dropdownRef
}) => {
  const navigate = useNavigate();

  const getMonthName = (monthIndex, year = new Date().getFullYear(), locale = 'en-US') => {
    const date = new Date(year, monthIndex - 1);
    return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  };

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
          const capitalizeWords = (str) => {
            return str?.replace(/\b\w/g, (char) => char?.toUpperCase());
          };
          return (
            <tr key={index}>
              {location === "Employee Table" && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>
                    {capitalizeWords(rowItem?.jobInformation?.department) ??
                      "Not Assigned"}
                  </Td>
                  <Td>{rowItem?.payrollSetupInformation?.annualGrossPay?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.jobInformation?.dateHired || ""}</Td>
                  <Td>{rowItem?.jobInformation?.jobPosition || ""}</Td>
                  <Td>{rowItem?.status || ""}</Td>
                  <Td
                    onClick={(e) => handleRowItemClick(e, rowItem?.employeeId)}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    {activeRowId === rowItem?.employeeId && (
                      <ul ref={dropdownRef} className="drop-down">
                        <li
                          onClick={(e) =>
                            handleRowItemActionClick(
                              e,
                              rowItem?.employeeId,
                              "edit"
                            )
                          }
                        >
                          Edit Employee
                        </li>
                        <li
                          onClick={(e) =>
                            handleRowItemActionClick(
                              e,
                              rowItem?.employeeId,
                              "delete"
                            )
                          }
                        >
                          Delete Employee
                        </li>
                      </ul>
                    )}
                  </Td>
                </Fragment>
              )}
              {(location === "Dashboard Employee Table") && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>
                    {capitalizeWords(rowItem?.jobInformation?.department) ??
                      "Not Assigned"}
                  </Td>
                  <Td>{rowItem?.payrollSetupInformation?.annualGrossPay?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.jobInformation?.dateHired || ""}</Td>
                  <Td>{rowItem?.jobInformation?.jobPosition || ""}</Td>
                </Fragment>
              )}
              {location === "Payroll Table" && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>{capitalizeWords(rowItem?.department) || ""}</Td>
                  <Td>{rowItem?.monthlySalary?.toLocaleString() || ""}</Td>
                  <Td>
                    <BaseInput
                      type="checkbox"
                      checked={rowItem?.isExempted}
                      style={{
                        width: "auto",
                        flexShrink: 0,
                      }}
                      onChange={(e) => handleChange(e, rowItem?.employeeId)}
                    />
                  </Td>
                  {rowItem?.payrollVariables?.map((variable, index) => (
                    <Td key={index}>{variable?.value}</Td>
                  ))}
                  <Td
                    onClick={(e) => handleRowItemClick(e, rowItem?.payslipId)}
                  >
                    Manage Employee
                  </Td>
                </Fragment>
              )}
              {location === "Summary Table" && (
                <Fragment>
                  <Td>{rowItem?.employeeFullName || ""}</Td>
                  <Td>{rowItem?.totalEarnings?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.totalDeductions?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.netPay?.toLocaleString() || ""}</Td>
                  <Td
                    onClick={() =>
                      navigate(`/reportsummary/summary/${rowItem?.payslipId}`)
                    }
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {location === "Employee Payslip Table" && (
                <Fragment>
                  <Td>{getMonthName(rowItem?.month, rowItem?.year) || ""}</Td>
                  <Td>{rowItem?.year || ""}</Td>
                  <Td
                    onClick={(e) => handleRowItemClick(e, rowItem?.payslipId)}
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {location === "User Summary Table" && (
                <Fragment>
                  <Td>{rowItem?.name || ""}</Td>
                  <Td>{rowItem?.value || ""}</Td>
                </Fragment>
              )}
              {location === "Variance Table" && (
                <Fragment>
                  <Td>{rowItem?.employeeFullName || ""}</Td>
                  <Td>{rowItem?.firstMonthValue?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.secondMonthValue?.toLocaleString() || ""}</Td>
                  <Td>{rowItem?.variance || ""}</Td>
                  <Td>{rowItem?.percentage || ""}</Td>
                </Fragment>
              )}
              {location === "Departments Table" && (
                <Fragment>
                  <Td>{rowItem?.name ? capitalizeWords(rowItem?.name) : ""}</Td>
                  <Td
                    onClick={(e) =>
                      handleRowItemClick(e, rowItem?.departmentId)
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    {activeRowId === rowItem?.departmentId && (
                      <ul ref={dropdownRef} className="drop-down">
                        <li
                          onClick={(e) =>
                            handleRowItemActionClick(
                              e,
                              rowItem?.departmentId,
                              "edit"
                            )
                          }
                        >
                          Edit Department
                        </li>
                        <li
                          onClick={(e) =>
                            handleRowItemActionClick(
                              e,
                              rowItem?.departmentId,
                              "delete"
                            )
                          }
                        >
                          Delete Department
                        </li>
                      </ul>
                    )}
                  </Td>
                </Fragment>
              )}
              {location === "Company Table" && (
                <Fragment>
                  <Td>{rowItem?.companyName || ""}</Td>
                  <Td>{rowItem?.employerEmail || ""}</Td>
                  <Td>{rowItem?.planType || ""}</Td>
                  <Td>{rowItem?.creditBalance || ""}</Td>
                  <Td>{rowItem?.lastUsedDate || ""}</Td>
                  <Td
                    onClick={(e) =>
                      handleRowItemClick(e, rowItem?.companyId)
                    }
                  >
                    View Details
                  </Td>
                </Fragment>
              )}
              {location === "Referrals Table" && (
                <Fragment>
                  <Td>{rowItem?.refererFullname}</Td>
                  <Td>{rowItem?.employerFullname}</Td>
                  <Td>{rowItem?.companyName}</Td>
                  <Td>{rowItem?.companyEmail}</Td>
                  <Td>{rowItem?.dateReferred}</Td>
                  <Td>{rowItem?.status}</Td>
                </Fragment>
              )}
              {location === "Plans & Pricing" && (
                <Fragment>
                  <Td>{rowItem?.title?.charAt(0)?.toUpperCase() + rowItem?.title?.slice(1)}</Td>
                  <Td>{rowItem?.lowerLimit}</Td>
                  <Td>{rowItem?.upperLimit}</Td>
                  <Td>{rowItem?.creditCostPerEmployee}</Td>
                  <Td
                    onClick={(e) =>
                      handleRowItemClick(e, rowItem?.id)
                    }
                  >
                    Manage Detail
                  </Td>
                </Fragment>
              )}
              {location === "Billing Table" && (
                <Fragment>
                  <Td>{rowItem?.companyName}</Td>
                  <Td>{rowItem?.employerEmail}</Td>
                  <Td>{rowItem?.creditAmount}</Td>
                  <Td>{rowItem?.creditCost}</Td>
                  <Td>{rowItem?.dateInitiated}</Td>
                  <Td>{rowItem?.dateCompleted}</Td>
                  <Td>{rowItem?.payrollPlan}</Td>
                </Fragment>
              )}
              {location === "General Table" && (
                <Fragment>
                  <Td>{rowItem?.employeeFullName}</Td>
                  <Td>{rowItem?.department}</Td>
                  <Td>{rowItem?.salaryBankName}</Td>
                  <Td>{rowItem?.salaryBankAccount}</Td>
                  <Td>{rowItem?.pensionFirmName}</Td>
                  <Td>{rowItem?.pensionAccount}</Td>
                  {rowItem?.earnings?.map((variable, index) => (
                    <Td key={index}>{variable?.value}</Td>
                  ))}
                  {rowItem?.deductions?.map((variable, index) => (
                    <Td key={index}>{variable?.value}</Td>
                  ))}
                  <Td>{rowItem?.totalEarnings}</Td>
                  <Td>{rowItem?.totalDeductions}</Td>
                  <Td>{rowItem?.grossPay || "0"}</Td>
                  <Td>{rowItem?.netPay || "0"}</Td>
                </Fragment>
              )}
              {location === "Paye Table" && (
                <Fragment>
                  <Td>
                    {rowItem?.employeeFullName
                      .toLowerCase()
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Td>
                  <Td>{rowItem?.taxNumber}</Td>
                  <Td>{rowItem?.grossPay || 0}</Td>
                  <Td>{rowItem?.payeValue}</Td>
                </Fragment>
              )}
              {location === "Pension Table" && (
                <Fragment>
                  <Td>
                    {rowItem?.employeeFullName
                      .toLowerCase()
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Td>
                  <Td>{rowItem?.pensionFirmName}</Td>
                  <Td>{rowItem?.pensionAccount}</Td>
                  <Td>{rowItem?.grossPay || 0}</Td>
                  <Td>{rowItem?.pensionValue}</Td>
                </Fragment>
              )}
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};