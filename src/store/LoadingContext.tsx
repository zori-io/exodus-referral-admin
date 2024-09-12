import { Spinner } from "flowbite-react";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultLoadingContextValue: LoadingContextType = {
  loading: false,
  setLoading: () => {},
};

const LoadingContext = createContext<LoadingContextType>(
  defaultLoadingContextValue
);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <Spinner aria-label="spinner" size="xl" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
