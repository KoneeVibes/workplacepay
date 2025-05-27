import { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { PensionWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Table } from "../../../../components/table";
import Cookies from "universal-cookie";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../../helpers/retrieveAllMonths";
import { retrievePension } from "../../../../utils/apis/report/retrievePensionReport";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { Context } from "../../../../context";
import { Label, P } from "../../../../components/typography/styled";

export const Pension = () => {
  const startDate = 2020;
  const endDate = 2025;

  const currentDate = new Date();
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [filter, setFilter] = useState({
    endYear: currentYear,
    endMonth: currentMonth,
    startYear: currentYear - 1,
    startMonth: currentMonth - 1,
  });
  const [error, setError] = useState(null);
  const [PensionReport, setPensionReport] = useState([]);
  const [company, setCompany] = useState({});

  const { setIsPaymentFormModalOpen } = useContext(Context);

  useEffect(() => {
    if (!COMPANY_ID || !filter.endMonth || !filter.endYear || !filter.startMonth || !filter.startYear) return setError("Please select filter. If error persists, contact support.");
    const fetchPensionReport = async () => {
      setError(null);
      setPensionReport([]);
      try {
        const res = await retrievePension(
          TOKEN,
          COMPANY_ID,
          filter
        );
        return setPensionReport(res?.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch pension report:", err);
      }
    };
    fetchPensionReport();
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

  return (
    <Layout
      id={"pension"}
      title={"Pension Report"}
      location={"pension"}
      style={{ textColor: "#4E57BB" }}
      callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
      handleCallToActionClick={handleOpenCreditPurchaseModal}
    >
      <PensionWrapper>
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
        </Row>
        <div className="pension-table">
          <Table
            columnTitles={["Employee", "PFA", "PFA Account", "Gross Value", "Pension Value"]}
            rowItems={PensionReport}
            location={"Pension Table"}
          />
        </div>
        <PaymentModal />
      </PensionWrapper>
    </Layout>
  );
};
