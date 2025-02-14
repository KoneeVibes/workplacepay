import { useEffect, useState } from "react";
import { Table } from "../../../components/table";
import { H3 } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { SummaryWrapper } from "./styled";
import { getEmployeePayslips } from "../../../utils/apis/payroll/getEmployeePayslips";
import Cookies from "universal-cookie";
import { getEmployeePayslipDetails } from "../../../utils/apis/payroll/getEmployeePayslipDetails";

export const Summary = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const [payslips, setPayslips] = useState([]);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const res = await getEmployeePayslips(TOKEN);
                if (!res?.data) return;
                const payslipsDetail = await Promise.all(
                    res.data.map((payslip) => getEmployeePayslipDetails(TOKEN, payslip.payslipId))
                );
                setPayslips(payslipsDetail);
            } catch (err) {
                console.error("Failed to fetch employee payslips:", err);
            }
        };
        fetchPayslips();
    }, [TOKEN, COMPANY_ID]);

    return (
        <Layout
            id={"summary"}
            title={"Summary"}
        >
            <SummaryWrapper>
                <div
                    className="heading-row"
                >
                    <H3>Report for January, 2024</H3>
                </div>
                <div
                    className="summary-table"
                >
                    <Table
                        location={"Summary Table"}
                        columnTitles={[
                            "Employees", "Gross Pay", "Total Deduction", "Net Pay", "Re-run"
                        ]}
                        rowItems={payslips}
                    />
                </div>
            </SummaryWrapper>
        </Layout>
    )
}