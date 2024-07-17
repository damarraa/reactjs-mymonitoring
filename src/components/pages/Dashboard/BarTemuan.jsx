import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../../../api";
import { Oval } from "react-loader-spinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineTemuan = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const colorMap = {
    "Feeder #1": "rgba(68, 138, 255)",
    "Feeder #2": "rgba(63, 81, 181)",
    "Feeder #3": "rgba(0, 188, 212)",
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await api.get("/api/dashboard-yearsLineTemuan", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sesuaikan dengan metode penyimpanan token
          },
        });
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/dashboard-lineTemuan", {
          params: { year: selectedYear },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sesuaikan dengan metode penyimpanan token
          },
        });

        const data = response.data;

        const formattedData = {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Ags",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ],
          datasets: [],
        };

        const feeders = ["Feeder #1", "Feeder #2", "Feeder #3"];

        feeders.forEach((feeder) => {
          const feederData = new Array(12).fill(0);

          data.forEach((item) => {
            if (item.lokasi_feeder === feeder) {
              feederData[item.month - 1] = Math.round(item.count);
            }
          });

          const color = colorMap[feeder] || "rgba(0, 0, 0, 0.1)";

          formattedData.datasets.push({
            label: feeder,
            data: feederData,
            borderColor: color,
            backgroundColor: color.replace("1)", "0.2)"),
            borderWidth: 1,
            fill: true,
          });
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Temuan Kerusakan",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const feeder = context.dataset.label;
            const count = context.raw;
            const month = context.label;
            return `${feeder} memiliki ${count} data di bulan ${month}`;
          },
        },
      },
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: 'black',
        formatter: function(value, context) {
          return value === 0 ? '' : value;
        },
        font: {
          weight: 'bold'
        }
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-80 mt-3 p-4 shadow-md bg-white rounded-md border">
      <div className="flex justify-between items-center ">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className=" border rounded-md"
        >
          {years.map((year) => (
            <option key={year.year} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-full">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Oval
              height={40}
              width={40}
              color="#0891b2"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#0891b2"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default LineTemuan;

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
// } from "chart.js";
// import api from "../../../api";
// import dayjs from "dayjs";
// import { Oval } from "react-loader-spinner";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineTemuan = () => {
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });
//   const [originalData, setOriginalData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("/api/dashboard-barTemuan")
//       .then((response) => {
//         const data = response.data.map((item) => ({
//           ...item,
//           year: dayjs(item.tanggal_temuan).format("YYYY"),
//           month: dayjs(item.tanggal_temuan).format("MM"),
//           month_name: dayjs(item.tanggal_temuan).format("MMMM"),
//         }));
//         setOriginalData(data);
//         updateChartData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       });
//   }, []);

//   const updateChartData = (data, year = selectedYear, month = selectedMonth) => {
//     const filteredData = data.filter(
//       (item) =>
//         (year ? item.year === year : true) &&
//         (month ? item.month === month : true)
//     );

//     const monthNames = [
//       ...new Set(filteredData.map((item) => item.month_name)),
//     ];
//     const feeders = [
//       ...new Set(filteredData.map((item) => item.lokasi_feeder)),
//     ];
//     const colorMap = {
//       "Feeder #1": "rgba(68, 138, 255)",
//       "Feeder #2": "rgba(63, 81, 181)",
//       "Feeder #3": "rgba(0, 188, 212)",
//     };
//     const datasets = feeders.map((feeder) => ({
//       label: `${feeder}`,
//       data: monthNames.map((month) => {
//         const monthData = filteredData.find(
//           (item) => item.month_name === month && item.lokasi_feeder === feeder
//         );
//         return monthData ? monthData.count : 0;
//       }),
//       backgroundColor: colorMap[feeder] || "rgba(0, 0, 0, 0.1)",
//       borderColor: colorMap[feeder] || "rgba(0, 0, 0, 0.1)",
//       borderWidth: 1,
//     }));

//     setChartData({ labels: monthNames, datasets });
//   };

//   const handleYearChange = (event) => {
//     const year = event.target.value;
//     setSelectedYear(year);
//     updateChartData(originalData, year, selectedMonth);
//   };

//   const handleMonthChange = (event) => {
//     const month = event.target.value;
//     setSelectedMonth(month);
//     updateChartData(originalData, selectedYear, month);
//   };

//   const years = [...new Set(originalData.map((item) => item.year))];
//   const months = [
//     ...new Set(originalData.map((item) => item.month)),
//   ].sort((a, b) => a - b);

//   const monthNames = [...new Set(originalData.map((item) => item.month_name))];

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 10,
//           padding: 10,
//         },
//       },
//       title: { display: true, text: "Temuan Kerusakan" },
//     },
//     layout: {
//       padding: 0,
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         grid: {
//           display: true,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: true,
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full h-80 mt-3 p-2 shadow-md bg-white rounded-md border">
//       {loading ? (
//         <div className="flex justify-center items-center w-full h-full">
//           <Oval
//             height={40}
//             width={40}
//             color="#0891b2"
//             visible={true}
//             ariaLabel="oval-loading"
//             secondaryColor="#0891b2"
//             strokeWidth={2}
//             strokeWidthSecondary={2}
//           />
//         </div>
//       ) : (
//         <>
//           <div className="flex mb-3 mr-auto space-x-3">
//             <select
//               value={selectedYear}
//               onChange={handleYearChange}
//               className="text-xs px-1 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Pilih Tahun</option>
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               className="text-xs px-1 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Pilih Bulan</option>
//               {months.map((month, index) => (
//                 <option key={month} value={month}>
//                   {monthNames[index]}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div style={{ height: "calc(100% - 3rem)" }}>
//             <Line data={chartData} options={options} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LineTemuan;
