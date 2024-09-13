import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import { updateReferralStatusPayload } from "@/utils/api/updateReferralStatus";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { documentId, status }: updateReferralStatusPayload =
      await req.json();

    const updatedReferralUsers = await databases.updateDocument(
      dbName,
      COLLECTION.REFERRAL_COLLECTION,
      documentId,
      {
        isReferralEnabled: status,
      }
    );
    if (!updatedReferralUsers) {
      return NextResponse.json(
        { error: "Failed to update referral status" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedReferralUsers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
