import React from 'react';
import { Link , Navigate} from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';
const AdminHome = () => {
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
        <div>
            <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white font-inter font-bold">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl pl-4 sm:pl-0">Halo Admin!</h2>
                <button className="hover:text-black text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold pr-4 sm:pr-0"  onClickCapture={logout}>Keluar</button>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-1/4 md:pt-1/6 lg:pt-1/8">
                <img src="..\src\client\assets\UYUHostel1.png" alt="Logo" className="h-24 sm:h-36 md:h-44 w-auto my-8 sm:my-12" />
                <div className="flex flex-col space-y-4">
                    <Link to="/admin/user" className="px-16 sm:px-24 lg:px-32 py-2 bg-[#444444] text-white rounded hover:bg-gradient-to-r hover:from-[#D2154E] hover:to-[#EE2C27] hover:text-white">Kelola Akun</Link>
                    <Link to="/admin/maintenance" className="px-16 sm:px-24 lg:px-32 py-2 bg-[#444444] text-white rounded hover:bg-gradient-to-r hover:from-[#D2154E] hover:to-[#EE2C27] hover:text-white">Perbaikan</Link>
                    <Link to="/admin/report" className="px-16 sm:px-24 lg:px-32 py-2 bg-[#444444] text-white rounded hover:bg-gradient-to-r hover:from-[#D2154E] hover:to-[#EE2C27] hover:text-white">Laporan</Link>
                    <Link to="/admin/room" className="px-16 sm:px-24 lg:px-32 py-2 bg-[#444444] text-white rounded hover:bg-gradient-to-r hover:from-[#D2154E] hover:to-[#EE2C27] hover:text-white">Kamar</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const AdminNavbar = () => {
//     return (
//         <div>
        //     <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-[#BB4430] text-white font-inter font-bold">
        //         <h2 className="text-2xl">Halo Admin!</h2>
        //         <Link to="/admin" className="hover:underline text-2xl">Logout</Link>
        //     </nav>
        //     <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        //         <img src="..\src\client\assets\LogoUYUHostel.png" alt="Logo" className="h-44 w-auto mb-16" />
        //         <div className="flex flex-col space-y-4">
        //             <Link to="/admin/user" className="px-24 py-2 bg-[#393536] text-white rounded hover:bg-white hover:text-[#BB4430]">Kelola Akun</Link>
        //             <Link to="/admin/maintenance" className="px-24 py-2 bg-[#393536] text-white rounded hover:bg-white hover:text-[#BB4430]">Maintenance</Link>
        //             <Link to="/admin/report" className="px-24 py-2 bg-[#393536] text-white rounded hover:bg-white hover:text-[#BB4430]">Report</Link>
        //             <Link to="/admin/room" className="px-24 py-2 bg-[#393536] text-white rounded hover:bg-white hover:text-[#BB4430]">Kamar</Link>
        //         </div>
        //     </div>
        // </div>
//     );
// };

// export default AdminNavbar;




// import React from 'react';
// import { Link } from 'react-router-dom';

// const AdminNavbar = () => {
//     return (
        // <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-8 bg-[#393536] text-white font-inter font-bold">
        //     <div className="flex space-x-4 items-center">
        //         <img src="..\src\client\assets\LogoUYUHostel.png" alt="Logo" className="h-16 w-auto mr-4"/>
        //         <h2>Halo Admin!</h2>
        //         {/* <Link to="/admin/maintenance" className="hover:underline">Admin Maintenance</Link>
        //         <Link to="/admin/report" className="hover:underline">Admin Report</Link>
        //         <Link to="/admin/room" className="hover:underline">Admin Room</Link>
        //         <Link to="/admin/user" className="hover:underline">Admin User</Link> */}
        //     </div>
        //     <Link to="/admin" className="hover:underline">Logout</Link>
        // </nav>
        
//     );
// };

// export default AdminNavbar;
