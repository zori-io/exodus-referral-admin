import axios from "axios";

export interface updateReferralStatusPayload {
  documentId: string;
  status: boolean;
}

export const updateReferralStatus = async ({
  documentId,
  status,
}: updateReferralStatusPayload) => {
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
