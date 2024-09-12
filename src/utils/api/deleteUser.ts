import authService from "@/appwrite/authConfig";
import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";

export interface deleteUserPayload {
  documentId: string;
}

export async function deleteUser({ documentId }: deleteUserPayload) {
  try {
    const deletedUser = await databases.deleteDocument(
      dbName,
      COLLECTION.REFERRAL_COLLECTION,
      documentId
    );
    return deletedUser;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
