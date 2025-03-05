import { BASE_ENDPOINT } from "../../endpoint";

export const deleteDepartmentService = async (TOKEN, companyId, departmentId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/${companyId}/department/${departmentId}/delete`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
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
