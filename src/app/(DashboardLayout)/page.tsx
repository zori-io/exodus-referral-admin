import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ReferralUserTable from "@/app/components/dashboard/ReferralUserTable";

export default function Page() {
  const cookieStore = cookies();
  const adminToken = cookieStore.get("adminToken")?.value;

  if (!adminToken) {
    redirect("/auth/login");
  }

  return <ReferralUserTable />;
}
