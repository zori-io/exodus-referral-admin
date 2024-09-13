import Dashboard from "@/container/Dashbaord";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, DehydratedState } from "@tanstack/react-query";
import { getAllReferralUsers } from "@/utils/api/getUserInfo";

type DashboardPageProps = {
  dehydratedState: DehydratedState;
};

export default function DashboardPage({}: DashboardPageProps) {
  return <Dashboard />;
}

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async (context) => {
  const queryClient = new QueryClient();

  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  await queryClient.prefetchQuery(["allReferralUsers"], () =>
    getAllReferralUsers(baseUrl)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
