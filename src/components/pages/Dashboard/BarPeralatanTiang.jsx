import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import api from '../../../api';
import { Oval } from 'react-loader-spinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarPeralatanTiang = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    api.get('/api/dashboard-peralatanTiang')
      .then(response => {
        const data = response.data;
        const labels = ['Recloser', 'LBS', 'Disconnect Switch', 'TX Pole Mounted', 'TX Pad Mounted', 'Capacitor Bank', 'Tidak Ada'];
        const counts = labels.map(label => {
          const item = data.find(d => d.peralatan_tiang === label);
          return item ? item.count : 0;
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Jumlah Peralatan',
              data: counts,
              backgroundColor: 'rgba(0, 188, 212, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barThickness: 15,
              minBarLength: 10, // Minimum length of the bars
            }
          ]
        });
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const options = {
    indexAxis: 'y', // Sumbu index
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart fits within the container
    layout: {
      padding: {
        left: 5,
        right: 20,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: 'Jumlah Peralatan Tiang',
      },
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: 'black',
        formatter: (value, context) => {
          return value;
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      }
    },
  };

  return (
    <div className='w-full h-96 shadow-md bg-white rounded-md border p-2 flex items-center justify-center'>
      {loading ? ( // Display loading indicator while fetching data
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
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarPeralatanTiang;
