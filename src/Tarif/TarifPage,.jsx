import { NavSM } from "../NavigationBar/NavbarSM";
import React, { useState, useEffect } from "react";
import { EditIcon } from "../EditIcon";
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
import { DeleteIcon } from "../DeleteIcon";
import instance from "../axios";

const columns = [
  { name: "Jenis Kamar", uid: "id_jenisKamar" },
  { name: "Season", uid: "id_season" },
  { name: "Harga Season Kamar", uid: "harga_seasonKamar" },
  { name: "Actions", uid: "actions" },
];

export function Tarif() {
  const [seasonKamars, setSeasons] = useState([]);
  const [idSeasonKamar, setIdSeasonKamar] = useState();
  const [idJenisKamar, setIdJenisSeason] = useState("");
  const [idSeason, setIdSeason] = useState("");
  const [hargaSeasonKamar, setHargaSeasonKamar] = useState("");
  const [jenisKamar, setJenisKamar] = useState([]);
  const [season, setSeason] = useState([]);
  const [searchSeasonKamar, setSearch] = useState([]);
  const [seasonsForSearch, setSeasonsSearch] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateSeasonKamar = () => {
    const idJenisKamarValue = [...idJenisKamar];
    const idSeasonValue = [...idSeason];
    const skConfirmation = window.confirm(
      "Apakah Anda yakin ingin mengedit data Season?"
    );
    if (!skConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    instance
      .put(
        `/season_kamar/${idSeasonKamar}`,
        {
          id_jenisKamar: idJenisKamarValue[0],
          id_season: idSeasonValue[0],
          harga_seasonKamar: hargaSeasonKamar,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        getAllSeasonKamars();
        onOpenChange(false);
        setIdJenisSeason("");
        setIdSeason("");
        setHargaSeasonKamar("");
        alert("Update Berhasil!!");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data season kamar:", error);
        alert("Update Gagal!!");
      });
  };

  function onEdit(seasonKamar) {
    setIdSeasonKamar(seasonKamar.id_seasonKamar);
    setIdSeason(new Set([seasonKamar.id_season.toString()]));
    setIdJenisSeason(new Set([seasonKamar.id_jenisKamar.toString()]));
    setHargaSeasonKamar(seasonKamar.harga_seasonKamar);
    onOpenChange(true);
  }

  const deleteSeasonKamar = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus season kamar ini?"
    );
    if (isConfirmed) {
      instance
        .delete(`/season_kamar/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllSeasonKamars();
        })
        .catch((error) => {
          console.error("Gagal menghapus data kamar:", error);
        });
    }
  };

  const addSeasonKamar = () => {
    const skConfirmation = window.confirm(
      "Apakah Anda yakin ingin menambah data Season?"
    );
    if (!skConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    const idJenisKamarValue = [...idJenisKamar];
    const idSeasonValue = [...idSeason];
    instance
      .post(
        "/season_kamar",
        {
          id_jenisKamar: idJenisKamarValue[0],
          id_season: idSeasonValue[0],
          harga_seasonKamar: hargaSeasonKamar,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        getAllSeasonKamars();
        onOpenChange(false);
        alert("Data Berhasil Ditambah!!");
      })
      .catch((error) => {
        console.error("Gagal menambah data Season Kamar:", error);
        alert("Data Gagal Ditambah!!");
      });
  };

  function getAllSeasonKamars() {
    instance
      .get("/season_kamar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSeasons(response.data.data);
        setSeasonsSearch(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data season kamar:", error);
      });
  }

  useEffect(() => {
    getAllSeasonKamars();
  }, []);

  useEffect(() => {
    instance
      .get("/jenis_kamar")
      .then((response) => {
        setJenisKamar(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data jenis kamar:", error);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/season", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSeason(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data season:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchSeasonKamar) {
      setSeasonsSearch(seasonKamars);
      return;
    }

    const seasonResult = seasonKamars.filter((row) => {
      const jenisKamarData = jenisKamar.find(
        (jenis) => jenis.id_jenisKamar === row.id_jenisKamar
      );
      const seasonData = season.find(
        (season) => season.id_season === row.id_season
      );
      return (
        (jenisKamarData &&
          jenisKamarData.jenis
            .toLowerCase()
            .includes(searchSeasonKamar.toLowerCase())) ||
        row.harga_seasonKamar
          ?.toString()
          .toLowerCase()
          .includes(searchSeasonKamar.toLowerCase()) ||
        (seasonData &&
          seasonData.jenis_season
            .toLowerCase()
            .includes(searchSeasonKamar.toLowerCase()))
      );
    });

    setSeasonsSearch(seasonResult);
  }, [searchSeasonKamar]);

  const renderCell = (seasonKamar, columnKey) => {
    const cellValue = seasonKamar[columnKey];

    switch (columnKey) {
      case "id_jenisKamar":
        const matchedJenis = jenisKamar.find(
          (jenisItem) => jenisItem.id_jenisKamar === cellValue
        );
        return matchedJenis ? matchedJenis.jenis : cellValue;

      case "id_season":
        const matchedSeason = season.find(
          (seasonItem) => seasonItem.id_season === cellValue
        );
        return matchedSeason ? matchedSeason.jenis_season : cellValue;

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit season">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => onEdit(seasonKamar)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete season">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  onClick={() => deleteSeasonKamar(seasonKamar.id_seasonKamar)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <NavSM />
      <div className="p-16">
        <h1 className="text-4xl font-bold font-serif text-center mb-10">
          Season Kamar Details
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchSeasonKamar}
            onValueChange={setSearch}
          />
          <Button
            onPress={() => {
              setIdSeasonKamar("");
              setIdJenisSeason("");
              setIdSeason("");
              setHargaSeasonKamar("");
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Season
          </Button>
        </div>
        <Table aria-label="Example table with custom cells">
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
          <TableBody
            items={seasonsForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_seasonKamar}>
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
                <ModalHeader className="flex flex-col gap-1">
                  Seasons
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Jenis Kamar</h1>
                  <Select
                    items={jenisKamar || []}
                    type="text"
                    label="Enter Jenis Kamar"
                    selectedKeys={idJenisKamar}
                    onSelectionChange={setIdJenisSeason}
                  >
                    {(jenisKamar) => (
                      <SelectItem key={jenisKamar.id_jenisKamar}>
                        {jenisKamar.jenis}
                      </SelectItem>
                    )}
                  </Select>
                  <h1 className="ml-2">Season</h1>
                  <Select
                    items={season || []}
                    type="text"
                    label="Enter Season"
                    selectedKeys={idSeason}
                    onSelectionChange={setIdSeason}
                  >
                    {(season) => (
                      <SelectItem key={season.id_season}>
                        {season.jenis_season}
                      </SelectItem>
                    )}
                  </Select>
                  <h1 className="ml-2">Harga Season Kamar</h1>
                  <Input
                    value={hargaSeasonKamar}
                    onValueChange={setHargaSeasonKamar}
                    type="number"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (idSeasonKamar) {
                        updateSeasonKamar();
                      } else {
                        addSeasonKamar();
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
    </div>
  );
}
