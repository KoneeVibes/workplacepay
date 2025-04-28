import Cookies from "universal-cookie";
import { Layout } from "../../../../containers/app/layout"
import { PricingWrapper } from "./styled"
import { Table } from "../../../../components/table";
import { useContext, useEffect, useState } from "react";
import { getAllPlans } from "../../../../utils/apis/plansandpricing/getAllPlans";
import { H3 } from "../../../../components/typography/styled";
import { Context } from "../../../../context";
import { PlansAndPricingModal } from "../../../../containers/app/modals/plansandpricingmodal";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";

export const Pricing = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const { isPlansAndPricingModalOpen, setIsPlansAndPricingModalOpen } = useContext(Context);

    const [payrollPlans, setPayrollPlans] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        getAllPlans(TOKEN)
            .then((data) => {
                setPayrollPlans(data ?? []);
            })
            .catch((err) => {
                console.error("Failed to fetch payroll plans:", err);
            });
    }, [TOKEN, isPlansAndPricingModalOpen, isSuccessModalOpen]);

    useEffect(() => {
        if (isSuccessModalOpen) {
            setSelectedPlanId(null);
            setIsPlansAndPricingModalOpen(false);
        };
    }, [isSuccessModalOpen, setIsPlansAndPricingModalOpen]);

    const handleOpenPlanSetupModal = (e, planId) => {
        e.stopPropagation();
        setFlag("create");
        setSelectedPlanId(null);
        return !isPlansAndPricingModalOpen && setIsPlansAndPricingModalOpen(true)
    };

    const handleOpenPlanUpdateModal = (e, planId) => {
        e.stopPropagation();
        if (!planId) return;
        setFlag("update");
        setSelectedPlanId(planId);
        return !isPlansAndPricingModalOpen && setIsPlansAndPricingModalOpen(true)
    };

    const handleCloseSuccessModal = () => {
        setFlag(null);
        return setIsSuccessModalOpen(false);
    };

    const handlePersistModal = () => {
        return setIsSuccessModalOpen(true);
    };

    return (
        <Layout
            id={"pricing"}
            title={"Plans & Pricing"}
            location={"pricing"}
            callToAction={"Add new plan"}
            handleCallToActionClick={handleOpenPlanSetupModal}
        >
            <PricingWrapper>
                <SuccessModal
                    open={isSuccessModalOpen}
                    handleClickOutside={handlePersistModal}
                    className={"update-plan-success-modal"}
                    title={"Success"}
                    message={`Plan has been successfully ${flag === "update" ? "updated" : "created"}`}
                    callToAction={"Close"}
                    handleCallToActionClick={handleCloseSuccessModal}
                />
                <div className="heading">
                    <H3>All Plans</H3>
                </div>
                <div className="plans-and-pricing-table">
                    <Table
                        columnTitles={[
                            "Plan Name",
                            "Lower Limit",
                            "Upper Limit",
                            "Payroll Fee Per Employee",
                            "Manage Details"
                        ]}
                        rowItems={payrollPlans}
                        location={"Plans & Pricing"}
                        handleRowItemClick={handleOpenPlanUpdateModal}
                    />
                </div>
                <PlansAndPricingModal
                    flag={flag}
                    width={"60%"}
                    height={"400px"}
                    planId={selectedPlanId}
                    setSelectedPlanId={setSelectedPlanId}
                    setIsSuccessModalOpen={setIsSuccessModalOpen}
                />
            </PricingWrapper>
        </Layout>
    )
}