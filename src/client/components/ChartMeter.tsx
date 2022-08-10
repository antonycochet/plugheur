import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

interface chartMeterProps {
    chartData: {
        title: string,
        dateTime: string[],
        wh: number[],
        varh: number[]
    };
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const ChartMeter = ({ chartData }: chartMeterProps) => {

    const generateChartData = (): any => {
        const dataWh: number[] = chartData.wh;
        const dataVarh: number[] = chartData.varh;
        const labels: string[] = chartData.dateTime;
    
        return {
            labels,
            datasets: [
              {
                label: 'WH',
                data: dataWh,
                backgroundColor: 'rgba(27, 96, 184, 1)',
              },
              {
                label: 'VARH',
                data: dataVarh,
                backgroundColor: 'rgba(184, 46, 27, 1)',
              },
            ],
        };
      };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: chartData.title,
          },
        },
      };

    return(
        <div className="w-8/12 bg-white rounded-sm p-6 shadow-xl">
            <Bar data={generateChartData()} options={options} />
        </div>
    )
}