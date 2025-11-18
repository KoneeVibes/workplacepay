import { useParams } from "react-router-dom";
import { Column, Row } from "../../../../components/flex/styled";
import { Table } from "../../../../components/table";
import { H3, P, Span } from "../../../../components/typography/styled";
import { Layout } from "../../../../containers/app/layout";
import { UserSummaryWrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import { getEmployeePayslipDetails } from "../../../../utils/apis/payroll/getEmployeePayslipDetails";
import Cookies from "universal-cookie";
import { getCompanies } from "../../../../utils/apis/company/getCompanies";


export const UserSummary = () => {
    const cookies = new Cookies();
    const { ROLE, TOKEN, COMPANY_ID } = cookies.getAll() ?? {};

    const { id } = useParams();
    const [companyName, setCompanyName] = useState("");
    const [payslipDetail, setPayslipDetail] = useState({});
       const printRef = useRef(null);

    useEffect(() => {
        if (ROLE !== "employer" || !COMPANY_ID) return;
        getCompanies(TOKEN)
            .then((data) => {
                const activeCompany = data.find((company) => company.companyId === COMPANY_ID);
                setCompanyName(activeCompany.name);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [TOKEN, ROLE, COMPANY_ID]);

    useEffect(() => {
        const fetchPayslip = async () => {
            try {
                const payslipsDetail = await getEmployeePayslipDetails(TOKEN, id);
                setPayslipDetail(payslipsDetail?.data);
            } catch (err) {
                console.error("Failed to fetch employee payslip:", err);
            }
        };
        fetchPayslip();
    })
      
    const handlePrint = () => {
  const printContent = printRef.current;
  if (!printContent) return;

  const printWindow = window.open('', '', 'width=900,height=1000');

  // Copy styles
  const styles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style, [data-styled]')
  )
    .map((node) => node.outerHTML)
    .join('\n');

  // Copy CSS variables
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVars = Array.from(rootStyles)
    .filter((prop) => prop.startsWith('--'))
    .map((prop) => `${prop}: ${rootStyles.getPropertyValue(prop)};`)
    .join('\n');

  printWindow.document.write(`
    <html>
      <head>
        <title>Employee Summary - ${payslipDetail.fullName || 'Payslip'}</title>
        ${styles}
        <style>
          :root {
            ${cssVars}
          }

          body {
            background: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                         'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                         'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
          }

          .print-wrapper {
            width: 100%;
            max-width: 100%;
            margin: auto;
            box-sizing: border-box;
          }  
           .print-wrapper,
           .print-wrapper * {
             margin-left: 0 !important;
             padding-left: 0 !important;
        }



            .employee-information-block {
               margin-bottom: 1rem; 
            }

            .user-summary-table:first-of-type {
              margin-top: 1rem; 
             }
              


          /* Force Row/Column to behave like flex containers */
          [class*="Row"], [class*="row"], [class*="employee-information"],
          [class*="Column"], [class*="column"], [class*="employee-information-block"] {
            display: flex !important;
          }

          [class*="Row"], [class*="row"], [class*="employee-information"] {
            flex-direction: row !important;
            gap: 0.7rem !important; /* small gap between elements */
          }

          [class*="Column"], [class*="column"], [class*="employee-information-block"] {
            flex-direction: column !important;
            gap: 0.25rem !important; /* small gap between rows */
          }

          [class*="Row"] > div, [class*="row"] > div {
            margin-right: 0.5rem; /* fallback spacing */
          }

          /* Reduce table and footer padding for print */
          [class*="employee-information-block"], [class*="user-summary-table"],
          [class*="table-footer"], .net-payable-summary {
            padding: 0 !important;
            margin: 0 !important;
          }

          .table-footer-title h3, .table-footer-value h3 {
            min-width: auto !important;
            padding-inline-start: 0 !important;
          }
          
          .employee-information-block {
             margin-bottom: 15px !important; 
        }
           
        .net-payable-description {
           padding-left: 12px !important; 
        }
       .net-payable-amount {
         padding: 8px 12px !important; 
         margin: 0 !important;        
         background-color: #8A90DC !important; 
        }

          /* Print page setup */
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              -webkit-font-smoothing: antialiased;
            }
            @page {
              size: A4 portrait;
              margin: 0.5cm; 
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



      const handleDownloadButtonClick = (e) => {
    e.stopPropagation();
        handlePrint();
      };

    return (
        <Layout
            id={"summary"}
            title={companyName?.replace(/\b\w/g, char => char.toUpperCase())}
            location={"user-summary"}
            callToAction={"Download Summary"}
            handleCallToActionClick={handleDownloadButtonClick}

        >
            <UserSummaryWrapper ref={printRef}>
                <div
                    className="heading-row"
                >
                    <H3>Employee Summary</H3>
                </div>
                <Column
                    className="employee-information-block"
                >
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Employee Name:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.fullName}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Email:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.email}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Department:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.department}</Span>
                        </div>
                    </Row>
                    <Row
                        className="employee-information"
                    >
                        <div>
                            <Span>Date Paid:</Span>
                        </div>
                        <div>
                            <Span>{payslipDetail.datePaid}</Span>
                        </div>
                    </Row>
                </Column>
                <div
                    className="user-summary-table"
                >
                    <Table
                        location={"User Summary Table"}
                        columnTitles={[
                            "Earnings", "Amount"
                        ]}
                        rowItems={payslipDetail.earnings ?? []}
                    />
                    <Row
                        gap={"0"}
                        className="table-footer"
                    >
                        <div
                            className="table-footer-title"
                        >
                            <H3>Gross Earning</H3>
                        </div>
                        <div
                            className="table-footer-value"
                        >
                            <H3>{payslipDetail?.totalEarnings?.toLocaleString()}</H3>
                        </div>
                    </Row>
                </div>
                <div
                    className="user-summary-table"
                >
                    <Table
                        location={"User Summary Table"}
                        columnTitles={[
                            "Deductions", "Amount"
                        ]}
                        rowItems={
                            (payslipDetail.deductions ?? []).map(deduction => ({
                                ...deduction,
                                name: deduction.name?.toLowerCase() === "paye" ? "PAYE" : deduction.name,
                            }))
                        }
                    />
                    <Row
                        gap={"0"}
                        className="table-footer"
                    >
                        <div
                            className="table-footer-title"
                        >
                            <H3>Total Deduction</H3>
                        </div>
                        <div
                            className="table-footer-value"
                        >
                            <H3>{payslipDetail?.totalDeductions?.toLocaleString()}</H3>
                        </div>
                    </Row>
                </div>
                <div
                    className="net-payable-summary"
                >
                    <Row
                        justifycontent={"space-between"}
                        className="net-payable-summary-row"
                    >
                        <div
                            className="net-payable-description"
                        >
                            <H3>TOTAL NET PAYABLE</H3>
                            <P>Gross Earning - Total Deduction</P>
                        </div>
                        <div
                            className="net-payable-amount"
                        >
                            <H3>{payslipDetail?.netSalary?.toLocaleString()}</H3>
                        </div>
                    </Row>
                </div>
            </UserSummaryWrapper>
        </Layout>
    )
}