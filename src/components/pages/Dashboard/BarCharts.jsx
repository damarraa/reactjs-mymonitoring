import React from 'react'

const BarCharts = () => {
  return (
    <div>
        <div className=' rounded-md grid grid-cols-2'>   
      <BoxWrapper>
        <div className=''>
            <span className=''>Kondisi Nomor Tiang</span>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className=''>
            <span className=''>Kondisi Nomor Tiang</span>
        </div>

      </BoxWrapper>
    </div>
    </div>
    
  )
}
function BoxWrapper({children}){
    return<div className="ml-3 shadow-md bg-white rounded-md p-11 border  items-center">{children}</div>
  }
export default BarCharts
