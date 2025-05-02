import { BASE_ENDPOINT } from "../../endpoint";

export const retrieveAllBilling = async (
    TOKEN,
    { value, companyName, pageNum }
) => {
    try {
        const queryParams = new URLSearchParams();
        if (value) queryParams.append("filter", value);
        if (companyName) queryParams.append("companyName", companyName);
        if (pageNum) queryParams.append("pageNum", pageNum);
        const url =
            `${BASE_ENDPOINT}/api/billings` +
            (queryParams.toString() ? `?${queryParams.toString()}` : ``);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        if (!response.ok) {
            console.error("Error:", res);
            throw new Error(res.message);
        };
        return res.data;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};
