import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { PayeWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Table } from "../../../components/table";
import { retrievePaye } from "../../../utils/apis/report/retrievePayeReport";
import Cookies from "universal-cookie";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../helpers/retrieveAllMonths";
import { getCompanyDetails } from "../../../utils/apis/company/getCompanyDetails";

export const Paye = () => {
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
  const [PayeReport, setPayeReport] = useState([]);
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchPayeReport = async () => {
      try {
        const res = await retrievePaye(
          TOKEN,
          COMPANY_ID,
          filter.year,
          filter.month
        );

        return setPayeReport(res?.data);
      } catch (err) {
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
    console.log("I am clicked");
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
        <div className="paye-table">
          <Table
            columnTitles={[
              "Employee",
              "Tax ID",
              "Month",
              "Year",
              "Gross Pay",
              "PAYE",
            ]}
            rowItems={PayeReport}
            location={"Paye Table"}
          />
        </div>
      </PayeWrapper>
    </Layout>
  );
};
