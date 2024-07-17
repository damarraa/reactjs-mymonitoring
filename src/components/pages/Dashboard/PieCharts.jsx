import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../../../api';
import { Oval } from 'react-loader-spinner';

const PieCharts = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    api.get('/api/dashboard-pieChart')
      .then(response => {
        const { data1, data2, data3, data4 } = response.data;

        setData1(data1.map(item => ({
          label: item.kondisi_tanah,
          value: item.count
        })));

        setData2(data2.map(item => ({
          label: item.kemiringan_tanah,
          value: item.count
        })));

        setData3(data3.map(item => ({
          label: item.kondisi_cross_arm,
          value: item.count
        })));

        setData4(data4.map(item => ({
          label: item.kondisi_fiber_optic,
          value: item.count
        })));

        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const options = {
    plugins: {
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

  const renderDoughnutChart = (data, title) => (
    <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 md:mb-0'>
      <Doughnut
        data={{
          labels: data.map(data => data.label),
          datasets: [{
            label: '# of Votes',
            data: data.map(data => data.value),
            backgroundColor: ["rgba(68, 138, 255)", "rgba(63, 81, 181)", "rgba(0, 188, 212)"],
            borderWidth: 1,
          }],
        }}
        options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: title } } }}
      />
    </div>
  );

  return (
    <div className='w-full h-full mt-3 shadow-md bg-white rounded-md border flex flex-wrap p-x-9 py-9'>
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
        <>
          {renderDoughnutChart(data1, 'Kondisi Tanah')}
          {renderDoughnutChart(data2, 'Kondisi Tiang')}
          {renderDoughnutChart(data3, 'Kondisi Cross Arm')}
          {renderDoughnutChart(data4, 'Kondisi Kabel Fiber Optic')}
        </>
      )}
    </div>
  );
};

export default PieCharts;
