import { BASE_ENDPOINT } from "../../endpoint";

export const setNewPassword = async (token, newPassword,confirmNewPassword) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token,newPassword, confirmNewPassword }),
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
