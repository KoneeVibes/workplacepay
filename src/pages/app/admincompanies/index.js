import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { AdmincompaniesWrapper } from "./styled";
import { Row } from "../../../components/flex/styled";
import { H2, H3 } from "../../../components/typography/styled";

export const Pension = () => {
  //   const [filter, setFilter] = useState({
  //     year: "",
  //     month: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFilter((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  return (
    <Layout
      id={"adminCompany"}
      title={"Raji Ventures"}
      location={"adminCompany"}
      style={{ textColor: "#4E57BB" }}
    >
      <AdmincompaniesWrapper>
        <Span>Bronze User</Span>
        <div>
          <H2>Credit Information</H2>
          <Row className="heading-row">
            <Span>Available Credits</Span>
            <Span>30 Credits</Span>
          </Row>
          <Row className="heading-row">
            <H3>Available Credits</H3>
            <Span>30 Credits</Span>
          </Row>
        </div>

        <div>
          <H2>Company Information</H2>
          <Row className="heading-row">
            <H3>Available Credits</H3>
            <Span>Employer@rajiventures</Span>
          </Row>
          <Row className="heading-row">
            <H3>Available Credits</H3>
            <Span>30 Credits</Span>
          </Row>
        </div>
      </AdmincompaniesWrapper>
    </Layout>
  );
};
