import { FeaturesWrapper } from "./styled";
import featuresImage from "../../../assets/images/payroll 1.png";
import { Column, Row } from "../../../components/flex/styled";
import { H2, H3 } from "../../../components/typography/styled";

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
                    <H3>Features</H3>
                    <ul>
                        <li>Automates salary calculations, tax deductions, and compliance tracking</li>
                        <li>Ensures accuracy and efficiency in payroll management</li>
                        <li>Supports multiple currencies and local tax regulations</li>
                        <li>Simplifies payroll for businesses operating in different regions</li>
                        <li>Eliminates manual transactions and saves time</li>
                        <li>Reduces HR workload through employee self-service</li>
                        <li>Allows direct salary payments to employees’ bank accounts</li>
                    </ul>
                </Column>
                <div className="feature-img">
                    <img src={featuresImage} alt="diplomatic agreement" />
                </div>
            </Row>
        </FeaturesWrapper>
    );
};