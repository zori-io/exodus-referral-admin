import axios from "axios";

export const getReferralUsers = async () => {
  try {
    const response = await axios.get("/api/referrals");
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch users" };
  }
};
