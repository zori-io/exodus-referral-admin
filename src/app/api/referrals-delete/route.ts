import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import { deleteUserPayload } from "@/utils/api/deleteUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { documentId }: deleteUserPayload = await req.json();
    const deletedUser = await databases.deleteDocument(
      dbName,
      COLLECTION.REFERRAL_COLLECTION,
      documentId
    );
    if (!deletedUser) {
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
