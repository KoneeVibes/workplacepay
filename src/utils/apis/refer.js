import { BASE_ENDPOINT } from "../endpoint";

export const referEmployer = async (referer) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/refer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(referer)
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
