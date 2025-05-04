import { BASE_ENDPOINT } from "../../endpoint";

export const getDashboard = async (TOKEN, companyId) => {
    try {
        const response = await fetch(
            `${BASE_ENDPOINT}/api/users/dashboard/${companyId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await response.json();
        if (!response.ok) {
            console.error("Error:", res);
            throw new Error(res.message);
        }
        return res.data;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};
