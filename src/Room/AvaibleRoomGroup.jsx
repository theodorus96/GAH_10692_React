import React, { useEffect, useState } from "react";
import { EyeIcon } from "../EyeIcon";
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
} from "@nextui-org/react";
import instance from "../axios";
import { NavSM } from "../NavigationBar/NavbarSM";
import { useNavigate } from "react-router-dom";

const columns = [
  { name: "Jenis Kamar", uid: "jenisKamar" },
  { name: "Rincian Kamar", uid: "rincian_kamar" },
  { name: "Jumlah Kamar Tersedia", uid: "totalKamar" },
  { name: "Ukuran Kamar", uid: "ukuran" },
  { name: "Harga", uid: "harga" },
  { name: "Actions", uid: "actions" },
];

export function AvailableRoomGroup() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
    onClose: onClose2,
  } = useDisclosure();
  const [tanggal_checkin, setTanggalCheckIn] = useState("");
  const [tanggal_checkout, setTanggalCheckOut] = useState("");
  const [jumlah_dewasa, setJumlahDewasa] = useState(0);
  const [jumlah_anak, setJumlahAnak] = useState(0);
  const [kamar, setKamar] = useState([]);
  const [nomor_rekening, setNomorRekening] = useState(0);
  const [jenis_kamar, setJenisKamar] = useState([]);
  const [layanan, setLayanan] = useState([]);
  const [idJenisKamar, setIdJenisKamar] = useState("");
  const [deskripsiKamar, setDeskripsiKamar] = useState("");
  const [rincian, setRincian] = useState("");
  const [ukuranKamar, setUkuranKamar] = useState("");
  const [kapasitas, setKapasitas] = useState(0);
  const [harga, setHarga] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [jumlahKamar, setJumlahKamar] = useState(0);
  const [jumlahFasilitas, setJumlahFasilitas] = useState(0);
  const [id_dataUser, setIdDataUser] = useState("");
  const [permintaanKhusus, setPermintaanKhusus] = useState("");
  const [customerGroups, setCustomerGroups] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();
  const [jenisKamarInputs, setJenisKamarInputs] = useState([
    { id_jenisKamar: "", jumlah: "" },
  ]);
  const [layananInputs, setLayananInputs] = useState([
    { id_layanan: "", jumlah: "" },
  ]);

  const availableRoom = () => {
    if (tanggal_checkout < tanggal_checkin) {
      alert(
        "Tanggal check-out tidak boleh lebih awal daripada tanggal check-in"
      );
    }
    instance
      .post(
        "/available",
        {
          tanggal_checkin: tanggal_checkin,
          tanggal_checkout: tanggal_checkout,
          jumlah_dewasa: jumlah_dewasa,
          jumlah_anak: jumlah_anak,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const availableRooms = res.data.data.filter(
          (kamar) => kamar.totalKamar > 0
        );
        setKamar(availableRooms);
        console.log(availableRooms);
        setJenisKamar(availableRooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getCustomer() {
    instance
      .get("/sm/group", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        setCustomerGroups(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data customer group:", error);
      });
  }

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    instance
      .get("/layanan")
      .then((response) => {
        setLayanan(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat layanan:", error);
      });
  }, []);

  const reservasi = () => {
    const userConfirmation = window.confirm(
      "Apakah Anda yakin ingin menambah data kamar?"
    );
    if (!userConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    instance
      .post(
        "sm/reservasi",
        {
          id_dataUser,
          tanggal_checkin,
          tanggal_checkout,
          jumlah_dewasa,
          jumlah_anak,
          nomor_rekening,
          permintaan: permintaanKhusus,
          jenis_kamar: jenisKamarInputs,
          layanan: layananInputs,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data);
        alert("Reservasi berhasil");
        localStorage.setItem("id_reservasi", res.data.data.id_reservasi);
        navigate("/resume");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailKamar = (kamar) => {
    setDeskripsiKamar(kamar.jenis_kamar.deskripsi_kamar);
    setRincian(kamar.jenis_kamar.rincian_kamar);
    setKapasitas(kamar.jenis_kamar.kapasitas);
    setUkuranKamar(kamar.jenis_kamar.ukuran);
    setIdJenisKamar(kamar.jenisKamar);
    setHarga(kamar.harga);
    onOpen2();
  };

  const formatRupiah = (uang) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(uang);
  };

  const handleJenisKamarChange = (selected, index) => {
    const updatedInputs = [...jenisKamarInputs];
    updatedInputs[index].id_jenisKamar = selected.currentKey;
    setJenisKamarInputs(updatedInputs);
  };

  const handleJumlahKamarChange = (value, index) => {
    const updatedInputs = [...jenisKamarInputs];
    updatedInputs[index].jumlah = value;
    setJenisKamarInputs(updatedInputs);
  };

  const handleRemoveJenisKamar = (index) => {
    const updatedInputs = [...jenisKamarInputs];
    updatedInputs.splice(index, 1);
    setJenisKamarInputs(updatedInputs);
  };

  const handleAddJenisKamar = () => {
    setJenisKamarInputs([
      ...jenisKamarInputs,
      { id_jenisKamar: "", jumlah: "" },
    ]);
  };

  const handleLayananChange = (selected, index) => {
    const updatedInputs = [...layananInputs];
    updatedInputs[index].id_layanan = selected.currentKey; // Ganti jenis dengan id_layanan
    setLayananInputs(updatedInputs);
  };

  const handleJumlahLayananChange = (value, index) => {
    const updatedInputs = [...layananInputs];
    updatedInputs[index].jumlah = value;
    setLayananInputs(updatedInputs);
  };

  const handleRemoveLayanan = (index) => {
    const updatedInputs = [...layananInputs];
    updatedInputs.splice(index, 1);
    setLayananInputs(updatedInputs);
  };

  const handleAddLayanan = () => {
    setLayananInputs([...layananInputs, { id_layanan: "", jumlah: "" }]);
  };

  const renderCell = (kamar, columnKey) => {
    const cellValue = kamar[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="show kamar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => detailKamar(kamar)} />
              </span>
            </Tooltip>
          </div>
        );

      case "rincian_kamar":
        return <div>{kamar.jenis_kamar.rincian_kamar}</div>;

      case "ukuran":
        return <div>{kamar.jenis_kamar.ukuran}</div>;

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <NavSM />
      <div className="p-16">
        <h1 className="text-3xl font-bold mb-8">Available Room</h1>
        <div className="flex gap-4 mb-8">
          <span className="flex-1">
            <label className="text-lg font-semibold">Check In</label>
            <Input
              value={tanggal_checkin}
              onValueChange={setTanggalCheckIn}
              className="max-w-2xl"
              labelPlacement="outside"
              type="date"
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Check Out</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="date"
              value={tanggal_checkout}
              onValueChange={setTanggalCheckOut}
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Jumlah Dewasa</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="number"
              value={jumlah_dewasa}
              onValueChange={setJumlahDewasa}
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Jumlah Anak-Anak</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="number"
              value={jumlah_anak}
              onValueChange={setJumlahAnak}
            />
          </span>
          <span className="">
            <Button
              onPress={() => {
                availableRoom();
              }}
              color="primary"
              className="mt-7"
            >
              Find
            </Button>
          </span>
          <span className="flex-1">
            <Button
              onPress={() => {
                setNomorRekening("");
                setPermintaanKhusus("");
                setJenisKamarInputs([{ id_jenisKamar: "", jumlah: "" }]);
                setLayananInputs([{ id_layanan: "", jumlah: "" }]);
                onOpen();
              }}
              color="primary"
              className="mt-7"
            >
              Book Now
            </Button>
          </span>
        </div>

        <Table>
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
          <TableBody items={kamar || []} emptyContent={"No rows to display."}>
            {(item) =>
              // Menampilkan hanya kamar yang totalKamar-nya lebih besar dari 0
              item.totalKamar > 0 && (
                <TableRow key={item.id_jenisKamar}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <Modal
        placement="center"
        size="4xl"
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-2xl font-bold">
            Kamar {idJenisKamar}
          </ModalHeader>

          <ModalBody>
            <div className="mb-3">
              <strong>Kapasitas:</strong> {kapasitas} orang
            </div>
            <div className="mb-3">
              <strong>
                Kamar berukuran {ukuranKamar} meter persegi, menampilkan
                pemandangan kota
              </strong>
            </div>
            <div className="mb-2 text-xl ">
              <strong>Fasilitas :</strong>
            </div>
            <div>
              <strong>Layout:</strong> Ruang duduk terpisah
            </div>
            <div>
              <strong>Internet:</strong> WiFi Gratis
            </div>
            <div>
              <strong>Hiburan:</strong> Televisi LCD dengan channel TV premium
              channels
            </div>
            <div>
              <strong>Makan Minum:</strong> Pembuat kopi/teh, minibar, layanan
              kamar 24-jam, air minum kemasan gratis, termasuk sarapan
            </div>
            <div>
              <strong>Untuk tidur:</strong> Seprai kualitas premium dan
              gorden/tirai kedap cahaya
            </div>
            <div>
              <strong>Kamar Mandi:</strong> Kamar mandi pribadi dengan bathtub
              dan shower terpisah, jubah mandi, dan sandal
            </div>
            <div>
              <strong>Kemudahan:</strong> Brankas (muat laptop), Meja tulis, dan
              Telepon; tempat tidur lipat/tambahan tersedia berdasarkan
              permintaan
            </div>
            <div>
              <strong>Kenyamanan:</strong> AC dan layanan pembenahan kamar
              harian
            </div>
            <div className="mb-3">
              <strong>Merokok/Dilarang Merokok:</strong> Informasi tentang
              kebijakan merokok
            </div>
            <div className="mb-3">
              <strong>Rincian Kamar:</strong> {rincian}
            </div>
            <div className="mb-3">
              <strong>Harga:</strong> {formatRupiah(harga)}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="error" onClick={onOpenChange2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Add Reservation
              </ModalHeader>
              <ModalBody>
                <h1 className="ml-2 mt-4">Pilih Customer</h1>
                <Select
                  items={customerGroups || []}
                  type="text"
                  label="Enter Customer"
                  selectedKeys={id_dataUser}
                  onSelectionChange={(selected) =>
                    setIdDataUser(selected.currentKey)
                  }
                >
                  {(customer) => (
                    <SelectItem key={customer.id_dataUser}>
                      {customer.nama}
                    </SelectItem>
                  )}
                </Select>
                <h1 className="ml-2">nomor rekening</h1>
                <Input
                  value={nomor_rekening}
                  onValueChange={setNomorRekening}
                  type="number"
                />

                <div className="mt-2">
                  <h1 className="ml-2">Pilih Kamar</h1>
                  {jenisKamarInputs.map((input, index) => (
                    <div key={input.id}>
                      <div className="flex mt-2">
                        <Select
                          items={jenis_kamar || []}
                          type="text"
                          label={`Enter Jenis Kamar ${index + 1}`}
                          selectedKeys={input.id_jenisKamar}
                          onSelectionChange={(selected) =>
                            handleJenisKamarChange(selected, index)
                          }
                        >
                          {(jenisKamar) => (
                            <SelectItem key={jenisKamar.id_jenisKamar}>
                              {jenisKamar.jenisKamar}
                            </SelectItem>
                          )}
                        </Select>

                        <Input
                          value={input.jumlah}
                          onValueChange={(value) =>
                            handleJumlahKamarChange(value, index)
                          }
                          type="number"
                          label={`Enter Jumlah ${index + 1}`}
                          className="ml-2"
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          color="error"
                          onPress={() => handleRemoveJenisKamar(index)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Button color="primary" onPress={handleAddJenisKamar}>
                    Add More Jenis Kamar
                  </Button>
                </div>

                <div className="mt-2">
                  <h1 className="ml-2">Pilih Layanan</h1>
                  {layananInputs.map((input, index) => (
                    <div key={input.id}>
                      <div className="flex mt-2">
                        <Select
                          items={layanan || []}
                          type="text"
                          label={`Enter layanan ${index + 1}`}
                          selectedKeys={input.id_layanan}
                          onSelectionChange={(selected) =>
                            handleLayananChange(selected, index)
                          }
                        >
                          {(layanan) => (
                            <SelectItem key={layanan.id_layanan}>
                              {layanan.nama}
                            </SelectItem>
                          )}
                        </Select>

                        <Input
                          value={input.jumlah}
                          onValueChange={(value) =>
                            handleJumlahLayananChange(value, index)
                          }
                          type="number"
                          label={`Enter Jumlah ${index + 1}`}
                          className="ml-2"
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          color="error"
                          onPress={() => handleRemoveLayanan(index)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Button color="primary" onPress={handleAddLayanan}>
                    Add More Layanan
                  </Button>
                </div>
                <h1 className="ml-2">Permintaan Khusus</h1>
                <Input
                  value={permintaanKhusus}
                  onValueChange={setPermintaanKhusus}
                  type="text"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    reservasi();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
