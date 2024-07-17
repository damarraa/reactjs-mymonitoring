import React, { useState, useEffect } from "react";
import { IoNotificationsOutline, IoRemoveOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import api from "../../../api";

const EditPopup = ({ jadwal, onClose, onSave }) => {
  const [formData, setFormData] = useState(jadwal);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [lokasiFeeders, setLokasiFeeders] = useState([]);

  useEffect(() => {
    const fetchLokasiFeeders = async () => {
      try {
        const response = await api.get("/api/dataFeeder");
        if (Array.isArray(response.data.data)) {
          setLokasiFeeders(response.data.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching lokasi_feeder data:", error);
      }
    };
    fetchLokasiFeeders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/api/dataJadwal/${jadwal.jadwal_id}`,
        formData
      );
      onSave(response.data);
      setIsNotificationOpen(true);
      setTimeout(() => {
        setIsNotificationOpen(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded-sm p-8 max-w-3xl w-full">
        <h2 className="text-base mb-4 font-bold txtcolor">
          Edit Jadwal dan Lokasi Pemeriksaan
        </h2>
        <hr className="mb-3" />
        <div className="bg-red-800 rounded-sm text-white flex p-3">
          <IoNotificationsOutline fontSize={25} className="ml-1 mt-1" />
          <div className="ml-3">
            <p className="font-bold text-sm">Perhatian!</p>
            <p className="text-xs">
              Pastikan pilihan jadwal dan lokasi pemeriksaan telah tepat sebelum
              disimpan.
            </p>
          </div>
        </div>
        <form className="mt-4 text-sm" onSubmit={handleSave}>
          <label className="block mb-2">Jadwal Pemeriksaan</label>
          <div className="flex font-light">
            <input
              type="date"
              name="awal_pemeriksaan"
              value={formData.awal_pemeriksaan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <IoRemoveOutline fontSize={40} />
            <input
              type="date"
              name="batas_pemeriksaan"
              value={formData.batas_pemeriksaan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          <label className="block mb-2">Lokasi Pemeriksaan</label>
          <select
            name="lokasi_feeder_id"
            value={formData.lokasi_feeder_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            {lokasiFeeders.length > 0 ? (
              lokasiFeeders.map((lokasi) => (
                <option key={lokasi.id} value={lokasi.id}>
                  {lokasi.lokasi_feeder}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>

          <label className="block mb-2">Status Pemeriksaan</label>
          <select
            className="w-full border rounded py-2 px-3 mb-4 font-light"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open" className="py-2 px-3">
              Open
            </option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-white hover:bg-neutral-200 border border-neutral-200 text-neutral-600 px-4 py-2 rounded mr-2 left-auto"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
      {isNotificationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
            <AiOutlineCheckCircle fontSize={80} className="text-green-500 animate-check" />
            <p className="text-lg font-bold mt-4">Data berhasil diubah!</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DeletePopup = ({ jadwal, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/api/dataJadwal/${jadwal.jadwal_id}`);
      onDelete(jadwal.jadwal_id);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4">
        <h2 className="text-xl font-bold mb-4">Hapus Jadwal</h2>
        <p className="mb-4">
          Apakah Anda yakin untuk menghapus {jadwal.lokasi_feeder.lokasi_feeder}?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Tidak
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditPopup, DeletePopup };
