import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { PensionWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Table } from "../../../components/table";
import Cookies from "universal-cookie";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../helpers/retrieveAllMonths";
import { retrievePension } from "../../../utils/apis/report/retrievePensionReport";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout
      id={"pension"}
      title={"Pension Output"}
      location={"pension"}
      style={{ textColor: "#4E57BB" }}
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
            columnTitles={[" Employee", "Month", "Year", "PFA", "PFA Account"]}
            rowItems={PensionReport}
            location={"Pension Table"}
          />
        </div>
      </PensionWrapper>
    </Layout>
  );
};
