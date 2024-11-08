import { BASE_ENDPOINT } from "../../endpoint";

export const submitGetStartedOtp = async (otp, token) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/auth/otp/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otp)
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
