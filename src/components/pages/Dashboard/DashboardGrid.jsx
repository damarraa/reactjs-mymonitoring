import { LuFileCheck2, LuFileCog, LuFileSearch } from "react-icons/lu"
import api from '../../../api';
import { useEffect, useState } from "react";

const DashboardGrid = () => {
  const [counts, setCounts] = useState({
    totalPemeriksaan: 0,
    totalTemuan: 0,
    totalPerbaikan: 0,
  });

  useEffect(() => {
    api.get('/api/dashboard-grid')
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4 mt-3 ">
        <BoxWrapper>
        <div className="rounded-full ml-2 mr-4 h-10 w-10 flex items-center justify-center bg-green-100">
            <LuFileCheck2 className="text-xl" style={{color:'#15803d'}}></LuFileCheck2>
          </div>
          <div>
            <span className="text-xs font-light">Total Pemeriksaan
              <div className="items-center">
                {/* Total pemeriksaan diambil dari Count(*) from pemeriksaans */}
                <strong className="text-xl font-semibold">{counts.totalPemeriksaan}</strong>
              </div>
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full ml-2 mr-4 h-10 w-10 flex items-center justify-center bg-yellow-100">
            <LuFileSearch className="text-xl" style={{color:'#ca8a04'}}></LuFileSearch>
          </div>
          <div>
            <span className="text-xs font-light">Total Temuan
              <div className="items-center">
                {/* Total temuan diambil dari Count(*) from temuans */}
                <strong className="text-xl font-semibold">{counts.totalTemuan}</strong>
              </div>
            </span>
          </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full ml-2 mr-4 h-10 w-10 flex items-center justify-center bg-red-100">
            <LuFileCog className="text-xl" style={{color:'#b91c1c'}}></LuFileCog>
          </div>
          <div>
            <span className="text-xs font-light">Total Perbaikan
              <div className="items-center">
                {/* Total temuan diambil dari Where('Perbaikan') from temuans */}
                <strong className="text-xl font-semibold">{counts.totalPerbaikan}</strong>
              </div>
            </span>
          </div>
        </BoxWrapper>
      </div>
    </div>
  )
}

function BoxWrapper({children}){
  return<div className="w-full shadow-md bg-white rounded-md  p-2  border flex items-center">{children}</div>
}

export default DashboardGrid