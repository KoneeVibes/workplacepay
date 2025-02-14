import { useEffect, useState } from "react";
import { BaseButton } from "../../../components/button/styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Label, P, Span } from "../../../components/typography/styled";
import { Layout } from "../../../containers/app/layout";
import { PayrollWrapper } from "./styled";
import { Table } from "../../../components/table";
import Cookies from "universal-cookie";
import { months } from "../../../helpers/retrieveAllMonths";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { runPayrollService } from "../../../utils/apis/payroll/runpayroll";
import { DotLoader } from "react-spinners";
import { retrievePayrollSetup } from "../../../utils/apis/payroll/retrievePayrollSetup";

export const Payroll = () => {
    const startDate = 1990;
    const endDate = 2025;
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [payrollTableHeaders, setPayrollTableHeaders] = useState([
        "Employee",
        "Department",
        "Salary",
        "Exemption"
    ]);
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
        retrievePayrollSetup(TOKEN, COMPANY_ID)
            .then((data) => {
                const capitalizedVariables = data.payrollVariables.map(variable =>
                    variable.name.charAt(0).toUpperCase() + variable.name.slice(1)
                );
                setPayrollTableHeaders(prevHeaders => {
                    const uniqueHeaders = [...new Set([...prevHeaders, ...capitalizedVariables])];
                    return uniqueHeaders;
                });
            })
            .catch((err) => console.error(err));
    }, [TOKEN, COMPANY_ID]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await runPayrollService(TOKEN, COMPANY_ID, payrollPayload);
            if (response.status) {
                setIsLoading(false);
                setEmployees(response.employees);
                // handleOpenModal();
            } else {
                setIsLoading(false);
                setError('Run payroll operation failed. Please check your credentials and try again.');
                console.error("Run payroll operation failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Run payroll operation failed. ${error.message}`);
            console.error('Run payroll operation failed:', error);
        }
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
                            value={payrollPayload.month}
                        >
                            <option value="" hidden></option>
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
                    <div
                        className="payroll-button-box"
                    >
                        <BaseButton>
                            {isLoading ?
                                (<DotLoader
                                    size={20}
                                    color="white"
                                    className='dotLoader'
                                />) : (
                                    <Span>
                                        Run Payroll
                                    </Span>
                                )}
                        </BaseButton>
                    </div>
                </form>
                <div
                    className="error-text"
                >
                    {error && <P style={{ color: 'red', marginBlockStart: 0 }}>{error}</P>}
                </div>
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