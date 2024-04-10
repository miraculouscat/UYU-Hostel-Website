import React from 'react';

function RemoveUser({ user }) {
  const removeUser = async () => {
    try {
      const response = await fetch(
        `/staff/${user.id}`,
        {
          method: "DELETE",
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
    <button
      type="button"
      className="w-32 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
      onClick={removeUser}
    >
      Hapus
    </button>
  );
}

export default RemoveUser;
