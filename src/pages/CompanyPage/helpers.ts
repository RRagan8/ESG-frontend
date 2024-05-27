import { ChartData } from 'chart.js';
import { IAggregateTextResultItem } from '../../api/generated/data-contracts';
import { formatDate, groupBy } from '../../lib/helpers';
import { generateColorsFromRGB, generateRGB } from '../../modules/line-chart/helpers';

type Dataset = {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
};

export const formatChartData = (
  aggregatedData: IAggregateTextResultItem[],
): ChartData<'line', number[], string> => {
  const labels = [...new Set(aggregatedData.map((item) => formatDate(item.date)))];

  const datasets: Dataset[] = [];

  const dataGroupedByModelName = groupBy(aggregatedData, 'model_name');

  dataGroupedByModelName.forEach((items, key) => {
    const baseColorRGB = generateRGB();
    const baseColor = generateColorsFromRGB(baseColorRGB.red, baseColorRGB.green, baseColorRGB.blue);
    datasets.push({
      label: key,
      data: items.map((item) => ({ x: formatDate(item.date), y: item.index ?? 0 })),
      borderColor: baseColor.borderColor,
      backgroundColor: baseColor.backgroundColor,
    });
  });

  return {
    labels,
    datasets: datasets as any,
  };
};
