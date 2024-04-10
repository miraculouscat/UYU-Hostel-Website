import React, { useState, useEffect, Fragment } from 'react';
import 'typeface-inter';

function ListMaintenance() {
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    fetch('/maintenance')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => item.status === 'pending' || item.status === 'in_progress');
        const promises = filteredData.map(item => 
          fetch(`/staff/${item.staff_id}`)
            .then(response => response.json())
            .then(staff => ({ ...item, staffName: staff.name }))
        );
        Promise.all(promises)
          .then(results => setMaintenance(results))
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center min-h-screen pt-20 px-4 sm:px-0">
        <div className="overflow-x-auto w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <table className="table text-center w-full sm:w-4/5 mx-auto">
            <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
              <tr>
                <th className="px-4 sm:px-12 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
                <th className="px-4 sm:px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-48 py-3 text-center text-l font-bold uppercase tracking-wider">Deskripsi</th>
                <th className="px-4 sm:px-24 py-3 text-center text-l font-bold uppercase tracking-wider">Nama Staf</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenance.map((item, index) => (
                <tr key={index} className="align-middle">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-lg">{item.id}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-lg font-medium">
                    <span
                      className={`inline-block rounded-full px-4 sm:px-8 py-2`}
                      style={{
                        backgroundColor: item.status === "pending" ? "#FFF44F" : "#32CD32",
                        color: "black"
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-24 py-4 whitespace-nowrap text-lg">{item.description}</td>
                  <td className="px-4 sm:px-24 py-4 whitespace-nowrap text-lg">{item.staffName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListMaintenance;




// import React, { useState, useEffect, Fragment } from 'react';

// function ListMaintenance() {
//   const [maintenance, setMaintenance] = useState([]);

//   useEffect(() => {
//     fetch('/maintenance')
//       .then(response => response.json())
//       .then(data => {
//         const filteredData = data.filter(item => item.status === 'pending' || item.status === 'in_progress');
//         const promises = filteredData.map(item => 
//           fetch(`/staff/${item.staff_id}`)
//             .then(response => response.json())
//             .then(staff => ({ ...item, staffName: staff.name }))
//         );
//         Promise.all(promises)
//           .then(results => setMaintenance(results))
//           .catch(error => console.error('Error:', error));
//       })
//       .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <Fragment>
//       <div className="overflow-hidden">
//         <table className="table mt-5 text-center w-4/5 mx-auto">
//           <thead className="bg-gradient-to-r from-[#BB4430] to-[#EE2C27] text-white">
//             <tr>
//               <th className="px-24 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
//               <th className="px-24 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
//               <th className="px-48 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
//               <th className="px-24 py-3 text-left text-xs font-medium uppercase tracking-wider">Staff Name</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {maintenance.map((item, index) => (
//               <tr key={index} className="align-middle">
//                 <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-block rounded-full px-2 py-1 ${
//                       item.status === "pending"
//                         ? "bg-yellow-400 text-yellow-800"
//                         : "bg-green-400 text-green-800"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-12 py-4 whitespace-nowrap">{item.description}</td>
//                 <td className="px-24 py-4 whitespace-nowrap text-lg">{item.staffName}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* <table className="table mt-5 text-center">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {maintenance.map((item, index) => (
//             <tr key={index}>
//               <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{item.staffName}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </Fragment>
//   );
// };

// export default ListMaintenance;
