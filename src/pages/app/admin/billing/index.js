import { useEffect, useState } from "react"
import { Table } from "../../../../components/table"
import { H3, Th } from "../../../../components/typography/styled"
import { Layout } from "../../../../containers/app/layout"
import { BillingWrapper } from "./styled"
import { retrieveAllBilling } from "../../../../utils/apis/billing/retrieveAllBilling"
import Cookies from "universal-cookie"
import { Row } from "../../../../components/flex/styled"
import { BaseFieldSet } from "../../../../components/form/fieldset/styled"
import { BaseSelect } from "../../../../components/form/select/styled"
import { BaseInput } from "../../../../components/form/input/styled"

export const Billing = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const [billings, setBillings] = useState({
        creditPurchases: [],
        totalCreditAmount: 0,
        totalCreditCost: 0,
    });
    const [filter, setFilter] = useState({
        value: "all time",
        companyName: "",
        pageNum: "",
    });

    useEffect(() => {
        retrieveAllBilling(TOKEN, filter)
            .then((data) => {
                setBillings(data);
            })
            .catch((err) => {
                console.error("Failed to fetch billings:", err);
            });
    }, [TOKEN, filter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Layout
            id={"billing"}
            title={"Billing"}
        >
            <BillingWrapper>
                <Row
                    className="filter-row"
                >
                    <div className="heading">
                        <H3>All Billings</H3>
                    </div>
                    <div
                        className="filter"
                    >
                        <BaseFieldSet>
                            <BaseInput
                                type="text"
                                name="companyName"
                                placeholder="Search by Company Name"
                                value={filter.companyName}
                                onChange={handleChange}
                            />
                        </BaseFieldSet>
                        <BaseFieldSet>
                            <BaseSelect
                                name="value"
                                onChange={(e) => handleChange(e)}
                                value={filter.value}
                            >
                                <option value="all time">All time</option>
                                <option value="last day">Last one day</option>
                                <option value="last week">Last week</option>
                                <option value="last month">Last month</option>
                                <option value="last three month">Last three months</option>
                                <option value="last six month">Last six months</option>
                                <option value="last year">Last year</option>
                            </BaseSelect>
                        </BaseFieldSet>
                    </div>
                </Row>
                <div className="billing-summary">
                    <table
                        className="billing-summary-table"
                    >
                        <thead>
                            <tr>
                                <Th>Total Credit Purchased</Th>
                                <Th>Total Credit Amount</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{billings?.totalCreditAmount.toLocaleString() ?? 0}</td>
                                <td>{billings?.totalCreditCost.toLocaleString() ?? 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="billing-table">
                    <Table
                        columnTitles={[
                            "Company Name",
                            "Employer Email",
                            "Credit Amount",
                            "Cash Amount",
                            "Date Initiated",
                            "Date Completed",
                            "Plan",
                        ]}
                        rowItems={billings?.creditPurchases ?? []}
                        location={"Billing Table"}
                    />
                </div>
            </BillingWrapper>
        </Layout>
    )
}