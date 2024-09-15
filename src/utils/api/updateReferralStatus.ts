import axios from "axios";

export interface referralStatusPayload {
  documentId?: string;
  status?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  approved?: boolean;
}

export const updateReferralStatus = async ({
  documentId,
  status,
}: referralStatusPayload) => {
  try {
    const response = await axios.post("/api/referrals-update", {
      documentId,
      status,
    });
    return response.data;
  } catch (error) {
    return { error: "Failed to update referral status" };
  }
};
