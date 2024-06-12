import React from 'react'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { Doughnut } from 'react-chartjs-2'

import sourceData from "./sourceData.json";


const PieChartTiangAtasBawah = () => {
  return (
    <div className='h-full w-full rounded-md grid grid-raws-2  '>
      <BoxWrapper>
        <Doughnut
        data={{
            labels: sourceData.map((data)=> data.label),
            datasets: [
                {
                    label: "Count",
                    data: sourceData.map((data) => data.value),
                    backgroundColor: [
                        "rgba(68, 138, 255)",
                        "rgba(63, 81, 181)",
                        "rgba(0, 188, 212)",
                    ],
                },
            ],
        }}
        width={100}
        height={100}

      />
        </BoxWrapper>
        
        <BoxWrapper>
        <Doughnut
        data={{
            labels: sourceData.map((data)=> data.label),
            datasets: [
                {
                    label: "Count",
                    data: sourceData.map((data) => data.value),
                    backgroundColor: [
                        "rgba(68, 138, 255)",
                        "rgba(63, 81, 181)",
                        "rgba(0, 188, 212)",
                    ],
                },
            ],
        }}
        width={100}
        height={100}

      />
        </BoxWrapper>
      
    </div>
  )
}
function BoxWrapper({children}){
    return<div className="  mt-3 shadow-md bg-white rounded-md p-6 border flex justify-center items-center">{children}</div>
  }
export default PieChartTiangAtasBawah
