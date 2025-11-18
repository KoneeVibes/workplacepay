import { useContext, useEffect, useRef, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { PayslipDetailsModalWrapper } from "./styled";
import { Column, Row } from "../../../../components/flex/styled";
import { H1, H2, H3, Span } from "../../../../components/typography/styled";
import { Card } from "../../../../components/card";
import { getEmployeePayslipDetails } from "../../../../utils/apis/payroll/getEmployeePayslipDetails";
import Cookies from "universal-cookie";
import { BaseButton } from "../../../../components/button/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export const PayslipDetailsModal = ({ height, width, payslipId }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const { isPayslipDetailsModalOpen, setIsPayslipDetailsModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [payslipDetail, setPayslipDetail] = useState({});
   const componentRef = useRef(null);
    

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

      const handlePrint = () => {
  const printContent = componentRef.current;
  if (!printContent) return;

  const printWindow = window.open('', '', 'width=900,height=1000');

  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style, [data-styled]'))
    .map((node) => node.outerHTML)
    .join('\n');

  const rootStyles = getComputedStyle(document.documentElement);
  const cssVars = Array.from(rootStyles)
    .filter((prop) => prop.startsWith('--'))
    .map((prop) => `${prop}: ${rootStyles.getPropertyValue(prop)};`)
    .join('\n');

  printWindow.document.write(`
    <html>
      <head>
        <title>Employee Payslip - ${payslipDetail.fullName || 'Payslip'}</title>
        ${styles}
        <style>
          :root { ${cssVars} }

          body {
            background: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                         'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                         'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 10px;
          }

          .print-wrapper {
            width: 100%;
            max-width: 100%;
            margin: auto;
          }

          /* Top row */
          .firstContainer {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }

          /* Bottom row */
          .bottomContainer {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 5px 0 !important;
          }

          /* Middle section columns remain columns */
          .middleContainer,
          .middleContainer > .middle-container-column {
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
          }
            
          .middleContainer {
            background-color: #979DE885 !important;
            padding: 10px !important;
            gap: 15px !important;
          }

          /* Cards */
          .card {
            background-color: #FFFFFF !important;
            padding: 10px !important;
            border-radius: 4px;
          }

          .cardRow {
            display: flex !important;
            justify-content: space-between !important;
          }

          .cardRow > div:nth-child(2) {
            text-align: right !important;
          }

          .amount {
            background-color: #979DE885 !important;
            border-radius: 4px;
            padding: 5px !important;
            box-sizing: border-box;
          }

          /* Hide interactive elements */
          .close-modal-button,
          .close-modal-button-area,
          .button-div {
            display: none !important;
          }

          /* Fonts */
          h1 { font-size: 1.5rem; font-weight: 500; margin-block: 0; }
          h2 { font-weight: 600; margin-block: 0; }
          h3 { font-weight: 300; margin-block: 0; }
          span { font-weight: 600; }

          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: A4 portrait;
              margin: 1cm;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printContent.outerHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 700);
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
                    className="close-modal-button-header"
                      justifycontent={"space-between"}
                >
                    <div
                        className="close-modal-button-area"
                    >
                        <BaseButton
                            className="close-modal-button"
                            onClick={handleCloseModal}
                        >
                            <Span>X</Span>
                        </BaseButton>
                    </div>
                    <div className="summary-button" >
                <BaseButton
                    onClick={handlePrint}
                    type="button"
                    backgroundcolor={"#4E57BB"}
                    width={matches ? "-webkit-fill-available" : "fit-content"}
                >
                     Download Payslip
                </BaseButton>
                </div>
                </Row>
                <div ref={componentRef}>
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
                        <H3>{payslipDetail.month ? `${getMonthName(payslipDetail.month, payslipDetail?.year)} ${payslipDetail?.year}` : ''}</H3>
                    </div>
                    <div
                        className="first-container-item companyName"
                    >
                        <H2>{payslipDetail.companyName}</H2>
                    </div>
                    <div className="button-div">
                        <BaseButton className="button">
                            <FontAwesomeIcon icon={faXmark} color="#FFFFFF" />
                        </BaseButton>
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
                                    <Span className="span">{payslipDetail.employeeId}</Span>
                                </div>
                            </Row>
                            <Row
                                className="cardRow"
                            >
                                <div>
                                    <Span>Pension ID</Span>
                                </div>
                                <div>
                                    <Span className="span">{payslipDetail.pensionId}</Span>
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
                                            <Span className="span">{`${earning?.value?.toLocaleString()}`}</Span>
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
                                            <Span>{deduction.name.toLowerCase() === "paye" ? "PAYE" : deduction.name}</Span>
                                        </div>
                                        <div>
                                            <Span className="span">{`${deduction?.value?.toLocaleString()}`}</Span>
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
                        <H2>PAYMENT</H2>
                    </div>
                    <div className="amount">
                        <H2 className="bottom">{`${payslipDetail?.netSalary?.toLocaleString()}`}</H2>
                    </div>
                    <div>
                        <H2>{`GENERATED ${payslipDetail.datePaid}`}</H2>
                    </div>
                </Row>
                </div>
            </PayslipDetailsModalWrapper>
        </BaseModal >
    )
}