import Cookies from "universal-cookie";
import { BaseModal } from "../../../../components/modal"
import { EditPlanModalWrapper } from "./styled"
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label, P, Span } from "../../../../components/typography/styled";
import { BaseButton } from "../../../../components/button/styled";
import { DotLoader } from "react-spinners";
import { getAllPlans } from "../../../../utils/apis/plansandpricing/getAllPlans";
import { manageCompanyPlanService } from "../../../../utils/apis/company/manageCompanyPlan";

export const EditPlanModal = ({ currentPlanId, height, width, setIsSuccessModalOpen, setFlag }) => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");
    const COMPANY_ID = cookies.get("COMPANY_ID");

    const { isEditPlanModalOpen, setIsEditPlanModalOpen } = useContext(Context);

    const [matches, setMatches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [payrollPlans, setPayrollPlans] = useState([]);
    const [formDetails, setFormDetails] = useState({
        title: "",
    });

    useEffect(() => {
        if (!currentPlanId) return setFormDetails({
            title: "",
        });
        setFormDetails({ title: currentPlanId })
    }, [TOKEN, currentPlanId, isEditPlanModalOpen]);

    useEffect(() => {
        getAllPlans(TOKEN)
            .then((data) => {
                setPayrollPlans(data ?? []);
            })
            .catch((err) => {
                console.error("Failed to fetch payroll plans:", err);
            });
    }, [TOKEN]);

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

    const handleCloseModal = () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
        setError(null);
        return setIsEditPlanModalOpen(false);
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
        setError(null);
        setIsLoading(true);
        try {
            const response = await manageCompanyPlanService(TOKEN, COMPANY_ID, formDetails);
            if (response.status === "Success") {
                setIsLoading(false);
                setIsEditPlanModalOpen(false);
                setFlag("manage plan")
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
            open={isEditPlanModalOpen}
            onClose={handleCloseModal}
            className={"edit-plan-modal"}
            height={matches ? "auto" : height || "auto"}
            width={matches ? "auto" : width || "50%"}
        >
            <EditPlanModalWrapper
                onSubmit={handleUpdatePlan}
            >
                <BaseFieldSet>
                    <Label>Plan Type</Label>
                    <BaseSelect
                        name="title"
                        value={formDetails?.title}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="" hidden>Select a Plan</option>
                        {payrollPlans?.map((plan, index) => {
                            return (
                                <option key={index} value={plan?.title}>
                                    {plan?.title}
                                </option>
                            );
                        })}
                    </BaseSelect>
                </BaseFieldSet>
                <div className="submit-button-area">
                    {error && <P style={{ color: "red", marginBlockStart: 0 }}>{error}</P>}
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
            </EditPlanModalWrapper>
        </BaseModal>
    )
}