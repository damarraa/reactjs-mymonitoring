{subTables[index] && (
  <tr>
    <td colSpan="6" className="py-2 px-4 border-b">
      <div className="w-full h-full  flex flex-col">
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