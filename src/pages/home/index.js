import { HomeWrapper } from "./styled";
import { Navbar } from "../../containers/home/navigation";
import { Hero } from "../../containers/home/hero";
import { WhyWorkPlacePay } from "../../containers/home/whyworkplacepay";
import { PlansAndPricing } from "../../containers/home/plansandpricing";
import { FAQ } from "../../containers/home/faq";
import { Footer } from "../../containers/home/footer";

export const Home = () => {
    const frequentlyAskedQuestions = [
        {
            question: "What is WorkPlacePay?",
            answer: "WorkplacePay automates payroll processing,tax deductions and employee payments while ensuring compliance with local regulations"
        },
        {
            question: "How does WorkPlacePay help my business?",
            answer: "It streamlines payroll operations by reducing manual work and eliminating errors"
        },
        {
            question: "Can WorkPlacePay handle tax compliance for different regions?",
            answer: "Nope. it's a Nigeria-focused application"
        },
    ];

    return (
        <HomeWrapper>
            <Navbar />
            <Hero />
            <WhyWorkPlacePay />
            <PlansAndPricing />
            <FAQ
                faqItems={frequentlyAskedQuestions}
            />
            <Footer />
        </HomeWrapper>
    )
}