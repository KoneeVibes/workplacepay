import { BASE_ENDPOINT } from "../../endpoint";

export const runPayrollService = async (TOKEN, companyId, payload) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/payrolls/${companyId}/run`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
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
