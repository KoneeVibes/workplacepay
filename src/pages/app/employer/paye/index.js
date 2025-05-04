import { useContext, useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { PayeWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Table } from "../../../../components/table";
import { retrievePaye } from "../../../../utils/apis/report/retrievePayeReport";
import Cookies from "universal-cookie";
import { getYearRange } from "../../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../../helpers/retrieveAllMonths";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import { Context } from "../../../../context";
import { PaymentModal } from "../../../../containers/app/modals/paymentmodal";
import { Label, P } from "../../../../components/typography/styled";

export const Paye = () => {
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
  const [PayeReport, setPayeReport] = useState([]);
  const [company, setCompany] = useState({});

  const { setIsPaymentFormModalOpen } = useContext(Context);

  useEffect(() => {
    if (!COMPANY_ID || !filter.endMonth || !filter.endYear || !filter.startMonth || !filter.startYear) return setError("Please select filter. If error persists, contact support.");
    const fetchPayeReport = async () => {
      setError(null);
      setPayeReport([]);
      try {
        const res = await retrievePaye(
          TOKEN,
          COMPANY_ID,
          filter
        );
        return setPayeReport(res?.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch paye report:", err);
      }
    };
    fetchPayeReport();
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
      id={"paye"}
      title={"Paye Output"}
      location={"paye"}
      style={{ textColor: "#4E57BB" }}
      callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
      handleCallToActionClick={handleOpenCreditPurchaseModal}
    >
      <PayeWrapper>
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
        <div className="paye-table">
          <Table
            columnTitles={[
              "Employee",
              "Tax ID",
              "Gross Pay",
              "PAYE",
            ]}
            rowItems={PayeReport}
            location={"Paye Table"}
          />
        </div>
        <PaymentModal />
      </PayeWrapper>
    </Layout>
  );
};
