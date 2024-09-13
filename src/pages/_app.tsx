import "simplebar-react/dist/simplebar.min.css";

import "@/styles/globals.css";

import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { LoadingProvider } from "@/store/LoadingContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeModeScript />
            <Component {...pageProps} />
          </Hydrate>
          <Toaster />
        </LoadingProvider>
      </QueryClientProvider>
    </Flowbite>
  );
}
