import React, { useEffect, useState } from "react";
import PopupForm from "./PopupForm";
import api from "../../../api";
import { EditPopup, DeletePopup } from "./PopupCRUD";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const JadwaldanLokasi = () => {
  const [jadwals, setJadwals] = useState([]);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(null);
  const [deletePopup, setDeletePopup] = useState(null);

  const fetchDataJadwals = async () => {
    try {
      const response = await api.get('/api/dataJadwal');
      console.log("API response:", response.data); // Log the response to see its structure
      if (Array.isArray(response.data)) {
        setJadwals(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        // Handle paginated or nested array response
        setJadwals(response.data.data);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError(err.message || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchDataJadwals();
    const interval = setInterval(fetchDataJadwals, 5000); //Auto load data 5sec
    return () => clearInterval(interval);
  }, []);

  const handleSave = (updatedJadwal) => {
    setJadwals(jadwals.map(jadwal => jadwal.id === updatedJadwal.id ? updatedJadwal : jadwal));
  };

  const handleDelete = (id) => {
    setJadwals(jadwals.filter(jadwal => jadwal.id !== id));
    setDeletePopup(null);
  };

  return (
    <div>
      <div className="pl-4 mt-4 px-4 flex">
        <div className="font-bold text-neutral-700 text-xl">
          Jadwal dan Lokasi Pemeriksaan
          <p className="font-light mt-2 text-sm">
            Data Jadwal dan Lokasi Pemeriksaan
          </p>
        </div>
        <div className="pl-4 py-2.5 absolute right-4">
          <PopupForm />
        </div>
      </div>
      <div className="mx-4 shadow-md">
        <div className="mt-6 py-6 pl-4 bg-white rounded-md max-w-7xl mx-auto sm:px-3 lg:px-9">
          <div className="overflow-hidden rounded-sm">
            <table className="w-full">
              <thead className="bg-red-800 text-white">
                <tr>
                  <th scope="col" className="text-center">No.</th>
                  <th scope="col" className="text-center">Awal Pemeriksaan</th>
                  <th scope="col" className="text-center">Batas Pemeriksaan</th>
                  <th scope="col" className="text-center">Lokasi Feeder</th>
                  <th scope="col" className="text-center">Status</th>
                  <th style={{ width: "15%" }} className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <div className="alert alert-danger mb-0">
                        {error}
                      </div>
                    </td>
                  </tr>
                ) : jadwals.length > 0 ? (
                  jadwals.map((jadwal, index) => (
                    <tr key={index}>
                      <td scope="col" className="text-center">{index + 1}</td>
                      <td scope="col" className="text-center">{jadwal.awal_pemeriksaan}</td>
                      <td scope="col" className="text-center">{jadwal.batas_pemeriksaan}</td>
                      <td scope="col" className="text-center">{jadwal.lokasi_feeder}</td>
                      <td scope="col" className="text-center">{jadwal.status}</td>
                      <td scope="col" className="text-center flex justify-center">
                        <button
                          className="btn btn-sm btn-warning rounded-sm shadow border-0 mx-1"
                          onClick={() => setEditPopup(jadwal)}
                        >
                          <FaEdit className="h-5 w-5 text-yellow-500" />
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-sm shadow border-0 mx-1"
                          onClick={() => setDeletePopup(jadwal)}
                        >
                          <FaTrashAlt className="h-5 w-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <div className="alert alert-danger mb-0">
                        Data Belum Tersedia!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editPopup && (
        <EditPopup
          jadwal={editPopup}
          onClose={() => setEditPopup(null)}
          onSave={handleSave}
        />
      )}
      {deletePopup && (
        <DeletePopup
          jadwal={deletePopup}
          onClose={() => setDeletePopup(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default JadwaldanLokasi;
