import React from 'react'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { Doughnut } from 'react-chartjs-2'

import sourceData from "./sourceData.json";

const PieChartCrossArm = () => {
  return (
    <div className='mt-3 w-full h-full shadow-md bg-white rounded-md p-6 border flex items-center'>
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
        width={50}
        height={50}

      />
    </div>
  )
}

export default PieChartCrossArm
