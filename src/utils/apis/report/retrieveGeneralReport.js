import { BASE_ENDPOINT } from "../../endpoint";

export const retrieveGeneral = async (
  TOKEN,
  companyId,
  { endYear,
    endMonth,
    startYear,
    startMonth,
    departmentId }
) => {
  try {
    const queryParams = new URLSearchParams();
    if (endYear) queryParams.append("endYear", endYear);
    if (endMonth) queryParams.append("endMonth", endMonth);
    if (startYear) queryParams.append("startYear", startYear);
    if (startMonth) queryParams.append("startMonth", startMonth);
    if (departmentId) queryParams.append("departmentId", departmentId);

    const url =
      `${BASE_ENDPOINT}/api/reports/general/${companyId}` +
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
    return res;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
