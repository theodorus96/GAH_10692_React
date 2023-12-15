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
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
export function Resume() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);

  const getResume = (id_reservasi) => {
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
        setResumeData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        alert("Gagal mendapatkan data reservasi");
      });
  };

  useEffect(() => {
    getResume();
  }, []);

  return (
    <div>
      
      <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
        <Card className="h-[620px] w-[600px] items-center">
          <ScrollShadow hideScrollBar>
            <div className=" ">
              <div className="Card h-[650px] w-[550px] items-center">
                <div className="">
                  <div className="text-center mb-10 ">
                    <div className="flex justify-between"></div>
                    <hr className=""></hr>
                    <h1 className="text-2xl font-bold font-serif py-5">
                      Resume Pemesanan
                    </h1>
                  </div>
                  {resumeData && (
                    <div>
                      <hr></hr>
                      <hr></hr>
                      <hr></hr>
                      <h2 className="text-xl font-bold mb-2">
                        ID Booking: {resumeData.id_booking}
                      </h2>
                      <hr></hr>
                      <hr></hr>
                      <hr></hr>

                      <h2 className="text-xl font-bold my-4">
                        Transaksi Layanan
                      </h2>

                      <Table>
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
                          items={resumeData.transaksi_kamar || []}
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

                      <h2 className="text-xl font-bold my-4">
                        Transaksi Layanan
                      </h2>
                      <Table>
                        <TableHeader
                          columns={[
                            { name: "Nama Layanan", uid: "namaLayanan" },
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
                          items={resumeData.transaksi_layanan || []}
                          emptyContent={"No rows to display."}
                        >
                          {(item) => (
                            <TableRow key={item.id_transaksiLayanan}>
                              <TableCell>{item.id_layanan}</TableCell>
                              <TableCell>{item.jumlah}</TableCell>
                              <TableCell>{item.total}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className="mt-4">
                        <hr></hr>
                        <hr></hr>
                        <hr></hr>
                        No Rekening : {resumeData.nomor_rekening}
                        <hr></hr>
                        <hr></hr>
                        <hr></hr>
                      </div>
                      <div className="text-l font-bold">
                        *Tagihan Fasilitas dibayar pada saat melakukan check-in
                      </div>

                      <div>Bayar pada Bank : Bank Diamond</div>
                      <div>Atas Nama : PT Atma Jaya</div>
                      <div>No Rekening : 770011770022 </div>
                      <hr></hr>
                      <hr></hr>
                      <hr></hr>
                      <div className="text-xl font-bold mt-4">
                        Total Pembayaran: {resumeData.total_harga}
                        <hr></hr>
                        <hr></hr>
                        <hr></hr>
                      </div>
                      <Button
                        className="ml-44 mt-5 mb-8 center-button"
                        as={NavLink}
                        to="/payment"
                      >
                        Bayar Uang Pemesanan
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollShadow>
        </Card>
      </div>
    </div>
  );
}
