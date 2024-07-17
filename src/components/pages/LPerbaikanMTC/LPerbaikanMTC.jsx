import React, { useEffect, useState } from "react";
import api from "../../../api";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LPerbaikanMTC = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [feeders, setFeeders] = useState([]);

  const [filters, setFilters] = useState({
    year: "",
    month: "",
    status: "",
    feeder: "",
    noPole: "",
    finding: "",
  });

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      const token = localStorage.getItem("token");
      try {
        const result = await api.get(`/api/dataTemuan?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedData = result.data;

        setData(fetchedData.data);
        setFilteredData(fetchedData.data);

        // Extract unique years, months, statuses, and feeders from data
        const uniqueYears = [
          ...new Set(
            fetchedData.data.map((item) =>
              new Date(item.tanggal_perbaikan).getFullYear()
            )
          ),
        ];
        const uniqueMonths = [
          ...new Set(
            fetchedData.data.map((item) =>
              format(new Date(item.tanggal_perbaikan), "MMMM", { locale: id })
            )
          ),
        ];
        const uniqueStatuses = [
          ...new Set(fetchedData.data.map((item) => item.status)),
        ];
        const uniqueFeeders = [
          ...new Set(fetchedData.data.map((item) => item.lokasi_feeder)),
        ];

        setYears(uniqueYears);
        setMonths(uniqueMonths);
        setStatuses(uniqueStatuses);
        setFeeders(uniqueFeeders);

        setCurrentPage(fetchedData.current_page);
        setTotalPages(fetchedData.last_page);
        setPrevPageUrl(fetchedData.prev_page_url);
        setNextPageUrl(fetchedData.next_page_url);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters, data]);

  const filterData = () => {
    let filtered = data;

    if (filters.year) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.tanggal_perbaikan).getFullYear() ===
          parseInt(filters.year)
      );
    }

    if (filters.month) {
      filtered = filtered.filter(
        (item) =>
          format(new Date(item.tanggal_perbaikan), "MMMM", { locale: id }) ===
          filters.month
      );
    }

    if (filters.status) {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    if (filters.feeder) {
      filtered = filtered.filter(
        (item) => item.lokasi_feeder === filters.feeder
      );
    }

    if (filters.noPole) {
      filtered = filtered.filter((item) =>
        item.no_pole.toLowerCase().includes(filters.noPole.toLowerCase())
      );
    }

    if (filters.finding) {
      filtered = filtered.filter((item) =>
        item.finding.toLowerCase().includes(filters.finding.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handlePageChange = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const url = page === "prev" ? prevPageUrl : nextPageUrl;
      const result = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedData = result.data;

      setData(fetchedData.data);
      setFilteredData(fetchedData.data);

      setCurrentPage(fetchedData.current_page);
      setTotalPages(fetchedData.last_page);
      setPrevPageUrl(fetchedData.prev_page_url);
      setNextPageUrl(fetchedData.next_page_url);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error
    }
  };

  const formatDate = (dateString, formatString) => {
    const date = new Date(dateString);
    return format(date, formatString, { locale: id });
  };

  return (
    <div>
      <div className="pl-4 mt-4 px-4">
        <div className="font-bold text-neutral-700 text-xl">
          Laporan Temuan Perbaikan
          <p className="font-light mt-2 text-sm">Data Laporan Perbaikan</p>
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
                  <div className="grid grid-cols-6 gap-4">
                    <select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 border rounded-md"
                    >
                      <option value="">Tahun</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      name="month"
                      value={filters.month}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 border rounded-md"
                    >
                      <option value="">Bulan</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 border rounded-md"
                    >
                      <option value="">Status</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <select
                      name="feeder"
                      value={filters.feeder}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 border rounded-md"
                    >
                      <option value="">Feeder</option>
                      {feeders.map((feeder) => (
                        <option key={feeder} value={feeder}>
                          {feeder}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="noPole"
                      value={filters.noPole}
                      onChange={handleFilterChange}
                      placeholder="No Pole"
                      className="mt-1 p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      name="finding"
                      value={filters.finding}
                      onChange={handleFilterChange}
                      placeholder="Finding"
                      className="mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-white text-neutral-700">
                <tr>
                  <th className="py-2 px-4 border-b text-center">No.</th>
                  <th className="py-2 px-4 border-b text-center">
                    Tanggal Perbaikan
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    Lokasi Feeder
                  </th>
                  <th className="py-2 px-4 border-b text-center">No Pole</th>
                  <th className="py-2 px-4 border-b text-center">Finding</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {formatDate(item.tanggal_perbaikan, "dd MMMM yyyy")}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.lokasi_feeder}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.no_pole}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.finding}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                className={`btn btn-primary text-sm flex items-center ${
                  !prevPageUrl ? "disabled" : ""
                }`}
                onClick={() => handlePageChange("prev")}
                disabled={!prevPageUrl}
              >
                <IoIosArrowBack className="mr-1" />
                Previous
              </button>
              <span className=" text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`btn btn-primary text-sm flex items-center ${
                  !nextPageUrl ? "disabled" : ""
                }`}
                onClick={() => handlePageChange("next")}
                disabled={!nextPageUrl}
              >
                Next
                <IoIosArrowForward className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPerbaikanMTC;
