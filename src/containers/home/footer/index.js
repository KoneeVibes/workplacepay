import { FooterWrapper } from "./styled";
import { P, H2, Label } from "../../../components/typography/styled";
import { Column, Row } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";
import { navLinks } from "../../../config/navlinks/home";
import { HashLink } from "react-router-hash-link";

export const Footer = () => {
  return (
    <FooterWrapper
      id="contact"
    >
      <Row
        className="top-row"
      >
        <Column className="footer-form">
          <H2>Contact Us</H2>
          <Label htmlFor="email" className="emailLabel">
            Email
          </Label>
          <BaseInput id="email" type="string" className="emailInput" />
          <Label htmlFor="message" className="messageLabel">
            Message
          </Label>
          <BaseInput id="message" type="string" className="messageInput" />
          <BaseButton type="button" className="button" width={"fit-content"}>
            Send
          </BaseButton>
        </Column>
        <Column className="site-map">
          <H2>Sitemap</H2>
          {navLinks?.filter((navLink) => navLink.name !== "Contact")?.map((navLink, index) => {
            return (
              <HashLink
                key={index}
                to={navLink.url}
                smooth={true}
              >
                <P>
                  {navLink.name}
                </P>
              </HashLink>
            )
          })}
        </Column>
        <Column className="contact">
          <P>workplacePay</P>
          <P>workplacepay@focusgroupng.com</P>
          <P>+2348021810040</P>
        </Column>
      </Row>
      <Row
        className="bottom-row"
      >
        <P>© 2023 workplacePay. All rights reserved.</P>
        <P>Powered by: Focus Group</P>
      </Row>
    </FooterWrapper >
  );
};
