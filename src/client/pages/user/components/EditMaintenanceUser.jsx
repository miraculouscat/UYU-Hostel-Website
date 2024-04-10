import React, { useState, useEffect } from 'react';

function EditMaintenanceUser({ maintenance }) {
  const [status, setStatus] = useState(maintenance.status);
  const [reportExists, setReportExists] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    fetch(`/report/maintenance/${maintenance.id}` , {credentials : 'same-origin'})
      .then(response => response.json())
      .then(data => setReportExists(data.length > 0))
      .catch(error => console.error('Error:', error));
  }, [maintenance.id]);

  const handleAccept = () => {
    
    fetch(`/maintenance/${maintenance.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'in_progress' } ), credentials : 'same-origin'
    })
      .then(response => response.json())
      .then(data => setStatus(data.status))
      .catch(error => console.error('Error:', error));
      window.location = "/user";
  };

  const handleFinish = () => {
    if (!reportExists) {
      setShowBanner(true);
    } else {
      setShowSuccessBanner(true);
      console.log("mamah")
      fetch(`/maintenance/${maintenance.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'finished' }) , credentials : 'same-origin'
      })
        .then(response => response.json())
        .then(data => {
          setStatus(data.status);
          setShowSuccessBanner(true);
          console.log("masuk ini")
        })
        .catch(error => console.error('Error:', error));
        
      fetch(
        `/room/${maintenance.room_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_flagged: false }) , credentials : 'same-origin'
        }
      )
        .then(roomResponse => roomResponse.json())
        .then(roomData => console.log(roomData))
        .catch(error => console.error('Error:', error));  
        
      window.location = "/user";
    }
  };
  
  return (
    <div>
      <button
        type="button"
        className={`px-4 py-2 mb-2 text-white rounded ${status === 'pending' ? 'bg-[#32CD32] hover:bg-green-500' : 'bg-[#B0B0B0] cursor-not-allowed'}`}
        onClick={handleAccept}
        disabled={status !== 'pending'}
      >
        Terima
      </button>
      <button
        type="button"
        className={`px-4 py-2 mb-2 text-white rounded ${status === 'in_progress' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
        onClick={handleFinish}
        disabled={status !== 'in_progress'}
      >
        Akhiri
      </button>
      {showBanner && (
        <div className="mt-2 px-4 py-2 text-white bg-red-500 rounded">
          Silakan tulis laporan sebelum mengeklik tombol finish
        </div>
      )}
      {showSuccessBanner && (
        <div className="mt-2 px-4 py-2 text-white bg-green-500 rounded">
          Maintenance telah diselesaikan, laporan dikirim
        </div>
      )}
    </div>
  );
};

export default EditMaintenanceUser;