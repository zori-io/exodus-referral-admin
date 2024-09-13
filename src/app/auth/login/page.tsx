import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AuthLogin from "@/app/auth/authforms";

export default function Page() {
  const cookieStore = cookies();
  const adminToken = cookieStore.get("adminToken")?.value;

  if (adminToken) {
    redirect("/");
  }

  return <AuthLogin />;
}
