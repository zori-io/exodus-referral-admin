"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryClientProvider = ({
  children,
}: ReactQueryClientProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
