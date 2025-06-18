import { Fragment, useContext, useEffect, useState, useMemo } from "react";
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
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { getAllEmployees } from "../../../../utils/apis/employee/getAllEmployees";
import { savePayrollService } from "../../../../utils/apis/payroll/savePayroll";

export const Payroll = () => {
    const startDate = 2020;
    const endDate = new Date().getFullYear();
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const [isInitialRun, setIsInitialRun] = useState(true);
    const standardVariables = useMemo(() => {
        const base = ["Employee", "Department", "Exemption", "Prorate"];
        if (!isInitialRun) {
            return [...base, "Monthly Salary"];
        }
        return base;
    }, [isInitialRun]);
    const { setIsPaymentFormModalOpen, isManageEmployeeModalOpen, setIsManageEmployeeModalOpen } = useContext(Context);

    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [payrollTableHeaders, setPayrollTableHeaders] = useState(standardVariables);
    const [departments, setDepartments] = useState([]);
    const [payrollPeriod, setPayrollPeriod] = useState({
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
    const [isLoadEmployeesLoading, setIsLoadEmployeesLoading] = useState(false);
    const [isSavePayrollLoading, setIsSavePayrollLoading] = useState(false);
    const [isRunPayrollLoading, setIsRunPayrollLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [managedVariables, setManagedVariables] = useState([]);
    const [activeEmployeeId, setActiveEmployeeId] = useState(null);
    const [filteredPayroll, setFilteredPayroll] = useState([]);
    const [lastPayrollRunId, setLastPayrollRunId] = useState(null);

    useEffect(() => {
        const filtered = employees?.filter((item) => {
            const nameMatch = filter.employeeName
                ? item.fullName?.toLowerCase()?.includes(filter.employeeName.toLowerCase())
                : true;

            const departmentMatch = filter.departmentId
                ? item.jobInformation?.department?.toLowerCase() === filter.departmentId?.toLowerCase()
                : true;

            const jobTitleMatch = filter.jobTitle
                ? item.jobInformation?.jobPosition?.toLowerCase() === filter.jobTitle?.toLowerCase()
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
                const updatedVariables = [
                    ...new Set(
                        employees
                            .flatMap(emp => emp.payrollVariables || [])
                            .map(variable => variable.name?.toLowerCase())
                    )
                ].map(name =>
                    name === "paye"
                        ? "PAYE"
                        : name.charAt(0).toUpperCase() + name.slice(1)
                );
                const filteredVariables = data.payrollVariables.filter(variable => variable.stake === "money");
                setPayrollTableHeaders(prevHeaders => {
                    const withoutAction = [...standardVariables, ...updatedVariables].filter(h => h !== "Action");
                    const uniqueHeaders = [...new Set(withoutAction)];
                    return [...uniqueHeaders, "Action"];
                });
                setManagedVariables(filteredVariables);
            })
            .catch((err) => console.error(err));
    }, [TOKEN, COMPANY_ID, standardVariables, employees]);

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
            setActiveEmployeeId(null);
        }
    }, [isManageEmployeeModalOpen]);

    const handleChange = (e, target) => {
        const { name, value } = e.target;
        if (target === "payroll") {
            setPayrollPeriod((prev) => ({
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

    const handleTableFieldChange = (e, employeeId, desc) => {
        e.stopPropagation();
        setEmployees((prev) =>
            prev.map((employee) => {
                if (employee.employeeId !== employeeId) return employee;
                if (desc === "exemption") {
                    return { ...employee, isExempted: !employee.isExempted };
                } else if (desc === "prorate") {
                    if (e.target.value < 0 || e.target.value > 31) e.target.value = 0;
                    const value = parseInt(e.target.value, 10);
                    return { ...employee, priorateDays: (Number.isInteger(value) && value > 0) ? value : 0 };
                }
                return employee;
            })
        );
    };

    const handleManageEmployeeClick = (e, employeeId) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveEmployeeId(employeeId)
        setIsManageEmployeeModalOpen(true);
    };

    const handleLoadEmployees = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setError(null);
        setIsLoadEmployeesLoading(true);
        setEmployees([]);
        setIsInitialRun(true);
        setLastPayrollRunId(null);
        if (!payrollPeriod.month.trim() || !payrollPeriod.year.trim()) {
            setIsLoadEmployeesLoading(false);
            return setError("Please select a month and year");
        };
        try {
            const response = await getAllEmployees(TOKEN, COMPANY_ID, {
                employeeName: "",
                departmentId: "",
                jobTitle: "",
            });
            const transformedResponse = response.map(emp => ({ ...emp, isExempted: false, priorateDays: 0, payrollVariables: [] }));
            setIsLoadEmployeesLoading(false);
            return setEmployees(transformedResponse);
        } catch (error) {
            console.error(error);
            setIsLoadEmployeesLoading(false);
            return setError(`Load employees operation failed. ${error.message}`);
        }
    };

    const handleRunPayroll = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setError(null);
        setFilter({
            employeeName: "",
            departmentId: "",
            jobTitle: "",
            status: "",
        });
        if (!payrollPeriod.month.trim() || !payrollPeriod.year.trim()) return setError("Please select a month and year");
        setIsRunPayrollLoading(true);
        const employeesPayrollInformation = employees?.map((employee) => {
            const managedVariableNames = managedVariables.map(v => v.name?.toLowerCase());
            const employeePayrollVariables = employee?.payrollVariables
                ?.filter(variable => managedVariableNames.includes(variable.name?.toLowerCase()))
                .map(variable => ({
                    variableName: variable.name,
                    value: variable.value
                }));
            return {
                employeeId: employee.employeeId,
                isExempted: employee.isExempted,
                priorateDays: employee.priorateDays,
                variables: employeePayrollVariables
            }
        })
        const payrollPayload = { ...payrollPeriod, employees: employeesPayrollInformation };
        try {
            const response = await runPayrollService(TOKEN, COMPANY_ID, payrollPayload);
            if (response) {
                setIsRunPayrollLoading(false);
                setIsInitialRun(false);
                setLastPayrollRunId(response.payrollId);
                const updatedEmployees = employees.map(employee => {
                    const payslip = response.employeePayslips.find(payslip => payslip.employeeId === employee.employeeId);
                    if (!payslip) return employee;
                    const updatedVariableSet = Object.values(
                        payslip.payrollVariables.reduce((acc, curr) => {
                            acc[curr.name.toLowerCase()] = curr;
                            return acc;
                        }, {})
                    );
                    return {
                        ...employee,
                        isExempted: payslip.isExempted,
                        monthlySalary: payslip.monthlySalary,
                        payslipId: payslip.payslipId,
                        payrollVariables: updatedVariableSet,
                    };
                });
                return setEmployees(updatedEmployees);
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
        if (!lastPayrollRunId) return;
        setError(null);
        setIsSavePayrollLoading(true);
        try {
            const response = await savePayrollService(
                TOKEN,
                lastPayrollRunId,
                COMPANY_ID,
            );
            if (response.status === "Success") {
                setIsSavePayrollLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsSavePayrollLoading(false);
                setError("Payroll failed to save.");
                console.error("Payroll failed to save.");
            }
        } catch (error) {
            setIsSavePayrollLoading(false);
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
                    employees={employees}
                    setEmployees={setEmployees}
                    activeEmployeeId={activeEmployeeId}
                />
                <form
                    onSubmit={handleLoadEmployees}
                >
                    <BaseFieldSet>
                        <Label>Payment Year</Label>
                        <BaseSelect
                            name="year"
                            onChange={(e) => handleChange(e, "payroll")}
                            value={payrollPeriod.year}
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
                            value={payrollPeriod.month}
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
                            {isLoadEmployeesLoading ? (
                                <DotLoader size={20} color="white" className="dotLoader" />
                            ) : (
                                <Span>Load Employees</Span>
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
                        <Row
                            className="payroll-cta-box"
                        >
                            <div
                                className="payroll-cta"
                            >
                                <BaseButton
                                    backgroundcolor={"#4E57BB"}
                                    width={"fit-content"}
                                    onClick={handleRunPayroll}
                                >
                                    {isRunPayrollLoading ? (
                                        <DotLoader size={20} color="white" className="dotLoader" />
                                    ) : (
                                        <Span>{isInitialRun ? "Run" : "Re-run"} Payroll</Span>
                                    )}
                                </BaseButton>
                            </div>
                            <div
                                className="payroll-cta"
                            >
                                <BaseButton
                                    disabled={isInitialRun}
                                    aria-disabled={isInitialRun}
                                    backgroundcolor={isInitialRun ? "#BFC3E6" : "#4E57BB"}
                                    width={"fit-content"}
                                    onClick={handleSavePayroll}
                                >
                                    {isSavePayrollLoading ? (
                                        <DotLoader size={20} color="white" className="dotLoader" />
                                    ) : (
                                        <Span>Save Payroll</Span>
                                    )}
                                </BaseButton>
                            </div>
                        </Row>
                    </Fragment>
                )}
                <div
                    className="payroll-table"
                >
                    <Table
                        columnTitles={payrollTableHeaders}
                        rowItems={filteredPayroll}
                        location={"Payroll Table"}
                        handleChange={handleTableFieldChange}
                        handleRowItemClick={handleManageEmployeeClick}
                    />
                </div>
                <PaymentModal />
            </PayrollWrapper>
        </Layout>
    )
}