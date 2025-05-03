import { CompaniesWrapper } from "./styled";
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
import { useNavigate } from "react-router-dom";
import { getAllPlans } from "../../../../utils/apis/plansandpricing/getAllPlans";
import { Layout } from "../../../../containers/app/layout";

export const Companies = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [payrollPlans, setPayrollPlans] = useState([]);
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

  useEffect(() => {
    getAllPlans(TOKEN)
      .then((data) => {
        setPayrollPlans(data ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch payroll plans:", err);
      });
  }, [TOKEN]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNavigateToCompanyDetailsPage = (e, companyId) => {
    e.stopPropagation();
    e.preventDefault();
    return navigate(`/admin/companies/${companyId}`);
  };

  return (
    <Layout
      id={"companies"}
      title={"Companies"}
    >
      <CompaniesWrapper>
        <Row className="heading-row" justifycontent={"space-between"}>
          <Span>Company List</Span>
          <Span>Show all</Span>
        </Row>
        <Row className="filter">
          <BaseFieldSet>
            <Label>Company Name</Label>
            <BaseInput
              type="text"
              name="companyName"
              placeholder="Search by Company Name"
              value={filter.companyName}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Plan Type</Label>
            <BaseSelect
              name="planType"
              value={filter?.planType}
              onChange={(e) => handleChange(e)}
            >
              <option value="" hidden>Select a Plan</option>
              {payrollPlans?.map((plan, index) => {
                return (
                  <option key={index} value={plan?.title}>
                    {plan?.title}
                  </option>
                );
              })}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Usage</Label>
            <BaseSelect name="usage" onChange={handleChange} value={filter.usage}>
              <option value="">All time</option>
              <option value="last day">Last one day</option>
              <option value="last week">Last week</option>
              <option value="last month">Last month</option>
              <option value="last three month">Last three months</option>
              <option value="last six month">Last six months</option>
              <option value="last year">Last year</option>
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
              "View Details",
            ]}
            rowItems={companies}
            location={"Company Table"}
            handleRowItemClick={handleNavigateToCompanyDetailsPage}
          />
        </div>
      </CompaniesWrapper>
    </Layout>
  );
};
