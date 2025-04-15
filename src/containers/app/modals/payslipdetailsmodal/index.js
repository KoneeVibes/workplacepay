import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { PayslipDetailsModalWrapper } from "./styled";
import { Column, Row } from "../../../../components/flex/styled";
import { H1, H2, H3, Span } from "../../../../components/typography/styled";
import { Card } from "../../../../components/card";

export const PayslipDetailsModal = ({ height, width }) => {
    const [matches, setMatches] = useState(false);
    const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } = useContext(Context);

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setIsPayslipDetailsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 425);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BaseModal
            open={isPayslipDetailsModalOpen}
            onClose={handleCloseModal}
            className={"payslip-details-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "60%" : width || "50%"}
        >
            <PayslipDetailsModalWrapper>
                <Row className="firstContainer">
                    <div>
                        <Row>
                            <H1>Egunlusi Olumide</H1>
                            <H2>Jan 2025</H2>
                        </Row>
                    </div>
                    <div className="companyName">
                        <H2>InfraFocus</H2>
                    </div>
                </Row>
                <Row className="middleContainer">
                    <Column>
                        <H3>Employee Details</H3>
                        <Card className="card">
                            <Row className="cardRow">
                                <Span>Employee ID</Span>
                                <Span>NV874dd3</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Pension ID</Span>
                                <Span>135TL</Span>
                            </Row>
                        </Card>
                    </Column>
                    <Column>
                        <H3>Payments</H3>
                        <Card className="card">
                            <Row className="cardRow">
                                <Span>Basic</Span>
                                <Span>N 450,000</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Housing</Span>
                                <Span>N 45,769</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Transport</Span>
                                <Span>N 78,300</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Bonus</Span>
                                <Span>-</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Overtime 12.5 hours @ N1000</Span>
                                <Span>N 17,450</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Total</Span>
                                <Span>N 591,519</Span>
                            </Row>
                        </Card>
                    </Column>
                    <Column>
                        <H3>Deductions</H3>
                        <Card className="card">
                            <Row className="cardRow">
                                <Span>PAYE</Span>
                                <Span>N 8,000</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Pension</Span>
                                <Span>N 2,870</Span>
                            </Row>
                            <Row className="cardRow">
                                <Span>Total</Span>
                                <Span>N 10,870</Span>
                            </Row>
                        </Card>
                    </Column>
                </Row>
                <Row className="bottomContainer">
                    <H1>PAYMENT</H1>
                    <div className="amount">
                        <H1 className="bottom">N 451,430</H1>
                    </div>
                    <H2>Paid 28/01/24</H2>
                </Row>
            </PayslipDetailsModalWrapper>
        </BaseModal>
    )
}