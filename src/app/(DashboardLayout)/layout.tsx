"use client";

import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { LoadingProvider } from "@/store/LoadingContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          <Sidebar />
          <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
            <Header />
            <div className={`container mx-auto  py-30`}>{children}</div>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
}
