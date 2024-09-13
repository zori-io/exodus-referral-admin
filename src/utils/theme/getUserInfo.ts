import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";

export async function getReferralUsers() {
  try {
    const referralUsers = await databases.listDocuments(
      dbName,
      COLLECTION.REFERRAL_COLLECTION
    );
    return referralUsers.documents;
  } catch (error) {
    console.error(error);
    return null;
  }
}
