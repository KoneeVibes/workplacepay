import { useState } from "react"
import { Table } from "../../../../components/table"
import { Layout } from "../../../../containers/app/layout"
import { PricingWrapper } from "./styled"
import { useNavigate } from "react-router-dom"

export const Pricing = () => {
    const columnHeaders = ["Plan Name", "Price", "Duration", " ", " "];
    const [pricing, setPricing] = useState([])
    const navigate = useNavigate();

    const navigateToAddPlan = (e) => {
        e.preventDefault();
        return navigate("/addnewplan");
    };

    return (

        <Layout
            id={"pricing"}
            title={"Plans & Pricing"}
            location={"pricing"}
            callToAction={"Add New Plan"}
            handleCallToActionClick={navigateToAddPlan}
        >
            <PricingWrapper>
                <div className="pricing-table">
                    <Table
                        columnTitles={columnHeaders}
                        rowItems={pricing}
                        location={"Pricing Table"}
                    />
                </div>
            </PricingWrapper>
        </Layout>
    )
}