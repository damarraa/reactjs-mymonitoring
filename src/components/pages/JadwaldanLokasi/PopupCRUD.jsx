import React, { useState } from "react";
import { IoNotificationsOutline, IoRemoveOutline } from "react-icons/io5";
import api from "../../../api";

const EditPopup = ({ jadwal, onClose, onSave }) => {
  const [formData, setFormData] = useState(jadwal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/api/dataJadwal/${jadwal.jadwal_id}`, formData);
      onSave(response.data); // Panggil fungsi onSave dengan data yang diperbarui dari respons API
    } catch (error) {
      console.error("Error updating form:", error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded-sm p-8 max-w-3xl w-full">
        <h2 className="text-base mb-4 font-bold txtcolor">
          Edit Jadwal dan Lokasi Pemeriksaan
        </h2>
        <hr className="mb-3" />
        <div className="bg-red-700 rounded-sm text-white flex p-3">
          <IoNotificationsOutline fontSize={25} className="ml-1 mt-1" />
          <div className="ml-3">
            <p className="font-bold text-sm">Perhatian!</p>
            <p className="text-xs">
              Pastikan pilihan jadwal dan lokasi pemeriksaan telah tepat
              sebelum disimpan.
            </p>
          </div>
        </div>
        <form className="mt-4" onSubmit={handleSave}>
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
          <input
            type="text"
            name="lokasi_feeder"
            value={formData.lokasi_feeder}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
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

          <button
            onClick={onClose}
            className="bg-white hover:bg-neutral-200 border border-neutral-200 text-neutral-600 px-4 py-2 rounded mr-2"
          >
            Tutup
          </button>
          <button
            type="submit" // Tambahkan type submit untuk memicu handleSave saat tombol disubmit
            className="bg-sky-600 hover:bg-sky-700 text-white text-sm py-2 px-4 rounded"
          >
            Simpan
          </button>
        </form>
        <div className="flex justify-end"></div>
      </div>
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
          Apakah Anda yakin untuk menghapus {jadwal.lokasi_feeder}?
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
