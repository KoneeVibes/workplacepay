import { Layout } from "../../../containers/app/layout";
import { AdmincompaniesWrapper } from "./styled";
import { Span } from "../../../components/typography/styled";
import { Row } from "../../../components/flex/styled";
import { H2 } from "../../../components/typography/styled";

export const Admincompanies = () => {
  return (
    <Layout id={"adminCompany"} title={"Raji Ventures"}>
      <AdmincompaniesWrapper>
        <div className="credit-information">
          <H2>Credit Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>30 Credits</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span>30 Credits</Span>
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
            <Span>30 Credits</Span>
          </Row>
        </div>
      </AdmincompaniesWrapper>
    </Layout>
  );
};
