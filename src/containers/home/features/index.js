import { FeaturesWrapper } from "./styled";
import featuresImage from "../../../assets/images/payroll 1.png";
import { Column, Row } from "../../../components/flex/styled";
import { H2 } from "../../../components/typography/styled";
import { features } from "../../../config/home/features";

export const Features = () => {
    return (
        <FeaturesWrapper
            id="features"
            tocolumn={true}
        >
            {/* Jimmy your html code should begin below this line */}
            <H2>Streamline Your Payroll, Simplify Your Business</H2>
            <Row
                tocolumn
            >
                <Column className="feature-text">
                    <ul>
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </Column>
                <div className="feature-img">
                    <img src={featuresImage} alt="diplomatic agreement" />
                </div>
            </Row>
        </FeaturesWrapper>
    );
};