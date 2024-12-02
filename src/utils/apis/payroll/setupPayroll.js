import { BASE_ENDPOINT } from "../../endpoint";

export const setupPayrollService = async (TOKEN, payload, companyId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/payrolls/setup/${companyId}`, {
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
