import { useEffect, useState } from "react";
import { Table } from "../../../components/table";
import { H3, Label } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { SummaryWrapper } from "./styled";
import Cookies from "universal-cookie";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { months } from "../../../helpers/retrieveAllMonths";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { retrievePayrollByDate } from "../../../utils/apis/payroll/retrievePayrollByDate";
import { getCompanyDetails } from "../../../utils/apis/company/getCompanyDetails";

export const Summary = () => {
    const startDate = 1990;
    const endDate = 2025;

    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [payslips, setPayslips] = useState([]);
    const [filter, setFilter] = useState({
        month: currentMonth,
        year: currentYear,
    });
    const [company, setCompany] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenCreditPurchaseModal = (e) => {
        e.preventDefault();
        console.log("I am clicked");
    };

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const res = await getCompanyDetails(TOKEN, COMPANY_ID);
                return setCompany(res?.data);
            } catch (err) {
                console.error("Failed to fetch company details:", err);
            }
        };
        fetchCompanyDetails();
    }, [TOKEN, COMPANY_ID]);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const res = await retrievePayrollByDate(TOKEN, COMPANY_ID, filter.month, filter.year);
                setPayslips(res?.data);
            } catch (err) {
                console.error("Failed to fetch employee payslips:", err);
            }
        };
        fetchPayslips();
    }, [TOKEN, COMPANY_ID, filter]);

    return (
        <Layout
            id={"summary"}
            title={"Summary"}
            location={"summary"}
            callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
            handleCallToActionClick={handleOpenCreditPurchaseModal}
        >
            <SummaryWrapper>
                <div
                    className="heading-row"
                >
                    <H3>Report for {months[filter.month - 1]}, {filter.year}</H3>
                </div>
                <form>
                    <BaseFieldSet>
                        <Label>Payment Year</Label>
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
                    <BaseFieldSet>
                        <Label>Payment Month</Label>
                        <BaseSelect
                            name="month"
                            onChange={(e) => handleChange(e, "payroll")}
                            value={filter.month}
                        >
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
                </form>
                <div
                    className="summary-table"
                >
                    <Table
                        location={"Summary Table"}
                        columnTitles={[
                            "Employee", "Gross Pay", "Total Deduction", "Net Pay", "Re-run"
                        ]}
                        rowItems={payslips}
                    />
                </div>
            </SummaryWrapper>
        </Layout>
    )
}