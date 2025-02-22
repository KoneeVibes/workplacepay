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
        console.error("Failed to fetch variance report:", err);
      }
    };
    fetchPayeReport();
  }, [TOKEN, COMPANY_ID, filter]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout
      id={"paye"}
      title={"Paye Output"}
      location={"paye"}
      style={{ textColor: "#4E57BB" }}
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
              "Username",
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
