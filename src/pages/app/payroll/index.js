import { useState } from "react";
import { BaseButton } from "../../../components/button/styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Layout } from "../../../containers/dashboard/layout";
import { PayrollWrapper } from "./styled";
import { Table } from "../../../components/table";

export const Payroll = () => {
    const [payrollPayload, setPayrollPayload] = useState({
        year: "",
        month: "",
    });

    const [filter, setFilter] = useState({
        username: "",
        department: "",
        jobTitle: "",
        status: "",
    })

    const handleChange = (e, target) => {
        const { name, value } = e.target;
        if (target === "payroll") {
            setPayrollPayload((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFilter((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Layout
            id={"payroll"}
            title={"Payroll"}
        >
            <PayrollWrapper>
                <form
                    onSubmit={handleSubmit}
                >
                    <BaseFieldSet>
                        <Label>Payment Year</Label>
                        <BaseSelect
                            name="year"
                            onChange={(e) => handleChange(e, "payroll")}
                            value={payrollPayload.year}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Payment Month</Label>
                        <BaseSelect
                            name="month"
                            onChange={(e) => handleChange(e, "payroll")}
                            value={payrollPayload.month}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <div
                        className="payroll-button-box"
                    >
                        <BaseButton>
                            Run Payroll
                        </BaseButton>
                    </div>
                </form>
                <Row
                    className="filter"
                >
                    <BaseFieldSet>
                        <Label>Username</Label>
                        <BaseSelect
                            name="username"
                            onChange={(e) => handleChange(e, "filter")}
                            value={filter.username}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Department</Label>
                        <BaseSelect
                            name="department"
                            onChange={(e) => handleChange(e, "filter")}
                            value={filter.department}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Job Title</Label>
                        <BaseSelect
                            name="jobTitle"
                            onChange={(e) => handleChange(e, "filter")}
                            value={filter.jobTitle}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Status</Label>
                        <BaseSelect
                            name="status"
                            onChange={(e) => handleChange(e, "filter")}
                            value={filter.status}
                        >
                            <option value="" hidden></option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                        </BaseSelect>
                    </BaseFieldSet>
                </Row>
                <div
                    className="payroll-table"
                >
                    <Table
                        columnTitles={[
                            "Employee", "Department", "Salary", "Exemption", "Overtime", "Bonus", "Other Addition", "Other Deduction"
                        ]}
                        rowItems={[]}
                    />
                </div>
            </PayrollWrapper>
        </Layout>
    )
}