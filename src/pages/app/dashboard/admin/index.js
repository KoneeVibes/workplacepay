import { AdminDashboardWrapper } from "./styled";
import { useState } from "react";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label } from "../../../../components/typography/styled";
import { Span } from "../../../../components/typography/styled";
import { Table } from "../../../../components/table";

export const AdminDashboard = () => {
  const [filter, setFilter] = useState({
    companyName: "",
    planType: "",
    usage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AdminDashboardWrapper>
      <Row
        className="heading-row"
        justifycontent={"space-between"}
      >
        <Span>Company List</Span>
        <Span>See all</Span>
      </Row>
      <Row className="filter">
        <BaseFieldSet>
          <Label>Company Name</Label>
          <BaseSelect
            name="companyName"
            onChange={handleChange}
            value={filter.username}
          >
            <option value="" hidden></option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
          </BaseSelect>
        </BaseFieldSet>
        <BaseFieldSet>
          <Label>Plan Type</Label>
          <BaseSelect
            name="planType"
            onChange={handleChange}
            value={filter.department}
          >
            <option value="" hidden></option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
          </BaseSelect>
        </BaseFieldSet>
        <BaseFieldSet>
          <Label>Usage</Label>
          <BaseSelect
            name="usage"
            onChange={handleChange}
            value={filter.jobTitle}
          >
            <option value="" hidden></option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
          </BaseSelect>
        </BaseFieldSet>
      </Row>
      <div className="admin-table">
        <Table
          columnTitles={[
            "Company Name",
            "Employer's Name",
            "Plan Type",
            "Credits Left",
            "Last Used",
          ]}
          rowItems={[]}
        />
      </div>
    </AdminDashboardWrapper>
  );
};
