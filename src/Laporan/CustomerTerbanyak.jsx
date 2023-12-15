import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import instance from "../axios";
import { NavbarOwner } from "../NavigationBar/NavbarOwner";

const columns = [
  { name: "No", uid: "no" },
  { name: "Nama Customer", uid: "nama" },
  { name: "Jumlah Reservasi", uid: "jumlah_reservasi" },
  { name: "Total Pembayaran", uid: "total_pembayaran" },
];
export function CustomerTerbanyak() {
  const [data, setData] = useState([]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    instance
      .get("/laporan/customer-terbanyak", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data.data.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        alert(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
        console.error(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
      });
  }, []);

  const renderCell = (data, columnKey) => {
    const cellValue = data[columnKey];

    switch (data) {
      case "no":
        return cellValue;
      case "nama":
        return cellValue;
      case "jumlah_reservasi":
        return cellValue;
      case "total_pembayaran":
        return cellValue;

      default:
        return cellValue;
    }
  };
  return (
    <div>
      <NavbarOwner />
      <div className="p-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          LAPORAN 5 CUSTOMER RESERVASI TERBAIK
        </h1>
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data} emptyContent={"No rows to display."}>
            {(item, index) => (
              <TableRow key={item.no}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            )}

          </TableBody>
        </Table>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
}
