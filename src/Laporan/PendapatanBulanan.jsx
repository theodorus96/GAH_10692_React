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
// import { Grafik1 } from "./Grafik1";
import { NavbarOwner } from "../NavigationBar/NavbarOwner";
import { GrafikBulanan } from "./GrafikBulanan";

const columns = [
  { name: "No", uid: "no" },
  { name: "Bulan", uid: "bulan" },
  { name: "Grup", uid: "grup" },
  { name: "Personal", uid: "personal" },
  { name: "Total", uid: "total" },
];
export function PendapatanBulanan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance
      .get("/laporan/pendapatan-bulan", {
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
      case "bulan":
        return cellValue;
      case "personal":
        return cellValue;
      case "grup":
        return cellValue;
      case "total":
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
          LAPORAN PENDAPATAN BULANAN
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
      </div>
      <div className="p-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          GRAFIK PENDAPATAN BULANAN
        </h1>
        <GrafikBulanan />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
}
