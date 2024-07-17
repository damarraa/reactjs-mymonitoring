import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { FaPlus } from "react-icons/fa";
import api from "../../../api";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get(`/api/manajemen-user?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching data users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    const intervalId = setInterval(() => fetchUsers(currentPage), 5000);
    return () => clearInterval(intervalId);
  }, [currentPage]);

  const addUser = (user) => {
    setUsers([...users, user]);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide message after 3 seconds
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowEditSuccessMessage(true);
    setTimeout(() => {
      setShowEditSuccessMessage(false);
    }, 3000); // Hide message after 3 seconds
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (roleFilter ? user.roles === roleFilter : true) &&
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center pl-4 mt-4 px-4">
        <div>
          <div className="font-bold text-neutral-700 text-xl">
            Manajemen User
          </div>
          <p className="font-light mt-2 text-sm">Data User</p>
        </div>
      </div>
      <div className="grid grid-cols-3 flex space-x-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700"></label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Pilih role</option>
            <option value="DataAnalyst">Data Analyst</option>
            <option value="Operation">Operation</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700"></label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama"
            className="mt-1 block w-full pl-3 pr-10 py-2 px-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div className=" flex justify-end">
          <button
            className="px-2 py-2 font-medium text-sm text-white rounded-sm bg-sky-500 hover:bg-sky-600 flex items-center"
            onClick={openModal}
          >
            <FaPlus className="mr-2" />
            Tambah User
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
            <AiOutlineCheckCircle
              fontSize={80}
              className="text-green-500 animate-check"
            />
            User berhasil ditambahkan!
          </div>
        </div>
      )}

      {showEditSuccessMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
            <AiOutlineCheckCircle
              fontSize={80}
              className="text-green-500 animate-check"
            />
            Data user berhasil diperbarui!
          </div>
        </div>
      )}

      <UserTable
        users={filteredUsers}
        openEditModal={openEditModal}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <UserForm addUser={addUser} closeModal={closeModal} />
      </Modal>
      <Modal isOpen={isEditModalOpen} closeModal={closeEditModal}>
        <UserForm
          editUser={editingUser}
          updateUser={updateUser}
          closeModal={closeEditModal}
        />
      </Modal>
    </div>
  );
};

export default ManajemenUser;
