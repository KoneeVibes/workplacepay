import { HomeWrapper } from "./styled";
import { Navbar } from "../../containers/home/navigation";
import { Hero } from "../../containers/home/hero";
import { WhyWorkPlacePay } from "../../containers/home/whyworkplacepay";
import { PlansAndPricing } from "../../containers/home/plansandpricing";
import { FAQ } from "../../containers/home/faq";
import { Footer } from "../../containers/home/footer";
import { Features } from "../../containers/home/features";
import { frequentlyAskedQuestions } from "../../config/home/faqs";

export const Home = () => {
    return (
        <HomeWrapper>
            <Navbar />
            <Hero />
            <WhyWorkPlacePay />
            <Features />
            <PlansAndPricing />
            <FAQ
                faqItems={frequentlyAskedQuestions}
            />
            <Footer />
        </HomeWrapper>
    )
}