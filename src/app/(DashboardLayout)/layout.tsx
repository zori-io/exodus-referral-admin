"use client";
import React from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./layout/vertical/header/Header";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "@/store/LoadingContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full min-h-screen">
          <div className="page-wrapper flex w-full">
            <Sidebar />
            <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
              <Header />
              <div className={`container mx-auto  py-30`}>{children}</div>
            </div>
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
    </LoadingProvider>
  );
}
