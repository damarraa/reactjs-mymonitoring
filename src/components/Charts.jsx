import { Chart } from 'chart.js';
import React, { useEffect, useRef } from 'react'

export default function Charts(){

const chartRef = useRef(null);
const chartInstance = useRef(null);

useEffect(()=>{
    if (chartInstance.current){
        chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
        type: 'doughnut',
        data:{
            labels:[
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets:[{
                data:[30,20,10],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
            }
               
            ]
            

        }
    });
    return()=>{
        if (chartInstance.current){
            chartInstance.current.destroy();
        }
    }
},[])
  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}


