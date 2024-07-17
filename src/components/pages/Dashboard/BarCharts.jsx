import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const BarCharts = () => {
  // Data untuk doughnut charts
  const data1 = {
    labels: ['Rawa', 'Kanal', 'Tanah Keras'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ["rgba(68, 138, 255)",
                        "rgba(63, 81, 181)",
                        "rgba(0, 188, 212)",],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ['Tegak','Miring'],
    datasets: [
      {
        label: '# of Votes',
        data: [8, 15],
        backgroundColor: [
                        "rgba(63, 81, 181)",
                        "rgba(0, 188, 212)", ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ['Bagus', 'Rusak','Tidak Ada',],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 8, 30],
        backgroundColor: ["rgba(68, 138, 255)",
          "rgba(63, 81, 181)",
          "rgba(0, 188, 212)",],
        borderWidth: 1,
      },
    ],
  };

  const data4 = {
    labels: ['Bagus', 'Rusak', 'Tidak Ada'],
    datasets: [
      {
        label: '# of Votes',
        data: [5, 10, 8],
        backgroundColor: ["rgba(68, 138, 255)",
          "rgba(63, 81, 181)",
          "rgba(0, 188, 212)",],
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk grafik
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '', // Judul default
      },
    },
  };

  return (
    <div className='w-full h-full mt-3 shadow-md bg-white rounded-md  border flex flex-wrap'>
      <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 md:mb-0'>
        <Doughnut data={data1} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Kondisi Tanah' } } }} />
      </div>
      <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2'>
        <Doughnut data={data2} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Kemiringan Tiang' } } }} />
      </div>
      <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 md:mb-0'>
        <Doughnut data={data3} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Kondisi Static Wire' } } }} />
      </div>
      <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2'>
        <Doughnut data={data4} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Kondisi Kabel Fiber Optic' } } }} />
      </div>
    </div>
  );
};

export default BarCharts;