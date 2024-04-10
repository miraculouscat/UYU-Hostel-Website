import React, { Fragment } from "react";
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
import "../../App.css";
import "tailwindcss/tailwind.css"

//components
import ListMaintenanceUser from "./components/ListMaintenanceUser";

function UserApp() {
    const redir = useNavigate();
    const auth = Cookies.get("id");
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
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white font-inter font-bold">
          <h2 className="text-2xl">{"Halo, "+ Cookies.get('user') }</h2>
          {/* <Link to="/index" className="hover:text-black text-2xl">Logout</Link> */}
          <button className="hover:text-black text-2xl"  onClickCapture={logout}>Logout</button>
      </nav>
        <div className="container pt-20 overflow-hidden">
          <ListMaintenanceUser />
        </div>
      </Fragment>
    );
  }

export default UserApp;
