import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";

export interface updateReferralStatusPayload {
  documentId: string;
  status: boolean;
}

export async function updateReferralStatus({
  documentId,
  status,
}: updateReferralStatusPayload) {
  try {
    const updatedReferralUsers = await databases.updateDocument(
      dbName,
      COLLECTION.REFERRAL_COLLECTION,
      documentId,
      {
        isReferralEnabled: status,
      }
    );
    return updatedReferralUsers.documents;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
