import React, { useEffect, useState } from "react";
import api from "../../../api";

const UserForm = ({ addUser, updateUser, editUser, closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmail(editUser.email || "");
      setRoles(editUser.roles || "");
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password, roles };

    if (!editUser) {
      user.password = password;
    }

    try {
      if (editUser) {
        const response = await api.patch(`/api/manajemen-user/${editUser.id}`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        updateUser(response.data); // Memanggil fungsi updateUser dengan data yang diperbarui
      } else {
        const response = await api.post("/api/manajemen-user", user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        addUser(response.data); // Menambahkan pengguna baru
      }
      closeModal(); // Menutup modal setelah berhasil
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-md font-medium text-gray-700">Nama</label>
        <input
          type="text"
          className="mt-1 py-2 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mt-3">
        <label className="block text-md font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 py-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {!editUser && (
      <div className="mt-3">
        <label className="block text-md font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 py-2 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!editUser} // Required only for new user
        />
      </div>
      )}

      <div className="mt-3">
        <label className="block text-md font-medium text-gray-700">Role</label>
        <select
          className="mt-1 py-2 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          required
        >
          <option value="" disabled>
            Pilih role
          </option>
          <option value="DataAnalyst">Data Analyst</option>
          <option value="Operation">Operation</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2  text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-sm
           hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
          onClick={closeModal}
        >
          Batal
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-white bg-sky-500 border border-transparent rounded-sm hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          {editUser ? "Update User" : "Tambah User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
