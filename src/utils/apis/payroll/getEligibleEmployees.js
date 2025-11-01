import { BASE_ENDPOINT } from "../../endpoint";

export const getEligibleEmployees = async (
  TOKEN,
  companyId,
  month,
  year,
  { employeeName, departmentId, jobTitle }
) => {
  try {
    const queryParams = new URLSearchParams();
    if (employeeName) queryParams.append("employeeName", employeeName);
    if (departmentId) queryParams.append("departmentId", departmentId);
    if (jobTitle) queryParams.append("jobTitle", jobTitle);

    const url =
      `${BASE_ENDPOINT}/api/payrolls/${companyId}/${month}/${year}/load-employees` +
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
    }

    return res.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
