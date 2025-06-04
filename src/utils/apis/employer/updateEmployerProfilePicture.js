import { BASE_ENDPOINT } from "../../endpoint";

export const updateEmployerProfilePictureService = async (TOKEN, COMPANY_ID, payload) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/${COMPANY_ID}/employer/profile-picture`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: payload
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
