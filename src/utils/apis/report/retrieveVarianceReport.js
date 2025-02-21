import { BASE_ENDPOINT } from "../../endpoint";

export const retrieveVariance = async (TOKEN, companyId, firstMonth, secondMonth, year) => {
    try {
        const queryParams = new URLSearchParams();
        if (firstMonth) queryParams.append("firstMonth", firstMonth);
        if (secondMonth) queryParams.append("secondMonth", secondMonth);
        if (year) queryParams.append("year", year);

        const url = `${BASE_ENDPOINT}/api/reports/variance/${companyId}` + (queryParams.toString() ? `?${queryParams.toString()}` : ``);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        };
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
