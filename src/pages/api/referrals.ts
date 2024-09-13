import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    res.status(200).json(referralUsers.documents);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch referral users" });
  }
}
