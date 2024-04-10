import React, { useState, useEffect, Fragment } from 'react';
import AddMaintenance from './AddMaintenance';

function ListRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('/room')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Fragment>
      <div className="overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <table className="table text-center w-full">
        <thead className="bg-gradient-to-r from-[#D2154E] to-[#EE2C27] text-white">
          <tr>
            <th className="px-24 py-3 text-center text-l font-bold uppercase tracking-wider">ID</th>
            <th className="px-24 py-3 text-center text-l font-bold uppercase tracking-wider">Ditandai</th>
            <th className="px-24 py-3 text-center text-l font-bold uppercase tracking-wider">Membuat Perbaikan</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{room.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.is_flagged ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <AddMaintenance disabled={room.is_flagged} roomId={room.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Fragment>
  );
};

export default ListRooms;
