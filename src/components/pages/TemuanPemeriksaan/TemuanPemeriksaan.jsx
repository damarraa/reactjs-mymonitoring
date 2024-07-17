import React, { useEffect, useState } from "react";
import api from "../../../api";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TemuanPemeriksaan = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    lokasiFeeder: "",
    status: "",
    noPole: "",
  });

  const [showFilter, setShowFilter] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/dataTemuan?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = response.data.data;
      setTotalPages(response.data.last_page);

      // Applying filters
      let filteredData = fetchedData;
      if (filters.year) {
        filteredData = filteredData.filter(
          (item) =>
            new Date(item.tanggal_temuan).getFullYear() ===
            parseInt(filters.year)
        );
      }

      if (filters.month) {
        filteredData = filteredData.filter(
          (item) =>
            new Date(item.tanggal_temuan).getMonth() + 1 ===
            parseInt(filters.month)
        );
      }

      if (filters.lokasiFeeder) {
        filteredData = filteredData.filter(
          (item) => item.lokasi_feeder === filters.lokasiFeeder
        );
      }

      if (filters.status) {
        filteredData = filteredData.filter(
          (item) => item.status === filters.status
        );
      }

      if (filters.noPole) {
        filteredData = filteredData.filter((item) =>
          item.no_pole.toLowerCase().includes(filters.noPole.toLowerCase())
        );
      }

      setData(filteredData);

      // Fetching users
      const uniqueUserIds = [
        ...new Set(filteredData.map((row) => row.user_id)),
      ];

      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const userResponse = await api.get(`/api/dataUsers/${userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            setUsers((prevUsers) => ({
              ...prevUsers,
              [userId]: userResponse.data.name,
            }));
          } catch (error) {
            console.error(`Failed to fetch user ${userId}`, error);
          }
        })
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to fetch data");
    }
  };

  const formatDate = (dateString, formatString) => {
    const date = new Date(dateString);
    return format(date, formatString, { locale: id });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseImage}
        >
          <img
            src={enlargedImage}
            alt="Enlarged Temuan"
            className="max-w-full max-h-full"
          />
        </div>
      )}
      <div className="pl-4 mt-4 px-4">
        <div className="font-bold text-neutral-700 text-xl">
          Laporan Temuan Pemeriksaan
          <p className="font-light mt-2 text-sm">
            Data Laporan Temuan Pemeriksaan
          </p>
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
                  <div className="grid grid-cols-5 gap-4">
                    <select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Tahun</option>
                      {Array.from(
                        new Set(
                          data.map((item) =>
                            new Date(item.tanggal_temuan).getFullYear()
                          )
                        )
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      name="month"
                      value={filters.month}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Bulan</option>
                      {[...Array(12).keys()].map((month) => (
                        <option key={month + 1} value={month + 1}>
                          {new Date(0, month).toLocaleString("id", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    <select
                      name="lokasiFeeder"
                      value={filters.lokasiFeeder}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Lokasi Feeder</option>
                      {Array.from(
                        new Set(data.map((item) => item.lokasi_feeder))
                      )
                        .sort() // Menambahkan sort() untuk mengurutkan secara default
                        .map((lokasiFeeder) => (
                          <option key={lokasiFeeder} value={lokasiFeeder}>
                            {lokasiFeeder}
                          </option>
                        ))}
                    </select>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Status</option>
                      {Array.from(new Set(data.map((item) => item.status))).map(
                        (status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    <input
                      type="text"
                      name="noPole"
                      value={filters.noPole}
                      onChange={handleFilterChange}
                      placeholder="Cari No Pole"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-sm">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-white text-neutral-700">
                <tr>
                  <th className="py-2 px-4 border-b text-center">No.</th>
                  <th className="py-2 px-4 border-b text-center">
                    Tanggal Temuan
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    Lokasi Feeder
                  </th>
                  <th className="py-2 px-4 border-b text-center">No Pole</th>
                  <th className="py-2 px-4 border-b text-center">
                    Equipment Type
                  </th>
                  <th className="py-2 px-4 border-b text-center">Finding</th>
                  <th className="py-2 px-4 border-b text-center">Pengirim</th>
                  <th className="py-2 px-4 border-b text-center">Gambar</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.temuan_id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border-b text-center">{index + 1}</td>
                    <td className="border-b text-center">
                      {formatDate(row.tanggal_temuan, "dd-MMMM-yyyy")}
                    </td>
                    <td className="border-b text-center">
                      {row.lokasi_feeder}
                    </td>
                    <td className="border-b text-center">{row.no_pole}</td>
                    <td className="border-b text-center">
                      {row.equipment_type}
                    </td>
                    <td className="border-b text-center">{row.finding}</td>
                    <td className="border-b text-center">
                      {users[row.user_id] || "-"}
                    </td>
                    <td className="border-b text-center">
                      {row.gambar &&
                        row.gambar.map((imageUrl, i) => (
                          <div key={i} className="max-w-xs h-auto">
                            {imageUrl ? (
                              <img
                                src={`http://localhost:8000/uploads/temuans/${imageUrl}`}
                                alt={`Foto Temuan ${i + 1}`}
                                className="w-full h-auto cursor-pointer"
                                onClick={() =>
                                  handleImageClick(
                                    `http://localhost:8000/uploads/temuans/${imageUrl}`
                                  )
                                }
                              />
                            ) : (
                              <span>Gambar tidak tersedia</span>
                            )}
                          </div>
                        ))}
                    </td>
                    <td className="border-b text-center">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-primary flex items-center text-sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <IoIosArrowBack />
                Previous
              </button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-primary flex items-center text-sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemuanPemeriksaan;
