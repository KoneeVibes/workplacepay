import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { VarianceWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { H3 } from "../../../components/typography/styled";
import { Table } from "../../../components/table";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../helpers/retrieveAllMonths";
import { retrieveVariance } from "../../../utils/apis/report/retrieveVarianceReport";
import Cookies from "universal-cookie";

export const Variance = () => {
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
    firstMonth: currentMonth - 1,
    secondMonth: currentMonth,
  });
  const [varianceReport, setVarianceReport] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchVarianceReport = async () => {
      try {
        const res = await retrieveVariance(TOKEN, COMPANY_ID, filter.firstMonth, filter.secondMonth, filter.year);
        return setVarianceReport(res?.data);
      } catch (err) {
        console.error("Failed to fetch variance report:", err);
      }
    };
    fetchVarianceReport();
  }, [TOKEN, COMPANY_ID, filter]);

  return (
    <Layout
      id={"variance"}
      title={"Variance Report"}
    >
      <VarianceWrapper>
        <div
          className="heading"
        >
          <H3>The difference between net salary of two distinct months</H3>
        </div>
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
        <div className="variance-table">
          <Table
            columnTitles={[
              "Employee",
              "January Net Sale",
              "February Net Sale",
              "Variance",
              "Percentage %",
            ]}
            rowItems={varianceReport}
            location={"Variance Table"}
          />
        </div>
      </VarianceWrapper>
    </Layout>
  );
};
