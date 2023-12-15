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
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { set } from "date-fns";

export function Payment() {
  const [totalHarga, setTotalHarga] = useState(0);
  const [uang, setUang] = useState(0);
  const navigate = useNavigate();

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
        setTotalHarga(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        alert("Gagal mendapatkan data reservasi");
      });
  };

  useEffect(() => {
    getReservasi();
  }, []);

  const bayarReservasi = (id_reservasi) => {
    id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .post(
        `/bayar/${id_reservasi}`,
        {
          uang,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        alert("Pembayaran Berhasil");
        navigate("/tandaTerima");
      })
      .catch((err) => {
        console.log(err.response);
        alert("Pembayaran Gagal");
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
        <Card className="h-[350px] w-[600px] items-center">
          <ScrollShadow hideScrollBar>
            <div className=" ">
              <div className="Card h-[650px] w-[550px] items-center">
                <div className="">
                  <div className="text-center mb-10 ">
                    <div className="flex justify-between"></div>
                    <hr className=""></hr>
                    <h1 className="text-2xl font-bold font-serif py-5">
                      Pembayaran Uang Pemesanan
                    </h1>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      Total Harga: {totalHarga.total_harga}
                    </h2>
                    <h2 className="text-l mt-4 mb-4">
                      *Jika Tamu Group Maka Total Harga Uang Jaminan 50% dari
                      Total Harga
                    </h2>
                    <Input
                      type="number"
                      value={uang}
                      onValueChange={(value) => setUang(value)}
                      placeholder="Masukkan jumlah uang"
                      label="Jumlah Uang"
                    />

                    <Button
                      onClick={bayarReservasi}
                      className="mt-8 center-button ml-44"
                    >
                      Bayar Uang Pemesanan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollShadow>
        </Card>
      </div>
    </div>
  );
}
