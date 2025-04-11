import { FooterWrapper } from "./styled";
import { P, H2, Label } from "../../../components/typography/styled";
import { Column } from "../../../components/flex/styled";
import { BaseButton } from "../../../components/button/styled";
import { BaseInput } from "../../../components/form/input/styled";

export const Footer = () => {
  return (
    <FooterWrapper
    id="contact"
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
        <P>Why this app?</P>
        <P>Features</P>
        <P>Plans and Pricing</P>
        <P>Contact</P>
      </Column>
      <Column className="contact">
        <P>workplacePay</P>
        <P>workplacepay@focusgroupng.com</P>
        <P>+2348021810040</P>
      </Column>
    </FooterWrapper>
  );
};
