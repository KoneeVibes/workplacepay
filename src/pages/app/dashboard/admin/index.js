import { Row } from "../../../../components/flex/styled";
import { AdminDashboardWrapper } from "./styled";
import { PieChart } from "../../../../components/doughnut";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label } from "../../../../components/typography/styled";
import { useEffect, useState } from "react";
import { LineGraph } from "../../../../components/linegraph";
import { retrieveCreditToPayrollAnalysis } from "../../../../utils/apis/analytics/creditToPayrollAnalysis";
import Cookies from "universal-cookie";
import { retrieveCreditToPayrollSummary } from "../../../../utils/apis/analytics/creditToPayrollSummary";
import { retrieveReferralToConversionSummary } from "../../../../utils/apis/analytics/referralToConversionSummary";

export const AdminDashboard = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const [filter, setFilter] = useState("");
    const [companies, setCompanies] = useState([]);
    const [payrollRun, setPayrollRun] = useState([]);
    const [creditConsumed, setCreditConsumed] = useState([]);
    const [creditToPayrollSummary, setCreditToPayrollSummary] = useState({});
    const [referralToConversionSummary, setReferralToConversionSummary] = useState({});

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter(value);
    };

    useEffect(() => {
        retrieveCreditToPayrollAnalysis(TOKEN, filter)
            .then((data) => {
                setCompanies(data?.["payrolls"]?.map((payroll) => payroll.companyName));
                setPayrollRun(data?.["payrolls"]?.map((payroll) => payroll.value));
                setCreditConsumed(data?.["creditConsumed"]?.map((payroll) => payroll.value));
            })
            .catch((err) => {
                console.error("Failed to fetch credit to payroll analysis:", err);
            });
    }, [TOKEN, filter]);

    useEffect(() => {
        retrieveCreditToPayrollSummary(TOKEN, filter)
            .then((data) => {
                setCreditToPayrollSummary(data)
            })
            .catch((err) => {
                console.error("Failed to fetch credit to payroll summary:", err);
            });
    }, [TOKEN, filter]);

    useEffect(() => {
        retrieveReferralToConversionSummary(TOKEN)
            .then((data) => {
                setReferralToConversionSummary(data)
            })
            .catch((err) => {
                console.error("Failed to fetch referral to conversion summary:", err);
            });
    }, [TOKEN]);

    return (
        <AdminDashboardWrapper>
            <div
                className="filter"
            >
                <BaseFieldSet>
                    <Label>Filter by Period</Label>
                    <BaseSelect
                        name="month"
                        onChange={(e) => handleChange(e)}
                        value={filter}
                    >
                        <option value="">All time</option>
                        <option value="last day">Last one day</option>
                        <option value="last week">Last week</option>
                        <option value="last month">Last month</option>
                        <option value="last three month">Last three months</option>
                        <option value="last six month">Last six months</option>
                        <option value="last year">Last year</option>
                    </BaseSelect>
                </BaseFieldSet>
            </div>
            <Row
                className="pie-chart-row"
            >
                <div
                    className="pie-chart-container"
                >
                    <PieChart
                        title={"Credits Utilization"}
                        labels={["Credit Purchased", "Payroll Run"]}
                        values={creditToPayrollSummary ? [creditToPayrollSummary?.credits, creditToPayrollSummary?.payroll] : [0, 0]}
                    />
                </div>
                <div
                    className="pie-chart-container"
                >
                    <PieChart
                        title={"Referrals Conversion"}
                        labels={["Total Referrals", "Total Enrolled"]}
                        values={referralToConversionSummary ? [referralToConversionSummary?.totalRefferedCompanies, referralToConversionSummary?.totalEnrolledCompanies] : [0, 0]}
                    />
                </div>
            </Row>
            <div>
                <LineGraph
                    title={"Company Performance Graph"}
                    labels={companies}
                    datasets={[
                        {
                            label: "Payroll Run",
                            data: payrollRun
                        },
                        {
                            label: "Credit Consumed",
                            data: creditConsumed
                        },
                    ]}
                    bgColor={"#D9D9D9"}
                />
            </div>
        </AdminDashboardWrapper>
    )
}