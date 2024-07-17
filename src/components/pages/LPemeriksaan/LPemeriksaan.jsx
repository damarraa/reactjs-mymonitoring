import React, { useEffect, useState } from "react";
import api from "../../../api";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Lpemeriksaan = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [subTables, setSubTables] = useState({});
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // State untuk total halaman
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [users, setUsers] = useState({});
  const [feeders, setFeeders] = useState({});
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      const token = localStorage.getItem("token");
      try {
        const feedersResponse = await api.get("/api/dataFeeder", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!Array.isArray(feedersResponse.data.data)) {
          console.error(
            "Response lokasiFeeder bukan array:",
            feedersResponse.data
          );
        } else {
          const feederData = feedersResponse.data.data.reduce((acc, feeder) => {
            acc[feeder.id] = feeder.lokasi_feeder;
            return acc;
          }, {});
          setFeeders(feederData);
        }

        const result = await api.get(`/api/dataPemeriksaan?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (result.data && Array.isArray(result.data.data)) {
          console.log("Data fetched:", result.data.data); // Add log here
          setData(result.data.data);
          setCurrentPage(result.data.current_page); // Update current page
          setTotalPages(result.data.last_page); // Update total pages

          const uniqueUserIds = [
            ...new Set(result.data.data.map((row) => row.user_id)),
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
        } else {
          console.error(
            "Data yang diambil bukan array atau tidak ada key 'data'"
          );
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData(currentPage); // Fetch data when currentPage changes
  }, [currentPage]); // Fetch data when currentPage changes

  const toggleSubTable = (index) => {
    setSubTables((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleStatus = async (pemeriksaan_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.patch(
        `/api/dataPemeriksaan/${pemeriksaan_id}/toggleStatus`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData((prevData) =>
        prevData.map((row) =>
          row.pemeriksaan_id === pemeriksaan_id
            ? { ...row, status: response.data.status }
            : row
        )
      );
      setModalData(null);
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const formatDate = (dateString, formatString) => {
    const date = new Date(dateString);
    return format(date, formatString, { locale: id });
  };

  const getUniqueYears = () => {
    const years = data.map((row) =>
      new Date(row.tanggal_pemeriksaan).getFullYear()
    );
    return [...new Set(years)];
  };

  const getUniqueMonths = () => {
    const months = data
      .filter((row) =>
        selectedYear
          ? new Date(row.tanggal_pemeriksaan).getFullYear() ===
            parseInt(selectedYear)
          : true
      )
      .map((row) => new Date(row.tanggal_pemeriksaan).getMonth());
    return [...new Set(months)];
  };

  const filteredData = data.filter((row) => {
    const rowYear = new Date(row.tanggal_pemeriksaan).getFullYear();
    const rowMonth = new Date(row.tanggal_pemeriksaan).getMonth();
    return (
      (selectedYear ? rowYear === parseInt(selectedYear) : true) &&
      (selectedMonth ? rowMonth === parseInt(selectedMonth) : true)
    );
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
  };

  const handleOpenModal = (row) => {
    setModalData(row);
  };

  const handleCloseModal = () => {
    setModalData(null);
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
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <p>Apakah Anda yakin untuk menyelesaikan pekerjaan?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-sm text-sm mt-2"
              >
                Kembali
              </button>
              <button
                onClick={() => toggleStatus(modalData.pemeriksaan_id)}
                className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-sm text-sm ml-2 mt-2"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pl-4 mt-4 px-4">
        <div className="font-bold text-neutral-700 text-xl">
          Laporan Pemeriksaan
          <p className="font-light mt-2 text-sm">Data Laporan Pemeriksaan</p>
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
                <div className="flex grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">Pilih Tahun</option>
                      {getUniqueYears().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Pilih Bulan</option>
                      {getUniqueMonths().map((month) => (
                        <option key={month} value={month}>
                          {new Date(0, month).toLocaleString("id-ID", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-center">Expand</th>
                  <th className="py-2 px-4 border-b text-center">No</th>
                  <th className="py-2 px-4 border-b text-center">
                    Lokasi Feeder
                  </th>
                  <th className="py-2 px-4 border-b text-center">No. Pole</th>
                  <th className="py-2 px-4 border-b text-center">Tanggal</th>
                  <th className="py-2 px-4 border-b text-center">Pengirim</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                  <React.Fragment key={row.pemeriksaan_id}>
                    <tr
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => toggleSubTable(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          +
                        </button>
                      </td>
                      <td className="border-b text-center">
                        {index + 1 + (currentPage - 1) * 10}
                      </td>
                      <td className="border-b text-center">
                        {feeders[row.lokasi_feeder] || "-"}
                      </td>
                      <td className="border-b text-center">{row.no_pole}</td>
                      <td className="border-b text-center">
                        {formatDate(row.tanggal_pemeriksaan, "dd-MMMM-yyyy")}
                      </td>
                      <td className="border-b text-center">
                        {users[row.user_id] || "-"}
                      </td>
                      <td className="border-b text-center">
                        <button
                          onClick={() => handleOpenModal(row)}
                          className={`${
                            row.status === "Open"
                              ? "bg-green-500 hover:bg-green-700"
                              : "bg-red-500 hover:bg-red-700"
                          } text-white py-1 px-4 rounded-full text-xs`}
                        >
                          {row.status}
                        </button>
                      </td>
                    </tr>
                    {subTables[index] && (
                      <tr>
                        <td colSpan="7" className="py-2 px-4 border-b">
                          <div className="w-full h-full flex flex-col">
                            <table className="w-full h-full bg-gray-100 border border-gray-200 table-auto">
                              <tr>
                                <th className="py-1 px-4 border-b border-r w-1/2">
                                  Nomor Tiang
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.no_pole}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Nomor Tiang
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_no_pole}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Level HCA
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.level_hca}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Koordinat GPS
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  N
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.koordinat_north}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  E
                                </th>
                                <td className="py-1 px-4">
                                  {row.koordinat_east}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r w-1/3">
                                  Tipe Tiang
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.tipe_tiang}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Tiang Bagian Atas &gt; 1m dari tanah
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_bagian_atas}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Tiang Bagian Bawah &lt; 1m dari tanah
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_bagian_bawah}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Cross Arm
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_cross_arm}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Pole Guy
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_guy_pole}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Tanah pada Tiang
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_tanah}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Kemiringan Tiang
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kemiringan_tanah}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Apakah Tiang sudah di-sleeve?
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.tiang_sleeve}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Apakah Tiang Guy sudah di-sleeve? *Jika Ada
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {/* Value Ya/Tidak */}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="4"
                                >
                                  Peralatan pada Tiang
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Peralatan
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.peralatan_tiang}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4">
                                  {row.kondisi_tiang}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Serial Number
                                </th>
                                <td className="py-1 px-4">
                                  {row.serial_number_tiang}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kapasitas
                                </th>
                                <td className="py-1 px-4">
                                  {row.kapasitas_tiang}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="3"
                                >
                                  13.8kV Pin Insulator
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Tipe
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.tipe_pin_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4">
                                  {row.kondisi_pin_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_pin_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  13.8kV Dead End Insulator
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_dead_end_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_dead_end_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  13.8kV Suspension Insulator
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_suspension_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_suspension_insulator}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="3"
                                >
                                  Lightning Arrester
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Tipe
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.tipe_lightning_arrester}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4">
                                  {row.kondisi_lightning_arrester}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_lightning_arrester}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Kawat Guy
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_kawat_guy}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_kawat_guy}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Static Wire
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_static_wire}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Kabel Fiber Optic
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_fiber_optic}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Pole Guard pada Tiang
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_pole_guard}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_pole_guard}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="3"
                                >
                                  Kondisi Vegetasi
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Tipe
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.tipe_tumbuhan}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Tinggi *m
                                </th>
                                <td className="py-1 px-4">
                                  {row.tinggi_tumbuhan}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_tumbuhan}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Kondisi Land Encroachment
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Tipe
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.tipe_lec}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">{row.jumlah_lec}</td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="3"
                                >
                                  Kondisi Akses ke Tiang
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Pekerja
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.akses_pekerja}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kendaraan Besar
                                </th>
                                <td className="py-1 px-4">
                                  {row.akses_kendaraan_besar}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Kendaraan Kecil
                                </th>
                                <td className="py-1 px-4">
                                  {row.akses_kendaraan_kecil}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Stiker Peringatan
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_stiker_peringatan}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Papan Peringatan Publik
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_papan_peringatan_publik}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_papan_peringatan_publik}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  className="py-1 px-4 border-r border-b"
                                  rowSpan="2"
                                >
                                  Papan Peringatan Bahaya
                                </th>
                                <th className="py-1 px-4 border-r border-b">
                                  Kondisi
                                </th>
                                <td className="py-1 px-4 border-r border-b">
                                  {row.kondisi_papan_peringatan_bahaya}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-r border-b">
                                  Jumlah
                                </th>
                                <td className="py-1 px-4">
                                  {row.jumlah_papan_peringatan_bahaya}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Anti Climbing
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.kondisi_kawat_duri}
                                </td>
                              </tr>
                              {/* <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Aktivitas di Bawah Span *Konduktor
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.aktifitas_konduktor}
                                </td>
                              </tr> */}
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Kondisi Bangunan di bawah Konduktor
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.tipe_konduktor}
                                </td>
                              </tr>
                              {/* sisipkan code image saya dibawah ini */}
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Foto Finding
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.foto_finding && (
                                    <img
                                      src={`http://127.0.0.1:8000/uploads/foto_findings/${row.foto_finding}`}
                                      alt="Foto Finding"
                                      className="w-full h-auto cursor-pointer"
                                      onClick={() =>
                                        handleImageClick(
                                          `http://127.0.0.1:8000/uploads/foto_findings/${row.foto_finding}`
                                        )
                                      }
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-1 px-4 border-b border-r">
                                  Keterangan
                                </th>
                                <td className="py-1 px-4 border-b" colSpan={2}>
                                  {row.keterangan}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center text-sm"
              disabled={currentPage === 1}
            >
              <IoIosArrowBack /> Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="flex items-center text-sm"
              disabled={currentPage === totalPages}
            >
               Next <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lpemeriksaan;
