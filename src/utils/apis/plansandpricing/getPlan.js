import { BASE_ENDPOINT } from "../../endpoint";

export const getPlanService = async (TOKEN, planId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/payrollplans/${planId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
