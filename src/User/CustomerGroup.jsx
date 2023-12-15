import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EyeIcon } from "../EyeIcon";
import { NavSM } from "../NavigationBar/NavbarSM";
import instance from "../axios";

const columns = [
  { name: "Nama", uid: "nama" },
  { name: "No Identitas", uid: "no_identitas" },
  { name: "Nomor Telepon", uid: "nomor_telepon" },
  { name: "Alamat", uid: "alamat" },
  { name: "Institusi", uid: "institusi" },
  { name: "Jenis Customer", uid: "jenis_customer" },
  { name: "Actions", uid: "actions" },
];

export function CustomerGroup() {
  const [customerGroups, setCustomerGroups] = useState([]);
  const [idDataUser, setIdDataUser] = useState();
  // ... other states

  // ... existing functions

  const renderCell = (customerGroup, columnKey) => {
    const cellValue = customerGroup[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Customer">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  useEffect(() => {
    // Replace the following API endpoint with your actual endpoint
    instance
      .get("sm/group", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCustomerGroups(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch customer groups:", error);
      });
  }, []);

  return (
    <div>
      <NavSM />
      <div className="p-16">
        <h1 className="text-4xl font-bold font-serif text-center mb-10">
          Customer Details
        </h1>
        {/* ... existing code */}
        <Table aria-label="Customer Group table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={customerGroups || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_dataUser}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* ... existing code */}
      </div>
    </div>
  );
}
