import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const referralUsers = await databases.listDocuments(
      dbName,
      COLLECTION.REFERRAL_COLLECTION
    );
    if (!referralUsers) {
      return NextResponse.json(
        { error: "Failed to fetch referral users" },
        { status: 500 }
      );
    }
    return NextResponse.json(referralUsers.documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
