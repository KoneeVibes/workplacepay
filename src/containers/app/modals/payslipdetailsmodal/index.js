import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { PayslipDetailsModalWrapper } from "./styled";
import { Column, Row } from "../../../../components/flex/styled";
import { H1, H2, H3, Span } from "../../../../components/typography/styled";
import { Card } from "../../../../components/card";
import { getEmployeePayslipDetails } from "../../../../utils/apis/payroll/getEmployeePayslipDetails";
import Cookies from "universal-cookie";

export const PayslipDetailsModal = ({ height, width, payslipId }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [payslipDetail, setPayslipDetail] = useState({});

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setIsPayslipDetailsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!payslipId) return;
        const retrievePayslip = async () => {
            try {
                const payslip = await getEmployeePayslipDetails(TOKEN, payslipId);
                setPayslipDetail(payslip?.data);
            } catch (error) {
                console.error("Failed to fetch employee payslip:", error);
            }
        };
        retrievePayslip();
    }, [TOKEN, payslipId]);

    const getMonthName = (monthIndex, year = new Date().getFullYear(), locale = 'en-US') => {
        const date = new Date(year, monthIndex - 1);
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    };

    return (
        <BaseModal
            open={isPayslipDetailsModalOpen}
            onClose={handleCloseModal}
            className={"payslip-details-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <PayslipDetailsModalWrapper>
                <Row
                    className="firstContainer"
                    justifycontent={"space-between"}
                >
                    <div
                        className="first-container-item full-name"
                    >
                        <H1>{payslipDetail.fullName}</H1>
                    </div>
                    <div
                        className="first-container-item date"
                    >
                        <H2>{payslipDetail.month ? `${getMonthName(payslipDetail.month, payslipDetail?.year)} ${payslipDetail?.year}` : ''}</H2>
                    </div>
                    <div
                        className="first-container-item companyName"
                    >
                        <H2>{payslipDetail.companyName}</H2>
                    </div>
                </Row>
                <Row className="middleContainer">
                    <Column
                        className="middle-container-column"
                    >
                        <H3>Employee Details</H3>
                        <Card className="card">
                            <Row
                                className="cardRow"
                                justifycontent={"space-between"}
                            >
                                <div>
                                    <Span>Employee ID</Span>
                                </div>
                                <div>
                                    <Span>{payslipDetail.employeeId}</Span>
                                </div>
                            </Row>
                            <Row
                                className="cardRow"
                            >
                                <div>
                                    <Span>Pension ID</Span>
                                </div>
                                <div>
                                    <Span>135TL</Span>
                                </div>
                            </Row>
                        </Card>
                    </Column>
                    <Column
                        className="middle-container-column"
                    >
                        <H3>Payments</H3>
                        <Card className="card">
                            {payslipDetail?.earnings?.map((earning, index) => {
                                return (
                                    <Row
                                        key={index}
                                        className="cardRow"
                                    >
                                        <div>
                                            <Span>{earning.name}</Span>
                                        </div>
                                        <div>
                                            <Span>{earning.value}</Span>
                                        </div>
                                    </Row>
                                )
                            })}
                        </Card>
                    </Column>
                    <Column
                        className="middle-container-column"
                    >
                        <H3>Deductions</H3>
                        <Card className="card">
                            {payslipDetail?.deductions?.map((deduction, index) => {
                                return (
                                    <Row
                                        key={index}
                                        className="cardRow"
                                    >
                                        <div>
                                            <Span>{deduction.name}</Span>
                                        </div>
                                        <div>
                                            <Span>{deduction.value}</Span>
                                        </div>
                                    </Row>
                                )
                            })}
                        </Card>
                    </Column>
                </Row>
                <Row
                    className="bottomContainer"
                    justifycontent={"space-between"}
                >
                    <div>
                        <H1>PAYMENT</H1>
                    </div>
                    <div className="amount">
                        <H1 className="bottom">{payslipDetail.netSalary}</H1>
                    </div>
                    <div>
                        <H2>{`PAID ${payslipDetail.datePaid}`}</H2>
                    </div>
                </Row>
            </PayslipDetailsModalWrapper>
        </BaseModal >
    )
}