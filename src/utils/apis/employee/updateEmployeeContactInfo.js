import { BASE_ENDPOINT } from "../endpoint";

export const updateEmployeeContactInfo = async (TOKEN, updatedContactInfo) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/users/contact-details`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(updatedContactInfo)
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
