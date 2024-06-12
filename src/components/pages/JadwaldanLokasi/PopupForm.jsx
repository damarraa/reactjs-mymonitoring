import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoNotificationsOutline, IoRemoveOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import check icon
import api from "../../../api";
import { useNavigate } from "react-router-dom";

function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [awal_pemeriksaan, setAwalPemeriksaan] = useState("");
  const [batas_pemeriksaan, setBatasPemeriksaan] = useState("");
  const [lokasi_feeder, setLokasiFeeder] = useState("");
  const [status, setStatus] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notification popup

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      awal_pemeriksaan,
      batas_pemeriksaan,
      lokasi_feeder,
      status,
    };

    try {
      await api.post("/api/dataJadwal", data);
      // Show notification popup
      setIsNotificationOpen(true);
      setTimeout(() => {
        setIsNotificationOpen(false);
        // Redirect after successful submission
        navigate("/JadwaldanLokasi");
      }, 2000); // Hide notification after 2 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Close the popup after submission
    togglePopup();
  };

  return (
    <div>
      <div className="flex relative mx-4">
        <FaPlus
          style={{ color: "#ffffff" }}
          fontSize={15}
          className="absolute justify-center top-2.5 left-2"
        />
        <button
          className="bg-sky-600 hover:bg-sky-800 text-white text-sm py-2 px-3 pl-7 rounded-sm"
          onClick={togglePopup}
        >
          Tambah Data
        </button>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-sm p-8 max-w-3xl w-full">
            <h2 className="text-base mb-4 font-bold txtcolor">
              Form Jadwal dan Lokasi Pemeriksaan
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
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="text-sm">
                <label className="block mb-2" htmlFor="awal_pemeriksaan">
                  Jadwal Pemeriksaan
                </label>
                <div className="flex font-light">
                  <input
                    className="w-full border rounded py-2 px-3 mb-3"
                    type="date"
                    id="awal_pemeriksaan"
                    name="awal_pemeriksaan"
                    value={awal_pemeriksaan}
                    onChange={(e) => setAwalPemeriksaan(e.target.value)}
                    required
                  />

                  <IoRemoveOutline fontSize={40} />

                  <input
                    className="w-full border rounded py-2 px-3 mb-3"
                    type="date"
                    id="batas_pemeriksaan"
                    name="batas_pemeriksaan"
                    value={batas_pemeriksaan}
                    onChange={(e) => setBatasPemeriksaan(e.target.value)}
                    required
                  />
                </div>

                <label className="block mb-2" htmlFor="lokasi_feeder">
                  Lokasi Pemeriksaan
                </label>
                <input
                  className="w-full border rounded py-2 px-3 mb-3 font-light"
                  type="text"
                  id="lokasi_feeder"
                  name="lokasi_feeder"
                  value={lokasi_feeder}
                  onChange={(e) => setLokasiFeeder(e.target.value)}
                  required
                />

                <label className="block mb-2" htmlFor="status">
                  Status Pemeriksaan
                </label>
                <select
                  className="w-full border rounded py-2 px-3 mb-3 font-light"
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Pilih Status Pemeriksaan
                  </option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex mt-3 ml-3 relative left-3/4 gap-3">
                <button
                  className="bg-white hover:bg-neutral-200 border border-neutral-200 text-neutral-600 text-sm py-2 px-4 rounded"
                  type="button"
                  onClick={togglePopup}
                >
                  Tutup
                </button>
                <button
                  className="bg-sky-600 hover:bg-sky-700 text-white text-sm py-2 px-4 rounded"
                  type="submit"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isNotificationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-sm p-4 flex items-center space-x-2">
            <AiOutlineCheckCircle fontSize={40} className="text-green-500" />
            <p className="text-base font-bold">Berhasil menyimpan!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupForm;
