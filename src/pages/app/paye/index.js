import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { PayeWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { BaseFieldSet } from "../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../components/form/select/styled";
import { Table } from "../../../components/table";

export const Paye = () => {
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
    <Layout id={"paye"} title={"Paye Output"} location={"paye"}>
      <PayeWrapper>
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
        <div className="paye-table">
          <Table
            columnTitles={[
              " Employee",
              "Department",
              "Salary",
              "Hire Date",
              "Role",
              "status",
            ]}
            rowItems={[]}
          />
        </div>
      </PayeWrapper>
    </Layout>
  );
};
