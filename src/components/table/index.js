import { Td, Th } from "../typography/styled";
import { TableWrapper } from "./styled";

export const Table = ({ columnTitles, rowItems }) => {
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
                            <Td>{rowItem.employee || ""}</Td>
                            <Td>{rowItem.department || ""}</Td>
                            <Td>{rowItem.salary || ""}</Td>
                            <Td>{rowItem.hireDate || ""}</Td>
                            <Td>{rowItem.role || ""}</Td>
                            <Td>{rowItem.status || ""}</Td>
                        </tr>
                    )
                })}
            </tbody>
        </TableWrapper>
    )
}