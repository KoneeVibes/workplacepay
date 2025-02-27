import { BASE_ENDPOINT } from "../endpoint";

export const updateEmployerDetails = async (TOKEN, companyId, updatedDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/${companyId}/employer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(updatedDetails)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error.message);
        throw error;
    }
};
