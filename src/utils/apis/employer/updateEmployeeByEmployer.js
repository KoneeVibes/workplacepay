import { BASE_ENDPOINT } from "../endpoint";

export const updateEmployeeByEmployer = async (TOKEN, companyId, employeeId, updatedDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/api/companies/${companyId}/employee/${employeeId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(updatedDetails)
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
