import SidebarLayout from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import ReferralUserTable from "./Table";

interface DashbaordProps {}

const Dashbaord = ({}: DashbaordProps): JSX.Element => {
  return (
    <div className="flex w-full h-screen">
      <div className="page-wrapper flex w-full">
        <SidebarLayout />
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          <Header />
          <div className="container mt-10 mx-auto">
            <ReferralUserTable />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashbaord;
