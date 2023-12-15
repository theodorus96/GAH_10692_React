import { useEffect, useState } from "react";
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  Card,
  ScrollShadow,
  SelectItem,
} from "@nextui-org/react";
import instance from "../axios";
import { NavbarFO } from "../NavigationBar/NavbarFO";

export function TambahLayanan() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jumlah, setJumlah] = useState(1);
  const [layanan, setlayanan] = useState([]);
  const [idLayanan, setIdLayanan] = useState("");

  // Fetch layanan data from the API on component mount
  useEffect(() => {
    instance
      .get("/layanan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setlayanan(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data layanan:", error);
      });
  }, []);

  const getPemesanan = () => {
    instance
      .get("/fo/pemesanan", {
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

  const addLayanan = () => {
    // const skConfirmation = window.confirm(
    //   "Apakah Anda yakin ingin menambah data Season?"
    // );
    // if (!skConfirmation) {
    //   return; // Batal jika pengguna tidak menyetujui
    // }
    // instance
    //   .post(
    //     "/fo/addLayanan",
    //     {
    //       id_reservasi: idReservasiValue,
    //       id_layanan: idLayananValue,
    //       jumlah: jumlahValue,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     getAllSeasonKamars();
    //     onOpenChange(false);
    //     alert("Data Berhasil Ditambah!!");
    //   })
    //   .catch((error) => {
    //     console.error("Gagal menambah data Season Kamar:", error);
    //     alert("Data Gagal Ditambah!!");
    //   });
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

  const filteredRiwayat = riwayatData
    .filter((riwayat) => riwayat.status === "Checkin")
    .filter(
      (riwayat) =>
        riwayat.id_booking.toLowerCase().includes(searchInput.toLowerCase()) ||
        riwayat.data_user.nama.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <div>
      <NavbarFO />
      <div className="flex flex-col justify-center items-center h-screen ">
        <Card className="h-[600px] w-[1100px] items-center">
          <ScrollShadow hideScrollBar>
            <div>
              <h1 className="text-2xl font-bold font-serif py-5 ml-5">
                Tambah Layanan
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
                      <Button
                        onClick={() =>
                          handleTambahFasilitas(riwayat.id_reservasi)
                        }
                      >
                        Tambah Fasilitas
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>
        </Card>
      </div>
      {isOpen && (
        <Modal onClose={onClose} isOpen={isOpen} animate>
          <ModalContent>
            <ModalHeader>Add Layanan</ModalHeader>
            <ModalBody>
              <Select
                items={selectedLayanan || []}
                type="text"
                label="Enter Jenis Kamar"
                selectedKeys={idJenisKamar}
                onSelectionChange={setSelectedLayanan}
              >
                {(layanan) => (
                  <SelectItem key={layanan.id_layanan}>
                    {layanan.nama}
                  </SelectItem>
                )}
              </Select>
              <Input
                type="number"
                label="Jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button auto onClick={handleAddLayanan}>
                Add Layanan
              </Button>
              <Button auto ghost onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
