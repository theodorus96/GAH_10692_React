import {Input, Button, Card, ScrollShadow, Link} from "@nextui-org/react";
import { useState } from "react";
import instance from "../axios";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [no_identitas, setNoIdentitas] = useState('');
  const [nomor_telepon, setNomorTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [institusi, setInstitusi] = useState('');
  const navigate = useNavigate();

  function onRegister() {
    instance.post('/user/register', {
      email,
      password,
      nama,
      no_identitas,
      nomor_telepon,
      alamat,
      institusi
    }).then((res) => {
        console.log(res.data.data)
        alert("Register Berhasil!!");
        navigate('/login')
    }).catch((err) => {
        console.log(err.response)
        alert("Register Gagal")
    })
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
        <Card className="h-[650px] w-[600px] items-center">
        <ScrollShadow hideScrollBar>
        <div className="max-w-md mx-auto flex flex-col justify-center items-center ">
        <div className="Card h-[650px] w-[400px] items-center">
            <div className="">
                <div className="text-center mb-10 ">
                    <div className="flex justify-between">
                        <span className="flex">
                             <Link as={NavLink} to="/" className="text-3xl text-black">
                             < FaAngleLeft/>
                            </Link>
                        </span>
                        <h1 className="text-l font-bold font-serif py-5">Sign Up</h1>
                        <h1></h1>
                    </div>
                    <hr className=""></hr>
                    <h1 className="text-2xl font-bold font-serif py-5" >Create Your Account</h1>
                </div>
            <div>
                <p className="ml-1 font-semibold">Email</p>
                <Input
                    value={email}
                    onValueChange={setEmail}
                    className="mb-5"
                    type="email"
                    label="Email"
                />
            </div>

            <div>
                <p className="ml-1 font-semibold">Password</p>
            <Input
                value={password}
                onValueChange={setPassword}
                className="mb-5"
                type="password"
                label="Password"
            />
            </div>

             <div>
                <p className="ml-1 font-semibold">Name</p>
            <Input
                value={nama}
                onValueChange={setNama}
                className="mb-5"
                type="text"
                label="Nama"
            />
            </div>

             <div>
                <p className="ml-1 font-semibold">Identity Number</p>
            <Input
                value={no_identitas}
                onValueChange={setNoIdentitas}
                className="mb-5"
                type="text"
                label="Nomor Identitas"
            />
            </div>

             <div>
                <p className="ml-1 font-semibold">Phone Number</p>
            <Input
                value={nomor_telepon}
                onValueChange={setNomorTelepon}
                className="mb-5"
                type="text"
                label="Nomor Telepon"
            />
            </div>

             <div>
                <p className="ml-1 font-semibold">Address</p>
            <Input
                value={alamat}
                onValueChange={setAlamat}
                className="mb-5"
                type="text"
                label="Alamat"
            />
            </div>

             <div>
                <p className="ml-1 font-semibold">Institution</p>
            <Input
                value={institusi}
                onValueChange={setInstitusi}
                className="mb-5"
                type="text"
                label="Institusi"
            />
            </div>
            <Button onClick={onRegister} className="mt-5 w-full mb-10" color="primary">
                Register
            </Button>
            </div>
        </div>
        </div>
        </ScrollShadow>
    </Card>
    </div>
  );
}


