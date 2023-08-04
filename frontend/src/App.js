import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Menu from "./layout/Menu";
import Navbar from "./layout/Navbar";
import Adduser from "./components/Adduser";
import NavRigas from "./layout/NavRigas";
import Runtest from "./components/Runtest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/mot-de-passe-oublie"
          element={
            <Navbar>
              <ForgetPasswordPage />
            </Navbar>
          }
        />
        <Route
          path="/reset-password/:activation_token"
          element={<Navbar child={<ChangePasswordPage />} />}
        />
        <Route path="/change" element={<NavRigas />} />
        <Route path="/adduser" element={<NavRigas child={<Adduser />} />} />
        <Route path="/menu" element={<NavRigas child={<Menu />} />} />
        <Route
          path="/accueil"
          element={<NavRigas child={<Menu child={<Runtest />} />} />}
        />
      </Routes>
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
}

export default App;
