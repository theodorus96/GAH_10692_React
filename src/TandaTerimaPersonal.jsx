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
import instance from "./axios";
import { Nav } from "./NavigationBar/Navbar";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export function TandaTerimaPersonal() {
  const [reservationData, setReservationData] = useState(null);
  const cardRef = useRef(null);

  const getReservasi = (id_reservasi) => {
    id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .get(`/resume/${id_reservasi}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        setReservationData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        alert("Gagal mendapatkan data reservasi");
      });
  };

  useEffect(() => {
    getReservasi();
  }, []);

  const handlePrint = () => {
    if (cardRef.current) {
      window.print();
    } else {
      alert("Failed to print. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-login-bg">
      <div className="flex justify-center items-center h-full">
        <Card className="w-[700px]" ref={cardRef}>
          <ScrollShadow hideScrollBar>
          <div className="flex justify-between w-[550px] mt-5">
            <span className="flex justify-between">
              <Link as={NavLink} to="/" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
            </span>
          </div>
            <div className="p-6">
              <hr />
              <h1 className="text-2xl font-bold mb-1 text-center">
                Tanda Terima Pemesanan
              </h1>
              <hr />
              {reservationData && (
                <div className="text-left">
                  <div className="mb-3">
                    <strong>ID Booking:</strong> {reservationData.id_booking}
                  </div>
                  <div className="mb-3">
                    <strong>Tanggal Reservasi:</strong>{" "}
                    {reservationData.tanggal_reservasi}
                  </div>
                  <div className="mb-3">
                    <strong>Nama:</strong> {reservationData.data_user.nama}
                  </div>
                  <div className="mb-3">
                    <strong>Alamat:</strong> {reservationData.data_user.alamat}
                  </div>
                  <hr />
                  <h1 className="text-2xl font-bold mb-1 text-center">
                    Detail Pemesanan
                  </h1>
                  <hr />
                  <div className="mb-3">
                    <strong>Tanggal Check-In:</strong>{" "}
                    {reservationData.tanggal_checkin}
                  </div>
                  <div className="mb-3">
                    <strong>Tanggal Check-Out:</strong>{" "}
                    {reservationData.tanggal_checkout}
                  </div>
                  <div className="mb-3">
                    <strong>Jumlah Dewasa:</strong>{" "}
                    {reservationData.jumlah_dewasa}
                  </div>
                  <div className="mb-3">
                    <strong>Jumlah Anak:</strong> {reservationData.jumlah_anak}
                  </div>
                  <div className="mb-3">
                    <strong>Tanggal Pembayaran:</strong>{" "}
                    {reservationData.tanggal_pembayaran}
                  </div>
                  <hr />
                  <h1 className="text-2xl font-bold font-serif  text-center invisible"></h1>
                  <hr />
                  <hr />
                  <Table className="mt-3">
                    <TableHeader
                      columns={[
                        { name: "Jenis Kamar", uid: "jenisKamar" },
                        { name: "Jumlah", uid: "jumlah" },
                        { name: "Subtotal", uid: "subtotal" },
                      ]}
                    >
                      {(column) => (
                        <TableColumn key={column.uid}>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      items={reservationData.transaksi_kamar || []}
                      emptyContent={"No rows to display."}
                    >
                      {(item) => (
                        <TableRow key={item.id_transaksiKamar}>
                          <TableCell>{item.id_jenisKamar}</TableCell>
                          <TableCell>{item.jumlah}</TableCell>
                          <TableCell>{item.subtotal}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="text-left mt-5">
                    <hr />
                    <div className="mb-3">
                      <strong>Permintaan Khusus:</strong>{" "}
                      {reservationData.permintaan ||
                        "Tidak ada permintaan khusus."}
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button onClick={() => handlePrint()}>Print PDF</Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollShadow>
        </Card>
      </div>
    </div>
  );
}
