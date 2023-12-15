import React, { useState, useEffect } from "react";
import {
  Select,
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
} from "@nextui-org/react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";
import instance from "../axios";

const columns = [
  { name: "Nomor Kamar", uid: "nomor_kamar" },
  { name: "Jenis Kamar", uid: "id_jenisKamar" },
  { name: "Tipe kamar", uid: "tipe_kasur" },
  { name: "Actions", uid: "actions" },
];

export function Room() {
  const [rooms, setRooms] = useState([]);
  const [idKamar, setIdKamar] = useState();
  const [idJenisKamar, setIdJenisKamar] = useState("");
  const [nomorKamar, setNomorKamar] = useState("");
  const [tipeKasur, setTipeKasur] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [jenisKamar, setJenisKamar] = useState([]);
  const [searchKamar, setSearch] = useState([]);
  const [roomsForSearch, setRoomsSearch] = useState([]);

  const updateRoom = () => {
    const idJenisKamarValue = [...idJenisKamar];
    const userConfirmation = window.confirm(
      "Apakah Anda yakin ingin mengedit data kamar?"
    );
    if (!userConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    instance
      .put(
        `/kamar/${idKamar}`,
        {
          id_jenisKamar: idJenisKamarValue[0],
          nomor_kamar: nomorKamar,
          tipe_kasur: tipeKasur,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        getAllRooms();
        onOpenChange(false);
        setIdJenisKamar("");
        setNomorKamar("");
        setTipeKasur("");
        alert("Update Berhasil!!");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data kamar:", error);
        alert("Update Gagal!!");
      });
  };

  function onEdit(kamar) {
    setIdKamar(kamar.id_kamar);
    setIdJenisKamar(new Set([kamar.id_jenisKamar.toString()]));
    setNomorKamar(kamar.nomor_kamar);
    setTipeKasur(kamar.tipe_kasur);
    onOpenChange(true);
  }

  const deleteRoom = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus kamar ini?"
    );
    if (isConfirmed) {
      instance
        .delete(`/kamar/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllRooms();
          alert("Data Berhasil Dihapus!!");
        })
        .catch((error) => {
          console.error("Gagal menghapus data kamar:", error);
          alert("Data Gagal Dihapus!!");
        });
    }
  };

  const addRoom = () => {
    const idJenisKamarValue = [...idJenisKamar];

    const userConfirmation = window.confirm(
      "Apakah Anda yakin ingin menambah data kamar?"
    );
    if (!userConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    instance
      .post(
        "/kamar",
        {
          id_jenisKamar: idJenisKamarValue[0],
          nomor_kamar: nomorKamar,
          tipe_kasur: tipeKasur,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        getAllRooms();
        onOpenChange(false);
        alert("Data Berhasil Ditambah!!");
      })
      .catch((error) => {
        console.error("Gagal menambah data kamar:", error);
        alert("Data Gagal Ditambahkan!!");
      });
  };

  function getAllRooms() {
    instance
      .get("/kamar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRooms(response.data.data);
        setRoomsSearch(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data kamar:", error);
      });
  }

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    instance
      .get("/jenis_kamar")
      .then((response) => {
        setJenisKamar(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data kamar:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchKamar) {
      setRoomsSearch(rooms);
      return;
    }

    const roomsResult = rooms.filter((row) => {
      const jenisKamarData = jenisKamar.find(
        (jenis) => jenis.id_jenisKamar === row.id_jenisKamar
      );
      return (
        row.tipe_kasur?.toLowerCase().includes(searchKamar.toLowerCase()) ||
        row.nomor_kamar?.toLowerCase().includes(searchKamar.toLowerCase()) ||
        (jenisKamarData &&
          jenisKamarData.jenis
            .toLowerCase()
            .includes(searchKamar.toLowerCase()))
      );
    });

    setRoomsSearch(roomsResult);
  }, [searchKamar]);

  const renderCell = (kamar, columnKey) => {
    const cellValue = kamar[columnKey];

    switch (columnKey) {
      case "id_jenisKamar":
        const matchedJenis = jenisKamar.find(
          (jenisItem) => jenisItem.id_jenisKamar === cellValue
        );
        return matchedJenis ? matchedJenis.jenis : cellValue;

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit kamar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => onEdit(kamar)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete kamar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteRoom(kamar.id_kamar)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="p-16">
      <h1 className="text-4xl font-bold font-serif text-center mb-10">
        Room Details
      </h1>
      <div className="flex justify-between mb-2">
        <Input
          className="mb-5 w-1/2"
          placeholder="Search"
          value={searchKamar}
          onValueChange={setSearch}
        />
        <Button
          onPress={() => {
            setIdKamar("");
            setNomorKamar("");
            setIdJenisKamar("");
            setTipeKasur("");
            onOpen();
          }}
          color="primary"
          className="mb-5 float-right"
        >
          Add Room
        </Button>
      </div>
      <Table aria-label="Example table with custom cells" className="">
        <TableHeader columns={columns} className="">
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
          items={roomsForSearch || []}
          emptyContent={"No rows to display."}
        >
          {(item) => (
            <TableRow key={item.id_kamar}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Room</ModalHeader>
              <ModalBody>
                <h1 className="ml-2">Nomor Kamar</h1>
                <Input
                  value={nomorKamar}
                  onValueChange={setNomorKamar}
                  type="text"
                  label="Enter Nomor Kamar"
                />
                <h1 className="ml-2">Id Jenis Kamar</h1>
                <Select 
                  items={jenisKamar || []}
                  type="text"
                  label="Enter Jenis Kamar"
                  selectedKeys={idJenisKamar}
                  onSelectionChange={setIdJenisKamar}
                >
                  {(jenisKamar) => (
                    <SelectItem key={jenisKamar.id_jenisKamar}>
                      {jenisKamar.jenis}
                    </SelectItem>
                  )}
                </Select>
                <h1 className="ml-2">Tipe Kasur</h1>
                <Input
                  value={tipeKasur}
                  onValueChange={setTipeKasur}
                  type="text"
                  label="Enter Tipe Kasur"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (idKamar) {
                      updateRoom();
                    } else {
                      addRoom();
                    }
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
