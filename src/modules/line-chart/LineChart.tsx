import { ChartData } from 'chart.js';
import React, { FC, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { getLineChartOptions } from './helpers';

type LineChartProps = {
  title: string;
  chartData: ChartData<'line', number[], string>;
};

export const LineChart: FC<LineChartProps> = ({ title, chartData }) => {
  const options = useMemo(() => getLineChartOptions(title), [title]);

  return (
    <div>
      <Line height={400} options={options} data={chartData} />
    </div>
  );
};
