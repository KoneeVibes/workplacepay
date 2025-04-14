import { useEffect, useState } from "react"
import { Table } from "../../../../components/table"
import { H3 } from "../../../../components/typography/styled"
import { Layout } from "../../../../containers/app/layout"
import { ReferralWrapper } from "./styled"
import { retrieveAllReferrals } from "../../../../utils/apis/referral/retrieveAllReferrals"
import Cookies from "universal-cookie"

export const Referral = () => {
    const cookies = new Cookies();
    const TOKEN = cookies.get("TOKEN");

    const columnHeaders = ["Referrer", "Employer", "Company Name", "Company Email", "Date", "Status"];

    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await retrieveAllReferrals(TOKEN);
                return setReferrals(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReferrals();
    }, [TOKEN]);

    return (
        <Layout
            id={"referral"}
            title={"Referrals"}
        >
            <ReferralWrapper>
                <div className="heading">
                    <H3>All Referrals</H3>
                </div>
                <div className="referrals-table">
                    <Table
                        columnTitles={columnHeaders}
                        rowItems={referrals}
                        location={"Referrals Table"}
                    />
                </div>
            </ReferralWrapper>
        </Layout>
    )
}