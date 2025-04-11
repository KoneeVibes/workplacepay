import { useState } from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Row } from "../../../components/flex/styled";
import { H2, P } from "../../../components/typography/styled";
import { FAQWrapper } from "./styled";
import { FaqIcon } from "../../../assets";

export const FAQ = ({ faqItems }) => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const handleFAQClick = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <FAQWrapper id="faq">
            <H2>FAQ</H2>
            {faqItems?.map((faq, index) => (
                <div key={index} className="faq-item">
                    <Row
                        alignitems="center"
                        justifycontent="space-between"
                        onClick={() => handleFAQClick(index)}
                        style={{ cursor: "pointer" }}
                        className="faq-item-row"
                    >
                        <P className="faq-question">{faq?.question}</P>
                        <FaqIcon icon={openFAQ === index ? faCaretDown : faCaretRight} />
                    </Row>
                    {openFAQ === index && <P className="faq-answer">{faq?.answer}</P>}
                </div>
            ))}
        </FAQWrapper>
    );
};