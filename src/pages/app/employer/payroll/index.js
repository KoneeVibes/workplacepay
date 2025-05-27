import { Fragment, useContext, useEffect, useState } from "react";
import { BaseButton } from "../../../../components/button/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { Layout } from "../../../../containers/app/layout";
import { PayrollWrapper } from "./styled";
import { Table } from "../../../../components/table";
import Cookies from "universal-cookie";
import { months } from "../../../../helpers/retrieveAllMonths";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { runPayrollService } from "../../../../utils/apis/payroll/runPayroll";
import { retrievePayrollSetup } from "../../../../utils/apis/payroll/retrievePayrollSetup";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { BaseInput } from "../../../../components/form/input/styled";
import { Context } from "../../../../context";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { ManageEmployeePayslipModal } from "../../../../containers/app/modals/manageemployeepayslip";
import { DotLoader } from "react-spinners";
import { updatePayrollService } from "../../../../utils/apis/payroll/updatePayroll";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";

export const Payroll = () => {
    const startDate = 2020;
    const endDate = 2025;
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const { setIsPaymentFormModalOpen, isManageEmployeeModalOpen, setIsManageEmployeeModalOpen } = useContext(Context);

    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [payrollTableHeaders, setPayrollTableHeaders] = useState([
        "Employee",
        "Department",
        "Gross Monthly Salary",
        "Exemption",
    ]);
    const [departments, setDepartments] = useState([]);
    const [payrollPayload, setPayrollPayload] = useState({
        month: "",
        year: "",
    });
    const [filter, setFilter] = useState({
        employeeName: "",
        departmentId: "",
        jobTitle: "",
        status: "",
    });
    const [company, setCompany] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRunPayrollLoading, setIsRunPayrollLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [managedVariables, setManagedVariables] = useState([]);
    const [activePayslipId, setActivePayslipId] = useState(null);
    const [nonVaryingHeaders, setNonVaryingHeaders] = useState({});
    const [filteredPayroll, setFilteredPayroll] = useState([]);

    useEffect(() => {
        const filtered = employees?.filter((item) => {
            const nameMatch = filter.employeeName
                ? item.fullName?.toLowerCase()?.includes(filter.employeeName.toLowerCase())
                : true;

            const departmentMatch = filter.departmentId
                ? item.department?.toLowerCase() === filter.departmentId?.toLowerCase()
                : true;

            const jobTitleMatch = filter.jobTitle
                ? item.jobTitle?.toLowerCase() === filter.jobTitle?.toLowerCase()
                : true;

            const statusMatch = filter.status
                ? (filter.status?.toLowerCase() === "exempted"
                    ? item.isExempted === true
                    : item.isExempted === false)
                : true;

            return nameMatch && departmentMatch && jobTitleMatch && statusMatch;
        });
        setFilteredPayroll(filtered);
    }, [filter, employees]);

    useEffect(() => {
        retrievePayrollSetup(TOKEN, COMPANY_ID)
            .then((data) => {
                const capitalizedVariables = data.payrollVariables.map(variable => {
                    const name = variable.name.toLowerCase();
                    return name === "paye"
                        ? "PAYE"
                        : name.charAt(0).toUpperCase() + name.slice(1);
                });
                const filteredVariables = data.payrollVariables.filter(variable => variable.stake === "money");
                setPayrollTableHeaders(prevHeaders => {
                    const uniqueHeaders = [...new Set([...prevHeaders, ...capitalizedVariables, "Action"])];
                    return uniqueHeaders;
                });
                setManagedVariables(filteredVariables);
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

    useEffect(() => {
        if (!isManageEmployeeModalOpen) {
            setActivePayslipId(null);
        }
    }, [isManageEmployeeModalOpen]);

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

    const handleOpenCreditPurchaseModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPaymentFormModalOpen(true);
    };

    const handlePersistSuccessModal = () => {
        return setIsSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        return setIsSuccessModalOpen(false);
    };

    const handleExemptionCheckboxChange = (e, employeeId) => {
        e.stopPropagation();
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.employeeId === employeeId
                    ? { ...employee, isExempted: !employee.isExempted }
                    : employee
            )
        );
    };

    const handleManagePayslipClick = (e, payslipId) => {
        e.stopPropagation();
        e.preventDefault();
        setActivePayslipId(payslipId)
        setIsManageEmployeeModalOpen(true);
    };

    const handleRunPayroll = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setError(null);
        setEmployees([]);
        setFilter({
            employeeName: "",
            departmentId: "",
            jobTitle: "",
            status: "",
        });
        if (!payrollPayload.month.trim() || !payrollPayload.year.trim()) return setError("Please select a month and year");
        setIsRunPayrollLoading(true);
        try {
            const response = await runPayrollService(TOKEN, COMPANY_ID, payrollPayload);
            if (response) {
                const { employeePayslips, ...rest } = response;
                setNonVaryingHeaders(rest);
                setIsRunPayrollLoading(false);
                return setEmployees(response.employeePayslips);
            } else {
                console.error("Run payroll operation failed. Please check your credentials and try again.");
                setIsRunPayrollLoading(false);
                return setError('Run payroll operation failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Run payroll operation failed:', error);
            setIsRunPayrollLoading(false);
            return setError(`Run payroll operation failed. ${error.message}`);
        }
    };

    const handleSavePayroll = async (e) => {
        e.preventDefault();
        if (!nonVaryingHeaders.payrollId) return;
        setError(null);
        setIsLoading(true);
        const payload = {
            "employees": employees.map(employee => ({
                employeeId: employee.employeeId,
                isExempted: employee.isExempted,
                variables: employee.payrollVariables.map(variable => ({
                    variableName: variable.name,
                    value: variable.value
                }))
            }))
        };
        try {
            const response = await updatePayrollService(
                TOKEN,
                nonVaryingHeaders.payrollId,
                COMPANY_ID,
                payload,
            );
            if (response.status === "Success") {
                setIsLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsLoading(false);
                setError("Payroll failed to save.");
                console.error("Payroll failed to save.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Payroll failed to save. ${error.message}`);
            console.error("Payroll failed to save:", error);
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
                <SuccessModal
                    open={isSuccessModalOpen}
                    handleClickOutside={handlePersistSuccessModal}
                    className={"save-payroll-success-modal"}
                    title={"Success"}
                    message={"Payroll has been successfully saved"}
                    callToAction={"Close"}
                    handleCallToActionClick={handleCloseSuccessModal}
                />
                <ManageEmployeePayslipModal
                    width={"40%"}
                    height={"320px"}
                    variables={managedVariables}
                    payroll={employees}
                    setPayroll={setEmployees}
                    activePayslipId={activePayslipId}
                />
                <form
                    onSubmit={handleRunPayroll}
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
                        <BaseButton
                            type="submit"
                        >
                            {isRunPayrollLoading ? (
                                <DotLoader size={20} color="white" className="dotLoader" />
                            ) : (
                                <Span>
                                    Run Payroll
                                </Span>
                            )}
                        </BaseButton>
                    </div>
                </form>
                <div
                    className="error-box"
                >
                    {error && <P style={{ color: "red", marginBlockEnd: employees.length > 0 ? 0 : "var(--cardPadding)" }}>{error}</P>}
                </div>
                {employees.length > 0 && (
                    <Fragment>
                        <Row
                            className="filter"
                        >
                            <BaseFieldSet>
                                <Label>Employee</Label>
                                <BaseInput
                                    type="text"
                                    name="employeeName"
                                    placeholder="Search by Employee"
                                    value={filter.employeeName}
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
                                            value={department.name}
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
                                    <option value="">Select Status</option>
                                    <option value="exempted">Exempted</option>
                                    <option value="not exempted">Not Exempted</option>
                                </BaseSelect>
                            </BaseFieldSet>
                        </Row>
                        <div
                            className="save-payroll-button-container"
                        >
                            <div
                                className="save-payroll-button-box"
                            >
                                <BaseButton
                                    backgroundcolor={"#4E57BB"}
                                    width={"fit-content"}
                                    onClick={handleSavePayroll}
                                >
                                    {isLoading ? (
                                        <DotLoader size={20} color="white" className="dotLoader" />
                                    ) : (
                                        <Span>Save Payroll</Span>
                                    )}
                                </BaseButton>
                            </div>
                        </div>
                    </Fragment>
                )}
                <div
                    className="payroll-table"
                >
                    <Table
                        columnTitles={payrollTableHeaders}
                        rowItems={filteredPayroll}
                        location={"Payroll Table"}
                        handleChange={handleExemptionCheckboxChange}
                        handleRowItemClick={handleManagePayslipClick}
                    />
                </div>
                <PaymentModal />
            </PayrollWrapper>
        </Layout>
    )
}