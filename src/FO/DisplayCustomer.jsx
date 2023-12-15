import { useEffect, useState } from "react";
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
  SelectItem,
  Select,
  Card,
  ScrollShadow,
  Link,
} from "@nextui-org/react";
import instance from "../axios";
import { NavbarFO } from "../NavigationBar/NavbarFO";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function DisplayCustomer() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getPemesanan = () => {
    instance
      .get(`/fo/pemesanan`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        setRiwayatData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        alert("Gagal mendapatkan data riwayat");
      });
  };

  useEffect(() => {
    getPemesanan();
  }, []);

  const pindahHalaman = (id_reservasi) => {
    localStorage.setItem("id_reservasi", id_reservasi);
    navigate("/invoice");
  };

  const handleCheckinCheckout = (id, status) => {
    // Tambahkan validasi konfirmasi
    const userConfirmation = window.confirm(
      `Apakah Anda yakin ingin ${
        status === "Sudah DP" ? "Check In" : "Check Out"
      }?`
    );

    if (userConfirmation) {
      if (status === "Sudah DP") {
        // Lakukan proses Check In
        instance
          .put(
            `/fo/checkin/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            getPemesanan(); // Refresh data setelah Check In berhasil
          })
          .catch((err) => {
            console.error(err.response);
            alert("Gagal melakukan Check In");
          });
      } else if (status === "Checkin") {
        // Lakukan proses Check Out
        instance
          .put(
            `/fo/checkout/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            getPemesanan(); // Refresh data setelah Check Out berhasil
          })
          .catch((err) => {
            console.error(err.response);
            alert("Gagal melakukan Check Out");
          });
      }
    } else {
      // Tampilkan pesan bahwa tindakan dibatalkan
      alert("Tindakan dibatalkan.");
    }
  };

  const columns = [
    "ID Booking",
    "Nama",
    "Tanggal Checkin",
    "Tanggal Checkout",
    "Jumlah Dewasa",
    "Jumlah Anak",
    "Total Harga",
    "Status",
    "Action",
  ];

  const filteredRiwayat = riwayatData.filter(
    (riwayat) =>
      riwayat.id_booking.toLowerCase().includes(searchInput.toLowerCase()) ||
      riwayat.data_user.nama.toLowerCase().includes(searchInput.toLowerCase()) // Add this line for name search
  );

  return (
    <div>
      <NavbarFO />
      <div className="flex flex-col justify-center items-center h-screen ">
        <Card className="h-[600px] w-[1100px] items-center">
          <ScrollShadow hideScrollBar>
            <div>
              <h1 className="text-2xl font-bold font-serif py-5 ml-5">
                Display Pemesanan
              </h1>
            </div>
            <div className="flex justify-end p-4">
              <Input
                placeholder="Search ID Booking"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                {columns.map((column, index) => (
                  <TableColumn key={index}>{column}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {filteredRiwayat.map((riwayat) => (
                  <TableRow key={riwayat.id_reservasi}>
                    <TableCell>{riwayat.id_booking}</TableCell>
                    <TableCell>{riwayat.data_user.nama}</TableCell>
                    <TableCell>{riwayat.tanggal_checkin}</TableCell>
                    <TableCell>{riwayat.tanggal_checkout}</TableCell>
                    <TableCell>{riwayat.jumlah_dewasa}</TableCell>
                    <TableCell>{riwayat.jumlah_anak}</TableCell>
                    <TableCell>{riwayat.total_harga}</TableCell>
                    <TableCell>{riwayat.status}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {riwayat.status === "Sudah DP" && (
                          <Button
                            onClick={() =>
                              handleCheckinCheckout(
                                riwayat.id_reservasi,
                                riwayat.status
                              )
                            }
                            className="mr-2"
                          >
                            Check In
                          </Button>
                        )}
                        {riwayat.status === "Checkin" && (
                          <Button
                            onClick={() =>
                              handleCheckinCheckout(
                                riwayat.id_reservasi,
                                riwayat.status
                              )
                            }
                          >
                            Check Out
                          </Button>
                        )}
                        <Button
                          onClick={() => pindahHalaman(riwayat.id_reservasi)}
                          className="ml-2"
                        >
                          Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>
        </Card>
      </div>
    </div>
  );
}
