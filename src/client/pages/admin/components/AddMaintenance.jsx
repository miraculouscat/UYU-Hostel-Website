import React, { useState } from 'react';

function AddMaintenance({ disabled, roomId }) {
  const [otherIssues, setOtherIssues] = useState('');
  const [issues, setIssues] = useState({
    'Atap bocor': false,
    'Sprei bermasalah': false,
    'Ruangan kurang bersih': false,
    'Terdapat stain di karpet': false,
    'Jendela berdebu': false,
  });
  const [showModal, setShowModal] = useState(false);

  const addMaintenance = async e => {
    e.preventDefault();
    try {
      const selectedIssues = Object.keys(issues).filter(issue => issues[issue]).join(', ');
      const allIssues = `${selectedIssues}${otherIssues ? (selectedIssues ? ', ' : '') + otherIssues : ''}`;
      const body = { room_id: roomId, description: allIssues };
      const response = await fetch(
        '/maintenance',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      const data = await response.json();
      console.log(data);
  
      const roomResponse = await fetch(
        `/room/${roomId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_flagged: true })
        }
      );
  
      const roomData = await roomResponse.json();
      console.log(roomData);
  
      window.location = "/admin/room"; 
    } catch (err) {
      console.error(err.message);
    }
  };
  

  const handleIssueChange = (event) => {
    setIssues({ ...issues, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <button
        type="button"
        className="px-4 py-2 mb-2 text-black border-2 border-black rounded-full hover:bg-gradient-to-r from-[#D2154E] to-[#EE2C27] hover:bg-gradient-to-r from-[#D2154E] to-[#EE2C27] hover:text-white"
        onClick={() => setShowModal(true)}
        disabled={disabled}
      >
        Buat Perbaikan baru
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
                <form onSubmit={addMaintenance}>
                {Object.keys(issues).map((issue, index) => (
                  <div key={index} className="mb-2">
                    <input type="checkbox" id={issue} name={issue} checked={issues[issue]} onChange={handleIssueChange} />
                    <label htmlFor={issue} className="ml-2">{issue}</label>
                  </div>
                ))}

                  <textarea placeholder="Masalah lainnya" value={otherIssues} onChange={(e) => setOtherIssues(e.target.value)} className="w-full h-64 p-3 border border-gray-300 rounded" />
                  <div className="flex items-start justify-center mt-6"> 
                  <button type="submit" className="mr-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>Cancel</button>
                  </div>    
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMaintenance;
