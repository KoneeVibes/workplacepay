import { useParams } from "react-router-dom";
import { Column, Row } from "../../../../components/flex/styled";
import { Table } from "../../../../components/table";
import { H3, P, Span } from "../../../../components/typography/styled";
import { Layout } from "../../../../containers/app/layout";
import { UserSummaryWrapper } from "./styled";
import { useEffect, useState } from "react";
import { getEmployeePayslipDetails } from "../../../../utils/apis/payroll/getEmployeePayslipDetails";
import Cookies from "universal-cookie";
import { getCompanies } from "../../../../utils/apis/company/getCompanies";

export const UserSummary = () => {
    const cookies = new Cookies();
    const { ROLE, TOKEN, COMPANY_ID } = cookies.getAll() ?? {};

    const { id } = useParams();
    const [companyName, setCompanyName] = useState("");
    const [payslipDetail, setPayslipDetail] = useState({});

    useEffect(() => {
        if (ROLE !== "employer" || !COMPANY_ID) return;
        getCompanies(TOKEN)
            .then((data) => {
                const activeCompany = data.find((company) => company.companyId === COMPANY_ID);
                setCompanyName(activeCompany.name);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN, ROLE, COMPANY_ID]);

    useEffect(() => {
        const fetchPayslip = async () => {
            try {
                const payslipsDetail = await getEmployeePayslipDetails(TOKEN, id);
                setPayslipDetail(payslipsDetail?.data);
            } catch (err) {
                console.error("Failed to fetch employee payslip:", err);
            }
        };
        fetchPayslip();
    })
    return (
        <Layout
            id={"summary"}
            title={companyName?.replace(/\b\w/g, char => char.toUpperCase())}
        >
            <UserSummaryWrapper>
                <div
                    className="heading-row"
                >
                    <H3>Employee Summary</H3>
                </div>
                <Column
                    className="employee-information-block"
                >
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Employee Name:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.fullName}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Email:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.email}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Department:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.department}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Date Paid:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.datePaid}</Span>
                        </div>
                    </Row>
                </Column>
                <div
                    className="user-summary-table"
                >
                    <Table
                        location={"User Summary Table"}
                        columnTitles={[
                            "Earnings", "Amount"
                        ]}
                        rowItems={payslipDetail.earnings ?? []}
                    />
                    <Row
                        gap={"0"}
                        className="table-footer"
                    >
                        <div
                            className="table-footer-title"
                        >
                            <H3>Gross Earning</H3>
                        </div>
                        <div
                            className="table-footer-value"
                        >
                            <H3>{payslipDetail.totalEarnings}</H3>
                        </div>
                    </Row>
                </div>
                <div
                    className="user-summary-table"
                >
                    <Table
                        location={"User Summary Table"}
                        columnTitles={[
                            "Deductions", "Amount"
                        ]}
                        rowItems={
                            (payslipDetail.deductions ?? []).map(deduction => ({
                                ...deduction,
                                name: deduction.name?.toLowerCase() === "paye" ? "PAYE" : deduction.name,
                            }))
                        }
                    />
                    <Row
                        gap={"0"}
                        className="table-footer"
                    >
                        <div
                            className="table-footer-title"
                        >
                            <H3>Total Deduction</H3>
                        </div>
                        <div
                            className="table-footer-value"
                        >
                            <H3>{payslipDetail.totalDeductions}</H3>
                        </div>
                    </Row>
                </div>
                <div
                    className="net-payable-summary"
                >
                    <Row
                        justifycontent={"space-between"}
                        className="net-payable-summary-row"
                    >
                        <div
                            className="net-payable-description"
                        >
                            <H3>TOTAL NET PAYABLE</H3>
                            <P>Gross Earning - Total Deduction</P>
                        </div>
                        <div
                            className="net-payable-amount"
                        >
                            <H3>{payslipDetail.netSalary}</H3>
                        </div>
                    </Row>
                </div>
            </UserSummaryWrapper>
        </Layout>
    )
}