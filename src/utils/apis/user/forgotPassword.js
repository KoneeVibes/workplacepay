import { BASE_ENDPOINT } from "../../endpoint";

export const forgotPassword = async ( Email) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Email)
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