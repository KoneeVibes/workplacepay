import { useEffect, useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { GeneralReportWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Table } from "../../../components/table";
import Cookies from "universal-cookie";
import { getDepartments } from "../../../utils/apis/department/getDepartments";
import { retrieveGeneral } from "../../../utils/apis/report/retrieveGeneralReport";
import { getYearRange } from "../../../helpers/retrieveAllYearsToDate";
import { months } from "../../../helpers/retrieveAllMonths";

export const GeneralReport = () => {
  const startDate = 1990;
  const endDate = 2025;

  const currentDate = new Date();
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const [departments, setDepartments] = useState([]);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [filter, setFilter] = useState({
    year: currentYear,
    month: currentMonth,
    departmentId: "",
  });
  const [generalReport, setGeneralReport] = useState([]);

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
    const fetchGeneralReport = async () => {
      try {
        const res = await retrieveGeneral(
          TOKEN,
          COMPANY_ID,
          filter.year,
          filter.month,
          filter.departmentId
        );
        return setGeneralReport(res?.data);
      } catch (err) {
        console.error("Failed to fetch general report:", err);
      }
    };
    fetchGeneralReport();
  }, [TOKEN, COMPANY_ID, filter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout id={"generalreport"} title={"General Report"}>
      <GeneralReportWrapper>
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
          <BaseFieldSet>
            <BaseSelect
              name="departmentId"
              onChange={handleChange}
              value={filter.departmentId}
            >
              <option value="" hidden>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department.id}>
                  {department.name}
                </option>
              ))}
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="general-report-table">
          <Table
            columnTitles={[
              "Name",
              "Department",
              "Month",
              "Year",
              "Bank",
              "Bank Account",
              "PFA",
              "PFA Account",
              "Basic",
              "Housing",
              "Transport",
              "Overtime",
              "Bonus",
              "PAYE",
              "Pension",
              "Total Earnings",
              "Total Deductions",
              "Gross",
              "Net Pay",
            ]}
            rowItems={generalReport}
            location={"General Table"}
          />
        </div>
      </GeneralReportWrapper>
    </Layout>
  );
};
