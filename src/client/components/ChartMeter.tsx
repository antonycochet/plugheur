import React from 'react';
import 'chart.js/auto';

import { Line } from 'react-chartjs-2';

interface chartMeterProps {
  chartData: {
    title: string;
    dateTime: string[];
    wh: number[];
    varh: number[];
  };
  isSplited: boolean;
}

export const ChartMeter = ({ chartData, isSplited }: chartMeterProps) => {
  const dataWh: number[] = chartData.wh;
  const dataVarh: number[] = chartData.varh;
  const labels: string[] = chartData.dateTime;
  const backgroundColorWh = 'rgba(27, 96, 184, 1)';
  const backgroundColorVarh = 'rgba(206, 39, 16, 1)';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: chartData.title
      }
    }
  };

  const generateChartData = () => {
    return {
      labels,
      datasets: [
        {
          label: 'WH',
          data: dataWh,
          backgroundColor: backgroundColorWh
        },
        {
          label: 'VARH',
          data: dataVarh,
          backgroundColor: backgroundColorVarh
        }
      ]
    };
  };

  const generateChartDataWh = () => {
    return {
      labels,
      datasets: [
        {
          label: 'WH',
          data: dataWh,
          backgroundColor: backgroundColorWh
        }
      ]
    };
  };

  const generateChartDataVarh = () => {
    return {
      labels,
      datasets: [
        {
          label: 'VARH',
          data: dataVarh,
          backgroundColor: backgroundColorVarh
        }
      ]
    };
  };

  return isSplited ? (
    <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-8">
      <div className="lg:w-6/12 w-full bg-white rounded-sm p-6 shadow-xl">
        <Line data={generateChartDataWh()} options={options} />
      </div>
      <div className="lg:w-6/12 w-full bg-white rounded-sm p-6 shadow-xl">
        <Line data={generateChartDataVarh()} options={options} />
      </div>
    </div>
  ) : (
    <div className="w-full lg:w-8/12 bg-white rounded-sm p-6 shadow-xl">
      <Line data={generateChartData()} options={options} />
    </div>
  );
};
