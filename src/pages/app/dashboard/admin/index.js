import { AdminDashboardWrapper } from "./styled";
import { useEffect, useState } from "react";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label } from "../../../../components/typography/styled";
import { Span } from "../../../../components/typography/styled";
import { Table } from "../../../../components/table";
import Cookies from "universal-cookie";
import { getAllCompanies } from "../../../../utils/apis/company/getAllCompanies";
import { BaseInput } from "../../../../components/form/input/styled";

export const AdminDashboard = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");

  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState({
    companyName: "",
    planType: "",
    usage: "",
  });

  useEffect(() => {
    getAllCompanies(TOKEN, filter)
      .then((data) => setCompanies(data))
      .catch((err) => {
        console.error("Failed to fetch companies:", err);
      });
  }, [TOKEN, filter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AdminDashboardWrapper>
      <Row className="heading-row" justifycontent={"space-between"}>
        <Span>Company List</Span>
        <Span>See all</Span>
      </Row>
      <Row className="filter">
        <BaseFieldSet>
          <Label>Company Name</Label>
          <BaseInput
            type="text"
            name="companyName"
            placeholder="Search by Company"
            value={filter.companyName}
            onChange={handleChange}
          />
        </BaseFieldSet>
        <BaseFieldSet>
          <Label>Plan Type</Label>
          <BaseInput
            type="text"
            name="planType"
            placeholder="Search by Plan Type"
            value={filter.planType}
            onChange={handleChange}
          />
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
          rowItems={companies}
        />
      </div>
    </AdminDashboardWrapper>
  );
};
