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
            <PlansAndPricingRow className="pricingRow"
                tocolumn={true}
            >
                <div className='basic'>
                    {pricing.filter(plan => plan.name === "Basic").map((plan, index) => (
                        <div key={index} className="plan-card">
                            <H3>{plan.name}</H3>
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                    }

                </div>
                <div className='medium'>
                    {pricing.filter(plan => plan.name === "Medium").map((plan, index) => (
                        <div key={index} className="plan-card">
                            <H3>{plan.name}</H3>
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
                <div className='premium'>
                    {pricing.filter(plan => plan.name === "Premium").map((plan, index) => (
                        <div key={index} className="plan-card">
                            <H3>{plan.name}</H3>
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </PlansAndPricingRow>
        </PlansAndPricingWrapper>
    )
}