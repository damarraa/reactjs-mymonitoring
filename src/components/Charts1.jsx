import React from 'react'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { Doughnut } from 'react-chartjs-2'

import sourceData from "./sourceData.json";




const Charts1 = () => {
  return (
    <div className=''>
      <Doughnut
        data={{
            labels: sourceData.map((data)=> data.label),
            datasets: [
                {
                    label: "Count",
                    data: sourceData.map((data) => data.value),
                    backgroundColor: [
                        "rgba(43, 63, 339, 0.8)",
                        "rgba(43, 63, 339, 0.8)",
                        "rgba(43, 63, 339, 0.8)",
                    ],
                },
            ],
        }}
        width={200}
        height={200}

      />
    </div>
  )
}

export default Charts1
