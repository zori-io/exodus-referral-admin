import { referralStatusPayload } from "./updateReferralStatus";

export const sendApprovalEmail = async ({
  email,
  approved,
  firstName,
  lastName,
}: referralStatusPayload) => {
  try {
    const response = await fetch("/api/send-approval-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, approved, firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending approval email:", error);
    throw error;
  }
};
