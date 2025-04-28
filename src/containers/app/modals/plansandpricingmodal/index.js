import { useContext, useEffect, useState } from "react";
import { BaseModal } from "../../../../components/modal";
import { Context } from "../../../../context";
import { PlansAndPricingModalWrapper } from "./styled";
import { getPlanService } from "../../../../utils/apis/plansandpricing/getPlan";
import Cookies from "universal-cookie";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { BaseInput } from "../../../../components/form/input/styled";
import { Row } from "../../../../components/flex/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { updatePlanService } from "../../../../utils/apis/plansandpricing/updatePlan";

export const PlansAndPricingModal = ({ height, width, planId, setIsSuccessModalOpen, setSelectedPlanId, flag }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const { isPlansAndPricingModalOpen, setIsPlansAndPricingModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDetails, setFormDetails] = useState({
        upperLimit: "",
        lowerLimit: "",
        creditCostPerEmployee: "",
        title: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setMatches(window.screen.availWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!planId) return setFormDetails({
            upperLimit: "",
            lowerLimit: "",
            creditCostPerEmployee: "",
            title: "",
        });
        const retrievePlan = async () => {
            try {
                const plan = await getPlanService(TOKEN, planId);
                setFormDetails(plan?.data);
            } catch (error) {
                console.error("Failed to payroll plan details:", error);
            }
        };
        retrievePlan();
    }, [TOKEN, planId]);

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setError(null);
        setIsPlansAndPricingModalOpen(false);
        return setSelectedPlanId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdatePlan = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!planId) return;
        setError(null);
        setIsLoading(true);
        try {
            const response = await updatePlanService(TOKEN, planId, formDetails);
            if (response.status === "Success") {
                setIsLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setIsLoading(false);
                setError("Plan update failed. Please check your credentials and try again.");
                console.error("Plan update failed. Please check your credentials and try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(`Plan update failed. ${error.message}`);
            console.error("Plan update failed:", error);
        }
    };

    return (
        <BaseModal
            open={isPlansAndPricingModalOpen}
            onClose={handleCloseModal}
            className={"plans-and-pricing-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <PlansAndPricingModalWrapper
                onSubmit={flag === "update" ? handleUpdatePlan : () => { }}
            >
                <div
                    className="close-modal-button-area"
                >
                    <BaseButton
                        className="close-modal-button"
                        onClick={handleCloseModal}
                    >
                        <Span>X</Span>
                    </BaseButton>
                </div>
                <div
                    className="modal-header"
                >
                    <legend>Plans & Pricing</legend>
                    <P>Update the plan details below.</P>
                </div>
                <Row
                    tocolumn={true}
                >
                    <BaseFieldSet>
                        <Label>Title</Label>
                        <BaseInput
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={formDetails.title}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Credit Cost Per Employee</Label>
                        <BaseInput
                            type="text"
                            name="creditCostPerEmployee"
                            placeholder="Enter Credit Cost Per Employee"
                            value={formDetails.creditCostPerEmployee}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                </Row>
                <Row
                    tocolumn={true}
                >
                    <BaseFieldSet>
                        <Label>Upper Limit</Label>
                        <BaseInput
                            type="text"
                            name="upperLimit"
                            placeholder="Enter Upper Limit"
                            value={formDetails.upperLimit}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                    <BaseFieldSet>
                        <Label>Lower Limit</Label>
                        <BaseInput
                            type="text"
                            name="lowerLimit"
                            placeholder="Enter Lower Limit"
                            value={formDetails.lowerLimit}
                            onChange={handleChange}
                            required
                        />
                    </BaseFieldSet>
                </Row>
                <div className="submit-button-area">
                    {error && <P style={{ color: "red" }}>{error}</P>}
                    <BaseButton
                        type="submit"
                        backgroundcolor={"#4E57BB"}
                        width={matches ? "-webkit-fill-available" : "fit-content"}
                    >
                        {isLoading ? (
                            <DotLoader size={20} color="white" className="dotLoader" />
                        ) : (
                            <Span>Submit</Span>
                        )}
                    </BaseButton>
                </div>
            </PlansAndPricingModalWrapper>
        </BaseModal>
    )
}