import { BASE_ENDPOINT } from "../../endpoint";

export const deleteEmployeeService = async (TOKEN, companyId, employeeId) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/${companyId}/employee/${employeeId}/delete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error.message);
        throw error;
    }
};
