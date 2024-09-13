import axios from "axios";

export interface deleteUserPayload {
  documentId: string;
}

export const deleteUser = async ({ documentId }: deleteUserPayload) => {
  try {
    const response = await axios.post("/api/referrals-delete", {
      documentId,
    });
    return response.data;
  } catch (error) {
    return { error: "Failed to delete user" };
  }
};
