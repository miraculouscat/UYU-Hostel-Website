import React, { useState, useEffect, Fragment } from 'react';

function ListReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/report')
      .then(response => response.json())
      .then(data => {
        const promises = data.map(report => 
          fetch(`/maintenance/${report.maintenance_id}`)
            .then(response => response.json())
            .then(maintenance => 
              fetch(`/staff/${maintenance.staff_id}`)
                .then(response => response.json())
                .then(staff => ({ ...report, staffName: staff.name, roomId: maintenance.room_id }))
            )
        );
        Promise.all(promises)
          .then(results => setReports(results))
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
<Fragment>
      <div className="overflow-x-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
        <table className="table mt-5 text-center w-full sm:w-auto">
          <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
              <th className="px-2 sm:px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Waktu Pembuatan</th>
              <th className="px-2 sm:px-4 py-3 text-center text-l font-bold uppercase tracking-wider">ID Ruangan</th>
              <th className="px-2 sm:px-4 py-3 text-center text-l font-bold uppercase tracking-wider">ID Perbaikan</th>
              <th className="px-2 sm:px-8 py-3 text-center text-l font-bold uppercase tracking-wider">Nama Staf</th>
              <th className="px-2 sm:px-12 py-3 text-center text-l font-bold uppercase tracking-wider">Deskripsi</th>
              <th className="px-2 sm:px-8 py-3 text-center text-l font-bold uppercase tracking-wider">Tindak Lanjut</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="px-2 sm:px-4 py-4 whitespace-nowrap">{report.id}</td>
                <td className="px-2 sm:px-12 py-4 whitespace-nowrap">{new Date(report.created_at).toLocaleDateString()}</td>
                <td className="px-2 sm:px-4 py-4 whitespace-nowrap">{report.roomId}</td>
                <td className="px-2 sm:px-4 py-4 whitespace-nowrap">{report.maintenance_id}</td>
                <td className="px-2 sm:px-8 py-4 whitespace-nowrap">{report.staffName}</td>
                <td className="px-2 sm:px-12 py-4 whitespace-pre-warp">{report.description}</td>
                <td className="px-2 sm:px-8 py-4 whitespace-pre-wrap">{report.further_action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListReport;
