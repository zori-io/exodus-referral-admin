import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "simplebar-react/dist/simplebar.min.css";
import "./css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zori Referral Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <ThemeModeScript />
        </head>
        <body className={`${inter.className}`}>
          <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
