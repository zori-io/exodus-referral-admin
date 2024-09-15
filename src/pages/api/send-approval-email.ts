import EmailTemplate from "@/components/EmailTemplate";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendApprovalEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { approved, email, lastName, firstName } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (approved) {
    try {
      const data = await resend.emails.send({
        from: "himanshugupta@zori.io",
        to: [email],
        subject: "Your account is approved!",
        react: EmailTemplate({ firstName: firstName, lastName: lastName }),
      });

      res
        .status(200)
        .json({ message: "Approval email sent successfully", data });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(200).json({ message: "User is not approved. No email sent." });
  }
};

export default sendApprovalEmail;
