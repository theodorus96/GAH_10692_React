import { Input, Button, Card, Link, User } from "@nextui-org/react";
import { useContext, useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobalLogin } from "../Global/Global";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLogin } = useGlobalLogin();

  function onLogin() {
    instance
      .post("/user/login", { email, password })
      .then((res) => {
        console.log(res.data.data);
        const role = res.data.data.data_user.role;
        let path = "";
        if (role === "Admin") {
          path = "/dashboardAdmin";
        } else if (role === "Customer") {
          path = "/";
        } else if (role === "SM") {
          path = "/dashboardSM";
        }
        alert("Login Berhasil!!");
        console.log(JSON.stringify(res, null, 2));
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id_dataUser", res.data.data.data_user.id_dataUser);
        localStorage.setItem("email", res.data.data.user.email);
        localStorage.setItem("password", res.data.data.user.password);
        localStorage.setItem("id_user", res.data.data.user.id_user);
        setIsLogin(true);
        navigate(path);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert("User atau Password tidak sesuai");
      });
  }

  return (
    <div className="w-full bg-login-bg bg-center">
      <div className="max-w-md mx-auto flex flex-col justify-center items-center h-screen ">
        <Card className="h-[400px] w-[600px] items-center px-3">
          <div className="flex justify-between w-[550px] mt-5">
            <span className="flex justify-between">
              <Link as={NavLink} to="/" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
            </span>
            <h1 className="text-2xl font-bold font-serif ">LOGIN</h1>
            <h1> </h1>
          </div>
          <div className="mx-auto flex flex-col justify-center h-screen w-full px-4">
            <div>
              <h1 className="ml-2 font-semibold">Email</h1>
              <Input
                value={email}
                onValueChange={setEmail}
                className="mb-5"
                type="email"
                label="Email"
              />
            </div>
            <div>
              <h1 className="ml-2 font-semibold">Password</h1>
              <Input
                value={password}
                onValueChange={setPassword}
                type="password"
                label="Password"
              />
            </div>
            <Button onClick={onLogin} className="mt-8 w-full" color="primary">
              Login
            </Button>
            <div className="flex justify-between">
              <Link
                color="foreground"
                as={NavLink}
                to="/register"
                className="mt-2 "
              >
                {" "}
                Register{" "}
              </Link>
              <Link color="foreground" as={NavLink} to="/forgotPass">
                {" "}
                Forgot Password{" "}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
