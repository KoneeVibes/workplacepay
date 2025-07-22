import { BASE_ENDPOINT } from "../../endpoint";

export const getBulkEmployeeUploadTemplate = async (TOKEN) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/users/bulk-upload-template`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Download failed:', errorText);
            throw new Error('Failed to download file');
        }

        return await response.blob();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
