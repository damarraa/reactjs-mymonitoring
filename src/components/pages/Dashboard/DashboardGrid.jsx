import { LuFileCheck2, LuFileClock, LuFileCog } from "react-icons/lu"

const DashboardGrid = () => {
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
                <strong className="text-xl font-semibold">30</strong>
              </div>
            </span>
          </div>
          
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full ml-2 mr-4 h-10 w-10 flex items-center justify-center bg-red-100">
            <LuFileCog className="text-xl" style={{color:'#b91c1c'}}></LuFileCog>
          </div>
          <div>
            <span className="text-xs font-light">Total Temuan
              <div className="items-center">
                <strong className="text-xl font-semibold">30</strong>
              </div>
            </span>
          </div>
         
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full ml-2 mr-4 h-10 w-10 flex items-center justify-center bg-yellow-100">
            <LuFileClock className="text-xl" style={{color:'#ca8a04'}}></LuFileClock>
          </div>
          <div>
            <span className="text-xs font-light">Total Perbaikan
              <div className="items-center">
                <strong className="text-xl font-semibold">30</strong>
              </div>
            </span>
          </div>
          
        </BoxWrapper>
        
      </div>
    </div>
  )
}

function BoxWrapper({children}){
  return<div className="w-full shadow-md bg-white rounded-md  p-1 flex-1 border flex items-center">{children}</div>
}

export default DashboardGrid
