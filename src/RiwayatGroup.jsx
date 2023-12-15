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
import { NavSM } from "./NavigationBar/NavbarSM";

export function RiwayatGroup() {
  const [riwayatData, setRiwayatData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReservation, setSelectedReservation] = useState(null);

  const getRiwayat = () => {
    instance
      .get(`/sm/reservasi/riwayat`, {
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
    getRiwayat();
  }, []);

  const handleCancellation = (reservation) => {
    const currentDate = new Date();
    const checkinDate = new Date(reservation.tanggal_checkin);

    // Calculate the difference in days
    const timeDifference = checkinDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Check conditions for cancellation and refund
    if (reservation.status === "Sudah DP" && differenceInDays > 7) {
      instance
        .put(`/reservasi/${reservation.id_reservasi}`)
        .then((res) => {
          console.log(res.data);
          // Refresh the reservation data after cancellation
          getRiwayat();
          onClose(); // Close the cancellation confirmation modal
          alert("Pembatalan berhasil. Uang dapat dikembalikan.");
        })
        .catch((err) => {
          console.error(err.response);
          alert("Gagal membatalkan reservasi");
        });
    } else if (reservation.status === "Sudah DP" && differenceInDays <= 7) {
      instance
        .put(`/reservasi/${reservation.id_reservasi}`)
        .then((res) => {
          console.log(res.data);
          // Refresh the reservation data after cancellation
          getRiwayat();
          onClose(); // Close the cancellation confirmation modal
          alert("Pembatalan berhasil. Uang tidak dapat dikembalikan.");
        })
        .catch((err) => {
          console.error(err.response);
          alert("Gagal membatalkan reservasi");
        });
    } else if (reservation.status === "Belum DP") {
      // For "Belum DP", simply cancel the reservation
      instance
        .put(`/reservasi/${reservation.id_reservasi}`)
        .then((res) => {
          console.log(res.data);
          // Refresh the reservation data after cancellation
          getRiwayat();
          onClose(); // Close the cancellation confirmation modal
          alert("Pembatalan berhasil.");
        })
        .catch((err) => {
          console.error(err.response);
          alert("Gagal membatalkan reservasi");
        });
    } else {
      // For other statuses, e.g., "Batal", show an alert
      alert("Pemesanan tidak dapat dibatalkan.");
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
      <NavSM />
      <div className="flex flex-col justify-center items-center h-screen ">
        <Card className="h-[600px] w-[1100px] items-center">
          <ScrollShadow hideScrollBar>
            <div>
              <h1 className="text-2xl font-bold font-serif py-5 ml-5">
                Riwayat Pemesanan
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
                      {riwayat.status === "Belum DP" ||
                      riwayat.status === "Sudah DP" ? (
                        <Button
                          onClick={() => {
                            setSelectedReservation(riwayat);
                            onOpen();
                          }}
                        >
                          Batal Pemesanan
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>
        </Card>
      </div>
      {/* Modal for cancellation confirmation */}
      <Modal isOpen={isOpen} onClose={onClose} key="modal">
        <ModalContent>
          <ModalHeader>Batal Pemesanan</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin membatalkan pemesanan ini?
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                handleCancellation(selectedReservation);
                onClose();
              }}
            >
              Ya
            </Button>
            <Button auto onClick={onClose}>
              Tidak
            </Button>
          </ModalFooter>
          <p className="font-bold ml-4">
            *Uang akan tidak dikembalikan jika pembatalan kurang dari h-7 waktu
            menginap
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}
