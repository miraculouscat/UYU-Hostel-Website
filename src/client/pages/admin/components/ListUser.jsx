import React, { useState, useEffect, Fragment } from 'react';
import EditUser from './EditUser';
import RemoveUser from './RemoveUser';

function ListUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('/staff')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center min-h-screen">
        <table className="table mt-5 text-center">
          <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
            <tr>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">NIK</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Alamat</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Surel</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Telepon</th>
              <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.nik}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditUser user={user} />
                  <RemoveUser user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListUser;

// import React, { useState, useEffect, Fragment } from 'react';
// import EditUser from './EditUser';
// import RemoveUser from './RemoveUser';

// function ListUser() {
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     fetch('/staff')
//       .then(response => response.json())
//       .then(data => setUser(data))
//       .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <Fragment>
//       <table className="table mt-5 text-center">
//         <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
//           <tr>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Username</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">NIK</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Name</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Address</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Email</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Phone</th>
//             <th className="px-6 py-3 text-center text-l font-bold uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {user.map(user => (
//             <tr key={user.id}>
//               <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.nik}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <EditUser user={user} />
//                 <RemoveUser user={user} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Fragment>
//   );
// }

// export default ListUser;
