"use client";
import React from "react";
import { Badge, Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";
import SimpleBar from "simplebar-react";

const ReferralUserTable = () => {
  const ProductTableData = [
    {
      userId: "66e161ec0025a279dcd8",
      firstName: "firstName",
      lastName: "lastName",
      email: "example@gmail.com",
      isReferralEnabled: false,
    },
    {
      userId: "66e161ec0025a279dcd8",
      firstName: "firstName",
      lastName: "lastName",
      email: "example@gmail.com",
      isReferralEnabled: true,
    },
    {
      userId: "66e161ec0025a279dcd8",
      firstName: "firstName",
      lastName: "lastName",
      email: "example@gmail.com",
      isReferralEnabled: true,
    },
    {
      userId: "66e161ec0025a279dcd8",
      firstName: "firstName",
      lastName: "lastName",
      email: "example@gmail.com",
      isReferralEnabled: true,
    },
  ];

  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
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

  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
        <div className="px-6">
          <h5 className="card-title">Users</h5>
          <p className="card-subtitle">
            Total {ProductTableData.length} Visitors
          </p>
        </div>
        <SimpleBar className="">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                {tabelHeading.map((ele) => {
                  return <Table.HeadCell>{ele.title}</Table.HeadCell>;
                })}
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {ProductTableData.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      {item.userId}
                    </Table.Cell>
                    <Table.Cell>{item.firstName}</Table.Cell>
                    <Table.Cell>{item.lastName}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={
                          item.isReferralEnabled ? "lightsuccess" : "lighterror"
                        }
                        className={
                          item.isReferralEnabled ? "textsuccess" : "texterror"
                        }
                      >
                        {item.isReferralEnabled ? "Enabled" : "Disabled"}
                      </Badge>
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
                          <Dropdown.Item key={index} className="flex gap-3">
                            {" "}
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
