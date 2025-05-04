import { H2, H3, P, } from "../../../components/typography/styled";
import { pricing } from "../../../config/home/pricing";
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
            <PlansAndPricingRow
                tocolumn={true}
            >
                {pricing.map((plan, index) => {
                    return (
                        <div
                            key={index}
                            className='card'
                            style={{ backgroundColor: plan.bgColor }}
                        >
                            <H3>{plan.name}</H3>
                            <i>₦0/month</i>
                            <P>{plan.subtitle}</P>
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </PlansAndPricingRow>
        </PlansAndPricingWrapper >
    )
}