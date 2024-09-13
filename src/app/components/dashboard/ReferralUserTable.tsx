"use client";

import { Spinner } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { getReferralUsers } from "@/utils/api/getUserInfo";
import { COLLECTION } from "@/models/names";
import { Models } from "appwrite";
import { updateReferralStatusPayload } from "@/utils/api/updateReferralStatus";
import { deleteUserPayload } from "@/utils/api/deleteUser";

import { useReferralStatusMutation } from "./utils/useReferralStatusMutation";
import { useDeleteUserMutation } from "./utils/useDeleteUserMutation";

const ReferralUserTable = () => {
  const {
    data: allReferralUsers,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [COLLECTION.REFERRAL_COLLECTION],
    queryFn: getReferralUsers,
  });

  const referralStatusMutation = useReferralStatusMutation(refetch);

  const deleteUserMutation = useDeleteUserMutation(refetch);

  const handleDeleteUser = async ({ documentId }: deleteUserPayload) => {
    deleteUserMutation.mutate({ documentId });
  };

  const handleCheckboxChange = async ({
    documentId,
    status,
  }: updateReferralStatusPayload) => {
    referralStatusMutation.mutate({ documentId, status });
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

  if (isFetching) {
    return (
      <div className="flex h-xs w-full justify-center items-center">
        <Spinner aria-label="spinner" size="xl" />
      </div>
    );
  }
  if (!allReferralUsers || allReferralUsers?.length === 0) {
    return (
      <div className="flex h-xs w-full justify-center items-center">
        <p className="text-lg">No user available</p>
      </div>
    );
  }

  const visitorCount = allReferralUsers?.length || 0;
  const visitorText = visitorCount === 1 ? "User" : "Users";

  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
        <div className="px-6">
          <h5 className="card-title pb-3">
            {visitorCount} {visitorText}
          </h5>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 min-w-full h-table inline-block align-middle">
              <div className=" divide-y divide-gray-200">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {tabelHeading.map((ele) => {
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
                      {allReferralUsers
                        ?.slice()
                        .reverse()
                        .map((ele: Models.Document, index: number) => (
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
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  onClick={() =>
                                    handleCheckboxChange({
                                      documentId: ele.$id,
                                      status: !ele.isReferralEnabled,
                                    })
                                  }
                                  defaultChecked={ele.isReferralEnabled}
                                  type="checkbox"
                                  value=""
                                  className="sr-only peer"
                                />
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform"></div>
                              </label>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() =>
                                  handleDeleteUser({ documentId: ele.$id })
                                }
                              >
                                <Icon
                                  icon={`solar:trash-bin-minimalistic-outline`}
                                  height={18}
                                />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
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
