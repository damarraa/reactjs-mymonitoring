import React, { useState } from 'react';

const Lpemeriksaan = () => {
  const [subTables, setSubTables] = useState({});

  const toggleSubTable = (index) => {
    setSubTables((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const verifyStatus = (index) => {
    // Update the state to mark the status as verified
    console.log(`Row ${index} verified`);
  };

  return (
    <div>
      <div className="pl-4 mt-4 px-4 flex">
        <div className="font-bold text-neutral-700 text-xl">
          Laporan Pemeriksaan
          <p className="font-light mt-2 text-sm">
            Data Laporan Pemeriksaan
          </p>
        </div>
      </div>
      <div className="mx-4 shadow-md">
        <div className="mt-6 py-6 pl-4 bg-white rounded-md max-w-7xl mx-auto sm:px-3 lg:px-9">
          <div className="overflow-hidden rounded-sm">
          <table className="min-w-full bg-white border border-gray-200">
        <thead className='bg-red-800 text-white'>
          <tr>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b text-center">Lokasi Feeder</th>
            <th className="py-2 px-4 border-b text-center">Tenggat Akhir</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b text-center">
              <button
                onClick={() => toggleSubTable(1)}
                className="text-blue-500 hover:text-blue-700"
              >
                +
              </button>
            </td>
            <td className="border-b text-center">Feeder 1</td>
            <td className="border-b text-center">31-12-2024</td>
            <td className="border-b text-center">
              <button
                onClick={() => verifyStatus(1)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Verifikasi
              </button>
            </td>
          </tr>
          {subTables[1] && (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b">
                <table className="min-w-full bg-gray-100 border border-gray-200">
                    <tr>
                      <th className="py-1 px-4 border-b border-r w-1/2">Nomor Tiang</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Nomor Tiang</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Level HCA</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Koordinat GPS</th>
                      <th className="py-1 px-4 border-r border-b">N</th>
                      <td className="py-1 px-4 border-r border-b">aa</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">E</th>
                      <td className="py-1 px-4">A2</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-b border-r w-1/3">Tipe Tiang</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Tiang Bagian Atas *Lebih 1m dari tanah</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Tiang Bagian Bawah *Kurang 1m dari tanah</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Cross Arm</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Guy Pole(Tiang Guy)</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Tanah pada Tiang dan Sekitarnya</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Apakah Tiang sudah di-sleeve?</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Apakah Tiang Guy sudah di-sleeve? *Jika Ada</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="4">Peralatan pada Tiang</th>
                      <th className="py-1 px-4 border-r border-b">Peralatan</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Serial Number</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kapasitas</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="3">13.8kV Pin Insulator</th>
                      <th className="py-1 px-4 border-r border-b">Tipe</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">13.8kV Dead End Insulator</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">13.8kV Suspension Insulator</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="3">Lightning Arrester</th>
                      <th className="py-1 px-4 border-r border-b">Tipe</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Kawat Guy</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Static Wire</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Kabel Fiber Optic</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Pelindung Pole Guard Tiang/Tiang Guy</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="3">Kondisi Tumbuhan</th>
                      <th className="py-1 px-4 border-r border-b">Tipe</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Tinggi *m</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Land Encroachment Condition</th>
                      <th className="py-1 px-4 border-r border-b">Tipe</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="3">Kondisi Akses ke Tiang</th>
                      <th className="py-1 px-4 border-r border-b">Pekerja *Orang</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kendaraan Besar</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Kendaraan Kecil</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Stiker Peringatan</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Kondisi Papan Peringatan Publik</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b" rowSpan="2">Kondisi Papan Peringatan Bahaya</th>
                      <th className="py-1 px-4 border-r border-b">Kondisi</th>
                      <td className="py-1 px-4 border-r border-b">-</td>
                   </tr>
                   <tr>
                      <th className="py-1 px-4 border-r border-b">Jumlah</th>
                      <td className="py-1 px-4">-</td>
                   </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Kondisi Anti Panjat *Kawat Duri</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Aktivitas di Bawah Span *Konduktor</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Tipe Konduktor</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Foto Finding</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                    <tr>
                      <th className="py-1 px-4 border-b border-r">Keterangan</th>
                      <td className="py-1 px-4 border-b" colSpan={2}>Kolom 2</td>
                    </tr>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
          </div>
        </div>  
      
    
  );
};

export default Lpemeriksaan;
