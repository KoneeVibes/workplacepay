import { HomeWrapper } from "./styled";
import { Navbar } from "../../containers/home/navigation";
import { Hero } from "../../containers/home/hero";
import { WhyWorkPlacePay } from "../../containers/home/whyworkplacepay";
import { PlansAndPricing } from "../../containers/home/plansandpricing";
import { FAQ } from "../../containers/home/faq";
import { Footer } from "../../containers/home/footer";
import { Features } from "../../containers/home/features";

export const Home = () => {
    const frequentlyAskedQuestions = [
        {
            question: "What is workplacePAY?",
            answer: "workplacePAY automates payroll processing,tax deductions and employee payments while ensuring compliance with local regulations"
        },
        {
            question: "How does workPlacePAY help my business?",
            answer: "It streamlines payroll operations by reducing manual work and eliminating errors"
        },
        {
            question: "Can workPlacePAY handle tax compliance for different sectors?",
            answer: "Absolutely. workPlacePAY is sector-agnostic and built to scale, ensuring your business stays compliant with tax regulations across industries."
        },
    ];

    return (
        <HomeWrapper>
            <Navbar />
            <Hero />
            <WhyWorkPlacePay />
            <Features/>
            <PlansAndPricing />
            <FAQ
                faqItems={frequentlyAskedQuestions}
            />
            <Footer />
        </HomeWrapper>
    )
}