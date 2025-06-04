import { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { GeneralReportWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Table } from "../../../../components/table";
import Cookies from "universal-cookie";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { retrieveGeneral } from "../../../../utils/apis/report/retrieveGeneralReport";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../../helpers/retrieveAllMonths";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { Context } from "../../../../context";
import { Label, P, Span } from "../../../../components/typography/styled";
import { downloadGeneralReport } from "../../../../utils/apis/report/downloadGeneralReport";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";

export const GeneralReport = () => {
  const startDate = 2020;
  const endDate = 2025;

  const currentDate = new Date();
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const [departments, setDepartments] = useState([]);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [filter, setFilter] = useState({
    endYear: currentYear,
    endMonth: currentMonth,
    startYear: currentYear - 1,
    startMonth: currentMonth - 1,
    departmentId: "",
  });
  const [error, setError] = useState(null);
  const [generalReport, setGeneralReport] = useState([]);
  const [company, setCompany] = useState({});
  const [earningsHeadings, setEarningsHeadings] = useState([]);
  const [deductionsHeadings, setDeductionsHeadings] = useState([]);
  const [matches, setMatches] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsPaymentFormModalOpen } = useContext(Context);

  const getUniqueVariableNames = (data, key) => {
    const allNames = data.flatMap(item => item[key] || []).map(v => v.name);
    return [...new Set(allNames)];
  };

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
    if (!COMPANY_ID || !filter.endMonth || !filter.endYear || !filter.startMonth || !filter.startYear) return setError("Please select filter. If error persists, contact support.");
    const fetchGeneralReport = async () => {
      setError(null);
      setGeneralReport([]);
      try {
        const res = await retrieveGeneral(
          TOKEN,
          COMPANY_ID,
          filter
        );
        setEarningsHeadings(getUniqueVariableNames(res?.data, "earnings"));
        setDeductionsHeadings(
          getUniqueVariableNames(res?.data, "deductions").map(name =>
            name.toLowerCase() === "paye" ? "PAYE" : name
          )
        );
        return setGeneralReport(res?.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch general report:", err);
      }
    };
    fetchGeneralReport();
  }, [TOKEN, COMPANY_ID, filter]);

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
    const handleResize = () => {
      setMatches(window.screen.availWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCreditPurchaseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaymentFormModalOpen(true);
  };

  const handleExportTable = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const blob = await downloadGeneralReport(TOKEN, COMPANY_ID, filter);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // may have to come back to reset this filename
      a.download = 'generalreport.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
      setIsLoading(false);
      console.log("Successfully exported to an xlsx file");
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to export:", error);
    }
  };

  return (
    <Layout
      id={"generalreport"}
      title={"General Report"}
      location={"general-report"}
      callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
      handleCallToActionClick={handleOpenCreditPurchaseModal}
    >
      <GeneralReportWrapper>
        {error && (
          <div
            className="error-box"
          >
            <P style={{ color: "red" }}>{error}</P>
          </div>
        )}
        <Row className="filter">
          <BaseFieldSet>
            <Label>Start Year</Label>
            <BaseSelect
              name="startYear"
              onChange={handleChange}
              value={filter.startYear}
            >
              {getYearRange(startDate, endDate).map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Start Month</Label>
            <BaseSelect
              name="startMonth"
              onChange={handleChange}
              value={filter.startMonth}
            >
              {months.map((month, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                );
              })}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>End Year</Label>
            <BaseSelect
              name="endYear"
              onChange={handleChange}
              value={filter.endYear}
            >
              {getYearRange(startDate, endDate).map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>End Month</Label>
            <BaseSelect
              name="endMonth"
              onChange={handleChange}
              value={filter.endMonth}
            >
              {months.map((month, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                );
              })}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Department</Label>
            <BaseSelect
              name="departmentId"
              onChange={handleChange}
              value={filter.departmentId}
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department.departmentId}>
                  {department.name
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="export-button-area">
          <div
            style={{ overflow: "hidden" }}
          >
            <BaseButton
              type="button"
              backgroundcolor={"#4E57BB"}
              width={matches ? "-webkit-fill-available" : "fit-content"}
              onClick={handleExportTable}
            >
              {isLoading ? (
                <DotLoader size={20} color="white" className="dotLoader" />
              ) : (
                <Span>Export Table</Span>
              )}
            </BaseButton>
          </div>
        </div>
        <div className="general-report-table">
          <Table
            columnTitles={[
              "Employee",
              "Department",
              "Bank",
              "Bank Account",
              "PFA",
              "PFA Account",
              ...earningsHeadings,
              ...deductionsHeadings,
              "Total Earnings",
              "Total Deductions",
              "Gross",
              "Net Pay",
            ]}
            rowItems={generalReport}
            location={"General Table"}
          />
        </div>
        <PaymentModal />
      </GeneralReportWrapper>
    </Layout>
  );
};
