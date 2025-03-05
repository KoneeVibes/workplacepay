import { BASE_ENDPOINT } from "../../endpoint";

export const updateBankDetailsService = async (TOKEN, payload) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/users/bank-details`, {
            method: 'PATCH',
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
