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

export const Pension = () => {
  const startDate = 1990;
  const endDate = 2025;

  const currentDate = new Date();
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
    month: currentMonth,
  });
  const [PensionReport, setPensionReport] = useState([]);
  const [company, setCompany] = useState({});

  const { setIsPaymentFormModalOpen } = useContext(Context);

  useEffect(() => {
    const fetchPensionReport = async () => {
      try {
        const res = await retrievePension(
          TOKEN,
          COMPANY_ID,
          filter.year,
          filter.month
        );
        return setPensionReport(res?.data);
      } catch (err) {
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
      title={"Pension Output"}
      location={"pension"}
      style={{ textColor: "#4E57BB" }}
      callToAction={`CREDIT BALANCE: ${company?.creditBalance}`}
      handleCallToActionClick={handleOpenCreditPurchaseModal}
    >
      <PensionWrapper>
        <Row className="filter">
          <BaseFieldSet>
            <BaseSelect name="year" onChange={handleChange} value={filter.year}>
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
            <BaseSelect
              name="month"
              onChange={handleChange}
              value={filter.month}
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
            columnTitles={["Employee", "Month", "Year", "PFA", "PFA Account"]}
            rowItems={PensionReport}
            location={"Pension Table"}
          />
        </div>
        <PaymentModal />
      </PensionWrapper>
    </Layout>
  );
};
