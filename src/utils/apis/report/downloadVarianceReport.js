import { BASE_ENDPOINT } from "../../endpoint";

export const downloadVarianceReport = async (TOKEN, companyId, firstMonth, secondMonth, year) => {
    try {
        const queryParams = new URLSearchParams();
        if (firstMonth) queryParams.append("firstMonth", firstMonth);
        if (secondMonth) queryParams.append("secondMonth", secondMonth);
        if (year) queryParams.append("year", year);

        const url = `${BASE_ENDPOINT}/api/reports/variance/${companyId}/export` + (queryParams.toString() ? `?${queryParams.toString()}` : ``);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorResponse = await response.text(); // Get error message
            console.error('Error:', errorResponse);
            throw new Error(errorResponse);
        }
        // Return response as a Blob for binary data
        return await response.blob();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
