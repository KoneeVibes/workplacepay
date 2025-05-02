import { BASE_ENDPOINT } from "../../endpoint";

export const getAllCompanies = async (
  TOKEN,
  { companyName, planType, usage }
) => {
  try {
    const queryParams = new URLSearchParams();
    if (companyName) queryParams.append("companyName", companyName);
    if (planType) queryParams.append("planType", planType);
    if (usage) queryParams.append("usage", usage);

    const url =
      `${BASE_ENDPOINT}/api/companies` +
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
