import { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { VarianceWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { H3, P, Span } from "../../../../components/typography/styled";
import { Table } from "../../../../components/table";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../../helpers/retrieveAllMonths";
import { retrieveVariance } from "../../../../utils/apis/report/retrieveVarianceReport";
import Cookies from "universal-cookie";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { Context } from "../../../../context";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { downloadVarianceReport } from "../../../../utils/apis/report/downloadVarianceReport";

export const Variance = () => {
  const startDate = 2020;
  const endDate = new Date().getFullYear();

  const currentDate = new Date();
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
    firstMonth: currentMonth - 1,
    secondMonth: currentMonth,
  });
  const [error, setError] = useState(null);
  const [varianceReport, setVarianceReport] = useState([]);
  const [company, setCompany] = useState({});
  const [matches, setMatches] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsPaymentFormModalOpen } = useContext(Context);

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

  useEffect(() => {
    if (!COMPANY_ID || !filter.firstMonth || !filter.secondMonth || !filter.year) return setError("Please select filter. If error persists, contact support.");
    const fetchVarianceReport = async () => {
      setError(null);
      setVarianceReport([]);
      try {
        const res = await retrieveVariance(TOKEN, COMPANY_ID, filter.firstMonth, filter.secondMonth, filter.year);
        return setVarianceReport(res?.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch variance report:", err);
      }
    };
    fetchVarianceReport();
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

  const handleExportTable = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const blob = await downloadVarianceReport(TOKEN, COMPANY_ID, filter.firstMonth, filter.secondMonth, filter.year);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // may have to come back to reset this filename
      a.download = 'variancereport.xlsx';
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
      id={"variance"}
      title={"Variance Report"}
      location={"variance"}
      callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
      handleCallToActionClick={handleOpenCreditPurchaseModal}
    >
      <VarianceWrapper>
        <div
          className="heading"
        >
          <H3>The difference between net salary of two distinct months in a given year</H3>
        </div>
        {error && (
          <div
            className="error-box"
          >
            <P style={{ color: "red" }}>{error}</P>
          </div>
        )}
        <Row className="filter">
          <BaseFieldSet>
            <BaseSelect
              name="year"
              onChange={handleChange}
              value={filter.year}
            >
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
            <BaseSelect
              name="firstMonth"
              onChange={handleChange}
              value={filter.firstMonth}
            >
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
          <BaseFieldSet>
            <BaseSelect
              name="secondMonth"
              onChange={handleChange}
              value={filter.secondMonth}
            >
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
        <div className="variance-table">
          <Table
            columnTitles={[
              "Employee",
              `${months[filter.firstMonth - 1]} Net Salary`,
              `${months[filter.secondMonth - 1]} Net Salary`,
              "Variance",
              "Percentage %",
            ]}
            rowItems={varianceReport}
            location={"Variance Table"}
          />
        </div>
        <PaymentModal />
      </VarianceWrapper>
    </Layout>
  );
};
