import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

const DataFeeder = () => {
  const [feeders, setFeeders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newFeeder, setNewFeeder] = useState({ lokasi_feeder: "" });
  const [editPopup, setEditPopup] = useState(false);
  const [editFeederId, setEditFeederId] = useState(null);
  const [editedFeeder, setEditedFeeder] = useState({
    id: null,
    lokasi_feeder: "",
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteFeederId, setDeleteFeederId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchFeeders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/dataFeeder", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeeders(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the feeders!", error);
      }
    };

    fetchFeeders();
  }, []);

  const handleAddFeeder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/api/dataFeeder",
        { lokasi_feeder: newFeeder.lokasi_feeder },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeeders([...feeders, response.data.data]);
      setShowPopup(false);
      setNewFeeder({ lokasi_feeder: "" });
      setNotification("Feeder berhasil ditambahkan!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("There was an error adding the feeder!", error);
    }
  };

  const handleEditClick = (feederId) => {
    const selectedFeeder = feeders.find((feeder) => feeder.id === feederId);
    setEditedFeeder({
      id: selectedFeeder.id,
      lokasi_feeder: selectedFeeder.lokasi_feeder,
    });
    setEditFeederId(feederId);
    setEditPopup(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/dataFeeder/${editedFeeder.id}`, editedFeeder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedFeeders = feeders.map((feeder) =>
        feeder.id === editedFeeder.id ? editedFeeder : feeder
      );
      setFeeders(updatedFeeders);
      setEditedFeeder({ id: null, lokasi_feeder: "" });
      setEditPopup(false);
      setNotification("Feeder berhasil diperbarui!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error updating feeder!", error);
    }
  };

  const handleDeleteClick = (feederId) => {
    setDeleteFeederId(feederId);
    setDeletePopup(true);
  };

  const handleDeleteFeeder = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/dataFeeder/${deleteFeederId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredFeeders = feeders.filter(
        (feeder) => feeder.id !== deleteFeederId
      );
      setFeeders(filteredFeeders);
      setDeletePopup(false);
      setDeleteFeederId(null);
    } catch (error) {
      console.error("Error deleting feeder!", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedFeeder({ id: null, lokasi_feeder: "" });
    setEditPopup(false);
  };

  const handleCancelDelete = () => {
    setDeletePopup(false);
    setDeleteFeederId(null);
  };

  return (
    <div>
      <div className="pl-4 mt-4 px-4">
        <div className="font-bold text-neutral-700 text-xl">
          Manajemen Feeder
          <p className="font-light mt-2 text-sm">Data Feeder</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowPopup(true)}
            className="mb-4 px-2 py-2 font-medium text-sm rounded-sm bg-sky-500 text-white ml-auto flex items-center"
          >
            <FaPlus></FaPlus>
            Tambah Feeder
          </button>
        </div>
        <div className="shadow-md">
          <div className="py-6 w-full bg-white rounded-sm lg:px-9">
            <table className="min-w-full bg-white">
              <thead className="bg-white text-neutral-700">
                <tr>
                  <th className="py-2 text-center">Nomor</th>
                  <th className="py-2 text-center">Nama Feeder</th>
                  <th className="py-2 text-center">Detail</th>
                  <th className="py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(feeders) &&
                  feeders.map((feeder, index) => (
                    <tr
                      key={feeder.id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-2 text-center">{index + 1}</td>
                      <td className="py-2 text-center">
                        {feeder.lokasi_feeder}
                      </td>
                      <td className="py-2 text-center">
                        <Link
                          to={`/DataFeeder/feeder/${feeder.id}`}
                          className="text-sky-500"
                        >
                          Lihat Pole
                        </Link>
                      </td>
                      <td className="py-2 text-center">
                        <button onClick={() => handleEditClick(feeder.id)}>
                          <FaEdit className="h-4 w-4 mr-1 text-sky-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(feeder.id)}
                          className="text-red-500"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Popup tambah feeder */}
            {showPopup && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-sm">
                <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
                  <h2 className="text-xl mb-4 font-medium">Tambah Feeder</h2>
                  <label className="block mb-2">
                    Nama Feeder:
                    <input
                      type="text"
                      value={newFeeder.lokasi_feeder}
                      onChange={(e) =>
                        setNewFeeder({
                          ...newFeeder,
                          lokasi_feeder: e.target.value,
                        })
                      }
                      className="border p-2 w-full"
                    />
                  </label>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-sm mr-2"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleAddFeeder}
                      className="bg-sky-500 text-white px-4 py-2 rounded-sm"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Popup edit feeder */}
            {editPopup && (
              <div className="fixed inset-0  bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
                  <h2 className="text-xl mb-4 font-medium">Edit Feeder</h2>
                  <label className="block mb-2 text-sm">
                    Nama Feeder:
                    <input
                      type="text"
                      value={editedFeeder.lokasi_feeder}
                      onChange={(e) =>
                        setEditedFeeder({
                          ...editedFeeder,
                          lokasi_feeder: e.target.value,
                        })
                      }
                      className="border p-2 w-full"
                    />
                  </label>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white text-sm px-4 py-2 rounded-sm mr-2"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="bg-sky-500 text-white text-sm px-4 py-2 rounded-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Popup hapus feeder */}
            {deletePopup && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
                  <p>Apakah Anda yakin ingin menghapus feeder ini?</p>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancelDelete}
                      className="bg-gray-500 text-white px-4 py-2 rounded-sm mr-2"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDeleteFeeder}
                      className="bg-red-500 text-white px-4 py-2 rounded-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
          <AiOutlineCheckCircle fontSize={80} className="text-green-500 animate-check" />
            {notification}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFeeder;
