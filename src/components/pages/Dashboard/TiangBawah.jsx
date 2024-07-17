import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../../../api';
import { Oval } from 'react-loader-spinner';
import 'chartjs-plugin-datalabels';

const TiangBawah = () => {
  const [sourceData, setSourceData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    api.get('/api/dashboard-tiangBawah')
      .then(response => {
        const data = response.data.map(item => ({
          label: item.kondisi_bagian_bawah,
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
        text: 'Kondisi Tiang Bawah', // Judul chart
      },
      legend: {
        position: 'bottom', // Menentukan posisi legends di kanan
        labels: {
          boxWidth: 10, // Lebar kotak untuk label
          padding: 10, // Padding antara legend dan chart
        },
      },
      datalabels: {
        color: '#fff', // Warna label
        display: true,
        formatter: (value) => {
          return ` ${value}`; // Format label di luar chart
        }
      }
    },
  };
  // // Data contoh untuk doughnut chart
  // const sourceData = [
  //   { label: 'Bagus', value: 37 },
  //   { label: 'Korosi Ringan', value: 30 },
  //   { label: 'Korosi Sedang', value: 10 },
  //   { label: 'Korosi Parah', value: 5 },
  // ];

  // const options = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Kondisi Tiang Bawah', // Judul yang ingin ditampilkan
  //     },
  //   },
  // };

  return (
    <div className='p-2 mt-3 w-full h-full shadow-md bg-white rounded-md border flex items-center'>
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
      <Pie
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

export default TiangBawah;