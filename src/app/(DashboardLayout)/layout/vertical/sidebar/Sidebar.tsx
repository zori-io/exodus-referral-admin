"use client";

import React, { useContext } from "react";
import { Sidebar } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import SimpleBar from "simplebar-react";
import FullLogo from "../../shared/logo/FullLogo";
import { Icon } from "@iconify/react";
import authService from "@/appwrite/authConfig";
import { useRouter } from "next/navigation";
import { LoadingContext } from "@/store/LoadingContext";
import { notifyError } from "@/components/Toast";

const SidebarLayout = () => {
  const { setLoading } = useContext(LoadingContext);

  const router = useRouter();

  const Logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      router.push("/auth/login");
      setLoading(false);
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return (
    <>
      <div className="xl:block hidden">
        <div className="flex">
          <Sidebar
            className="fixed menu-sidebar pt-6 bg-white dark:bg-darkgray z-[10]"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className="mb-7 px-4 brand-logo">
              <FullLogo />
            </div>

            <SimpleBar className="h-[calc(100vh_-_120px)]">
              <Sidebar.Items className="px-4">
                <Sidebar.ItemGroup className="sidebar-nav">
                  {SidebarContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="text-link font-semibold text-sm caption">
                        <span className="hide-menu">{item.heading}</span>
                      </h5>
                      <Icon
                        icon="solar:menu-dots-bold"
                        className="text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon"
                        height={18}
                      />
                      {item.children?.map((child, index) => (
                        <React.Fragment key={child.id && index}>
                          {child.children ? (
                            <div className="collpase-items">
                              <NavCollapse item={child} />
                            </div>
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
              <span
                onClick={Logout}
                className="flex cursor-pointer mt-10 p-5 gap-3 align-center items-center truncate"
              >
                <Icon icon="solar:login-2-linear" color="black" height={18} />
                <span className="max-w-36  text-black overflow-hidden hide-menu">
                  Logout
                </span>
              </span>
            </SimpleBar>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
