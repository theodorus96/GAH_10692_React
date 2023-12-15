import React, { useState, useEffect } from "react";
import { EditIcon } from "../EditIcon";
import {  Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, SelectItem } from "@nextui-org/react";
import { DeleteIcon } from "../DeleteIcon";
import instance from "../axios";



const columns = [
    { name: "Jenis Season", uid: "jenis_season" },
    { name: "Tanggal Mulai", uid: "mulai_season" },
    { name: "Tanggal Berakhir", uid: "akhir_season" },
    { name: "Actions", uid: "actions" },
  ];

export  function Season() {
    const [seasons, setSeasons] = useState([]); 
    const [idSeason , setIdSeason] = useState();
    const [jenisSeason, setJenisSeason] = useState("");
    const [mulaiSeason, setMulaiSeason] = useState("");
    const [akhirSeason, setAkhirSeason] = useState("");
    const [searchseason, setSearch] = useState([])
    const [seasonsForSearch, setSeasonsSearch] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const updateSeason = () => {
      const seasonConfirmation = window.confirm("Apakah Anda yakin ingin mengedit data season?");
        if (!seasonConfirmation) {
          return; // Batal jika pengguna tidak menyetujui
        }
      instance
        .put(`/season/${idSeason}`, {
          jenis_season: jenisSeason,
          mulai_season: mulaiSeason,
          akhir_season: akhirSeason,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then(() => {
          getAllSeasons() 
          onOpenChange(false);
          setJenisSeason("");
          setMulaiSeason("");
          setAkhirSeason("");
          alert("Update Berhasil!!");
          
        })
        .catch((error) => {
          console.error("Gagal mengupdate data season:", error);
          alert("Update Gagal!!");
        });
    }

    function onEdit(season){
      setIdSeason(season.id_season)
      setJenisSeason(season.jenis_season)
      setMulaiSeason(season.mulai_season)
      setAkhirSeason(season.akhir_season)
      onOpenChange(true)
    }

    const deleteSeason = (id) => {
      const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus season ini?");
      if (isConfirmed) {
      instance
        .delete(`/season/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then(() => {
          getAllSeasons()
          alert("Data Berhasil Dihapus!!");
        })
        .catch((error) => {
          console.error("Gagal menghapus data season:", error);
          alert("Data Gagal Dihapus!!");
        });
      }
    };
  
    const addSeason = () => {
      const seasonConfirmation = window.confirm("Apakah Anda yakin ingin menambah data season?");
        if (!seasonConfirmation) {
          return; // Batal jika pengguna tidak menyetujui
        }
      instance
        .post("/season", {
          jenis_season: jenisSeason,
          mulai_season: mulaiSeason,
          akhir_season: akhirSeason,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })  
        .then((response) => {
          getAllSeasons()
          onOpenChange(false);
          alert("Tambah Berhasil!!");
        })
        .catch((error) => {
          console.error("Gagal menambah data season:", error);
          alert("Tambah Gagal!!");
        });
    }

    function getAllSeasons() {
        instance
          .get("/season", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
          })
          .then((response) => {
            setSeasons(response.data.data);
            setSeasonsSearch(response.data.data);
          })
          .catch((error) => {
            console.error("Gagal memuat data season:", error);
          });
      }

        useEffect(() => {
            getAllSeasons();
          } , []);

 
      useEffect(() => {
        if(!searchseason){
            setSeasonsSearch(seasons)
          return
        }
        const seasonsResult = seasons.filter((row) => {
          return row.id_season?.toString().toLowerCase().includes(searchseason?.trim()?.toLowerCase()) ||
            row.jenis_season?.toLowerCase().includes(searchseason?.trim()?.toLowerCase()) ||
            row.mulai_season?.toString().toLowerCase().includes(searchseason?.trim()?.toLowerCase()) ||
            row.akhir_season?.toString().toLowerCase().includes(searchseason?.trim()?.toLowerCase());
        });
        setSeasonsSearch(seasonsResult);
      }, [searchseason]);

    const renderCell = (season, columnKey) => {
        const cellValue = season[columnKey];
    
        switch (columnKey) {
    
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit season">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={() => onEdit(season)}/>
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete season">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <DeleteIcon onClick={() => deleteSeason(season.id_season)}/>
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
          <h1 className="text-4xl font-bold font-serif text-center mb-10">Season Details</h1>
          <div className="flex justify-between mb-2">
          <Input
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchseason}
            onValueChange={setSearch}
          />
        <Button onPress={() => {
            setIdSeason("")
            setJenisSeason("");
            setMulaiSeason("");
            setAkhirSeason("");
          onOpen()
        }} color="primary" className="mb-5 float-right" >
          Add Season
        </Button>
        </div >
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns} >
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={seasonsForSearch || []} emptyContent={"No rows to display."}>
            {(item) => (
              <TableRow key={item.id_season}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Seasons</ModalHeader>
                  <ModalBody>
                   <h1 className="ml-2">Jenis Season</h1>
                  <Input value={jenisSeason} onValueChange={setJenisSeason} type="text" label="Enter Jenis Season" />
                  <h1 className="ml-2">Mulai Season</h1>
                  <Input value={mulaiSeason} onValueChange={setMulaiSeason} type="date" />
                  <h1 className="ml-2">Akhir Season</h1>
                  <Input value={akhirSeason} onValueChange={setAkhirSeason} type="date" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={() => {
                      if(idSeason){
                        updateSeason()
                      }else{
                        addSeason()
                      }
                    }}>
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