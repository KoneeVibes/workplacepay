import { useEffect, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { CompanyDetailsWrapper } from "./styled";
import { Span } from "../../../../components/typography/styled";
import { Row } from "../../../../components/flex/styled";
import { H2 } from "../../../../components/typography/styled";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../../../utils/apis/company/getCompanyDetails";
import Cookies from "universal-cookie";

export const CompanyDetails = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");

  const { id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await getCompanyDetails(TOKEN, id);
        return setCompany(res?.data);
      } catch (err) {
        console.error("Failed to fetch company details:", err);
      }
    };
    fetchCompanyDetails();
  }, [TOKEN, id]);

  const capitalizeWords = (str) => {
    return str
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout
      id={"companies"}
      title={capitalizeWords(company?.name)}
    >
      <CompanyDetailsWrapper>
        <div className="credit-information">
          <H2>Credit Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>{`${company?.creditBalance} Credits`}</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Credit Cost Per Employee</Span>
            <Span>{`${company?.creditCostPerEmployee} Credits`}</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Credit Naira Value</Span>
            <Span>{`${company?.creditNairaValue?.toLocaleString()}`}</Span>
          </Row>
        </div>
        <div className="company-information">
          <H2>Company Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Company Email</Span>
            <Span>{company?.email}</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Company Phone</Span>
            <Span>{`${company?.phone}`}</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Payroll Plan</Span>
            <Span>{company?.payrollPlan}</Span>
          </Row>
        </div>
      </CompanyDetailsWrapper>
    </Layout>
  );
};
