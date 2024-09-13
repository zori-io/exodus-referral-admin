import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { documentId, status } = req.body;
    try {
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

      return res.status(200).json(updatedReferralUsers);
    } catch (error) {
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
