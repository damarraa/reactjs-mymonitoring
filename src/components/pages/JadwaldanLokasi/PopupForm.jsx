import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoNotificationsOutline, IoRemoveOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [awal_pemeriksaan, setAwalPemeriksaan] = useState("");
  const [batas_pemeriksaan, setBatasPemeriksaan] = useState("");
  const [lokasi_feeder, setLokasiFeeder] = useState("");
  const [status, setStatus] = useState("");
  const [lokasiFeederList, setLokasiFeederList] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLokasiFeeder = async () => {
      try {
        const response = await api.get("/api/dataFeeder", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data && Array.isArray(response.data.data)) {
          setLokasiFeederList(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching lokasi feeder data:", error);
      }
    };

    fetchLokasiFeeder();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setAwalPemeriksaan("");
    setBatasPemeriksaan("");
    setLokasiFeeder("");
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      awal_pemeriksaan,
      batas_pemeriksaan,
      lokasi_feeder_id: lokasi_feeder, // Pastikan ini adalah ID
      status,
    };

    console.log("Data yang akan dikirim:", data); // Tambahkan ini untuk melihat data yang akan dikirim

    try {
      const response = await api.post("/api/dataJadwal", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response: ", response.data);
      setIsNotificationOpen(true);
      resetForm(); // Reset form setelah berhasil menambahkan data
      setTimeout(() => {
        setIsNotificationOpen(false);
        navigate("/JadwaldanLokasi");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }

    togglePopup();
  };

  return (
    <div>
      <div className="flex justify-center md:justify-start mx-4">
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm py-2 px-3 rounded-sm ml-auto flex items-center"
          onClick={togglePopup}
        >
          <FaPlus className="mr-2" />
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
                <select
                  className="w-full border rounded py-2 px-3 mb-3 font-light"
                  id="lokasi_feeder"
                  name="lokasi_feeder"
                  value={lokasi_feeder}
                  onChange={(e) => setLokasiFeeder(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Pilih Lokasi Feeder
                  </option>
                  {lokasiFeederList.map((feeder) => (
                    <option key={feeder.id} value={feeder.id}>
                      {feeder.lokasi_feeder}
                    </option>
                  ))}
                </select>
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
              <div className="flex mt-3 justify-end gap-3">
                <button
                  className="bg-white hover:bg-neutral-200 border border-neutral-200 text-neutral-600 text-sm py-2 px-4 rounded"
                  type="button"
                  onClick={togglePopup}
                >
                  Tutup
                </button>
                <button
                  className="bg-sky-500 hover:bg-sky-600 text-white text-sm py-2 px-4 rounded"
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
            <AiOutlineCheckCircle
              fontSize={80}
              className="text-green-500 animate-check"
            />
            <p className="text-lg font-bold mt-4">Data berhasil disimpan!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupForm;
