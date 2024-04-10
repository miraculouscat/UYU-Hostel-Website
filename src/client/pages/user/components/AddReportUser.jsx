import React, { useState, useEffect } from 'react';

function AddReportUser({ maintenance }) {
  const [description, setDescription] = useState('');
  const [furtherAction, setFurtherAction] = useState('');
  const [reportExists, setReportExists] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/report/maintenance/${maintenance.id}`,{credentials : 'same-origin'})
      .then(response => response.json())
      .then(data => setReportExists(data.length > 0))
      .catch(error => console.error('Error:', error));
  }, [maintenance.id]);

  const addReport = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenance_id: maintenance.id, description, further_action: furtherAction }), credentials : 'same-origin'
      })
      
      const data = await response.json();
      console.log(data);
      window.location = "/user"; 
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`px-4 py-2 mb-2 text-white rounded ${maintenance.status === 'in_progress' && !maintenance.reportExists ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
        onClick={() => setShowModal(true)}
        disabled={maintenance.status !== 'in_progress' || reportExists}
      >
        Tulis Laporan
      </button>

      {showModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={addReport}>
                    <div><textarea placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full h-64 p-3 border border-gray-300 rounded" /> </div>
                    <div><textarea placeholder="Tindak Lanjut" value={furtherAction} onChange={(e) => setFurtherAction(e.target.value)} required className="w-full h-64 p-3 border border-gray-300 rounded" /> </div>
                    <div><button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Kirim</button>
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>Cancel</button> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <span>{reportExists ? '✅ Laporan' : '❌ Laporan'}</span>
    </div>
  );
};

export default AddReportUser;
