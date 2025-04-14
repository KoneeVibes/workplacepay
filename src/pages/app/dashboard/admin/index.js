import { Row } from "../../../../components/flex/styled";
import { AdminDashboardWrapper } from "./styled";
import { PieChart } from "../../../../components/doughnut";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label } from "../../../../components/typography/styled";
import { useEffect, useState } from "react";
import { LineGraph } from "../../../../components/linegraph";
import { retrieveCreditToPayrollAnalysis } from "../../../../utils/apis/analytics/creditToPayroll";
import Cookies from "universal-cookie";

export const AdminDashboard = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const [filter, setFilter] = useState("");
    const [companies, setCompanies] = useState([]);
    const [payrollRun, setPayrollRun] = useState([]);
    const [creditConsumed, setCreditConsumed] = useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter(value);
    };

    useEffect(() => {
        retrieveCreditToPayrollAnalysis(TOKEN)
            .then((data) => {
                setCompanies(data?.["payrolls"]?.map((payroll) => payroll.companyName));
                setPayrollRun(data?.["payrolls"]?.map((payroll) => payroll.value));
                setCreditConsumed(data?.["creditConsumed"]?.map((payroll) => payroll.value));
            })
            .catch((err) => {
                console.error("Failed to fetch credit to payroll analysis:", err);
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
                        <option value="yesterday">Last one day</option>
                        <option value="last week">Last week</option>
                        <option value="last month">Last month</option>
                        <option value="last quarter">Last three months</option>
                        <option value="last half">Last six months</option>
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
                        labels={["Salaries Paid", "Credit Consumed"]}
                        values={[300, 100]}
                    />
                </div>
                <div
                    className="pie-chart-container"
                >
                    <PieChart
                        title={"Referrals Conversion"}
                        labels={["Total Referrals", "Converted Referrals"]}
                        values={[300, 500]}
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