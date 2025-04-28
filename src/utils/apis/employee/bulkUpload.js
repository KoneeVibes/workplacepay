import { BASE_ENDPOINT } from "../../endpoint";

export const bulkEmployeeUploadService = async (TOKEN, formData, companyId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/users/employees/${companyId}/bulk-upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: formData,
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
