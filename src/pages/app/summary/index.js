import { Table } from "../../../components/table";
import { H3 } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { SummaryWrapper } from "./styled";

export const Summary = () => {
    return (
        <Layout
            id={"summary"}
            title={"SUMMARY"}
        >
            <SummaryWrapper>
                <div>
                    <H3>Report for January, 2024</H3>
                </div>
                <div
                    className="summary-table"
                >
                    <Table
                        columnTitles={[
                            "Employees", "Gross Pay", "Total Deduction", "Net Pay", "Re-run"
                        ]}
                        rowItems={[]}
                    />
                </div>
            </SummaryWrapper>
        </Layout>
    )
}