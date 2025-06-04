import { BASE_ENDPOINT } from "../../endpoint";

export const downloadPensionReport = async (TOKEN, companyId, { endYear,
    endMonth,
    startYear,
    startMonth, }) => {
    try {
        const queryParams = new URLSearchParams();
        if (endYear) queryParams.append("endYear", endYear);
        if (endMonth) queryParams.append("endMonth", endMonth);
        if (startYear) queryParams.append("startYear", startYear);
        if (startMonth) queryParams.append("startMonth", startMonth);

        const url =
            `${BASE_ENDPOINT}/api/reports/pension/${companyId}/export` +
            (queryParams.toString() ? `?${queryParams.toString()}` : ``);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorResponse = await response.text(); // Get error message
            console.error('Error:', errorResponse);
            throw new Error(errorResponse);
        }
        // Return response as a Blob for binary data
        return await response.blob();
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};
