"use client";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../authforms/AuthLogin";
import { LoadingProvider } from "@/store/LoadingContext";

const BoxedLogin = () => {
  return (
    <LoadingProvider>
      <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
        <div className="flex h-full justify-center items-center px-4">
          <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words md:w-[450px] w-full border-none ">
            <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
              <div className="mx-auto">
                <Logo />
              </div>
              <p className="text-sm text-center text-dark my-3">
                Welcome Back!
              </p>
              <AuthLogin />
            </div>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default BoxedLogin;
