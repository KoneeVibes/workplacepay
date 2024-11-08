// import { useState } from "react";
import { Layout } from "../../../containers/app/layout";
import { AdmincompaniesWrapper } from "./styled";
import { Span } from "../../../components/typography/styled";
import { Row } from "../../../components/flex/styled";
import { H2 } from "../../../components/typography/styled";

export const Admincompanies = () => {
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
        <div className="section1">
          <H2>Credit Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span className="span2">30 Credits</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span className="span2">30 Credits</Span>
          </Row>
        </div>

        <div className="section2">
          <H2>Company Information</H2>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span className="span2">Employer@rajiventures</Span>
          </Row>
          <Row className="heading-row" gap={"5rem"}>
            <Span>Available Credits</Span>
            <Span className="span2">30 Credits</Span>
          </Row>
        </div>
      </AdmincompaniesWrapper>
    </Layout>
  );
};
