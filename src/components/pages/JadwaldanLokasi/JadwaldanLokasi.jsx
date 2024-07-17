import React, { useEffect, useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import PopupForm from "./PopupForm";
import api from "../../../api";
import { EditPopup, DeletePopup } from "./PopupCRUD";
import { FaEdit, FaTrashAlt, FaFilter } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const JadwaldanLokasi = () => {
  const [jadwals, setJadwals] = useState([]);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(null);
  const [deletePopup, setDeletePopup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    month: "",
    year: "",
    feeder: "",
    status: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableFeeders, setAvailableFeeders] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataJadwals = useCallback(async (page = 1) => {
    try {
      const response = await api.get(`/api/dataJadwal?page=${page}`);
      console.log("API response:", response.data);
      if (response.data && Array.isArray(response.data.data)) {
        setJadwals(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);

        const uniqueYears = [
          ...new Set(
            response.data.data.map((jadwal) =>
              new Date(jadwal.awal_pemeriksaan).getFullYear()
            )
          ),
        ];
        setAvailableYears(uniqueYears);

        const uniqueFeeders = [
          ...new Set(
            response.data.data.map((jadwal) =>
            jadwal.lokasi_feeder ? jadwal.lokasi_feeder.lokasi_feeder : "N/A"
            )
          ),
        ];
        setAvailableFeeders(uniqueFeeders);

        const uniqueStatuses = [
          ...new Set(
            response.data.data.map((jadwal) =>
            jadwal.status
            )
          ),
        ];
        setAvailableStatuses(uniqueStatuses);

      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError(err.message || "Error fetching data");
    }
  }, []);

  useEffect(() => {
    fetchDataJadwals(currentPage);
    const interval = setInterval(() => fetchDataJadwals(currentPage), 15000);
    return () => clearInterval(interval);
  }, [fetchDataJadwals, currentPage]);

  const handleSave = useCallback((updatedJadwal) => {
    setJadwals((jadwals) =>
      jadwals.map((jadwal) =>
        jadwal.id === updatedJadwal.id ? updatedJadwal : jadwal
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setJadwals((jadwals) => jadwals.filter((jadwal) => jadwal.id !== id));
    setDeletePopup(null);
    setIsNotificationOpen(true);
    setTimeout(() => {
      setIsNotificationOpen(false);
    }, 2000);
  }, []);

  const filteredJadwals = useMemo(
    () =>
      jadwals.filter(
        (jadwal) =>
          (filter.month === "" ||
            new Date(jadwal.awal_pemeriksaan).getMonth() ===
              parseInt(filter.month)) &&
          (filter.year === "" ||
            new Date(jadwal.awal_pemeriksaan).getFullYear() ===
              parseInt(filter.year)) &&
          (filter.feeder === "" ||
            (jadwal.lokasi_feeder &&
              jadwal.lokasi_feeder.lokasi_feeder === filter.feeder)) &&
          (filter.status === "" ||
            jadwal.status === filter.status)
      ),
    [jadwals, filter]
  );

  const formatDate = (dateString, formatString) => {
    const date = new Date(dateString);
    return format(date, formatString, { locale: id });
  };

  const renderedJadwals = useMemo(
    () =>
      filteredJadwals.map((jadwal, index) => (
        <tr
          key={jadwal.id}
          className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
        >
          <td scope="col" className="text-center">
            {(currentPage - 1) * 10 + index + 1}
          </td>
          <td scope="col" className="text-center">
            {formatDate(jadwal.awal_pemeriksaan, "dd-MMMM-yyyy")}
          </td>
          <td scope="col" className="text-center">
            {formatDate(jadwal.batas_pemeriksaan, "dd-MMMM-yyyy")}
          </td>
          <td scope="col" className="text-center">
            {jadwal.lokasi_feeder ? jadwal.lokasi_feeder.lokasi_feeder : "N/A"}
          </td>
          <td scope="col" className="text-center">
            {jadwal.status}
          </td>
          <td scope="col" className="text-center flex justify-center">
            <button
              className="btn btn-sm btn-warning shadow border-0 mx-1"
              onClick={() => setEditPopup(jadwal)}
            >
              <FaEdit className="h-4 w-4 text-sky-600" />
            </button>
            <button
              className="btn btn-sm btn-danger shadow border-0 mx-1"
              onClick={() => setDeletePopup(jadwal)}
            >
              <FaTrashAlt className="h-4 w-4 text-red-500" />
            </button>
          </td>
        </tr>
      )),
    [filteredJadwals, currentPage]
  );

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="pl-4 mt-4 px-4">
        <div className="font-bold text-neutral-700 text-xl">
          Jadwal dan Lokasi Pemeriksaan
          <p className="font-light mt-2 text-sm">
            Data Jadwal dan Lokasi Pemeriksaan
          </p>
        </div>
        <div className="flex grid">
          <PopupForm></PopupForm>
        </div>
      </div>
      <div className="mx-4 shadow-md">
        <div className="mt-6 py-6 pl-4 bg-white rounded-md max-w-7xl mx-auto sm:px-3 lg:px-9">
          <div className="overflow-hidden rounded-sm">
            <div className="mb-4">
              <button
                className="btn btn-primary rounded-md flex items-center"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FaFilter
                  className="mr-1 text-sm"
                  style={{ color: "#404040" }}
                />
                <span className="text-md text-neutral-700">Filter</span>
              </button>
              {showFilter && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md text-sm">
                  <div className="grid grid-cols-4 gap-4">
                    <label className="flex flex-col">
                      <select
                        className="mt-1 p-2 border rounded-md"
                        onChange={(e) =>
                          handleFilterChange("year", e.target.value)
                        }
                      >
                        <option value="">Tahun</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col">
                      <select
                        className="mt-1 p-2 border rounded-md"
                        onChange={(e) =>
                          handleFilterChange("month", e.target.value)
                        }
                      >
                        <option value="">Bulan</option>
                        {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                          <option key={month} value={month}>
                            {format(new Date(0, month), "MMMM", { locale: id })}
                          </option>
                        ))}
                        {/* <option value="0">Januari</option>
                        <option value="1">Februari</option>
                        <option value="2">Maret</option>
                        <option value="3">April</option>
                        <option value="4">Mei</option>
                        <option value="5">Juni</option>
                        <option value="6">Juli</option>
                        <option value="7">Agustus</option>
                        <option value="8">September</option>
                        <option value="9">Oktober</option>
                        <option value="10">November</option>
                        <option value="11">Desember</option> */}
                      </select>
                    </label>
                    <label className="flex flex-col">
                      <select
                        className="mt-1 p-2 border rounded-md"
                        onChange={(e) => 
                          handleFilterChange("feeder", e.target.value)
                        }
                      >
                        <option value="">Lokasi Feeder</option>
                        {availableFeeders.map((feeder) => (
                          <option key={feeder} value={feeder}>
                            {feeder}
                          </option>
                        ))}
                      </select>
                      {/* <input
                        className="mt-1 p-2 border rounded-md"
                        type="text"
                        placeholder="Feeder"
                        value={filter.feeder}
                        onChange={(e) =>
                          handleFilterChange("feeder", e.target.value)
                        }
                      /> */}
                    </label>
                    <label className="flex flex-col">
                      <select
                        className="mt-1 p-2 border rounded-md"
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                      >
                        <option value="">Status</option>
                        {availableStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {/* <input
                        className="mt-1 p-2 border rounded-md"
                        type="text"
                        placeholder="Status"
                        value={filter.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                      /> */}
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-x-auto shadow-md ">
              <table className="table w-full">
                <thead>
                  <tr className="bg-white text-gray-700">
                    <th className="text-center">No</th>
                    <th className="text-center">Awal Pemeriksaan</th>
                    <th className="text-center">Batas Pemeriksaan</th>
                    <th className="text-center">Lokasi Feeder</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>{renderedJadwals}</tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm mt-4 space-x-2">
              <button
                className="text-sm btn btn-sm btn-primary flex items-center"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack className="mr-1" /> Previous
              </button>
              <span className="text-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="text-sm btn btn-sm btn-primary flex items-center"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <IoIosArrowForward className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {editPopup && (
        <EditPopup
          jadwal={editPopup}
          onSave={handleSave}
          onClose={() => setEditPopup(null)}
        />
      )}
      {deletePopup && (
        <DeletePopup
          jadwal={deletePopup}
          onDelete={handleDelete}
          onClose={() => setDeletePopup(null)}
        />
      )}
      {isNotificationOpen && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-2 bg-green-500 text-white rounded shadow-lg">
          <div className="flex items-center">
            <AiOutlineCheckCircle className="mr-2" />
            Data berhasil dihapus!
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwaldanLokasi;
