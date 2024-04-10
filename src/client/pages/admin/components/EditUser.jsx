import React, { useState } from 'react';

function EditUser({ user }) {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [showModal, setShowModal] = useState(false);

  const updateUser = async e => {
    e.preventDefault();
    try {
      const body = { username, name, address, email, phone };
      const response = await fetch(
        `/staff/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const data = await response.json();
      console.log(data);
      window.location = "/admin/user";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="w-32 px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Edit
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
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Edit Akun Staf
                </h3>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={e => {
                    updateUser(e);
                    setShowModal(false);
                  }}
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setUsername(user.username);
                    setName(user.name);
                    setAddress(user.address);
                    setEmail(user.email);
                    setPhone(user.phone);
                    setShowModal(false);
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUser;
