import { HomeWrapper } from "./styled";
import { Navbar } from "../../containers/home/navigation";
import { Hero } from "../../containers/home/hero";
import { WhyWorkPlacePay } from "../../containers/home/whyworkplacepay";
import { PlansAndPricing } from "../../containers/home/plansandpricing";
import { Footer } from "../../containers/home/footer";

export const Home = () => {
    return (
        <HomeWrapper>
            <Navbar />
            <Hero />
            <WhyWorkPlacePay />
            <PlansAndPricing />
            <Footer />
        </HomeWrapper>
    )
}