import React, { Fragment } from "react";
import { Link , Navigate} from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';
import "../../App.css";
import "tailwindcss/tailwind.css"

//components
import ListRoom from "./components/ListRoom";

function AdminRoom() {
  const redir = useNavigate();
  const auth = (Cookies.get("role") == "admin");
  const logout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("user")
    fetch("/auth/logout", {method : "GET", credentials : "same-origin"})
    redir("/index")
  }
  if (!auth){
    return <Navigate to ="/index"/>
  }
    return (
      <Fragment>
      <div className="pt-10">
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white font-inter font-bold">
          <div className="flex space-x-4 items-center">
          <Link to="/admin">
              <img
                src="..\src\client\assets\LogoUYU.png"
                alt="Logo"
                className="h-8 w-auto mr-4"
              />
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/admin/user" className="hover:underline text-2xl">Kelola Akun</Link>
              </li>
              <li>
                <Link to="/admin/maintenance" className="hover:underline text-2xl ml-2 mr-2">Perbaikan</Link>
              </li>
              <li>
                <Link to="/admin/report" className="hover:underline text-2xl ml-2 mr-2">Laporan</Link>
              </li>
            </ul>
          </div>
          <button className="hover:text-black text-2xl"  onClickCapture={logout}>Keluar</button>
        </nav>
      </div>
      <div className="container pt-20">
          <ListRoom />
      </div>
      </Fragment>
    );
  }

export default AdminRoom;