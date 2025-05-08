import { BASE_ENDPOINT } from "../../endpoint";

export const manageCompanyPlanService = async (TOKEN, companyId, planInfo) => {
    try {
        const response = await fetch(
            `${BASE_ENDPOINT}/api/companies/${companyId}/payroll-plan/update`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(planInfo),
            }
        );
        const res = await response.json();
        if (!response.ok) {
            console.error("Error:", res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};
