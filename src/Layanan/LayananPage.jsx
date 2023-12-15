import { NavSM } from "../NavigationBar/NavbarSM"
import React, { useState, useEffect } from "react";
import { EditIcon } from "../EditIcon";
import {  Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, SelectItem } from "@nextui-org/react";
import { DeleteIcon } from "../DeleteIcon";
import instance from "../axios";

const columns = [
    { name: "Nama Layanan", uid: "nama" },
    { name: "Deskripsi Layanan", uid: "deskripsi" },
    { name: "Harga Layanan", uid: "harga" },
    { name: "Actions", uid: "actions" },
  ];

export function Layanan() {
    const [layanans, setLayanans] = useState([]); 
    const [idLayanan , setIdLayanan] = useState();
    const [namaLayanan, setNamaLayanan] = useState("");
    const [deskripsiLayanan, setDeskripsiLayanan] = useState("");
    const [hargaLayanan, setHargaLayanan] = useState("");
    const [searchLayanan, setSearch] = useState([])
    const [layananForSearch, setLayanansSearch] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const updateLayanan = () => {
      const seasonConfirmation = window.confirm("Apakah Anda yakin ingin mengedit data season?");
        if (!seasonConfirmation) {
          return; // Batal jika pengguna tidak menyetujui
        }
        instance
          .put(`/layanan/${idLayanan}`, {
            nama: namaLayanan,
            deskripsi: deskripsiLayanan,
            harga: hargaLayanan,
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .then(() => {
            getAllLayanan() 
            onOpenChange(false);
            setNamaLayanan("");
            setDeskripsiLayanan("");
            setHargaLayanan("");
            alert("Update Berhasil!!");
          })
          .catch((error) => {
            console.error("Gagal mengupdate data layanan:", error);
            alert("Update Gagal!!");
          });
      }

      const deleteLayanan = (id) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus kamar ini?");
        if (isConfirmed) {    
        instance
          .delete(`/layanan/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .then(() => {
            getAllLayanan()
            alert("Delete Berhasil!!")
          })
          .catch((error) => {
            console.error("Gagal menghapus data layanan:", error);
            alert("Delete Gagal!!");
          });
        }
      };

    function onEdit(layanan){
        setIdLayanan(layanan.id_layanan)
        setNamaLayanan(layanan.nama)
        setDeskripsiLayanan(layanan.deskripsi)
        setHargaLayanan(layanan.harga)
        onOpenChange(true)
      }

    const addLayanan = () => {
        const layananConfirmation = window.confirm("Apakah Anda yakin ingin menambah data Layanan?");
        if (!layananConfirmation) {
          return; // Batal jika pengguna tidak menyetujui
        }
        instance
          .post("/layanan", {
            nama: namaLayanan,
            deskripsi: deskripsiLayanan,
            harga: hargaLayanan,
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .then((response) => {
            getAllLayanan()
            onOpenChange(false);
            alert("Data Berhasil Ditambah!!")
          })
          .catch((error) => {
            console.error("Gagal menambah data layanan:", error);
            alert("Data Gagal Ditambah!!");
          });
      }

    function getAllLayanan() {
        instance
          .get("/layanan", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
          })
          .then((response) => {
            setLayanans(response.data.data);
            setLayanansSearch(response.data.data)
          })
          .catch((error) => {
            console.error("Gagal memuat data layanan:", error);
          });
      }
    
        useEffect(() => {
            getAllLayanan();
          } , []);

          useEffect(() => {
            if(!searchLayanan){
                setLayanansSearch(layanans)
              return
            }
            const layanansResult = layanans.filter((row) => {
              return row.id_layanan?.toString().toLowerCase().includes(searchLayanan?.trim()?.toLowerCase()) ||
                row.nama?.toLowerCase().includes(searchLayanan?.trim()?.toLowerCase()) ||
                row.deskripsi?.toString().toLowerCase().includes(searchLayanan?.trim()?.toLowerCase()) ||
                row.harga?.toString().toLowerCase().includes(searchLayanan?.trim()?.toLowerCase());
            });
            setLayanansSearch(layanansResult);
          }, [searchLayanan]);

    const renderCell = (layanan, columnKey) => {
        const cellValue = layanan[columnKey];
    
        switch (columnKey) {
    
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit Layanan">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={() => onEdit(layanan)}/>
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete Layanan">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <DeleteIcon onClick={() => deleteLayanan(layanan.id_layanan)}/>
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      };

    return(
        <div>
            <NavSM/>
            <div className="p-16">
          <h1 className="text-4xl font-bold font-serif text-center mb-10">Layanan Details</h1>
          <div className="flex justify-between mb-2">
          <Input
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchLayanan}
            onValueChange={setSearch}
          />
        <Button onPress={() => {
            setIdLayanan("")
            setNamaLayanan("");
            setDeskripsiLayanan("");
            setHargaLayanan("");
          onOpen()
        }} color="primary" className="mb-5 float-right" >
          Add layanan
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
          <TableBody items={layananForSearch || []} emptyContent={"No rows to display."}>
            {(item) => (
              <TableRow key={item.id_layanan}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">layanans</ModalHeader>
                  <ModalBody>
                   <h1 className="ml-2">Nama Layanan</h1>
                  <Input value={namaLayanan} onValueChange={setNamaLayanan} type="text" label="Enter Nama Layanan" />
                  <h1 className="ml-2">Deskripsi Layanan</h1>
                  <Input value={deskripsiLayanan} onValueChange={setDeskripsiLayanan} type="text" label="Enter Deskripsi Layanan" />
                  <h1 className="ml-2">Harga Layanan</h1>
                  <Input value={hargaLayanan} onValueChange={setHargaLayanan} type="number" label="Enter Harga Layanan" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={() => {
                      if(idLayanan){
                        updateLayanan()
                      }else{
                        addLayanan()
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
        </div>
    );
}