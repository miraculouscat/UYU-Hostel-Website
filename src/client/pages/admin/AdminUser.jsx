import React, { Fragment, useState } from "react";
import { Link , Navigate} from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';
import "../../App.css";
import "tailwindcss/tailwind.css";
import { FaPlus, FaMinus } from 'react-icons/fa';

//components
import AddUser from "./components/AddUser";
import ListUser from "./components/ListUser";

function AdminUser() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const toggleAddUser = () => {
    setIsAddUserOpen(!isAddUserOpen);
  };
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
      <div>
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-gradient-to-r bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white font-inter font-bold">
          <div className="flex space-x-4 items-center">
            <Link to="/admin">
              <img
                src="..\src\client\assets\UYUHostel2.png"
                alt="Logo"
                className="h-8 w-auto mr-4"
              />
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/admin/maintenance" className="hover:underline text-2xl">Perbaikan</Link>
              </li>
              <li>
                <Link to="/admin/report" className="hover:underline text-2xl ml-2 mr-2">Laporan</Link>
              </li>
              <li>
                <Link to="/admin/room" className="hover:underline text-2xl ml-2 mr-2">Kamar</Link>
              </li>
            </ul>
          </div>
          <button className="hover:text-black text-2xl"  onClickCapture={logout}>Keluar</button>
        </nav>
      </div>
      <div className="container pt-20">
        <div className="flex justify-center mb-8 pt-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-60 rounded"
            onClick={toggleAddUser}
          >
            <span className="flex items-center">
              {isAddUserOpen ? <FaMinus /> : <FaPlus />}
              <span className="ml-2">{isAddUserOpen ? 'Tutup Penambahanan Akun' : 'Buka Penambahan akun'}</span>
            </span>
          </button>
        </div>
        {isAddUserOpen && <AddUser />}
        <div className="flex flex-col items-center min-h-screen">
          <ListUser />
        </div>
      </div>
    </Fragment>
  );
}

export default AdminUser;


// import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
// import "../../App.css";
// import "tailwindcss/tailwind.css"

// //components
// import AddUser from "./components/AddUser";
// import ListUser from "./components/ListUser"

// function AdminUser() {
//     return (
//       <Fragment>
//         <div>
//         <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-gradient-to-r from-[#BB4430] to-[#BB6230] text-white font-inter font-bold">
//             <div className="flex space-x-4 items-center">
//             <Link to="/admin">
//                 <img
//                   src="..\src\client\assets\LogoUYU.png"
//                   alt="Logo"
//                   className="h-8 w-auto mr-4"
//                 />
//               </Link>
//               <ul className="flex space-x-4">
//                 <li>
//                   <Link to="/admin/maintenance" className="hover:underline text-2xl">Maintenance</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/report" className="hover:underline text-2xl ml-2 mr-2">Report</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/room" className="hover:underline text-2xl ml-2 mr-2">Kamar</Link>
//                 </li>
//               </ul>
//             </div>
//             <Link to="/admin" className="hover:underline text-2xl">
//               Logout
//             </Link>
//           </nav>
//         </div>
//         <div className="container pt-20">
//           <AddUser />
//           <ListUser />
//         </div>
//       </Fragment>
//     );
//   }

// export default AdminUser;