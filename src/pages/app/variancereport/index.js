import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { VarianceWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { H3 } from "../../../components/typography/styled";
import { Table } from "../../../components/table";

export const Variance = () => {
  const [filter, setFilter] = useState({
    year: "",
    firstMonth: "",
    secondMonth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout
      id={"variance"}
      title={"Variance Report"}
    >
      <VarianceWrapper>
        <div
          className="heading"
        >
          <H3>The difference between Net Salary of two distinct months</H3>
        </div>
        <Row className="filter">
          <BaseFieldSet>
            <BaseSelect
              name="year"
              onChange={handleChange}
              value={filter.year}
            >
              <option value="Select Year">Select Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <BaseSelect
              name="firstMonth"
              onChange={handleChange}
              value={filter.firstMonth}
            >
              <option value="Select Month">Select Month</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <BaseSelect
              name="secondMonth"
              onChange={handleChange}
              value={filter.secondMonth}
            >
              <option value="Select Month">Select Month</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
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
            rowItems={[]}
          />
        </div>
      </VarianceWrapper>
    </Layout>
  );
};
