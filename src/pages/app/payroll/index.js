import { useContext, useEffect, useState } from "react";
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
import { runPayrollService } from "../../../utils/apis/payroll/runPayroll";
import { retrievePayrollSetup } from "../../../utils/apis/payroll/retrievePayrollSetup";
import { getDepartments } from "../../../utils/apis/department/getDepartments";
import { BaseInput } from "../../../components/form/input/styled";
import { RunPayrollModal } from "../../../containers/app/modals/runpayrollmodal";
import { Context } from "../../../context";
import { getCompanyDetails } from "../../../utils/apis/company/getCompanyDetails";
import { PaymentModal } from "../../../containers/app/modals/paymentmodal";
import { ConfirmationModal } from "../../../containers/app/modals/confirmationmodal";

export const Payroll = () => {
    const startDate = 1990;
    const endDate = 2025;
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const { setIsRunPayrollModalOpen, setIsPaymentFormModalOpen } = useContext(Context);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [payrollTableHeaders, setPayrollTableHeaders] = useState([
        "Employee",
        "Department",
        "Salary",
        "Exemption"
    ]);
    const [departments, setDepartments] = useState([]);
    const [payrollPayload, setPayrollPayload] = useState({
        month: "",
        year: "",
    });
    const [filter, setFilter] = useState({
        username: "",
        departmentId: "",
        jobTitle: "",
        status: "",
    });
    const [company, setCompany] = useState({});
    const [flag, setFlag] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments(TOKEN, COMPANY_ID);
                return setDepartments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDepartments();
    }, [TOKEN, COMPANY_ID]);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!payrollPayload.month.trim() || !payrollPayload.year.trim()) return;
        return setIsRunPayrollModalOpen(true);
    };

    const handleOpenCreditPurchaseModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPaymentFormModalOpen(true);
    };

    const handleFlagState = (e, flag) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(flag);
        setFlag(flag);
        setIsRunPayrollModalOpen(false);
        setIsConfirmationModalOpen(true);
    };

    const handlePersistModal = () => {
        setError(null);
        return setIsConfirmationModalOpen(false);
    };

    const handleRunPayroll = async (e) => {
        e.preventDefault();
        if (!flag.trim()) return;
        setIsLoading(true);
        const transformedPayrollPayload = {
            ...payrollPayload,
            includeEmployer: flag === "with-employer" ? true : false
        }
        try {
            const response = await runPayrollService(TOKEN, COMPANY_ID, transformedPayrollPayload);
            if (response) {
                setIsLoading(false);
                setEmployees(response.employeePayslips);
                setFlag("");
                // handleOpenModal();
            } else {
                setIsLoading(false);
                setFlag("");
                setError('Run payroll operation failed. Please check your credentials and try again.');
                console.error("Run payroll operation failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setFlag("");
            setError(`Run payroll operation failed. ${error.message}`);
            console.error('Run payroll operation failed:', error);
        }
    }

    return (
        <Layout
            id={"payroll"}
            title={"Payroll"}
            location={"payroll"}
            callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
            handleCallToActionClick={handleOpenCreditPurchaseModal}
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
                            <Span>
                                Run Payroll
                            </Span>
                        </BaseButton>
                        <RunPayrollModal
                            handleActionItemClick={handleFlagState}
                        />
                    </div>
                </form>
                <Row
                    className="filter"
                >
                    <BaseFieldSet>
                        <Label>Employee</Label>
                        <BaseInput
                            type="text"
                            name="username"
                            placeholder="Search by Employee"
                            value={filter.username}
                            onChange={handleChange}
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Department</Label>
                        <BaseSelect
                            name="departmentId"
                            onChange={(e) => handleChange(e, "filter")}
                            value={filter.departmentId}
                        >
                            <option value="" hidden>Select Department</option>
                            {departments.map((department, index) => (
                                <option
                                    key={index}
                                    value={department.id}
                                >
                                    {department.name.replace(/\b\w/g, char => char.toUpperCase())}
                                </option>
                            ))}
                        </BaseSelect>
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Job Title</Label>
                        <BaseInput
                            type="text"
                            name="jobTitle"
                            placeholder="Search by jobtitle"
                            value={filter.jobTitle}
                            onChange={handleChange}
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Status</Label>
                        <BaseSelect
                            name="status"
                            onChange={handleChange}
                            value={filter.status}
                        >
                            <option value="" hidden>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
                <PaymentModal />
                <ConfirmationModal
                    open={isConfirmationModalOpen}
                    handleClickOutside={handlePersistModal}
                    className={"payroll-confirmation-modal"}
                    title={"Are you sure?"}
                    message={error && <P style={{ color: 'red', marginBlockStart: 0 }}>{error}</P>}
                    callToAction={"Proceed"}
                    isLoading={isLoading}
                    handleCallToActionClick={handleRunPayroll}
                />
            </PayrollWrapper>
        </Layout>
    )
}