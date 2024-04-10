import React, { useState, useEffect, Fragment } from 'react';
import Cookies from "js-cookie";
import EditMaintenanceUser from './EditMaintenanceUser';
import AddReportUser from './AddReportUser';

function ListMaintenanceUser() {
  const [maintenances, setMaintenances] = useState([]);
  const staff_id = Cookies.get("id"); 

  useEffect(() => {
    fetch(`/maintenance/staff/${staff_id}`,{credentials : 'same-origin'})
    .then(response => response.json())
    .then(data => {
        const filteredData = data.filter(item => item.status === 'pending' || item.status === 'in_progress');
        const promises = filteredData.map(item => 
        fetch(`/staff/${staff_id}`,{credentials : 'same-origin'})
            .then(response => response.json())
            .then(staff => ({ ...item, staffName: staff.name }))
        );
        Promise.all(promises)
        .then(results => setMaintenances(results))
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center min-h-screen pt-20">
        <div className="overflow-hidden w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <table className="table text-center mx-auto">
            <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
              <tr>
                <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">ID Kamar</th>
                <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Status</th>
                <th className="px-24 py-3 text-center text-l font-bold uppercase tracking-wider">Deskripsi</th>
                <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Aksi</th>
                <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Status Laporan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {maintenances.map((maintenance, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.room_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{maintenance.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><EditMaintenanceUser maintenance={maintenance} /></td>
                    <td className="px-6 py-4 whitespace-nowrap"><AddReportUser maintenance={maintenance} /></td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ListMaintenanceUser;

// import React, { useState, useEffect, Fragment } from 'react';

// import EditMaintenanceUser from './EditMaintenanceUser';
// import AddReportUser from './AddReportUser';

// function ListMaintenanceUser() {
//   const [maintenances, setMaintenances] = useState([]);
//   const staff_id = 3; // RADIT TOLONG NANTI GANTI INI GW BUAT SEMENTARA DOANG OKE

//   useEffect(() => {
//     fetch(`/maintenance/staff/${staff_id}`)
//     .then(response => response.json())
//     .then(data => {
//         const filteredData = data.filter(item => item.status === 'pending' || item.status === 'in_progress');
//         const promises = filteredData.map(item => 
//         fetch(`/staff/${staff_id}`)
//             .then(response => response.json())
//             .then(staff => ({ ...item, staffName: staff.name }))
//         );
//         Promise.all(promises)
//         .then(results => setMaintenances(results))
//         .catch(error => console.error('Error:', error));
//     })
//     .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <Fragment>
//       <div div className="overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
//         <table className="table text-center mx-auto">
//           <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
//             <tr>
//               <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
//               <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Room ID</th>
//               <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Status</th>
//               <th className="px-24 py-3 text-center text-l font-bold uppercase tracking-wider">Description</th>
//               <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Action</th>
//               <th className="px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Report Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//               {maintenances.map((maintenance, index) => (
//                   <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">{maintenance.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{maintenance.room_id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{maintenance.status}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{maintenance.description}</td>
//                   <td className="px-6 py-4 whitespace-nowrap"><EditMaintenanceUser maintenance={maintenance} /></td>
//                   <td className="px-6 py-4 whitespace-nowrap"><AddReportUser maintenance={maintenance} /></td>
//                   </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </Fragment>
//   );
// };

// export default ListMaintenanceUser;
