import { Fragment } from "react";
import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";
import { BaseInput } from "../form/input/styled"

export const Table = ({ columnTitles, rowItems, location }) => {
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
                    return (
                        <tr
                            key={index}
                        >
                            {(location === "Employee Table") && (
                                <Fragment>
                                    <Td>{rowItem.fullName || ""}</Td>
                                    <Td>{rowItem.jobInformation.department ?? "Not Assigned"}</Td>
                                    <Td>{rowItem.salary || ""}</Td>
                                    <Td>{rowItem.jobInformation.dateHired || ""}</Td>
                                    <Td>{rowItem.jobInformation.jobPosition || ""}</Td>
                                    <Td>{rowItem.status || ""}</Td>
                                </Fragment>
                            )}
                            {(location === "Payroll Table") && (
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
                                                flexShrink: 0
                                            }}
                                        />
                                    </Td>
                                    {rowItem.payrollVariables.map((variable, index) => (
                                        <Td
                                            key={index}
                                        >
                                            {variable.value}
                                        </Td>
                                    ))}
                                </Fragment>
                            )}
                            {(location === "Summary Table") && (
                                <Fragment>
                                    
                                </Fragment>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </TableWrapper>
    )
}