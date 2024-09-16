import { Spinner, ToggleSwitch } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Models } from "appwrite";
import { deleteUser, deleteUserPayload } from "@/utils/api/deleteUser";
import {
  referralStatusPayload,
  updateReferralStatus,
} from "@/utils/api/updateReferralStatus";
import { notify, notifyError } from "@/components/Toast";
import { getAllReferralUsers } from "@/utils/api/getUserInfo";
import { useCallback } from "react";

const ReferralUserTable = () => {
  const {
    data: allReferralUsers = [],
    isFetching,
    isError,
    refetch,
  } = useQuery<Models.Document[]>(
    ["allReferralUsers"],
    () => getAllReferralUsers(),
    { enabled: false }
  );

  const deleteUserMutation = useMutation({
    mutationFn: async ({ documentId }: deleteUserPayload) => {
      await deleteUser({ documentId });
    },
    onSuccess: () => {
      refetch();
      notify("User deleted successfully");
    },
  });

  const referralStatusMutation = useMutation({
    mutationFn: async ({ documentId, status }: referralStatusPayload) => {
      await updateReferralStatus({ documentId, status });
    },
    onSuccess: () => {
      refetch();
      notify("Referral status updated successfully");
    },
    onError: () => {
      notifyError("Something went wrong");
    },
  });

  const handleDeleteUser = useCallback(
    async ({ documentId }: deleteUserPayload) => {
      deleteUserMutation.mutate({ documentId });
    },
    [deleteUserMutation]
  );

  const handleCheckboxChange = useCallback(
    async ({ documentId, status }: referralStatusPayload) => {
      referralStatusMutation.mutate({ documentId, status });
    },
    [referralStatusMutation]
  );

  const handleRefresh = () => {
    refetch();
  };

  const tabelHeading = [
    {
      title: "ID",
    },
    {
      title: "FirstName",
    },
    {
      title: "LastName",
    },
    {
      title: "Email",
    },
    {
      title: "Referral Status",
    },
    {
      title: "Action",
    },
  ];

  if (isError) {
    notifyError("Failed to fetch users. Please try again later.");
    return (
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="flex h-xs w-full justify-center items-center"
      >
        <p className="text-lg">Failed to load users</p>
      </div>
    );
  }

  if (!allReferralUsers || allReferralUsers?.length === 0) {
    return (
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="flex h-xs w-full justify-center items-center"
      >
        <p className="text-lg">No user available</p>
      </div>
    );
  }

  const visitorCount = allReferralUsers?.length || 0;
  const visitorText = visitorCount === 1 ? "User" : "Users";

  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray  px-0 relative w-full break-words">
        <div className="px-6 py-4 flex justify-between">
          <h5 className="card-title pb-3">
            {visitorCount} {visitorText}
          </h5>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div
              style={{ maxHeight: "calc(100vh - 150px)" }}
              className="p-1.5 w-full h-table inline-block align-middle"
            >
              <div className="divide-y divide-gray-200">
                <div className="overflow-hidden">
                  <table
                    style={{ minWidth: "100%" }}
                    className="divide-y divide-gray-200"
                  >
                    {isFetching ? (
                      <div className="flex  justify-center items-center h-screen w-full">
                        <Spinner aria-label="spinner" size="xl" />
                      </div>
                    ) : (
                      <>
                        <thead className="bg-gray-50">
                          <tr>
                            {tabelHeading?.map((ele) => {
                              return (
                                <th
                                  key={ele.title}
                                  scope="col"
                                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                >
                                  {ele.title}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {allReferralUsers &&
                            allReferralUsers?.map(
                              (ele: Models.Document, index: number) => (
                                <tr key={ele?.$id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {index + 1}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {ele?.firstName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {ele?.lastName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {ele?.email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    <ToggleSwitch
                                      id={`checkbox-${ele.$id}`}
                                      name={`checkbox-${ele.$id}`}
                                      checked={ele.isReferralEnabled}
                                      onChange={() =>
                                        handleCheckboxChange({
                                          documentId: ele.$id,
                                          status: !ele.isReferralEnabled,
                                        })
                                      }
                                    />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                      onClick={() =>
                                        handleDeleteUser({
                                          documentId: ele.$id,
                                        })
                                      }
                                      disabled={deleteUserMutation.isLoading}
                                    >
                                      <Icon
                                        icon={`solar:trash-bin-minimalistic-outline`}
                                        height={18}
                                      />
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferralUserTable;
