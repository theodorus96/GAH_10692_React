import React, { useState, useEffect } from "react";
import instance from "../axios";
import {
  Card,
  ScrollShadow,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useGlobalLogin } from "../Global/Global";
import { set } from "date-fns";
import { Nav } from "../NavigationBar/Navbar";

export function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const { isLogin, setIsLogin } = useGlobalLogin();
  const [email, setEmail] = useState("");
  const [idUser, setIdUser] = useState();
  const [no_identitas, setNoIdentitas] = useState("");
  const [nama, setNama] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [institusi, setInstitusi] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getData = () => {
    instance
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        setUserData(res.data.data.data_user);
        setEmail(res.data.data.email);
        setPassword(res.data.data.password);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const updateProfile = () => {
    const profileConfirmation = window.confirm(
      "Apakah Anda yakin ingin mengedit data user?"
    );
    if (!profileConfirmation) {
      return; // Batal jika pengguna tidak menyetujui
    }
    const idUser = localStorage.getItem("id_user");

    instance
      .put(
        `/user/${idUser}`,
        {
          email: email,
          password: password,
          nama: nama,
          no_identitas: no_identitas,
          nomor_telepon: nomor_telepon,
          alamat: alamat,
          institusi: institusi,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUserData(res.data.data);
        onOpenChange(false);
        alert("Berhasil mengupdate data User");
        getData();
      })
      .catch((err) => {
        alert("Gagal mengupdate data User:", err);
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onEdit = () => {
    setIdUser(userData.id_user);
    setEmail(email);
    setPassword(password);
    setNama(userData.nama);
    setNoIdentitas(userData.no_identitas);
    setNomorTelepon(userData.nomor_telepon);
    setAlamat(userData.alamat);
    setInstitusi(userData.institusi);
    onOpenChange(true);
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
        <Card className=" w-[600px]">
          <ScrollShadow hideScrollBar>
            <div className="p-6">
              <p className="text-2xl font-semibold text-center mb-10">
                Profile Customer
              </p>
              <div className="mb-4">
                <p className="text-lg font-semibold">Email :</p>
                <p>{email}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Password :</p>
                <p>{password}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Name :</p>
                <p>{userData?.nama}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Identity Number :</p>
                <p>{userData?.no_identitas}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Phone Number :</p>
                <p>{userData?.nomor_telepon}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Address :</p>
                <p>{userData?.alamat}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Institution :</p>
                <p>{userData?.institusi}</p>
              </div>

              <Button
                onClick={() => onEdit()}
                className="w-full"
                color="primary"
              >
                Edit
              </Button>
            </div>
          </ScrollShadow>
        </Card>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Profile
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Email</h1>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter Email"
                  />
                  <h1 className="ml-2">Password</h1>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter Password"
                  />
                  <h1 className="ml-2">Nama</h1>
                  <Input
                    type="text"
                    value={nama}
                    onChange={(event) => setNama(event.target.value)}
                    placeholder="Enter Nama"
                  />
                  <h1 className="ml-2">Nomor Identitas</h1>
                  <Input
                    type="text"
                    value={no_identitas}
                    onChange={(event) => setNoIdentitas(event.target.value)}
                    placeholder="Enter Nomor Identitas"
                  />
                  <h1 className="ml-2">Nomor Telepon</h1>
                  <Input
                    type="text"
                    value={nomor_telepon}
                    onChange={(event) => setNomorTelepon(event.target.value)}
                    placeholder="Enter Nomor Telepon"
                  />
                  <h1 className="ml-2">Alamat</h1>
                  <Input
                    type="text"
                    value={alamat}
                    onChange={(event) => setAlamat(event.target.value)}
                    placeholder="Enter Alamat"
                  />
                  <h1 className="ml-2">Alamat</h1>
                  <Input
                    type="text"
                    value={institusi}
                    onChange={(event) => setInstitusi(event.target.value)}
                    placeholder="Enter Instutusi"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      updateProfile();
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
