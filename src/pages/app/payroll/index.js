import { useEffect, useState } from "react";
import { BaseButton } from "../../../components/button/styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { PayrollWrapper } from "./styled";
import { Table } from "../../../components/table";
import { getAllEmployees } from "../../../utils/apis/employee/getAllEmployees";
import Cookies from "universal-cookie";

export const Payroll = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const [employees, setEmployees] = useState([]);
    const payrollTableHeaders = ["Employee", "Department", "Salary", "Hire Date", "Role", "Status"];
    const [payrollPayload, setPayrollPayload] = useState({
        month: "",
        year: "",
    });

    const [filter, setFilter] = useState({
        username: "",
        department: "",
        jobTitle: "",
        status: "",
    });

    useEffect(() => {
        getAllEmployees(TOKEN, COMPANY_ID)
            .then((data) => setEmployees(data))
            .catch((err) => {
                console.error("Failed to fetch employees:", err);
            });
    }, [TOKEN, COMPANY_ID])

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
        console.log(payrollPayload);
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
                        columnTitles={payrollTableHeaders}
                        rowItems={employees}
                        location={"Payroll Table"}
                    />
                </div>
            </PayrollWrapper>
        </Layout>
    )
}