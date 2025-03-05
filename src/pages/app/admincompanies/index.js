import { Layout } from "../../../containers/app/layout";
import { AdmincompaniesWrapper } from "./styled";
import { Span } from "../../../components/typography/styled";
import { Row } from "../../../components/flex/styled";
import { H2 } from "../../../components/typography/styled";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../../utils/apis/company/getCompanyDetails";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

export const Admincompanies = () => {
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
  return (
    <Layout id={"adminCompany"} title={"Raji Ventures"}>
      <AdmincompaniesWrapper>
        <div className="credit-information">
          <H2>Credit Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>{`${company?.credit} Credits`}</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>{`${company?.credit} Credits`}</Span>
          </Row>
        </div>
        <div className="company-information">
          <H2>Company Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>Employer@rajiventures</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>{`${company?.credit} Credits`}</Span>
          </Row>
        </div>
      </AdmincompaniesWrapper>
    </Layout>
  );
};
