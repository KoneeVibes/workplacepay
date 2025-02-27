import { Fragment, useContext } from "react";
import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";
import { BaseInput } from "../form/input/styled";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export const Table = ({ columnTitles, rowItems, location, activeRowId, handleRowItemClick, handleRowItemActionClick, dropdownRef }) => {
  const navigate = useNavigate();
  const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } =
    useContext(Context);

  return (
    <TableWrapper>
      <thead>
        <tr>
          {columnTitles.map((columnTitle, index) => {
            return (
              <Th
                key={index}
              >
                {columnTitle}
              </Th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rowItems.map((rowItem, index) => {
          const capitalizeWords = (str) => {
            return str.replace(/\b\w/g, char => char.toUpperCase());
          };
          return (
            <tr
              key={index}
            >
              {(location === "Employee Table") && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>{capitalizeWords(rowItem?.jobInformation.department) ?? "Not Assigned"}</Td>
                  <Td>{rowItem?.salary || ""}</Td>
                  <Td>{rowItem?.jobInformation.dateHired || ""}</Td>
                  <Td>{rowItem?.jobInformation.jobPosition || ""}</Td>
                  <Td>{rowItem?.status || ""}</Td>
                </Fragment>
              )}
              {(location === "Payroll Table") && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>{capitalizeWords(rowItem?.department) || ""}</Td>
                  <Td>{rowItem?.monthlySalary || ""}</Td>
                  <Td>
                    <BaseInput
                      type="checkbox"
                      checked={rowItem?.isExempted}
                      style={{
                        width: "auto",
                        flexShrink: 0
                      }}
                    />
                  </Td>
                  {rowItem?.payrollVariables?.map((variable, index) => (
                    <Td
                      key={index}
                    >
                      {variable?.value}
                    </Td>
                  ))}
                </Fragment>
              )}
              {(location === "Summary Table") && (
                <Fragment>
                  <Td>{rowItem?.fullName || ""}</Td>
                  <Td>{rowItem?.totalEarnings || ""}</Td>
                  <Td>{rowItem?.totalDeductions || ""}</Td>
                  <Td>{rowItem?.netSalary || ""}</Td>
                  <Td
                    onClick={() => navigate(`/reportsummary/summary/${rowItem?.payslipId}`)}
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {(location === "Employee Payslip Table") && (
                <Fragment>
                  <Td>{rowItem?.month || ""}</Td>
                  <Td>{rowItem?.year || ""}</Td>
                  <Td
                    onClick={() => !isPayslipDetailsModalOpen && setIsPayslipDetailsModalOpen(true)}
                  >
                    View Payslip
                  </Td>
                </Fragment>
              )}
              {(location === "User Summary Table") && (
                <Fragment>
                  <Td>{rowItem?.name || ""}</Td>
                  <Td>{rowItem?.value || ""}</Td>
                </Fragment>
              )}
              {(location === "Variance Table") && (
                <Fragment>
                  <Td>{rowItem?.employeeFullName || ""}</Td>
                  <Td>{rowItem?.firstMonthValue || ""}</Td>
                  <Td>{rowItem?.secondMonthValue || ""}</Td>
                  <Td>{rowItem?.variance || ""}</Td>
                  <Td>{rowItem?.percentage || ""}</Td>
                </Fragment>
              )}
              {(location === "Departments Table") && (
                <Fragment>
                  <Td>{rowItem?.name ? capitalizeWords(rowItem?.name) : ""}</Td>
                  <Td
                    onClick={(e) => handleRowItemClick(e, rowItem?.departmentId)}
                  >
                    <FontAwesomeIcon icon={faEllipsisV} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
                    {(activeRowId === rowItem?.departmentId) && (
                      <ul
                        ref={dropdownRef}
                        className="drop-down"
                      >
                        <li
                          onClick={(e) => handleRowItemActionClick(e, rowItem?.departmentId, "edit")}
                        >
                          Edit Department
                        </li>
                        <li
                          onClick={(e) => handleRowItemActionClick(e, rowItem?.departmentId, "delete")}
                        >
                          Delete Department
                        </li>
                      </ul>
                    )}
                  </Td>
                </Fragment>
              )}
            </tr>
          )
        })}
      </tbody>
    </TableWrapper>
  );
};
