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
  { name: "Bulan", uid: "bulan" },
  { name: "Jumlah", uid: "jumlahCustomer" },
];
export function CustomerBaru() {
  const [data, setData] = useState([]);
  const [totalJumlah, setTotalJumlah] = useState(0);
  useEffect(() => {
    instance
      .get("/laporan/customer-baru", {
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
        const sumJumlah = data.reduce(
          (total, item) => total + item.jumlahCustomer,
          0
        );
        setTotalJumlah(sumJumlah);

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

  const handlePrint = () => {
    window.print();
  };

  const renderCell = (data, columnKey) => {
    const cellValue = data[columnKey];

    switch (data) {
      case "no":
        return cellValue;
      case "bulan":
        return cellValue;
      case "jumlahCustomer":
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
          LAPORAN CUSTOMER BARU
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
        <p className="font-semibold text-right ml-20">
          Total : {totalJumlah}{" "}
        </p>
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
