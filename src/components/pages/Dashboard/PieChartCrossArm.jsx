import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../../../api';
import { plugins } from 'chart.js';
import { Oval } from 'react-loader-spinner';

const PieChartCrossArm = () => {
  const [sourceData, setSourceData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    api.get('/api/dashboard-crossArm')
      .then(response => {
        const data = response.data.map(item => ({
          label: item.kondisi_cross_arm,
          value: item.count
        }));
        setSourceData(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Kondisi Cross Arm', // Judul chart
      },
      legend: {
        position: 'bottom', // Menentukan posisi legends di kanan
        labels: {
          boxWidth: 10, // Lebar kotak untuk label
          padding: 10, // Padding antara legend dan chart
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(0); // Format tooltip
          }
        }
      },
      datalabels: {
        color: '#000000',
        align: 'left',
        font: {
          size: 14
        }
      }
    },
  };

  return (
    <div className='p-2 mt-3 w-full h-full shadow-md bg-white rounded-md border flex items-center justify-center'>
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
        <Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: 'Count',
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  'rgba(68, 138, 255)',
                  'rgba(0, 188, 212)',
                  'rgba(63, 81, 181)',
                  'rgb(64, 46, 122)',
                ],
              },
            ],
          }}
          options={options} // Menyertakan options ke dalam prop options dari Doughnut
          width={50}
          height={50}
        />
      )}
    </div>
  );
};

export default PieChartCrossArm;
