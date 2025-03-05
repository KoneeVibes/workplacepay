import { BASE_ENDPOINT } from "../../endpoint";

export const passwordReset = async (token, authDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/api/auth/password-reset`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authDetails),
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
