import React, {  } from 'react';

const TemuanPemeriksaan = () => {



  return (
    <div>
      <div className="pl-4 mt-4 px-4 flex">
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
          <table className="min-w-full bg-white border border-gray-200">
        <thead className='bg-red-800 text-white'>
          <tr>
            <th className="py-2 px-4 border-b text-center">Lokasi Feeder</th>
            <th className="py-2 px-4 border-b text-center">No Pole</th>
            <th className="py-2 px-4 border-b text-center">Equipment Type</th>
            <th className="py-2 px-4 border-b text-center">Finding</th>
            <th className="py-2 px-4 border-b text-center">Gambar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b text-center">Feeder 1</td>
            
          </tr>
        </tbody>
      </table>
    </div>
    </div>
          </div>
        </div>  
      
    
  );
};

export default TemuanPemeriksaan;
