import { H2, H3, } from "../../../components/typograpy/styled";
import { PlansAndPricingRow, PlansAndPricingWrapper } from "./styled";

export const PlansAndPricing = () => {
    return (
        <PlansAndPricingWrapper>
            {/* Awele, your html code should begin below this line */}
            <H2>Plans and Pricing</H2>
            <PlansAndPricingRow className="pricingRow"
                tocolumn={true}
            >
                <div className='bronze'>
                    <H3>Bronze</H3>
                </div>
                <div className='silver'>
                    <H3>Silver</H3>
                </div>
                <div className='gold'>
                    <H3>Gold</H3>
                </div>
            </PlansAndPricingRow>
        </PlansAndPricingWrapper>
    )
}