import { BASE_ENDPOINT } from "../../endpoint";

export const updateEmployeeService = async (TOKEN, companyId, employeeId, employeeData) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/api/companies/${companyId}/employees/${employeeId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      }
    );
    const res = await response.json();
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
