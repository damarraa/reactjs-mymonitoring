import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api";
import { FaArrowLeft, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PoleDetail = () => {
  const { feederId } = useParams();
  const [poles, setPoles] = useState([]);
  const [newPole, setNewPole] = useState({
    no_pole: "",
    koordinat_north: "",
    koordinat_east: "",
    lokasi_feeder_id: feederId,
  });
  const [showForm, setShowForm] = useState(false);
  const [editPoleId, setEditPoleId] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [editedPole, setEditedPole] = useState({
    id: null,
    no_pole: "",
    koordinat_north: "",
    koordinat_east: "",
    lokasi_feeder_id: null,
  });
  const [feederName, setFeederName] = useState(""); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [poleIdToDelete, setPoleIdToDelete] = useState(null);

  // State for notifications
  const [notification, setNotification] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const polesPerPage = 10;

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPolesByFeeder = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/api/dataPolesByFeeder/${feederId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPoles(response.data.data);

        const feederResponse = await api.get(`/api/dataFeeder/${feederId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeederName(feederResponse.data.lokasi_feeder);
      } catch (error) {
        console.error("There was an error fetching the poles!", error);
      }
    };

    fetchPolesByFeeder();
  }, [feederId]);

  const handleAddPole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/api/dataPoles", newPole, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPoles([...poles, response.data.data]);
      setNewPole({
        no_pole: "",
        koordinat_north: "",
        koordinat_east: "",
        lokasi_feeder_id: feederId,
      });
      setShowForm(false);
      setNotification("Pole berhasil ditambahkan!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("There was an error adding the pole!", error);
    }
  };

  const handleEditClick = (poleId) => {
    const selectedPole = poles.find((pole) => pole.id === poleId);
    setEditedPole({
      id: selectedPole.id,
      no_pole: selectedPole.no_pole,
      koordinat_north: selectedPole.koordinat_north,
      koordinat_east: selectedPole.koordinat_east,
      lokasi_feeder_id: selectedPole.lokasi_feeder_id,
    });
    setEditPoleId(poleId);
    setEditPopup(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/dataPoles/${editedPole.id}`, editedPole, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPoles = poles.map((pole) =>
        pole.id === editedPole.id ? editedPole : pole
      );
      setPoles(updatedPoles);
      setEditedPole({
        id: null,
        no_pole: "",
        koordinat_north: "",
        koordinat_east: "",
        lokasi_feeder_id: null,
      });
      setEditPopup(false);
      setNotification("Pole berhasil diubah!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error updating pole!", error);
    }
  };

  const handleDeletePole = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/dataPoles/${poleIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredPoles = poles.filter((pole) => pole.id !== poleIdToDelete);
      setPoles(filteredPoles);
      setShowDeleteConfirmation(false);
      setPoleIdToDelete(null);
      setNotification("Pole berhasil dihapus!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error deleting pole!", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedPole({
      id: null,
      no_pole: "",
      koordinat_north: "",
      koordinat_east: "",
      lokasi_feeder_id: null,
    });
    setEditPopup(false);
  };

  const confirmDeletePole = (id) => {
    setPoleIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDeletePole = () => {
    setPoleIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastPole = currentPage * polesPerPage;
  const indexOfFirstPole = indexOfLastPole - polesPerPage;
  const currentPoles = poles.slice(indexOfFirstPole, indexOfLastPole);
  const totalPages = Math.ceil(poles.length / polesPerPage);

  return (
    <div className="container mx-auto p-2">
      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/DataFeeder"
          className="font-medium text-md rounded-sm text-sky-500 flex items-center"
        >
          <FaArrowLeft className="mr-2"></FaArrowLeft>Data Feeder
        </Link>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
          <AiOutlineCheckCircle fontSize={80} className="text-green-500 animate-check" />
            {notification}
          </div>
        </div>
      )}

      {/* Popup Tambah data */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
            <h2 className="text-xl mb-4">Tambah Data Pole</h2>
            <label className="block mb-2">
              No. Pole:
              <input
                type="text"
                value={newPole.no_pole}
                onChange={(e) =>
                  setNewPole({ ...newPole, no_pole: e.target.value })
                }
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Koordinat North:
              <input
                type="text"
                value={newPole.koordinat_north}
                onChange={(e) =>
                  setNewPole({ ...newPole, koordinat_north: e.target.value })
                }
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Koordinat East:
              <input
                type="text"
                value={newPole.koordinat_east}
                onChange={(e) =>
                  setNewPole({ ...newPole, koordinat_east: e.target.value })
                }
                className="border p-2 w-full"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-sm mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleAddPole}
                className="bg-sky-500 text-white px-4 py-2 rounded-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Edit data */}
      {editPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
            <h2 className="text-xl mb-4 font-medium">Edit Data Pole</h2>
            <label className="block mb-2">
              No. Pole:
              <input
                type="text"
                value={editedPole.no_pole}
                onChange={(e) =>
                  setEditedPole({
                    ...editedPole,
                    no_pole: e.target.value,
                  })
                }
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Koordinat North:
              <input
                type="text"
                value={editedPole.koordinat_north}
                onChange={(e) =>
                  setEditedPole({
                    ...editedPole,
                    koordinat_north: e.target.value,
                  })
                }
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Koordinat East:
              <input
                type="text"
                value={editedPole.koordinat_east}
                onChange={(e) =>
                  setEditedPole({
                    ...editedPole,
                    koordinat_east: e.target.value,
                  })
                }
                className="border p-2 w-full"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-sm mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-sky-500 text-white px-4 py-2 rounded-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Konfirmasi Hapus */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelDeletePole}
                className="bg-gray-500 text-white px-4 py-2 rounded-sm mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleDeletePole}
                className="bg-red-500 text-white px-4 py-2 rounded-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-xl text-neutral-700 font-bold mb-4">
        Daftar Pole {feederName}
      </h1>

      {/* Search input */}
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded-sm flex items-center"
        >
          <FaPlus className="mr-2" />
          Data Pole
        </button>
      </div>
      
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white">
          <thead className="bg-white">
            <tr>
              <th className="py-2 px-4 border-b text-center">No.</th>
              <th className="py-2 px-4 border-b text-center">No. Pole</th>
              <th className="py-2 px-4 border-b text-center">Koordinat North</th>
              <th className="py-2 px-4 border-b text-center">Koordinat East</th>
              <th className="py-2 px-4 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentPoles.map((pole, index) => (
              <tr key={pole.id}>
                <td className="py-2 px-4 border-b text-center">{indexOfFirstPole + index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{pole.no_pole}</td>
                <td className="py-2 px-4 border-b text-center">{pole.koordinat_north}</td>
                <td className="py-2 px-4 border-b text-center">{pole.koordinat_east}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEditClick(pole.id)}
                    className="text-sky-500 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => confirmDeletePole(pole.id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center text-sm"
        >
          <IoIosArrowBack className="mr-2" />
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="flex items-center text-sm"
        >
          Next
          <IoIosArrowForward className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PoleDetail;
