import { BASE_ENDPOINT } from "../../endpoint";

export const getRefreshToken = async ( refreshToken) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken})
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