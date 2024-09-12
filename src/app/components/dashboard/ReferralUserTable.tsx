"use client";
import React from "react";
import { Dropdown, Spinner } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getReferralUsers } from "@/utils/api/getUserInfo";
import { COLLECTION } from "@/models/names";
import { Models } from "appwrite";
import {
  updateReferralStatus,
  updateReferralStatusPayload,
} from "@/utils/api/updateReferralStatus";
import { deleteUser, deleteUserPayload } from "@/utils/api/deleteUser";
import { notify, notifyError } from "@/components/Toast";

const ReferralUserTable = () => {
  const {
    data: allReferralUsers,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [COLLECTION.REFERRAL_COLLECTION],
    queryFn: async () => await getReferralUsers(),
  });

  const referralStatusMutation = useMutation({
    mutationFn: async ({ documentId, status }: updateReferralStatusPayload) => {
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

  const deleteUserMutation = useMutation({
    mutationFn: async ({ documentId }: deleteUserPayload) => {
      await deleteUser({ documentId });
    },
    onSuccess: () => {
      refetch();
      notify("User deleted successfully");
    },
    onError: () => {
      notifyError("Something went wrong");
    },
  });

  const hadndleDeleteUser = async ({ documentId }: deleteUserPayload) => {
    deleteUserMutation.mutate({ documentId });
  };

  const handleCheckboxChange = async ({
    documentId,
    status,
  }: updateReferralStatusPayload) => {
    referralStatusMutation.mutate({ documentId, status });
  };

  const tableActionData = [
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
      handler: ({ documentId }: deleteUserPayload) =>
        hadndleDeleteUser({ documentId }),
    },
  ];

  //Table Headings
  const tabelHeading = [
    {
      title: "userId",
    },
    {
      title: "firstName",
    },
    {
      title: "lastName",
    },
    {
      title: "email",
    },
    {
      title: "referral status",
    },
  ];

  if (isFetching) {
    return (
      <div className="flex h-xs w-full justify-center items-center">
        <Spinner aria-label="spinner" size="xl" />
      </div>
    );
  }
  if (allReferralUsers?.length === 0) {
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
          <h5 className="card-title">
            {visitorCount} {visitorText}
          </h5>
        </div>
        <SimpleBar className="">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                {tabelHeading.map((ele, index) => {
                  return (
                    <Table.HeadCell key={index}>{ele.title}</Table.HeadCell>
                  );
                })}
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {allReferralUsers?.map((ele: Models.Document) => (
                  <Table.Row key={ele.$id}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      {ele.$id}
                    </Table.Cell>
                    <Table.Cell>{ele.firstName}</Table.Cell>
                    <Table.Cell>{ele.lastName}</Table.Cell>
                    <Table.Cell>{ele.email}</Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <HiOutlineDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {tableActionData.map((items, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              items.handler({
                                documentId: ele.$id,
                              });
                            }}
                            className="flex gap-3"
                          >
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default ReferralUserTable;
