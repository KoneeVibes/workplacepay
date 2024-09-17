import { FooterWrapper } from "./styled";
import { P, H2, Label } from "../../../components/typography/styled";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";

export const Footer = () => {
  return (
    <FooterWrapper>
      {/* Mirabel, your html code should go in below this line */}
      <Column className="footer-form">
        <H2>Contact Us</H2>
        <Label for="email" className="emailLabel">
          Email
        </Label>
        <BaseInput type="string" className="emailInput" />
        <Label for="message" className="messageLabel">
          Message
        </Label>
        <BaseInput type="string" className="messageInput" />
        <BaseButton type="button" className="button" width={"fit-content"}>
          Send
        </BaseButton>
      </Column>
      <Column className="site-map">
        <H2>Sitemap</H2>
        <P>Why this app?</P>
        <P>Features</P>
        <P>Plans and Pricing</P>
        <P>Contact</P>
      </Column>
      <Column className="contact">
        <P>workplacePay</P>
        <P>info@focusgroup.com</P>
        <P>+2348069999680</P>
      </Column>
    </FooterWrapper>
  );
};
