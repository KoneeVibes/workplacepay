import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { PensionWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Table } from "../../../components/table";

export const Pension = () => {
  const [filter, setFilter] = useState({
    year: "",
    month: "",
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
      id={"pension"}
      title={"Pension Output"}
      location={"pension"}
      style={{ textColor: "#4E57BB" }}
    >
      <PensionWrapper>
        <Row className="filter">
          <BaseFieldSet>
            <BaseSelect name="year" onChange={handleChange} value={filter.year}>
              <option value="Select Year">Select Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <BaseSelect
              name="month"
              onChange={handleChange}
              value={filter.month}
            >
              <option value="Month">Select Month</option>
              <option value="january">january</option>
              <option value="febuary">febuary</option>
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="pension-table">
          <Table
            columnTitles={[
              " Employee",
              "Month",
              "Year",
              "PFA",
              "PFA Account",
            ]}
            rowItems={[]}
          />
        </div>
      </PensionWrapper>
    </Layout>
  );
};
