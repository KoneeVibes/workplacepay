import { H2, H3, P, } from "../../../components/typography/styled";
import { PlansAndPricingRow, PlansAndPricingWrapper } from "./styled";

export const PlansAndPricing = () => {
    return (
        <PlansAndPricingWrapper
            id="plans"
        >
            {/* Awele, your html code should begin below this line */}
            <div
                className="introduction"
            >
                <H2>Plans and Pricing</H2>
                <P>Choose the plan that fits your business needs. Only pay when you run payroll</P>
            </div>
            <PlansAndPricingRow className="pricingRow"
                tocolumn={true}
            >
                <div className='bronze'>
                    <H3>Basic</H3>
                    <P>
                        The Basic Plan is designed for startups and small businesses with up to 20 employees,
                        offering essential payroll features at an affordable cost. It enables accurate salary
                        calculations, manages statutory deductions (PAYE, Pension, NHF), and generates monthly
                        payroll reports and payslips. With employee record management and email support included,
                        the Basic Plan ensures compliance and reliability for growing teams.
                    </P>
                </div>
                <div className='silver'>
                    <H3>Medium</H3>
                    <P>The Medium Plan is built for organizations with 21 to 100 employees, offering
                        advanced payroll features to support growing operational needs. It includes customizable
                        earnings and deductions, automated payslip generation, overtime and bonus processing, and
                        statutory compliance reporting. With both email and live chat support during business hours,
                        the Medium Plan ensures efficient, accurate payroll management for scaling businesses.
                    </P>
                </div>
                <div className='gold'>
                    <H3>Premium</H3>
                    <P>
                        The Premium Plan is tailored for large enterprises with over 100 employees, delivering
                        full payroll automation and enterprise-grade support. It features batch processing, bulk
                        data uploads, audit trails, real-time analytics, and seamless integration with financial
                        institutions. With tools for multi-level approvals and compliance reporting, plus dedicated
                        onboarding and priority support via phone, email, and chat, the Premium Plan ensures scalable,
                        efficient, and reliable payroll operations.
                    </P>
                </div>
            </PlansAndPricingRow>
        </PlansAndPricingWrapper>
    )
}