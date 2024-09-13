import { databases } from "@/models/config";
import { COLLECTION, dbName } from "@/models/names";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { documentId } = req.body;
    try {
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

      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
