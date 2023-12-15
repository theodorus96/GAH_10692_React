import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./auth/LoginPage";
import { LoginPegawai } from "./auth/LoginPegawai";
import { DashboardAdmin } from "./dashboard/DashboardAdmin";
import { RegisterPage } from "./auth/RegisterPage";
import { ForgotPass } from "./auth/ForgotPass";
import { DashboardSM } from "./dashboard/DashboardSM";
import { Layanan } from "./Layanan/LayananPage";
import { Tarif } from "./Tarif/TarifPage,";
import { ProfilePage } from "./User/ProfilePage";
import { useContext, useEffect } from "react";
import { useGlobalLogin } from "./Global/Global";
import { CustomerGroup } from "./User/CustomerGroup";
import { AvailableRoom } from "./Room/AvailableRoom";
import { Resume } from "./Resume";
import { Payment } from "./Payment";
import { TandaTerimaPersonal } from "./TandaTerimaPersonal";
import { Riwayat } from "./Riwayat";
import { AvailableRoomGroup } from "./Room/AvaibleRoomGroup";
import { RiwayatGroup } from "./RiwayatGroup";
import { CustomerBaru } from "./Laporan/CustomerBaru";
import { PendapatanBulanan } from "./Laporan/PendapatanBulanan";
import { JumlahTamu } from "./Laporan/JumlahTamu";
import { CustomerTerbanyak } from "./Laporan/CustomerTerbanyak";
import { DisplayCustomer } from "./FO/DisplayCustomer";
import { TambahLayanan } from "./FO/TambahLayanan";
import { Invoice } from "./invoice";
function App() {
  const { isLogin, setIsLogin } = useGlobalLogin();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loginPegawai" element={<LoginPegawai />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/dashboardSM" element={<DashboardSM />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/tarif" element={<Tarif />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/customer" element={<CustomerGroup />} />
          <Route path="/availableRoom" element={<AvailableRoom />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tandaTerima" element={<TandaTerimaPersonal />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/availableRoomGroup" element={<AvailableRoomGroup />} />
          <Route path="/riwayatGroup" element={<RiwayatGroup />} />
          <Route path="/customerBaru" element={<CustomerBaru />} />
          <Route path="/pendapatanBulanan" element={<PendapatanBulanan />} />
          <Route path="/jumlahTamu" element={<JumlahTamu />} />
          <Route path="/customerTerbanyak" element={<CustomerTerbanyak />} />
          <Route path="/displayCustomer" element={<DisplayCustomer />} />
          <Route path="/tambahlayanan" element={<TambahLayanan />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
