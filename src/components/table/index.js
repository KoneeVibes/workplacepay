import { Fragment } from "react";
import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";

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
                            {(location === "Employee Table" || location === "Payroll Table") && (
                                <Fragment>
                                    <Td>{rowItem.fullName || ""}</Td>
                                    <Td>{rowItem.jobInformation.department ?? "Not Assigned"}</Td>
                                    <Td>{rowItem.salary || ""}</Td>
                                    <Td>{rowItem.jobInformation.dateHired || ""}</Td>
                                    <Td>{rowItem.jobInformation.jobPosition || ""}</Td>
                                    <Td>{rowItem.status || ""}</Td>
                                </Fragment>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </TableWrapper>
    )
}