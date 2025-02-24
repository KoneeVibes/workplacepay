import { BASE_ENDPOINT } from "../../endpoint";

export const retrievePension = async (TOKEN, companyId, year, month) => {
  try {
    const queryParams = new URLSearchParams();
    if (year) queryParams.append("year", year);
    if (month) queryParams.append("month", month);

    const url =
      `${BASE_ENDPOINT}/api/reports/pension/${companyId}` +
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
