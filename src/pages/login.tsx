import Logo from "@/components/logo/Logo";
import AuthLogin from "@/container/Login";

import cookie from "cookie";
import { GetServerSideProps } from "next";

export default function LoginPage() {
  return (
    <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words md:w-[450px] border-none ">
          <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
            <div className="mx-auto">
              <Logo />
            </div>
            <p className="text-sm text-center text-dark my-3">Welcome Back!</p>
            <AuthLogin />;
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const adminToken = cookies.adminToken;

  if (adminToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
