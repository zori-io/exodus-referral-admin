import axios from "axios";

export const getAllReferralUsers = async (baseUrl?: string) => {
  try {
    const url = baseUrl ? `${baseUrl}/api/referrals` : "/api/referrals";

    const response = await axios.get(url);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching referral users:", error);
    return [];
  }
};
